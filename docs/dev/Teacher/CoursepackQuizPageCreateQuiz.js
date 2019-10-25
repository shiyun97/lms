import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBIcon, MDBInputGroup } from "mdbreact";
import { observer, inject } from 'mobx-react';
import styled from 'styled-components';
import CoursepackSideNavigation from "../CoursepackSideNavigation";
import { Stepper, Step, StepLabel, TextField, Typography, Snackbar, Checkbox } from '@material-ui/core';
import axios from 'axios';
import { Redirect } from "react-router-dom";

@inject('dataStore')
@observer
class CoursepackQuizPageCreateQuiz extends Component {

    state = {
        studentName: "",
        username: "",
        userId: "",
        email: "",
        coursepackId: 0,
        message: "",
        openSnackbar: false,
        description: "",
        title: "", // title
        activeStep: 0,
        steps: ['Quiz Configuration', 'Build Quiz'],
        questionType: "",

        //create quiz inputs
        quizType: "normal",
        questionsOrder: false, // "random" or "normal"
        noOfAttempts: 1,
        maxTimeToFinish: 60, // timeLimit
        openingDate: "",
        closingDate: "",
        points: 1,
        level: 0,
        number: 0,
        questionTitle: "", // title
        isRequired: true,
        explanation: "",
        correctAnswer: "",
        publish: false,
        choices: [],
        answer: "",
        elements: [],
        redirect: false,
    }

    initPage() {
        var pathname = location.pathname;
        pathname = pathname.split("/");
        this.props.dataStore.setCurrCoursepackId(pathname[2]);
    }

    handleCheckBoxChange = name => event => {
        this.setState({ [name]: event.target.checked });
        // console.log(this.state.emailNotification, this.state.publish)
    };

    componentDidMount() {
        this.initPage();
    }

    handleSubmit = () => {
        // call api to submit quiz
        let userId = localStorage.getItem('userId');
        var coursepackId = this.props.dataStore.getCurrCoursepackId;
        // console.log({
        //     title: this.state.title,
        //     coursepackId: coursepackId,
        //     description: this.state.description,
        //     quizType: this.state.quizType,
        //     questionsOrder: "initial",
        //     openingDate: this.state.openingDate + ":00",
        //     closingDate: this.state.closingDate + ":00",
        //     publish: true,
        //     publishAnswer: true,
        //     noOfAttempts: this.state.noOfAttempts,
        //     maxTimeToFinish: this.state.maxTimeToFinish,
        //     questions: this.state.elements
        // })
        axios
            .post(`http://localhost:8080/LMS-war/webresources/Assessment/createCoursepackQuiz?userId=${userId}`, {
                title: this.state.title,
                coursepackId: coursepackId,
                description: this.state.description,
                quizType: this.state.quizType,
                questionsOrder: "initial",
                // openingDate: this.state.openingDate + ":00", //remove
                // closingDate: this.state.closingDate + ":00", //remove
                publish: true,
                // noOfAttempts: this.state.noOfAttempts, //remove
                // maxTimeToFinish: this.state.maxTimeToFinish, //remove
                questions: this.state.elements
            })
            .then(result => {
                console.log("success")
                this.setState({
                    message: "Quiz created successfully!",
                    openSnackbar: true,
                    redirect: true
                });
            })
            .catch(error => {
                this.setState({
                    message: error.response.data.errorMessage,
                    openSnackbar: true
                });
                console.error("error in axios " + error);
                // });
            });

        //to reset
        this.setState({ activeStep: 0 });
    }

    handleNext = () => {
        const currStep = this.state.activeStep;
        this.setState({ activeStep: currStep + 1 });
    };

    handleBack = () => {
        const currStep = this.state.activeStep;
        this.setState({ activeStep: currStep - 1 });
    };

    handleChange = event => {
        event.preventDefault();
        this.setState({ [event.target.name]: event.target.value });
        // console.log(event.target.name)
    }

    renderQuestion = (element) => {
        return (
            <><MDBCol md="12" className="mt-4" key={element.number}>
                <h3>Question {element.number}</h3>
                <label className="grey-text mt-4">
                    Question
                    </label>
                <textarea rows="3" type="text" name="questionTitle" onChange={this.handleChange} className="form-control" />
            </MDBCol>
                <MDBCol md="12" className="mt-4">
                    <label className="grey-text">
                        Explanation
                    </label>
                    <textarea rows="3" type="text" name="explanation" onChange={this.handleChange} className="form-control" />
                </MDBCol>
                <MDBCol md="8" className="mt-4" style={{ paddingTop: 28 }}>
                    <MDBInputGroup
                        containerClassName="mb-3"
                        prepend="Correct Answer"
                        required
                        inputs={
                            <select name="correctAnswer" onChange={this.handleChange} className="browser-default custom-select">
                                <option value={-1}>Choose...</option>
                                {element.choices.map((answer, index) => { return <option value={index}>Answer {index + 1}</option> })}
                            </select>
                        }
                    />
                </MDBCol>
                <MDBCol md="4" className="mt-4">
                    <label className="grey-text">
                        Points
                    </label>
                    <input type="number" className="form-control" name="points"
                        value={this.state.points}
                        onChange={this.handleChange}
                        min={1}
                        required />
                </MDBCol>
                <MDBCol md="12" className="mt-4" align="center">
                    <MDBBtn onClick={() => this.addAnswerToQuestion(element.number)} size="small" color="grey">Add Answer</MDBBtn>
                </MDBCol>
                <MDBCol md="12" className="mt-4">
                    {element.choices.map((answer, index) => { return this.renderAnswerInput(index) })}
                </MDBCol>
                <MDBCol md="12" className="mt-4" align="center">
                    {this.props.dataStore.getQuestions.length !== 0 && <MDBBtn onClick={() => this.saveQuestionsToList()} align="center" size="small" color="grey">Save</MDBBtn>}
                    <hr />
                </MDBCol>
            </>
        )
    }

    renderAnswerInput = (index) => {
        return (
            <>
                <label className="grey-text">
                    Answer {index + 1}
                </label>
                <input type="text" name="answer" onChange={this.handleChange} className="form-control" />
                <br />
            </>
        )
    }

    saveQuestionsToList = () => {
        if (this.props.dataStore.getQuestions.length > 0) {
            var newQuestions = this.state.elements
            var answers = this.state.choices;
            answers.push({ text: this.state.answer })
            this.setState({ choices: answers })
            newQuestions.push(
                {
                    type: "radiogroup",
                    // name: "MCQ",
                    // number: number,
                    title: this.state.questionTitle,
                    isRequired: true,
                    level: this.state.level, //only for adaptive,
                    explanation: this.state.explanation,
                    correctAnswer: this.state.choices[this.state.correctAnswer].text,
                    points: this.state.points,
                    choices: this.state.choices,
                })
            this.setState({ elements: newQuestions, choices: [] })
        }
    }

    addQuestionToList = () => {
        var number = this.props.dataStore.getQuestions.length + 1
        this.props.dataStore.getQuestions.push(
            {
                type: "radiogroup",
                name: "MCQ",
                number: number,
                title: "",
                isRequired: true,
                level: 1, //only for adaptive,
                explanation: "",
                correctAnswer: "",
                points: 0,
                choices: [
                    {
                        text: ""
                    }
                ],
            })
    }

    addAnswerToQuestion = (number) => {
        this.props.dataStore.addAnswerToQuestion(number, { text: "" })
        var answers = this.state.choices;
        answers.push({ text: this.state.answer })
        this.setState({ choices: answers })
    }

    handleOpenSnackbar = () => {
        this.setState({ openSnackbar: true });
    };

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ openSnackbar: false });
    };

    getStepContent = (stepIndex) => {
        switch (stepIndex) {
            case 0:
                return (
                    <div style={{ padding: 60 }}>
                        <h4 className="text-center">
                            Quiz Configuration
                        </h4>
                        <br />
                        <label className="grey-text">
                            Quiz Title
                        </label>
                        <input type="text" name="title" onChange={this.handleChange} className="form-control" />
                        <br />
                        <label className="grey-text">
                            Instructions
                        </label>
                        <textarea type="text" rows="3" name="description" onChange={this.handleChange} className="form-control" />
                        {/* <MDBRow>
                            <MDBCol md="6">
                                <br />
                                <TextField
                                    id="datetime-local"
                                    label="Opening Date"
                                    type="datetime-local"
                                    name="openingDate"
                                    value={this.state.openingDate}
                                    onChange={this.handleChange}
                                    fullWidth
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </MDBCol>
                            <MDBCol md="6">
                                <br />
                                <TextField
                                    id="datetime-local"
                                    label="Closing Date"
                                    type="datetime-local"
                                    name="closingDate"
                                    value={this.state.closingDate}
                                    onChange={this.handleChange}
                                    fullWidth
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </MDBCol>
                            <MDBCol md="6" className="mt-4">
                                <label className="grey-text">
                                    Time Limit (in minutes)
                        </label>
                                <input type="number" className="form-control" name="maxTimeToFinish"
                                    value={this.state.maxTimeToFinish}
                                    onChange={this.handleChange}
                                    min={30}
                                    required />
                            </MDBCol>
                            <MDBCol md="6" className="mt-4">
                                <label className="grey-text">
                                    Number of Attempts
                        </label>
                                <input type="number" className="form-control" name="noOfAttempts" onChange={this.handleChange}
                                    value={this.state.noOfAttempts}
                                    onChange={this.handleChange}
                                    min={1}
                                    required />
                            </MDBCol>
                        </MDBRow> */}
                    </div>
                );
            case 1:
                return (
                    <div style={{ padding: 60 }}>
                        <h4 className="text-center">
                            Build Quiz
                    </h4>
                        <hr />
                        <MDBRow>
                            {/* Add Questions List here */}
                            {this.props.dataStore.getQuestions.map((element) => { return this.renderQuestion(element) })}
                        </MDBRow>
                        <center>
                            <MDBBtn onClick={() => this.addQuestionToList()} align="center" size="small" color="blue">Add Question</MDBBtn>
                        </center>
                    </div>
                );
            default:
                return 'Unknown stepIndex';
        }
    }

    render() {
        const { steps, activeStep } = this.state;
        var coursepackId = this.props.dataStore.getCurrCoursepackId;
        // console.log(this.state.elements)
        // var test = this.props.dataStore.getQuestions
        // console.log(test[0])
        if (this.state.redirect) {
            return <Redirect to={`/coursepack/${coursepackId}/quiz`} />
        }
        return (
            <div className={this.props.className}>
                <CoursepackSideNavigation courseId={coursepackId}></CoursepackSideNavigation>
                <div className="module-content">
                    <MDBContainer className="mt-3">
                        <MDBRow style={{ paddingTop: 60 }}>
                            <MDBCol md="12">
                                <h2 className="font-weight-bold">
                                    <a href={`/coursepack/${coursepackId}/quiz`}>Quiz</a>
                                    <MDBIcon icon="angle-right" className="ml-4 mr-4" /> Create Coursepack Quiz
                                </h2>
                            </MDBCol>
                        </MDBRow>
                        <MDBRow className="py-3">
                            <MDBCol md="12">
                                <MDBCard cascade className="grey lighten-4" style={{ padding: 50 }}>
                                    <ul className="list-unstyled example-components-list">
                                        <form name="quiz-form">
                                            <Stepper activeStep={activeStep} alternativeLabel>
                                                {steps.map(label => (
                                                    <Step key={label}>
                                                        <StepLabel>{label}</StepLabel>
                                                    </Step>
                                                ))}
                                            </Stepper>
                                            <div>
                                                {activeStep === steps.length ? (
                                                    <div style={{ padding: 60 }}>
                                                        <h5 className="text-center">
                                                            You have completed all steps to create the quiz. <br />
                                                            Ensure that all fields are correct before submitting.
                                                        </h5>
                                                        <br />
                                                        <div className="text-center">
                                                            <MDBBtn color="blue" onClick={() => { this.handleSubmit() }}>Submit</MDBBtn>
                                                        </div>
                                                    </div>
                                                ) : (
                                                        <div>
                                                            <Typography>{this.getStepContent(activeStep)}</Typography>
                                                            <div align="center">
                                                                <hr />
                                                                <MDBBtn
                                                                    disabled={activeStep === 0}
                                                                    onClick={() => this.handleBack()}
                                                                    color="grey"
                                                                >
                                                                    Back
                                                                </MDBBtn>
                                                                &nbsp;&nbsp;&nbsp;&nbsp;
                                                                <MDBBtn color="grey" onClick={() => this.handleNext()}>
                                                                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                                                </MDBBtn>
                                                            </div>
                                                        </div>
                                                    )}
                                            </div>
                                        </form>
                                    </ul>
                                </MDBCard>
                            </MDBCol>
                        </MDBRow>
                        <Snackbar
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            open={this.state.openSnackbar}
                            autoHideDuration={6000}
                            onClose={this.handleClose}
                            ContentProps={{
                                'aria-describedby': 'message-id',
                            }}
                            message={<span id="message-id">{this.state.message}</span>}
                            action={[
                                <MDBIcon icon="times" color="white" onClick={this.handleClose} style={{ cursor: "pointer" }} />,
                            ]}
                        />
                    </MDBContainer>
                </div>
            </div>
        );
    }
}

export default styled(CoursepackQuizPageCreateQuiz)`
.module-content{
    margin-left: 270px;
    margin-top: 40px;
}
`;
import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBIcon, MDBInputGroup } from "mdbreact";
import { observer, inject } from 'mobx-react';
import styled from 'styled-components';
import ModuleSideNavigation from "./../ModuleSideNavigation";
import { Stepper, Step, StepLabel, TextField, Typography, Switch } from '@material-ui/core';

@inject('dataStore')
@observer
class ModuleQuizPageCreateQuiz extends Component {

    state = {
        studentName: "",
        username: "",
        userId: "",
        email: "",
        moduleId: 0,
        message: "",
        description: "", // title
        title: "", // title
        activeStep: 0,
        steps: ['Quiz Configuration', 'Build Quiz'],

        //create quiz inputs
        quizType: "normal", // adaptive
        questionsOrder: false, // "random" or "normal"
        noOfAttempts: 1,
        maxTimeToFinish: 60, // timeLimit
        openingDate: "",
        closingDate: "",
        points: 1,
        level: 1,
        questionType: "",
    }

    initPage() {
        let moduleId = this.props.match.params.moduleId;
        if (moduleId) {
            // console.log(moduleId);
            // retrieve module & set state
            this.setState({ moduleId: moduleId })
        }
    }

    handleSwitchChange = () => {
        const currState = this.state.questionsOrder
        this.setState({
            questionsOrder: !currState
        });
        console.log(this.state.questionsOrder)
    }

    componentDidMount() {
        this.initPage();
    }

    handleSubmit = () => {
        // call api to submit quiz

        // to reset
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
        console.log(event.target.name)
    }

    renderMCQQuestion = (element) => {
        return (
            <><MDBCol md="12" className="mt-4" key={element.questionId}>
                <label className="grey-text">
                    Question
</label>
                <textarea rows="3" type="text" name="question" onChange={this.handleChange} className="form-control" />
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
                            <select name="questionType" onChange={this.handleChange} className="browser-default custom-select">
                                <option value="0">Choose...</option>
                                {/* based on how many answers are created */}
                            </select>
                        }
                    />
                </MDBCol>
                <MDBCol md="2" className="mt-4">
                    <label className="grey-text">
                        Level
</label>
                    <input type="number" className="form-control" name="level"
                        value={this.state.level}
                        onChange={this.handleChange}
                        min={1}
                        required />
                </MDBCol>
                <MDBCol md="2" className="mt-4">
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
                    <MDBBtn onClick={() => this.addAnswerToQuestion(element.questionId)} size="small" color="grey">Add Answer</MDBBtn>
                </MDBCol>
                <MDBCol md="12" className="mt-4">
                    {element.choices.map((answer) => { return this.renderAnswerInput(answer) })}
                </MDBCol>
                <MDBCol md="12" className="mt-4" align="center">
                    <hr />
                </MDBCol>
            </>
        )
    }

    renderAnswerInput = (answer) => {
        return (
            <>
                <label className="grey-text">
                    Answer #
</label>
                <input type="text" name="answer" onChange={this.handleChange} className="form-control" />
                <br />
            </>
        )
    }

    addQuestionToList = () => {
        if (this.state.questionType === "short-answer") {
            console.log("Add short answer question component")
        } else if (this.state.questionType === "mcq") {
            var qId = this.props.dataStore.getQuestions.length + 1
            this.props.dataStore.getQuestions.push(
                {
                    type: "radiogroup",
                    name: qId,
                    questionId: qId,
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
            console.log(this.props.dataStore.getQuestions)
        } else
            console.log("No question type was selected")
    }

    addAnswerToQuestion = (qId) => {
        this.props.dataStore.addAnswerToQuestion(qId, { text: "" })
    }

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
                        <MDBRow>
                            <MDBCol md="9" className="mt-4">
                                <MDBInputGroup
                                    style={{ paddingTop: 22 }}
                                    containerClassName="mb-3"
                                    prepend="Quiz Type"
                                    required
                                    inputs={
                                        <select name="quizType" onChange={this.handleChange} className="browser-default custom-select">
                                            <option value="0">Choose...</option>
                                            <option value="Normal">Normal</option>
                                            <option value="Adaptive">Adaptive</option>
                                        </select>
                                    }
                                />
                            </MDBCol>
                            <MDBCol md="3" className="mt-4" style={{ paddingTop: 20 }}>
                                <label className="grey-text">
                                    Shuffle Questions
                    </label>
                                <Switch checked={this.state.questionsOrder} onChange={() => this.handleSwitchChange()} color="primary" name="questionsOrder" />
                            </MDBCol>
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
                        </MDBRow>
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
                            {this.props.dataStore.getQuestions.map((element) => { return this.renderMCQQuestion(element) })}
                        </MDBRow>
                        <center>
                            <MDBCol md="12" className="mt-4" align="center">
                                <MDBInputGroup
                                    style={{ paddingTop: 22, width: 350 }}
                                    containerClassName="mb-3"
                                    prepend="Question Type"
                                    required
                                    inputs={
                                        <select name="questionType" onChange={this.handleChange} className="browser-default custom-select">
                                            <option value="0">Choose...</option>
                                            <option value="mcq">MCQ</option>
                                            <option value="short-answer">Short Answer</option>
                                        </select>
                                    }
                                />
                            </MDBCol>
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
        return (
            <div className={this.props.className}>
                <ModuleSideNavigation moduleId={this.props.match.params.moduleId}></ModuleSideNavigation>
                <div className="module-content">
                    <MDBContainer className="mt-3">
                        <MDBRow style={{ paddingTop: 60 }}>
                            <MDBCol md="12">
                                <h2 className="font-weight-bold">
                                    <a href="/modules/:moduleId/quiz">Quiz</a>
                                    <MDBIcon icon="angle-right" className="ml-4 mr-4" /> Create Quiz
                                </h2>
                            </MDBCol>
                        </MDBRow>
                        <MDBRow className="py-3">
                            <MDBCol md="12">
                                <MDBCard cascade className="grey lighten-4" style={{ padding: 50 }}>
                                    <ul className="list-unstyled example-components-list">
                                        <form name="quiz-form" onSubmit={() => { this.handleSubmit() }}>
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
                                                            <MDBBtn type="submit" color="blue">Submit</MDBBtn>
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
                    </MDBContainer>
                </div>
            </div>
        );
    }
}

export default styled(ModuleQuizPageCreateQuiz)`
.module-content{
    margin-left: 270px;
    margin-top: 40px;
}
`;
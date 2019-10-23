import React, { Component } from "react";
import styled from 'styled-components';
import { MDBContainer, MDBRow, MDBCol, MDBIcon, MDBBtn, MDBCardBody, MDBCard, MDBDataTable, MDBModal, MDBModalBody, MDBModalFooter, MDBModalHeader } from "mdbreact";
import ModuleSideNavigation from "../ModuleSideNavigation";
import { Snackbar } from '@material-ui/core';
import axios from 'axios';
import { observer, inject } from 'mobx-react';
import moment from 'moment';

@inject('dataStore')
@observer
class ModuleQuizPageViewStudentAttempt extends Component {

    state = {
        modal1: false,
        isOpen: false,
        moduleId: 0,
        quizId: 0,
        name: "",
        quizStatus: "",
        marks: 0,
        questionAttemptId: 0,
        columns: [
            {
                "label": "Question Number",
                "field": "questionNumber",
                "width": 150,
                "attributes": {
                    "aria-controls": "DataTable",
                    "aria-label": "Name"
                }
            },
            {
                "label": "Type",
                "field": "type",
                "width": 100
            },
            {
                "label": "Score",
                "field": "score",
                "width": 100
            },
            {
                "label": "Grade",
                "field": "button",
                "width": 100
            }
        ],
        rows: [{ label: "Retrieving data..." }],
        status: "retrieving",
        openSnackbar: false,
        message: "",
        recallResults: false,
        type: [],
        correctAnswer: [],
        totalMark: [],
        questionList: [],
        currTotalMarks: 0,
        currCorrectAnswer: "",
        questionType: "MCQ",
        studentAnswer: "",
        currQuestion: ""
    }

    componentDidMount() {
        this.initPage();
        this.getAttemptDetails();
    }

    componentDidUpdate() {
        if (this.state.recallResults) {
            this.getAttemptDetails();
        }
    }

    getAttemptDetails = () => {
        let userId = localStorage.getItem('userId');
        var quizAttemptId = this.props.dataStore.getCurrQuizAttemptId;
        axios
            .get(`http://localhost:8080/LMS-war/webresources/Assessment/retrieveQuestionAttempts?userId=${userId}&quizAttemptId=${quizAttemptId}`)
            .then(result => {
                // console.log(result.data)
                var tempDetails = result.data.questionAttempts
                var type = []
                var correctAnswer = []
                var totalMark = []
                var questionList = []
                for (var i = 0; i < tempDetails.length; i++) {
                    // console.log(result.data.questionAttempts[i].question)
                    questionList.push(tempDetails[i].question.title)
                    type.push(tempDetails[i].question.type)
                    correctAnswer.push(tempDetails[i].question.correctAnswer)
                    totalMark.push(tempDetails[i].question.points)
                }
                this.setState({
                    status: "done",
                    rows: result.data.questionAttempts,
                    type: type,
                    correctAnswer: correctAnswer,
                    totalMark: totalMark,
                    questionList: questionList
                });
            })
            .catch(error => {
                this.setState({
                    status: "error",
                });
                console.error("error in axios " + error);
            });
    }

    markStudentAttempt = () => {
        let userId = localStorage.getItem('userId');
        axios
            .post(`http://localhost:8080/LMS-war/webresources/Assessment/enterQuestionMarks?userId=${userId}&questionAttemptId=${this.state.questionAttemptId}&marks=${this.state.marks}`, {})
            .then(result => {
                this.setState({
                    recallResults: true,
                    openSnackbar: true,
                    message: "Marks updated successfully!"
                });
            })
            .catch(error => {
                this.setState({
                    openSnackbar: true,
                    message: eerror.response.data.errorMessage
                });
                console.error("error in axios " + error);
            });
        this.toggle(1);
    }

    handleChange = event => {
        event.preventDefault();
        this.setState({ [event.target.name]: event.target.value });
        console.log(event.target.value)
    }
    
    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ openSnackbar: false });
    };

    toggle = (nr, questionAttemptId, studentMarks, questionType, correctAnswer, totalMark, studentAnswer, question) => {
        let modalNumber = "modal" + nr;
        this.setState({
            [modalNumber]: !this.state[modalNumber],
            questionAttemptId: questionAttemptId,
            marks: studentMarks,
            currTotalMarks: totalMark,
            currCorrectAnswer: correctAnswer,
            questionType: questionType,
            studentAnswer: studentAnswer,
            currQuestion: question
        });
    };

    renderMarkAnswerModalBox = () => {
        const { currCorrectAnswer, currTotalMarks, currQuestion, studentAnswer } = this.state
        return (
            <MDBModal isOpen={this.state.modal1} toggle={() => this.toggle(1)}>
                <MDBModalHeader
                    className="text-center"
                    titleClass="w-100 font-weight-bold"
                    toggle={() => this.toggle(1)}
                >
                    Mark Answer
                        </MDBModalHeader>
                <MDBModalBody>
                    <form className="mx-3">
                        <MDBRow>
                            <MDBCol md="12" className="mt-4">
                                <h5>Question</h5>
                                <p>{currQuestion}</p>
                            </MDBCol>
                            <MDBCol md="12" className="mt-4">
                                <h5>Correct Answer</h5>
                                <p>{currCorrectAnswer}</p>
                            </MDBCol>
                            <MDBCol md="12" className="mt-4">
                                <p>Total Marks: {currTotalMarks}</p>
                            </MDBCol>
                            <MDBCol md="12" className="mt-4">
                                <label className="grey-text">
                                    Student's Answer
                                        </label>
                                <textarea type="text" disabled className="form-control" value={studentAnswer} name="firstName" />
                            </MDBCol>
                            <MDBCol md="12" className="mt-4">
                                <label className="grey-text">
                                    Marks
                                        </label>
                                <input type="text" className="form-control" defaultValue={this.state.marks} onChange={this.handleChange} name="marks" />
                            </MDBCol>
                            <MDBCol md="12" className="mt-4">

                            </MDBCol>
                        </MDBRow>
                    </form>
                </MDBModalBody>
                <MDBModalFooter className="justify-content-center">
                    <MDBRow>
                        <MDBCol md="4">
                            <MDBBtn onClick={() => this.toggle(1)} color="grey">Cancel</MDBBtn>
                        </MDBCol>
                        <MDBCol md="8">
                            <MDBBtn color="primary" onClick={() => this.markStudentAttempt()}>Submit Marks</MDBBtn>
                        </MDBCol>
                    </MDBRow>
                </MDBModalFooter>
            </MDBModal>
        )
    }

    renderQuizStudentsTable = (tableData) => {
        var moduleId = this.props.dataStore.getCurrModId;
        var quizId = this.props.dataStore.getCurrQuizId;
        var quizAttemptId = this.props.dataStore.getCurrQuizAttemptId;
        return (
            <div className={this.props.className}>
                <ModuleSideNavigation moduleId={moduleId}></ModuleSideNavigation>
                <div className="module-content">
                    <MDBContainer className="mt-3">
                        <MDBRow style={{ paddingTop: 60 }}>
                            <MDBCol md="12">
                                <h2 className="font-weight-bold">
                                    <a href={`/modules/${moduleId}/quiz`}>Quiz</a>
                                    <MDBIcon icon="angle-right" className="ml-4 mr-4" /> <a href={`/modules/${moduleId}/quiz/${quizId}/review`}>Quiz {quizId}</a>
                                    <MDBIcon icon="angle-right" className="ml-4 mr-4" /> Attempt {quizAttemptId}
                                </h2>
                            </MDBCol>
                        </MDBRow>
                        {this.renderMarkAnswerModalBox()}
                        <MDBRow className="py-3">
                            <MDBCol md="12">
                                <MDBCard>
                                    <MDBCardBody>
                                        <MDBDataTable striped bordered hover scrollX scrollY maxHeight="400px" data={tableData} pagesAmount={4} />
                                    </MDBCardBody>
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
        )
    }

    renderTableWithMessage = (message) => {
        var moduleId = this.props.dataStore.getCurrModId;
        var quizId = this.props.dataStore.getCurrQuizId;
        var quizAttemptId = this.props.dataStore.getCurrQuizAttemptId;
        const data = () => ({ columns: this.state.columns, rows: [{ label: message }] })

        const tableData = {
            columns: [...data().columns.map(col => {
                col.width = 200;
                return col;
            })], rows: [...data().rows]
        }
        return (
            <div className={this.props.className}>
                <ModuleSideNavigation moduleId={moduleId}></ModuleSideNavigation>
                <div className="module-content">
                    <MDBContainer className="mt-3">
                        <MDBRow style={{ paddingTop: 60 }}>
                            <MDBCol md="12">
                                <h2 className="font-weight-bold">
                                    <a href={`/modules/${moduleId}/quiz`}>Quiz</a>
                                    <MDBIcon icon="angle-right" className="ml-4 mr-4" /> <a href={`/modules/${moduleId}/quiz/${quizId}/review`}>Quiz {quizId}</a>
                                    <MDBIcon icon="angle-right" className="ml-4 mr-4" /> Attempt {quizAttemptId}
                                </h2>
                            </MDBCol>
                            {this.renderMarkAnswerModalBox()}
                        </MDBRow>
                        <MDBRow className="py-3">
                            <MDBCol md="12">
                                <MDBCard>
                                    <MDBCardBody>
                                        <MDBDataTable striped bordered hover scrollX scrollY maxHeight="400px" data={tableData} pagesAmount={4} />
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </div>
            </div>
        )
    }

    renderAwaiting = () => {
        var moduleId = this.props.dataStore.getCurrModId;
        return (
            <div className={this.props.className}>
                <ModuleSideNavigation moduleId={moduleId}></ModuleSideNavigation>
                <div className="module-content">
                    <MDBContainer className="mt-3">
                        <MDBRow style={{ paddingTop: 60 }} align="center">
                            <MDBCol md="12">
                                <div className="spinner-border text-primary" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </div>
            </div>
        )
    }

    initPage() {
        var pathname = location.pathname;
        pathname = pathname.split("/");
        this.setState({ quizId: pathname[4] })
        this.props.dataStore.setCurrModId(pathname[2]);
        this.props.dataStore.setCurrQuizId(pathname[4])
        this.props.dataStore.setCurrQuizAttemptId(pathname[6])
    }

    render() {
        var newRows = []
        const row = this.state.rows
        const { type, correctAnswer, totalMark, questionList } = this.state
        for (let i = 0; i < row.length; i++) {
            newRows.push({
                questionAttemptId: row[i].questionAttemptId,
                type: type[i] === "text" ? "Short Answer" : "MCQ",
                // type: "MCQ/Short Answer",
                score: row[i].marks,
                editButton: <center>
                    <MDBIcon
                        onClick={() => this.toggle(1, row[i].questionAttemptId, row[i].marks, type[i], correctAnswer[i], totalMark[i], row[i].answer, questionList[i])}
                        style={{ cursor: "pointer", textShadow: "1px 0px 1px #000000" }}
                        icon="edit"
                    />
                </center>
            })
        }
        const data = () => ({ columns: this.state.columns, rows: newRows })
        // clickEvent: () => goToProfilePage(1)

        const widerData = {
            columns: [...data().columns.map(col => {
                col.width = 150;
                return col;
            })], rows: [...data().rows.map(row => {
                // row.clickEvent = () => goToProfilePage(1)
                return row;
            })]
        }

        if (this.state.status === "retrieving")
            return this.renderAwaiting();
        else if (this.state.status === "error")
            return this.renderTableWithMessage("Error in retrieving student's questions' attempts. Please try again later.");
        else if (this.state.status === "done")
            return this.renderQuizStudentsTable(widerData);
        else
            return this.renderTableWithMessage("No question attempts found.");
    }
}

export default styled(ModuleQuizPageViewStudentAttempt)`
.module-content{
    margin-left: 270px;
    margin-top: 40px;
}
`;

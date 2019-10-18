import React, { Component } from "react";
import styled from 'styled-components';
import { MDBContainer, MDBRow, MDBCol, MDBIcon, MDBBtn, MDBCardBody, MDBCard, MDBDataTable, MDBModal, MDBModalBody, MDBModalFooter, MDBModalHeader } from "mdbreact";
import ModuleSideNavigation from "../ModuleSideNavigation";
import { Snackbar } from '@material-ui/core';

class ModuleQuizPageViewStudentAttempt extends Component {

    state = {
        modal1: false,
        isOpen: false,
        moduleId: 0,
        quizId: 0,
        name: "",
        openingDate: "",
        closingDate: "",
        quizStatus: "",
        studentMarks: 0,
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
                "label": "Score",
                "field": "score",
                "width": 100
            },
            {
                "label": "",
                "field": "button",
                "width": 100
            }
        ],
        rows: [{ label: "Retrieving data..." }],
        // status: "retrieving",
        status: "donez",
        openSnackbar: false,
        message: ""
    }

    componentDidMount() {
        this.initPage();
    }

    handleChange = event => {
        event.preventDefault();
        this.setState({ [event.target.name]: event.target.value });
    }

    toggle = (nr) => {
        let modalNumber = "modal" + nr;
        this.setState({
            [modalNumber]: !this.state[modalNumber]
        });
    };

    renderMarkAnswerModalBox = () => {
        return (
            <MDBModal isOpen={this.state.modal1} toggle={() => this.toggle(1)}>
                <MDBModalHeader
                    className="text-center"
                    titleClass="w-100 font-weight-bold"
                    toggle={() => this.toggle(1)}
                >
                    Mark Answer for Question #
                        </MDBModalHeader>
                <MDBModalBody>
                    <form className="mx-3">
                        <MDBRow>
                            <MDBCol md="12" className="mt-4">
                                <h5>Question</h5>
                                <p>What is a Question?</p>
                            </MDBCol>
                            <MDBCol md="12" className="mt-4">
                                <h5>Correct Answer</h5>
                                <p>It is a question.</p>
                            </MDBCol>
                            <MDBCol md="12" className="mt-4">
                                <p>Total Marks: #</p>
                            </MDBCol>
                            <MDBCol md="12" className="mt-4">
                                <label className="grey-text">
                                    Student's Answer
                                        </label>
                                <textarea type="text" disabled className="form-control" value={"I do not know"} onChange={this.handleChange} name="firstName" />
                            </MDBCol>
                            <MDBCol md="12" className="mt-4">
                                <label className="grey-text">
                                    Marks
                                        </label>
                                <input type="text" className="form-control" defaultValue={this.state.studentMarks} onChange={this.handleChange} name="firstName" />
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
                            <MDBBtn color="primary">Submit Marks</MDBBtn>
                        </MDBCol>
                    </MDBRow>
                </MDBModalFooter>
            </MDBModal>
        )
    }

    renderQuizStudentsTable = (tableData) => {
        return (
            <div className={this.props.className}>
                <ModuleSideNavigation moduleId={this.props.match.params.moduleId}></ModuleSideNavigation>
                <div className="module-content">
                    <MDBContainer className="mt-3">
                        <MDBRow style={{ paddingTop: 60 }}>
                            <MDBCol md="12">
                                <h2 className="font-weight-bold">
                                    <a href="/modules/:moduleId/quiz">Quiz</a>
                                    <MDBIcon icon="angle-right" className="ml-4 mr-4" /> <a href="/modules/:moduleId/quiz/:quizId">Quiz #</a>
                                    <MDBIcon icon="angle-right" className="ml-4 mr-4" /> StudentID #
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
        const data = () => ({ columns: this.state.columns, rows: [{ label: message }] })

        const tableData = {
            columns: [...data().columns.map(col => {
                col.width = 200;
                return col;
            })], rows: [...data().rows]
        }
        return (
            <div className={this.props.className}>
                <ModuleSideNavigation moduleId={this.props.match.params.moduleId}></ModuleSideNavigation>
                <div className="module-content">
                    <MDBContainer className="mt-3">
                        <MDBRow style={{ paddingTop: 60 }}>
                            <MDBCol md="12">
                                <h2 className="font-weight-bold">
                                    <a href="/modules/:moduleId/quiz">Quiz</a>
                                    <MDBIcon icon="angle-right" className="ml-4 mr-4" /> <a href="/modules/:moduleId/quiz/:quizId"> Quiz #</a>
                                    <MDBIcon icon="angle-right" className="ml-4 mr-4" /> StudentID #
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
        return (
            <div className={this.props.className}>
                <ModuleSideNavigation moduleId={this.props.match.params.moduleId}></ModuleSideNavigation>
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
        let moduleId = this.props.match.params.moduleId;
        if (moduleId) {
            // console.log(moduleId);
            // retrieve module & set state
            this.setState({ moduleId: moduleId })
        }
    }

    render() {
        var newRows = [{
            questionNumber: 1,
            score: "Unmarked",
            editButton: <center><MDBIcon onClick={() => this.toggle(1)} style={{ cursor: "pointer", textShadow: "1px 0px 1px #000000" }} icon="edit" /></center>
        },
        {
            questionNumber: 2,
            score: "Unmarked",
            editButton: <center><MDBIcon onClick={() => this.toggle(1)} style={{ cursor: "pointer", textShadow: "1px 0px 1px #000000" }} icon="edit" /></center>
        }]
        // var newRows = []
        // const row = this.state.rows
        // for (let i = 0; i < row.length; i++) {
        //     newRows.push({
        //         userId: row[i].userId,
        //         firstName: row[i].firstName,
        //         lastName: row[i].lastName,
        //         gender: row[i].gender,
        //         email: row[i].email,
        //         password: row[i].password,
        //         accessRight: row[i].accessRight,
        //         username: row[i].username,
        //         editButton: <MDBRow align="center">
        //             <MDBCol md={6}><MDBIcon onClick={() => this.toggle(1)} style={{ cursor: "pointer", textShadow: "1px 0px 1px #000000" }} icon="edit" /></MDBCol>
        //             <MDBCol md={6}><MDBIcon onClick={() => this.deleteQuiz(row[i].userId)} style={{ cursor: "pointer", textShadow: "1px 0px 1px #000000" }} icon="trash" /></MDBCol>
        //         </MDBRow>
        //     })
        // }
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
            return this.renderTableWithMessage("Error in retrieving students' attempts. Please try again later.");
        else if (this.state.status === "done")
            return this.renderQuizStudentsTable(widerData);
        else
            return this.renderQuizStudentsTable(widerData);
        // return this.renderTableWithMessage("No students' attempts found.");
    }
}

export default styled(ModuleQuizPageViewStudentAttempt)`
.module-content{
    margin-left: 270px;
    margin-top: 40px;
}
`;

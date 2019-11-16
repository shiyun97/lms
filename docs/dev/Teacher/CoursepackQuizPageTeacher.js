import React, { Component } from "react";
import styled from 'styled-components';
import { MDBContainer, MDBRow, MDBCol, MDBIcon, MDBBtn, MDBCardBody, MDBCard, MDBDataTable, NavLink } from "mdbreact";
import CoursepackSideNavigation from "../CoursepackSideNavigation";
import CoursepackSideNavigationDropdown from "../CoursepackSideNavigationDropdown";
import { Snackbar } from '@material-ui/core';
import axios from 'axios';
import { observer, inject } from 'mobx-react';

@inject('dataStore')
@observer
class CoursepackQuizPageTeacher extends Component {

    state = {
        coursepackId: 0,
        quizId: 0,
        name: "",
        openingDate: "",
        closingDate: "",
        quizStatus: "",
        quizzes: [],
        columns: [
            {
                "label": "Quiz Id",
                "field": "quizId",
                "width": 50,
                "attributes": {
                    "aria-controls": "DataTable",
                    "aria-label": "Name"
                }
            },
            {
                "label": "Name",
                "field": "name",
                "width": 150,
                "attributes": {
                    "aria-controls": "DataTable",
                    "aria-label": "Name"
                }
            },
            {
                "label": "Max Marks",
                "field": "maxMarks",
                "width": 100
            },
            {
                "label": "Preview Quiz",
                "field": "preview",
                "width": 100
            },
            {
                "label": "",
                "field": "",
                "width": 100
            }
        ],
        rows: [{ label: "Retrieving data..." }],
        openSnackbar: false,
        message: "",
        status: "retrieving",
        recallQuiz: false,
        label: ""
    }

    componentDidMount() {
        this.initPage();
        this.getAllCoursepackQuizzes();
    }

    componentDidUpdate() {
        if (this.state.recallQuiz) {
            this.getAllCoursepackQuizzes();
        }
    }

    handleChange = event => {
        event.preventDefault();
        this.setState({ [event.target.name]: event.target.value });
    }

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ openSnackbar: false });
    };

    initPage() {
        var pathname = location.pathname;
        pathname = pathname.split("/");
        // console.log(pathname[2])
        this.props.dataStore.setCurrCoursepackId(pathname[2]);
    }

    // deleteCoursepackQuiz = (quizId) => {
    //     let userId = sessionStorage.getItem('userId');
    //     event.preventDefault();
    //     axios
    //         .delete(`http://localhost:8080/LMS-war/webresources/Assessment/deleteCoursepackQuiz?userId=${userId}&quizId=${quizId}`)
    //         .then(result => {
    //             this.setState({
    //                 recallQuiz: true,
    //                 message: "Quiz deleted successfully!",
    //                 openSnackbar: true
    //             });
    //         })
    //         .catch(error => {
    //             this.setState({
    //                 message: error.response.data.errorMessage,
    //                 openSnackbar: true
    //             });
    //             console.error("error in axios " + error);
    //         });
    // }

    getAllCoursepackQuizzes = () => {
        let userId = sessionStorage.getItem('userId');
        let coursepackId = this.props.dataStore.getCurrCoursepackId;
        axios
            .get(`http://localhost:8080/LMS-war/webresources/Assessment/retrieveAllCoursepackQuiz/${coursepackId}?userId=${userId}`)
            .then(result => {
                // console.log(result.data.quizzes)
                this.setState({ status: "done", quizzes: result.data.quizzes, recallQuiz: false })
            })
            .catch(error => {
                this.setState({ status: "error", label: error.response.data.errorMessage })
                console.error("error in axios " + error);
            });
    }

    renderQuizTable = () => {
        var quiz = this.state.quizzes;
        var coursepackId = this.props.dataStore.getCurrCoursepackId;
        // console.log(quiz)
        if (this.state.quizzes.length !== 0) {
            var tempQuizzes = []
            for (let i = 0; i < this.state.quizzes.length; i++) {
                tempQuizzes.push({
                    quizId: quiz[i].quizId,
                    name: quiz[i].title,
                    maxMarks: quiz[i].maxMarks,
                    previewButton: <center><MDBBtn color="deep-orange" outline size="sm" href={`/coursepack/${coursepackId}/quiz/${quiz[i].quizId}/preview`}>Preview</MDBBtn></center>,
                    editButton: <MDBRow align="center">
                        <MDBCol md={6}><NavLink to={`/coursepack/${coursepackId}/quiz/${quiz[i].quizId}/edit`}><MDBIcon style={{ cursor: "pointer", textShadow: "1px 0px 1px #000000" }} icon="edit" /></NavLink></MDBCol>
                        {/* <MDBCol md={6}><MDBIcon onClick={() => this.deleteCoursepackQuiz(quiz[i].quizId)} style={{ paddingTop: 12, cursor: "pointer", textShadow: "1px 0px 1px #000000" }} icon="trash" /></MDBCol> */}
                    </MDBRow>,
                })
            }
        } else {
            var tempQuizzes = [{ label: "No quizzes found." }];
        }

        const data = () => ({ columns: this.state.columns, rows: tempQuizzes })

        const widerData = {
            columns: [...data().columns.map(col => {
                col.width = 150;
                return col;
            })], rows: [...data().rows.map(row => {
                return row;
            })]
        }

        return (
            <div className={this.props.className}>
                {sessionStorage.getItem('accessRight') === 'Teacher' ?
                    <div>
                        <div className="module-sidebar-large"><CoursepackSideNavigation courseId={coursepackId} /></div>
                        <div className="module-navbar-small">
                            <CoursepackSideNavigationDropdown courseId={coursepackId} />
                        </div>
                    </div>
                : null}
                <div className="module-content">
                    <MDBContainer className="mt-3">
                        <MDBRow style={{ paddingTop: 10 }}>
                            <MDBCol md="8">
                            <h2 className="font-weight-bold" >Quiz</h2>
<hr/>
                            </MDBCol>
                            <MDBCol md="4" align="right">
                                <MDBBtn href={`/coursepack/${coursepackId}/quiz/create`} color="deep-orange">Create Quiz</MDBBtn>
                            </MDBCol>
                        </MDBRow>
                        <MDBRow className="py-3">
                            <MDBCol md="12">
                                <MDBCard>
                                    <MDBCardBody>
                                        <MDBDataTable striped bordered hover scrollX scrollY maxHeight="400px" data={widerData} pagesAmount={4} />
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

    renderTableWithMessage = () => {
        var coursepackId = this.props.dataStore.getCurrCoursepackId;
        const data = () => ({ columns: this.state.columns, rows: [{ label: this.state.label }] })

        const tableData = {
            columns: [...data().columns.map(col => {
                col.width = 200;
                return col;
            })], rows: [...data().rows]
        }
        return (
            <div className={this.props.className}>
                {sessionStorage.getItem('accessRight') === 'Teacher' ?
                    <div>
                        <div className="module-sidebar-large"><CoursepackSideNavigation courseId={coursepackId} /></div>
                        <div className="module-navbar-small">
                            <CoursepackSideNavigationDropdown courseId={coursepackId} />
                        </div>
                    </div>
                : null}
                <div className="module-content">
                    <MDBContainer className="mt-3">
                        <MDBRow style={{ paddingTop: 60 }}>
                            <MDBCol md="12">
                                <h2 className="font-weight-bold">
                                    Quiz
                                </h2>
                            </MDBCol>
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
        var coursepackId = this.props.dataStore.getCurrCoursepackId;
        return (
            <div className={this.props.className}>
                {sessionStorage.getItem('accessRight') === 'Teacher' ?
                    <div>
                        <div className="module-sidebar-large"><CoursepackSideNavigation courseId={coursepackId} /></div>
                        <div className="module-navbar-small">
                            <CoursepackSideNavigationDropdown courseId={coursepackId} />
                        </div>
                    </div>
                : null}
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

    render() {
        if (this.state.status === "retrieving")
            return this.renderAwaiting();
        else if (this.state.status === "error")
            return this.renderTableWithMessage();
        else if (this.state.status === "done")
            return this.renderQuizTable();
        else
            return this.renderTableWithMessage();
    }
}

export default styled(CoursepackQuizPageTeacher)`
@media screen and (min-width: 800px) {
    .module-content{
        margin-left: 270px;
    }
    .module-navbar-small{
        display: none;
    }
    .module-sidebar-large{
        display: block;
    }
}
@media screen and (max-width: 800px) {
    .module-sidebar-large{
        display: none;
    }
    .module-navbar-small{
        display: block;
    }
}
`;

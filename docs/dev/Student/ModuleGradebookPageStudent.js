import React, { Component } from "react";
import styled from 'styled-components';
import { MDBContainer, MDBRow, MDBCol, MDBIcon, MDBBtn, MDBCardBody, MDBCard, MDBDataTable } from "mdbreact";
import ModuleSideNavigation from "../ModuleSideNavigation";
import { Snackbar } from '@material-ui/core';
import axios from 'axios';
import { observer, inject } from 'mobx-react';
import moment from 'moment';

@inject('dataStore')
@observer
class ModuleGradebookPageStudent extends Component {

    state = {
        modal1: false,
        modal2: false,
        moduleId: 0,
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
                "label": "Opening Date",
                "field": "openingDate",
                "width": 200
            },
            {
                "label": "Closing Date",
                "field": "closingDate",
                "width": 100
            },
            {
                "label": "Status",
                "field": "Status",
                "width": 100
            },
            {
                "label": "",
                "field": "attempt",
                "width": 100
            }
        ],
        rows: [{ label: "Retrieving data..." }],
        status: "retrieving",
        openSnackbar: false,
        message: "",
        recallGradebook: false
    }

    componentDidMount() {
        this.initPage();
        this.getAllModuleQuizzes();
    }

    componentDidUpdate() {
        if (this.state.recallGradebook) {
            // this.getAllModuleQuizzes();
        }
    }

    handleChange = event => {
        event.preventDefault();
        this.setState({ [event.target.name]: event.target.value });
    }

    toggle = (nr, row) => {
        let modalNumber = "modal" + nr;
        this.setState({
            [modalNumber]: !this.state[modalNumber]
        });

        if (row !== undefined) {
            // this.updateQuizState(row);
        }
    };

    getAllModuleQuizzes = () => {
        let userId = localStorage.getItem('userId');
        let moduleId = this.props.dataStore.getCurrModId;
        axios
            .get(` http://localhost:8080/LMS-war/webresources/Assessment/retrieveAllModuleQuiz/${moduleId}?userId=${userId}`)
            .then(result => {
                // console.log(result.data.quizzes)
                this.setState({ status: "done", quizzes: result.data.quizzes })
            })
            .catch(error => {
                this.setState({ status: "error" })
                console.error("error in axios " + error);
            });
    }

    renderGradebookTable = () => {
        var quiz = this.state.quizzes;
        var moduleId = this.props.dataStore.getCurrModId;
        // console.log(quiz)
        if (this.state.quizzes.length !== 0) {
            var tempQuizzes = []
            for (let i = 0; i < this.state.quizzes.length; i++) {
                tempQuizzes.push({
                    quizId: quiz[i].quizId,
                    name: quiz[i].title,
                    openingDate: quiz[i].openingDate,
                    closingDate: quiz[i].closingDate,
                    status: quiz[i].publish ? "Open" : "Closed",
                    // description: quiz[i].description,
                    // order: quiz[i].questionsOrder,
                    // publishAnswer: quiz[i].publishAnswer,
                    // numOfAttempts: quiz[i].noOfAttempts,
                    // maxTimeToFinish: quiz[i].maxTimeToFinish,
                    // quizType: quiz[i].quizType,
                    viewButton: <center><MDBBtn color="primary" outline size="sm" href={`/modules/${moduleId}/quiz/${quiz[i].quizId}`}>Attempt</MDBBtn></center>
                })
            }
        } else {
            var tempQuizzes = [{ label: "No quizzes found." }];
        }

        const data = () => ({ columns: this.state.columns, rows: tempQuizzes })
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

        return (
            <div className={this.props.className}>
                <ModuleSideNavigation moduleId={moduleId}></ModuleSideNavigation>
                <div className="module-content">
                    <MDBContainer className="mt-3">
                        <MDBRow style={{ paddingTop: 60 }}>
                            <MDBCol md="8">
                                <h2 className="font-weight-bold">
                                    Gradebook
                </h2>
                            </MDBCol>
                            <MDBCol md="4" align="right">
                                <MDBBtn href="/modules/:moduleId/quiz/create" color="primary">Create Grade Item</MDBBtn>
                            </MDBCol>
                        </MDBRow>
                        {/* {this.renderEditQuizModalBox()} */}
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

    renderTableWithMessage = (message) => {
        var moduleId = this.props.dataStore.getCurrModId;
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
                            <MDBCol md="8">
                                <h2 className="font-weight-bold">
                                    Gradebook
                </h2>
                            </MDBCol>
                            <MDBCol md="4" align="right">
                                <MDBBtn href="/modules/:moduleId/quiz/create" color="primary">Create Grade Item</MDBBtn>
                            </MDBCol>
                            {/* {this.renderEditQuizModalBox()} */}
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
        // console.log(pathname[2])
        this.props.dataStore.setCurrModId(pathname[2]);
    }

    render() {
        if (this.state.status === "retrieving")
            return this.renderAwaiting();
        else if (this.state.status === "error")
            return this.renderTableWithMessage("Error in Retrieving Grade Item. Please try again later.");
        else if (this.state.status === "done")
            return this.renderGradebookTable();
        else
            return this.renderTableWithMessage("No quizzes found.");
    }
}
export default styled(ModuleGradebookPageStudent)`
.module-content{
    margin-left: 270px;
    margin-top: 40px;
}
.align-right{
    float: right;
}
`;

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
class ModuleQuizPageViewStudents extends Component {

    state = {
        modal1: false,
        modal2: false,
        moduleId: 0,
        quizId: 0,
        name: "",
        openingDate: "",
        closingDate: "",
        quizStatus: "",
        columns: [
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
                "label": "Score",
                "field": "score",
                "width": 100
            },
            {
                "label": "View Answers",
                "field": "view",
                "width": 100
            }
        ],
        rows: [{ label: "Retrieving data..." }],
        // status: "retrieving",
        status: "done",
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

    toggle = (nr, row) => {
        let modalNumber = "modal" + nr;
        this.setState({
            [modalNumber]: !this.state[modalNumber]
        });

        if (row !== undefined) {
            // this.updateQuizState(row);
        }
    };

    renderQuizStudentsTable = (tableData) => {
        return (
            <div className={this.props.className}>
                <ModuleSideNavigation moduleId={this.props.match.params.moduleId}></ModuleSideNavigation>
                <div className="module-content">
                    <MDBContainer className="mt-3">
                        <MDBRow style={{ paddingTop: 60 }}>
                            <MDBCol md="12">
                                <h2 className="font-weight-bold">
                                    <a href={`/modules/${this.props.match.params.moduleId}/quiz`}>Quiz</a>
                                    <MDBIcon icon="angle-right" className="ml-4 mr-4" /> Quiz #
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
                                    <a href={`/modules/${this.props.match.params.moduleId}/quiz`}>Quiz</a>
                                    <MDBIcon icon="angle-right" className="ml-4 mr-4" /> Quiz #
                                </h2>
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
        var pathname = location.pathname;
        pathname = pathname.split("/");
        this.setState({ quizId: pathname[4] })
        this.props.dataStore.setCurrQuizId(pathname[4])
    }

    render() {
        var moduleId = this.props.dataStore.getCurrModId;
        var quizId = this.props.dataStore.getCurrQuizId;
        var newRows = [{
            name: "Rachel",
            score: "Unmarked",
            viewButton: <center><MDBBtn color="primary" outline size="sm" href={`/modules/${moduleId}/quiz/${quizId}/review/:studentId`}>Review</MDBBtn></center>
        },
        {
            name: "Dave",
            score: "Unmarked",
            viewButton: <center><MDBBtn color="primary" outline size="sm" href={`/modules/${moduleId}/quiz/${quizId}/review/:studentId`}>Review</MDBBtn></center>
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
        //             <MDBCol md={6}><MDBIcon onClick={() => this.toggle(2, row[i])} style={{ cursor: "pointer", textShadow: "1px 0px 1px #000000" }} icon="edit" /></MDBCol>
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
        return this.renderTableWithMessage("No students' attempts found.");
    }
}

export default styled(ModuleQuizPageViewStudents)`
.module-content{
    margin-left: 270px;
    margin-top: 40px;
}
`;

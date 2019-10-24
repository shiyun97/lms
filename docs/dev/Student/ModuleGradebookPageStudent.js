import React, { Component } from "react";
import styled from 'styled-components';
import { MDBContainer, MDBRow, MDBCol, MDBCardBody, MDBCard, MDBDataTable } from "mdbreact";
import ModuleSideNavigation from "../ModuleSideNavigation";
import axios from 'axios';
import { observer, inject } from 'mobx-react';

@inject('dataStore')
@observer
class ModuleGradebookPageStudent extends Component {

    state = {
        modal1: false,
        modal2: false,
        moduleId: 0,
        quizId: 0,
        gradeItems: [],
        columns: [
            {
                "label": "Grade Item",
                "field": "gradeItem",
                "width": 50,
                "attributes": {
                    "aria-controls": "DataTable",
                    "aria-label": "Name"
                }
            },
            {
                "label": "Description",
                "field": "description",
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
                "label": "Max Marks",
                "field": "maxMarks",
                "width": 200
            },
            {
                "label": "Remarks",
                "field": "remarks",
                "width": 100
            }
        ],
        rows: [{ label: "Retrieving data..." }],
        status: "retrieving",
    }

    componentDidMount() {
        this.initPage();
        this.getAllGrades();
    }

    getAllGrades = () => {
        let userId = localStorage.getItem('userId');
        let moduleId = this.props.dataStore.getCurrModId;
        axios
            .get(` http://localhost:8080/LMS-war/webresources/Assessment/retrieveStudentGrades?moduleId=${moduleId}&userId=${userId}`)
            .then(result => {
                // console.log(result.data.gradeItems)
                this.setState({ status: "done", gradeItems: result.data.gradeItems })
            })
            .catch(error => {
                this.setState({ status: "error", label: error.response.data.errorMessage })
                console.error("error in axios " + error);
            });
    }

    renderGradebookTable = () => {
        var gradeItem = this.state.gradeItems;
        var moduleId = this.props.dataStore.getCurrModId;
        // console.log(gradeItem)
        if (this.state.gradeItems.length !== 0) {
            var tempGradeItems = []
            for (let i = 0; i < this.state.gradeItems.length; i++) {
                tempGradeItems.push({
                    gradeItem: gradeItem[i].title,
                    description: gradeItem[i].description,
                    score: gradeItem[i].gradeEntries[0].marks === null ? "-" : gradeItem[i].gradeEntries[0].marks,
                    maxMarks: gradeItem[i].maxMarks,
                    remarks: gradeItem[i].gradeEntries[0].remarks === null ? "-" : gradeItem[i].gradeEntries[0].remarks
                })
            }
        } else {
            var tempGradeItems = [{ label: "No grade items found." }];
        }

        const data = () => ({ columns: this.state.columns, rows: tempGradeItems })
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
                    </MDBContainer>
                </div>
            </div>
        )
    }

    renderTableWithMessage = () => {
        var moduleId = this.props.dataStore.getCurrModId;
        const data = () => ({ columns: this.state.columns, rows: [{ label: this.state.label }] })

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
            return this.renderTableWithMessage();
        else if (this.state.status === "done")
            return this.renderGradebookTable();
        else
            return this.renderTableWithMessage();
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

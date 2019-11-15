import React, { Component } from "react";
import styled from 'styled-components';
import { MDBContainer, MDBRow, MDBCol, MDBIcon, MDBBtn, MDBCardBody, MDBCard, MDBDataTable, MDBModal, MDBModalBody, MDBModalFooter, MDBModalHeader } from "mdbreact";
import ModuleSideNavigation from "../ModuleSideNavigation";
import { Snackbar } from '@material-ui/core';
import axios from 'axios';
import { observer, inject } from 'mobx-react';

@inject('dataStore')
@observer
class ModuleGradebookPageTeacherViewGrades extends Component {

    state = {
        modal1: false,
        moduleId: 0,
        quizId: 0,
        name: "",
        gradeEntryId: 0,
        marks: 0,
        remarks: "",
        gradeEntries: [],
        columns: [
            {
                "label": "Student Name",
                "field": "name",
                "width": 50,
                "attributes": {
                    "aria-controls": "DataTable",
                    "aria-label": "Name"
                }
            },
            {
                "label": "Grade Entry ID",
                "field": "gradeEntryId",
                "width": 150,
            },
            {
                "label": "Score",
                "field": "score",
                "width": 150,
            },
            {
                "label": "Remarks",
                "field": "remarks",
                "width": 200
            },
            {
                "label": "",
                "field": "editGradeButton",
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
        this.getGradeItemEntries();
    }

    componentDidUpdate() {
        if (this.state.recallGradebook) {
            this.getGradeItemEntries();
        }
    }

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ openSnackbar: false });
    };

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
            this.setState({
                gradeEntryId: row.gradeEntryId,
                marks: row.marks === null ? 0 : row.marks,
                remarks: row.remarks === null ? "" : row.remarks
            })
        }
    };

    getGradeItemEntries = () => {
        let userId = sessionStorage.getItem('userId');
        let gradeItemId = this.props.dataStore.getCurrGradeItemId;
        axios
            .get(`http://localhost:8080/LMS-war/webresources/Assessment/retrieveGradeEntries?userId=${userId}&gradeItemId=${gradeItemId}`)
            .then(result => {
                // console.log(result.data.gradeEntries)
                this.setState({ status: "done", gradeEntries: result.data.gradeEntries, recallGradebook: false })
            })
            .catch(error => {
                this.setState({ status: "error" })
                console.error("error in axios " + error);
            });
    }

    updateGrades = () => {
        let userId = sessionStorage.getItem('userId');
        // console.log({gradeEntryId: this.state.gradeEntryId,
        //     marks: this.state.marks,
        //     remarks: this.state.remarks})
        axios
            .post(`http://localhost:8080/LMS-war/webresources/Assessment/enterGradeMarks?userId=${userId}`, {
                gradeEntryId: this.state.gradeEntryId,
                marks: this.state.marks,
                remarks: this.state.remarks
            })
            .then(result => {
                this.setState({
                    recallGradebook: true,
                    message: "Grade entry updated successfully!",
                    openSnackbar: true
                });
            })
            .catch(error => {
                this.setState({
                    message: error.response.data.errorMessage,
                    openSnackbar: true
                });
                console.error("error in axios " + error);
            });
        this.toggle(1);
    }

    renderUpdateGradeEntryModalBox = () => {
        return (
            <MDBModal isOpen={this.state.modal1} toggle={() => this.toggle(1)}>
                <MDBModalHeader
                    className="text-center"
                    titleClass="w-100 font-weight-bold"
                    toggle={() => this.toggle(1)}
                >
                    Update Grade Entry
                        </MDBModalHeader>
                <MDBModalBody>
                    <form className="mx-3 grey-text">
                        <MDBRow>
                            <MDBCol md="12" className="mt-4">
                                <label className="grey-text mt-4">
                                    Marks
                </label>
                                <input type="number" className="form-control" name="marks"
                                    value={this.state.marks}
                                    onChange={this.handleChange}
                                    min={0}
                                    required />
                            </MDBCol>
                            <MDBCol md="12" className="mt-4">
                                <label className="grey-text mt-4">
                                    Remarks
                </label>
                                <textarea rows="3" type="text" name="remarks" onChange={this.handleChange} value={this.state.remarks} className="form-control" />
                            </MDBCol>
                        </MDBRow>
                    </form>
                </MDBModalBody>
                <MDBModalFooter className="justify-content-center">
                    <MDBRow>
                        <MDBCol md="6">
                            <MDBBtn onClick={() => this.toggle(1)} color="grey">Cancel</MDBBtn>
                        </MDBCol>
                        <MDBCol md="6">
                            <MDBBtn onClick={() => this.updateGrades()} color="primary">Update</MDBBtn>
                        </MDBCol>
                    </MDBRow>
                </MDBModalFooter>
            </MDBModal>
        )
    }

    renderGradebookTable = () => {
        var item = this.state.gradeEntries;
        var moduleId = this.props.dataStore.getCurrModId;
        if (this.state.gradeEntries.length !== 0) {
            var tempgradeEntries = []
            for (let i = 0; i < this.state.gradeEntries.length; i++) {
                tempgradeEntries.push({
                    studentName: item[i].student.firstName + " " + item[i].student.lastName,
                    gradeEntryId: item[i].gradeEntryId,
                    score: item[i].marks === null ? "-" : item[i].marks.toFixed(1),
                    remarks: item[i].remarks === null ? "-" : item[i].remarks,
                    viewButton: <center><MDBIcon onClick={() => this.toggle(1, item[i])} style={{ cursor: "pointer", textShadow: "1px 0px 1px #000000" }} icon="edit" /></center>
                })
            }
        } else {
            var tempgradeEntries = [{ label: "No grade items found." }];
        }

        const data = () => ({ columns: this.state.columns, rows: tempgradeEntries })

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
                <ModuleSideNavigation moduleId={moduleId}></ModuleSideNavigation>
                <div className="module-content">
                    <MDBContainer className="mt-3">
                        <MDBRow style={{ paddingTop: 60 }}>
                            <MDBCol md="8">
                                <h2 className="font-weight-bold">
                                    <a href={`/modules/${moduleId}/gradebook`}>Gradebook</a>
                                    <MDBIcon icon="angle-right" className="ml-4 mr-4" /> Grade Item
                </h2>
                            </MDBCol>
                            <MDBCol md="4" align="right">
                            </MDBCol>
                        </MDBRow>
                        {this.renderUpdateGradeEntryModalBox()}
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
                                    <a href={`/modules/${moduleId}/gradebook`}>Gradebook</a>
                                    <MDBIcon icon="angle-right" className="ml-4 mr-4" /> Grade Item
                </h2>
                            </MDBCol>
                            <MDBCol md="4" align="right">
                            </MDBCol>
                            {this.renderUpdateGradeEntryModalBox()}
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
        this.props.dataStore.setCurrModId(pathname[2]);
        this.props.dataStore.setCurrGradeItemId(pathname[4]);
    }

    render() {
        if (this.state.status === "retrieving")
            return this.renderAwaiting();
        else if (this.state.status === "error")
            return this.renderTableWithMessage("Error in Retrieving Grade Item. Please try again later.");
        else if (this.state.status === "done")
            return this.renderGradebookTable();
        else
            return this.renderTableWithMessage("No grade item found.");
    }
}
export default styled(ModuleGradebookPageTeacherViewGrades)`
.module-content{
    margin-left: 270px;
    margin-top: 40px;
}
.align-right{
    float: right;
}
`;

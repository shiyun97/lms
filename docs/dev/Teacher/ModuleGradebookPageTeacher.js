import React, { Component } from "react";
import styled from 'styled-components';
import { MDBContainer, MDBRow, MDBCol, MDBIcon, MDBBtn, MDBCardBody, MDBCard, MDBDataTable, MDBModal, MDBModalBody, MDBModalFooter, MDBModalHeader } from "mdbreact";
import ModuleSideNavigation from "../ModuleSideNavigation";
import { Snackbar } from '@material-ui/core';
import axios from 'axios';
import { observer, inject } from 'mobx-react';

@inject('dataStore')
@observer
class ModuleGradebookPageTeacher extends Component {

    state = {
        modal1: false,
        modal2: false,
        modal3: false,
        moduleId: 0,
        quizId: 0,
        maxMarks: 0,
        description: "",
        gradeItemId: 0,
        title: "",
        gradeItems: [],
        columns: [
            {
                "label": "Grade Item",
                "field": "gradeItem",
                "width": 150,
                "attributes": {
                    "aria-controls": "DataTable",
                    "aria-label": "Name"
                }
            },
            {
                "label": "Grade Item ID",
                "field": "gradeItemId",
                "width": 150,
            },
            {
                "label": "Description",
                "field": "description",
                "width": 150,
            },
            {
                "label": "Max Marks",
                "field": "maxMarks",
                "width": 150,
            },
            {
                "label": "",
                "field": "buttons",
                "width": 150,
            },
            {
                "label": "View Grades",
                "field": "viewGrades",
                "width": 150,
            },
            {
                "label": "Publish Grades",
                "field": "publishGrades",
                "width": 150,
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
        this.getAllGradeItem();
    }

    componentDidUpdate() {
        if (this.state.recallGradebook) {
            this.getAllGradeItem();
        }
    }

    handleChange = event => {
        event.preventDefault();
        this.setState({ [event.target.name]: event.target.value });
    }

    toggle = (nr, row) => {
        let modalNumber = "modal" + nr;
        console.log("toggle")
        this.setState({
            [modalNumber]: !this.state[modalNumber]
        });

        if (row !== undefined) {
            this.setState({
                title: row.title,
                maxMarks: row.maxMarks,
                description: row.description,
                gradeItemId: row.gradeItemId
            })
        }
    };
    
    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ openSnackbar: false });
    };

    createGradeItem = () => {
        let userId = localStorage.getItem('userId');
        let moduleId = this.props.dataStore.getCurrModId;
        axios
            .post(`http://localhost:8080/LMS-war/webresources/Assessment/createGradeItem?userId=${userId}`, {
                title: this.state.title,
                description: this.state.description,
                maxMarks: this.state.maxMarks,
                moduleId: moduleId
            })
            .then(result => {
                this.setState({
                    recallGradebook: true,
                    message: "Grade item created successfully!",
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

    createQuizGradeItem = (quizId) => {
        let userId = localStorage.getItem('userId');
        let moduleId = this.props.dataStore.getCurrModId;
        axios
            .post(`http://localhost:8080/LMS-war/webresources/Assessment/createGradeItemFromQuiz?userId=${userId}&quizId=${quizId}`, {
                title: this.state.title,
                description: this.state.description,
                maxMarks: this.state.maxMarks,
                moduleId: moduleId
            })
            .then(result => {
                this.setState({
                    recallGradebook: true,
                    message: "Quiz grade item created successfully!",
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
        this.toggle(3);
    }

    updateGradeItem = () => {
        let userId = localStorage.getItem('userId');
        axios
            .post(`http://localhost:8080/LMS-war/webresources/Assessment/updateGradeItem?userId=${userId}`, {
                gradeItemId: this.state.gradeItemId,
                title: this.state.title,
                description: this.state.description,
                maxMarks: this.state.maxMarks
            })
            .then(result => {
                this.setState({
                    recallGradebook: true,
                    message: "Grade item updated successfully!",
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
        this.toggle(2);
    }

    unpublishGrade = (gradeItemId) => {
        let userId = localStorage.getItem('userId');
        axios
            .post(`http://localhost:8080/LMS-war/webresources/Assessment/unpublishGrade?userId=${userId}&gradeItemId=${gradeItemId}`, {})
            .then(result => {
                this.setState({
                    recallGradebook: true,
                    message: "Grade item unpublished successfully!",
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
    }

    publishGrade = (gradeItemId) => {
        let userId = localStorage.getItem('userId');
        axios
            .post(`http://localhost:8080/LMS-war/webresources/Assessment/publishGrade?userId=${userId}&gradeItemId=${gradeItemId}`, {})
            .then(result => {
                this.setState({
                    recallGradebook: true,
                    message: "Grade item published successfully!",
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
    }

    renderCreateGradeItemModalBox = () => {
        return (
            <MDBModal isOpen={this.state.modal1} toggle={() => this.toggle(1)}>
                <MDBModalHeader
                    className="text-center"
                    titleClass="w-100 font-weight-bold"
                    toggle={() => this.toggle(1)}
                >
                    Create Grade Item
                        </MDBModalHeader>
                <MDBModalBody>
                    <form className="mx-3 grey-text">
                        <MDBRow>
                            <MDBCol md="12" className="mt-4">
                                <label className="grey-text mt-4">
                                    Grade Item
                </label>
                                <input type="text" name="title" onChange={this.handleChange} className="form-control" />
                            </MDBCol>
                            <MDBCol md="12" className="mt-4">
                                <label className="grey-text mt-4">
                                    Description
                </label>
                                <textarea rows="3" type="text" name="description" onChange={this.handleChange} className="form-control" />
                            </MDBCol>
                            <MDBCol md="12" className="mt-4">
                                <label className="grey-text mt-4">
                                    Max Marks
                </label>
                                <input type="number" className="form-control" name="maxMarks"
                                    onChange={this.handleChange}
                                    min={1}
                                    required />
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
                            <MDBBtn onClick={() => this.createGradeItem()} color="primary">Create</MDBBtn>
                        </MDBCol>
                    </MDBRow>
                </MDBModalFooter>
            </MDBModal>
        )
    }

    renderCreateQuizGradeItemModalBox = () => {
        return (
            <MDBModal isOpen={this.state.modal3} toggle={() => this.toggle(3)}>
                <MDBModalHeader
                    className="text-center"
                    titleClass="w-100 font-weight-bold"
                    toggle={() => this.toggle(3)}
                >
                    Create Grade Item From Quiz
                        </MDBModalHeader>
                <MDBModalBody>
                    <form className="mx-3 grey-text">
                        <MDBRow>
                            <MDBCol md="6" className="mt-4">
                                <label className="grey-text mt-4">
                                    Quiz ID
                </label>
                                <input type="text" name="quizId" onChange={this.handleChange} className="form-control" />
                            </MDBCol>
                            <MDBCol md="6" className="mt-4">
                                <label className="grey-text mt-4">
                                    Grade Item
                </label>
                                <input type="text" name="title" onChange={this.handleChange} className="form-control" />
                            </MDBCol>
                            <MDBCol md="12" className="mt-4">
                                <label className="grey-text mt-4">
                                    Description
                </label>
                                <textarea rows="3" type="text" name="description" onChange={this.handleChange} className="form-control" />
                            </MDBCol>
                            <MDBCol md="12" className="mt-4">
                                <label className="grey-text mt-4">
                                    Max Marks
                </label>
                                <input type="number" className="form-control" name="maxMarks"
                                    onChange={this.handleChange}
                                    min={1}
                                    required />
                            </MDBCol>
                        </MDBRow>
                    </form>
                </MDBModalBody>
                <MDBModalFooter className="justify-content-center">
                    <MDBRow>
                        <MDBCol md="6">
                            <MDBBtn onClick={() => this.toggle(3)} color="grey">Cancel</MDBBtn>
                        </MDBCol>
                        <MDBCol md="6">
                            <MDBBtn onClick={() => this.createQuizGradeItem(this.state.quizId)} color="primary">Create</MDBBtn>
                        </MDBCol>
                    </MDBRow>
                </MDBModalFooter>
            </MDBModal>
        )
    }

    renderEditGradeItemModalBox = () => {
        return (
            <MDBModal isOpen={this.state.modal2} toggle={() => this.toggle(2)}>
                <MDBModalHeader
                    className="text-center"
                    titleClass="w-100 font-weight-bold"
                    toggle={() => this.toggle(2)}
                >
                    Edit Grade Item
                        </MDBModalHeader>
                <MDBModalBody>
                    <form className="mx-3 grey-text">
                        <MDBRow>
                            <MDBCol md="12" className="mt-4">
                                <label className="grey-text mt-4">
                                    Grade Item
                </label>
                                <input type="text" name="title" onChange={this.handleChange} defaultValue={this.state.title} className="form-control" />
                            </MDBCol>
                            <MDBCol md="12" className="mt-4">
                                <label className="grey-text mt-4">
                                    Description
                </label>
                                <textarea rows="3" type="text" name="description" onChange={this.handleChange} value={this.state.description} className="form-control" />
                            </MDBCol>
                            <MDBCol md="12" className="mt-4">
                                <label className="grey-text mt-4">
                                    Max Marks
                </label>
                                <input type="number" className="form-control" name="maxMarks"
                                    value={this.state.maxMarks}
                                    onChange={this.handleChange}
                                    min={1}
                                    required />
                            </MDBCol>
                        </MDBRow>
                    </form>
                </MDBModalBody>
                <MDBModalFooter className="justify-content-center">
                    <MDBRow>
                        <MDBCol md="6">
                            <MDBBtn onClick={() => this.toggle(2)} color="grey">Cancel</MDBBtn>
                        </MDBCol>
                        <MDBCol md="6">
                            <MDBBtn onClick={() => this.updateGradeItem()} color="primary">Update</MDBBtn>
                        </MDBCol>
                    </MDBRow>
                </MDBModalFooter>
            </MDBModal>
        )
    }

    getAllGradeItem = () => {
        let userId = localStorage.getItem('userId');
        let moduleId = this.props.dataStore.getCurrModId;
        axios
            .get(`http://localhost:8080/LMS-war/webresources/Assessment/retrieveGradeItems/${moduleId}?userId=${userId}`)
            .then(result => {
                // console.log(result.data.gradeItems)
                this.setState({ status: "done", gradeItems: result.data.gradeItems, recallGradebook: false })
            })
            .catch(error => {
                this.setState({ status: "error", label: error.response.data.errorMessage })
                console.error("error in axios " + error);
            });
    }

    deleteGradeItem = (gradeItemId) => {
        let userId = localStorage.getItem('userId');
        event.preventDefault();
        axios
            .delete(`http://localhost:8080/LMS-war/webresources/Assessment/deleteGradeItem?gradeItemId=${gradeItemId}&userId=${userId}`)
            .then(result => {
                this.setState({
                    recallGradebook: true,
                    message: "Grade item deleted successfully!",
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
    }

    renderGradebookTable = () => {
        var item = this.state.gradeItems;
        var moduleId = this.props.dataStore.getCurrModId;
        // console.log(quiz)
        if (this.state.gradeItems.length !== 0) {
            var tempGradeItems = []
            for (let i = 0; i < this.state.gradeItems.length; i++) {
                tempGradeItems.push({
                    gradeItem: item[i].title,
                    gradeItemId: item[i].gradeItemId,
                    description: item[i].description,
                    maxMarks: item[i].maxMarks,
                    editButton: <MDBRow align="center">
                        <MDBCol md={6}><MDBIcon onClick={() => this.toggle(2, item[i])} style={{ cursor: "pointer", textShadow: "1px 0px 1px #000000" }} icon="edit" /></MDBCol>
                        <MDBCol md={6}><MDBIcon onClick={() => this.deleteGradeItem(item[i].gradeItemId)} style={{ cursor: "pointer", textShadow: "1px 0px 1px #000000" }} icon="trash" /></MDBCol>
                    </MDBRow>,
                    viewButton: <center><MDBBtn color="primary" outline size="sm" href={`/modules/${moduleId}/gradebook/${item[i].gradeItemId}/viewGrades`}>View Grades</MDBBtn></center>,
                    publishGrades: <center> {
                        item[i].publish ?
                            <MDBBtn color="grey" outline size="sm" onClick={() => this.unpublishGrade(item[i].gradeItemId)}>Unpublish</MDBBtn> :
                            <MDBBtn color="primary" outline size="sm" onClick={() => this.publishGrade(item[i].gradeItemId)}>Publish</MDBBtn>
                    }</center>
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
                            <MDBCol md="4">
                                <h2 className="font-weight-bold">
                                    Gradebook
                </h2>
                            </MDBCol>
                            <MDBCol md="8" align="right">
                                <MDBBtn color="primary" onClick={() => this.toggle(1)}>Create Grade Item</MDBBtn>
                                <MDBBtn color="primary" onClick={() => this.toggle(3)}>Create Quiz Grade Item</MDBBtn>
                            </MDBCol>
                        </MDBRow>
                        {this.renderCreateQuizGradeItemModalBox()}
                        {this.renderCreateGradeItemModalBox()}
                        {this.renderEditGradeItemModalBox()}
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
                            <MDBCol md="4">
                                <h2 className="font-weight-bold">
                                    Gradebook
                </h2>
                            </MDBCol>
                            <MDBCol md="8" align="right">
                                <MDBBtn color="primary" onClick={() => this.toggle(1)}>Create Grade Item</MDBBtn>
                                <MDBBtn color="primary" onClick={() => this.toggle(3)}>Create Quiz Grade Item</MDBBtn>
                            </MDBCol>
                            {this.renderCreateQuizGradeItemModalBox()}
                            {this.renderCreateGradeItemModalBox()}
                            {this.renderEditGradeItemModalBox()}
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
export default styled(ModuleGradebookPageTeacher)`
.module-content{
    margin-left: 270px;
    margin-top: 40px;
}
.align-right{
    float: right;
}
`;

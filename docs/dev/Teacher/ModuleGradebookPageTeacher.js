import React, { Component } from "react";
import styled from 'styled-components';
import { MDBContainer, MDBRow, MDBCol, MDBIcon, MDBBtn, MDBCardBody, MDBCard, MDBEdgeHeader, MDBDataTable, MDBCardHeader, MDBModal, MDBModalBody, MDBModalFooter, MDBModalHeader, MDBInputGroup } from "mdbreact";
import ModuleSideNavigation from "../ModuleSideNavigation";
import ModuleSideNavigationDropdown from "../ModuleSideNavigationDropdown";
import { Snackbar } from '@material-ui/core';
import axios from 'axios';
import { observer, inject } from 'mobx-react';
import CanvasJSReact from '../../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

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
        gradeColumns: [
            {
                "label": "Student",
                "field": "student",
                "width": 50,
                "attributes": {
                    "aria-controls": "DataTable",
                    "aria-label": "Name"
                }
            },
            {
                "label": "Email",
                "field": "email",
                "width": 100
            },
            {
                "label": "",
                "field": "",
                "width": 100
            }
        ],
        gradeRows: [{ label: "Retrieving data..." }],
        selectedGradeRows: [],
        percentileStatus: "retrieving",
        message: "",
        status: "retrieving",
        openSnackbar: false,
        recallGradebook: false,
        ungradedQuizzes: [],
        type: "",
        currGradeItemId: 0,
        gradeItemList: [],
        recallGradeItems: false,

        gradeItemsAnalytics: [],
        gradeItemStatus: "retrieving",
        gradeItemMessage: "Gradebook Analytics is not available at the moment.",
    }

    componentDidMount() {
        this.initPage();
        this.getAllGradeItem();
        this.getUngradedModuleQuiz();
        this.getGradeItemAnalytics();
        this.getPercentileAnalytics();
    }

    componentDidUpdate() {
        if (this.state.recallGradebook) {
            this.getAllGradeItem();
            this.getUngradedModuleQuiz();
        }
        if (this.state.recallGradeItems) {
            this.getPercentileAnalytics();
        }
    }

    routeChange = (path) => {
        this.props.history.push(path);
    }

    handleChange = event => {
        event.preventDefault();
        this.setState({ [event.target.name]: event.target.value });
        if (event.target.name === "currGradeItemId") {
            this.state.gradeRows.map((item) => {
                if (item.gradeItemId == event.target.value) {
                    this.props.dataStore.setCurrGradeItemName(item.title)
                    this.setState({
                        selectedGradeRows: item.gradeEntries,
                        recallGradeItems: true
                    })
                }
            })
        }
    }

    toggle = (nr, row) => {
        let modalNumber = "modal" + nr;
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

    getPercentileAnalytics = () => {
        var moduleId = this.props.dataStore.getCurrModId;
        axios
            .get(`http://localhost:8080/LMS-war/webresources/analytics/retrieveBottomStudentsForEachItem?moduleId=${moduleId}`)
            .then(result => {
                var newGradeItemList = []
                result.data.gradeItems.map((item) => newGradeItemList.push({ itemId: item.gradeItemId, title: item.title }))
                this.setState({
                    gradeRows: result.data.gradeItems,
                    gradeItemList: newGradeItemList,
                    percentileStatus: "done",
                    recallGradeItems: false
                });
            })
            .catch(error => {
                this.setState({
                    percentileStatus: "error",
                    recallGradeItems: false
                });
                console.error("error in axios " + error);
            });
    }

    getGradeItemAnalytics = () => {
        let userId = sessionStorage.getItem('userId');
        var moduleId = this.props.dataStore.getCurrModId;
        axios
            .get(`http://localhost:8080/LMS-war/webresources/analytics/retrieveGradeItemAnalytics?userId=${userId}&moduleId=${moduleId}`)
            .then(result => {
                var temp = []
                var tempY = []
                if (result.data.items.length === 0) {
                    this.setState({ gradeItemStatus: "Empty Data" })
                } else {
                    result.data.items.map((item) => {
                        tempY[0] = item.min;
                        tempY[1] = item.twentyfifth;
                        tempY[2] = item.seventyfifth;
                        tempY[3] = item.max;
                        tempY[4] = item.median;

                        temp.push({
                            label: item.title,
                            y: tempY,
                            click: () => this.routeChange(`/modules/${moduleId}/gradebook/${item.gradeItemId}/viewGrades`)
                        })
                        tempY = []
                    })
                    this.setState({
                        gradeItemsAnalytics: temp,
                        gradeItemStatus: "done"
                    });
                }
            })
            .catch(error => {
                this.setState({
                    gradeItemStatus: "error",
                });
                console.error("error in axios " + error);
            });
    }

    getUngradedModuleQuiz = () => {
        let userId = sessionStorage.getItem('userId');
        let moduleId = this.props.dataStore.getCurrModId;
        axios
            .get(`http://localhost:8080/LMS-war/webresources/Assessment/retrieveModuleQuizNotInGradebook/${moduleId}?userId=${userId}`)
            .then(result => {
                this.setState({ ungradedQuizzes: result.data.quizzes });
            })
            .catch(error => {
                console.error("error in axios " + error);
            });
    }

    createGradeItem = () => {
        let userId = sessionStorage.getItem('userId');
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

    createQuizGradeItem = () => {
        let userId = sessionStorage.getItem('userId');
        let moduleId = this.props.dataStore.getCurrModId;
        var title = ""
        var description = ""
        var maxMarks = 0
        this.state.ungradedQuizzes.map((quiz) => {
            title = quiz.title;
            description = quiz.description;
            maxMarks = quiz.maxMarks;
        })

        axios
            .post(`http://localhost:8080/LMS-war/webresources/Assessment/createGradeItemFromQuiz?userId=${userId}&quizId=${this.state.quizId}&type=${this.state.type}`, {
                title: title,
                description: description,
                maxMarks: maxMarks,
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
        let userId = sessionStorage.getItem('userId');
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
        let userId = sessionStorage.getItem('userId');
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
        let userId = sessionStorage.getItem('userId');
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

    renderNoCardSection = () => {
        return (
            <MDBRow className="mb-4">
                <MDBCol md="12" className="mb-r">
                    <MDBCard>
                        <MDBCardHeader>Gradebook Analytics</MDBCardHeader>
                        <MDBCardBody>
                            {this.state.gradeItemMessage}
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        )
    }

    renderBoxPlot = (data) => {
        return (
            <MDBRow className="mb-4">
                <MDBCol md="12">
                    <MDBCard>
                        <MDBCardBody>
                            <CanvasJSChart options={data} />
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        )
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
                            <MDBCol md="12" className="mt-4">
                                <MDBInputGroup
                                    style={{ paddingTop: 22 }}
                                    containerClassName="mb-3"
                                    prepend="Quiz ID"
                                    required
                                    inputs={
                                        <select name="quizId" onChange={this.handleChange} className="browser-default custom-select">
                                            <option value={0}>Choose..</option>
                                            {this.state.ungradedQuizzes.map((quiz) => { return <option value={quiz.quizId}>{quiz.title}</option> })}
                                        </select>
                                    }
                                />
                            </MDBCol>
                            <MDBCol md="12" className="mt-4">
                                <MDBInputGroup
                                    style={{ paddingTop: 22 }}
                                    containerClassName="mb-3"
                                    prepend="Pick Score Type"
                                    required
                                    inputs={
                                        <select name="type" onChange={this.handleChange} className="browser-default custom-select">
                                            <option value="">Choose..</option>
                                            <option value="best">Best attempt score</option>
                                            <option value="first">First attempt score</option>
                                            <option value="last">Last attempt score</option>
                                        </select>
                                    }
                                />
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
                            <MDBBtn onClick={() => this.createQuizGradeItem()} color="primary">Create</MDBBtn>
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
        let userId = sessionStorage.getItem('userId');
        let moduleId = this.props.dataStore.getCurrModId;
        axios
            .get(`http://localhost:8080/LMS-war/webresources/Assessment/retrieveGradeItems/${moduleId}?userId=${userId}`)
            .then(result => {
                // console.log(result.data.gradeItems)
                this.setState({ status: "done", gradeItems: result.data.gradeItems, recallGradebook: false })
            })
            .catch(error => {
                if (error.response.data.errorMessage === "No grade items yet for this module")
                    this.setState({ status: "error", label: "No grade entries found." })
                else
                    this.setState({ status: "error", label: error.response.data.errorMessage })
                console.error("error in axios " + error);
            });
    }

    deleteGradeItem = (gradeItemId) => {
        let userId = sessionStorage.getItem('userId');
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
        const optionsGradebook = {
            animationEnabled: true,
            exportEnabled: true,
            theme: "light2", // "light1", "light2", "dark1", "dark2"
            title: {
                text: "Gradebook Analytics",
                fontSize: 25
            },
            subtitles: [{
                text: "Overall Scores",
                fontSize: 15
            }],
            axisY: {
                title: "Scores",
                includeZero: true,
                tickLength: 0,
            },
            data: [{
                type: "boxAndWhisker",
                whiskerColor: "#C0504E",
                toolTipContent: "<span style=\"color:#6D78AD\">{label}:</span> <br><b>Maximum:</b> {y[3]},<br><b>Q3:</b> {y[2]},<br><b>Median:</b> {y[4]}<br><b>Q1:</b> {y[1]}<br><b>Minimum:</b> {y[0]}<br>Click to review grade entries for grade item.",
                yValueFormatString: "0.0",
                dataPoints: this.state.gradeItemsAnalytics
            }]
        }
        var item = this.state.gradeItems;
        var moduleId = this.props.dataStore.getCurrModId;
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
                <div className="module-sidebar-large"><ModuleSideNavigation moduleId={moduleId}></ModuleSideNavigation></div>
                <div className="module-navbar-small">
                    <ModuleSideNavigationDropdown moduleId={moduleId} activeTab={'Gradebook'}></ModuleSideNavigationDropdown>
                </div>
                <div className="module-content">
                    <MDBEdgeHeader color="indigo darken-3" className="multimediaPage" />
                    <MDBContainer className="mt-3">
                        <MDBRow>
                            {/* desktop view */}
                            <MDBCol md="4" className="module-sidebar-large">
                                <h2 className="font-weight-bold">
                                    Gradebook
                </h2>
                            </MDBCol>
                            <MDBCol md="8" align="right" className="module-sidebar-large">
                                <MDBBtn color="primary" size="sm" onClick={() => this.toggle(1)}>Create Grade Item</MDBBtn>
                                <MDBBtn color="primary" size="sm" onClick={() => this.toggle(3)}>Create Quiz Grade Item</MDBBtn>
                            </MDBCol>
                            {/*  */}
                            {/* mobile view */}
                            <MDBCol md="4" className="module-navbar-small" align="center">
                                <h2 className="font-weight-bold">
                                    Gradebook
                </h2>
                            </MDBCol>
                            <MDBCol md="8" align="center" className="module-navbar-small">
                                <MDBBtn color="primary" size="sm" onClick={() => this.toggle(1)}>Create Grade Item</MDBBtn>
                                <MDBBtn color="primary" size="sm" onClick={() => this.toggle(3)}>Create Quiz Grade Item</MDBBtn>
                            </MDBCol>
                            {/*  */}
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
                            <MDBCol md="12" className="mt-3">
                                {this.state.gradeItemStatus === "done" ? this.renderBoxPlot(optionsGradebook) : this.renderNoCardSection()}
                            </MDBCol>
                            <MDBCol md="12">
                                <MDBCard>
                                    <MDBCardHeader>
                                        Students Below 25th Percentile
                                    </MDBCardHeader>
                                    <div style={{ paddingLeft: 20, paddingRight: 20 }}>
                                        <MDBInputGroup
                                            style={{ paddingTop: 22 }}
                                            containerClassName="mb-3"
                                            prepend="Grade Item"
                                            required
                                            inputs={
                                                <select name="currGradeItemId" onChange={this.handleChange} className="browser-default custom-select">
                                                    <option value={this.props.dataStore.getCurrGradeItemId}>Choose..</option>
                                                    {this.state.gradeItemList.map((item) => { return <option value={item.itemId}>{item.title}</option> })}
                                                </select>
                                            }
                                        />
                                    </div>
                                    {this.renderPercentileTable()}
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
                <div className="module-sidebar-large"><ModuleSideNavigation moduleId={moduleId}></ModuleSideNavigation></div>
                <div className="module-navbar-small">
                    <ModuleSideNavigationDropdown moduleId={moduleId} activeTab={'Gradebook'}></ModuleSideNavigationDropdown>
                </div>
                <div className="module-content">
                    <MDBEdgeHeader color="indigo darken-3" className="multimediaPage" />
                    <MDBContainer className="mt-3">
                        <MDBRow>
                            {/* desktop view */}
                            <MDBCol md="4" className="module-sidebar-large">
                                <h2 className="font-weight-bold">
                                    Gradebook
                </h2>
                            </MDBCol>
                            <MDBCol md="8" align="right" className="module-sidebar-large">
                                <MDBBtn color="primary" size="sm" onClick={() => this.toggle(1)}>Create Grade Item</MDBBtn>
                                <MDBBtn color="primary" size="sm" onClick={() => this.toggle(3)}>Create Quiz Grade Item</MDBBtn>
                            </MDBCol>
                            {/*  */}
                            {/* mobile view */}
                            <MDBCol md="4" className="module-navbar-small" align="center">
                                <h2 className="font-weight-bold">
                                    Gradebook
                </h2>
                            </MDBCol>
                            <MDBCol md="8" align="center" className="module-navbar-small">
                                <MDBBtn color="primary" size="sm" onClick={() => this.toggle(1)}>Create Grade Item</MDBBtn>
                                <MDBBtn color="primary" size="sm" onClick={() => this.toggle(3)}>Create Quiz Grade Item</MDBBtn>
                            </MDBCol>
                            {/*  */}
                        </MDBRow>
                        {this.renderCreateQuizGradeItemModalBox()}
                        {this.renderCreateGradeItemModalBox()}
                        {this.renderEditGradeItemModalBox()}
                        <MDBRow className="py-3">
                            <MDBCol md="12">
                                <MDBCard>
                                    <MDBCardBody>
                                        <MDBDataTable striped bordered hover scrollX scrollY maxHeight="400px" data={tableData} pagesAmount={4} />
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                            <MDBCol md="12" className="mt-3">
                                {this.renderNoCardSection()}
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
                <div className="module-sidebar-large"><ModuleSideNavigation moduleId={moduleId}></ModuleSideNavigation></div>
                <div className="module-navbar-small">
                    <ModuleSideNavigationDropdown moduleId={moduleId} activeTab={'Gradebook'}></ModuleSideNavigationDropdown>
                </div>
                <div className="module-content">
                    <MDBEdgeHeader color="indigo darken-3" className="multimediaPage" />
                    <MDBContainer className="mt-3">
                        <MDBRow align="center">
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

    renderUserPercentileTable = (tableData) => {
        return (
            <MDBCardBody>
                <MDBDataTable striped bordered hover scrollX scrollY maxHeight="400px" data={tableData} pagesAmount={4} />
            </MDBCardBody>
        )
    }

    renderPercentileTableWithMessage = (message) => {
        const data = () => ({ columns: this.state.gradeColumns, rows: [{ label: message }] })

        const tableData = {
            columns: [...data().columns.map(col => {
                col.width = 200;
                return col;
            })], rows: [...data().rows]
        }
        return (
            <MDBCardBody>
                <MDBDataTable striped bordered hover scrollX scrollY maxHeight="400px" data={tableData} pagesAmount={4} />
            </MDBCardBody>
        )
    }

    renderPercentileAwaiting = () => {
        return (
            <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        )
    }

    renderPercentileTable = () => {
        var newRows = []
        const row = this.state.selectedGradeRows
        for (let i = 0; i < row.length; i++) {
            newRows.push({
                user: row[i].student.firstName + " " + row[i].student.lastName,
                email: row[i].student.email,
                button: <center><MDBBtn color="primary" outline size="sm" href={`mailto:${row[i].student.email}`}>SEND EMAIL</MDBBtn></center>
            })
        }
        const data = () => ({ columns: this.state.gradeColumns, rows: newRows })

        const widerData = {
            columns: [...data().columns.map(col => {
                col.width = 150;
                return col;
            })], rows: [...data().rows.map(row => {
                return row;
            })]
        }

        if (this.state.percentileStatus === "retrieving")
            return this.renderPercentileAwaiting();
        else if (this.state.percentileStatus === "error")
            return this.renderPercentileTableWithMessage("Error in Retrieving Data. Please try again later.");
        else if (this.state.percentileStatus === "done")
            if (this.state.selectedGradeRows.length === 0)
                return this.renderPercentileTableWithMessage("No data found.");
            else
                return this.renderUserPercentileTable(widerData);
        else
            return this.renderPercentileTableWithMessage("No data found.");
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
    margin-top: 0px;
}
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

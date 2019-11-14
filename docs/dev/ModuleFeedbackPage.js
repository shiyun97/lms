import React, { Component } from "react";
import { observer, inject } from 'mobx-react';
import styled from 'styled-components';
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBModal,
    MDBModalBody,
    MDBModalFooter,
    MDBModalHeader,
    MDBBtn,
    MDBDataTable,
    MDBIcon,
    MDBEdgeHeader,
    MDBJumbotron
} from "mdbreact";
import ModuleSideNavigation from "./ModuleSideNavigation";
import ModuleSideNavigationDropdown from "./ModuleSideNavigationDropdown";
import axios from "axios";
import Snackbar from '@material-ui/core/Snackbar';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import { Dialog, Typography } from "@material-ui/core";
import * as Survey from "survey-react";
import "survey-react/survey.css";

const API_URL = "http://localhost:8080/LMS-war/webresources";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

@inject('dataStore')
@observer
class ModuleFeedbackPage extends Component {

    state = {
        accessRight: "",
        moduleId: "",
        modalViewFeedback: false,
        viewingFeedback: {
            title: "",
            content: ""
        },
        modalAddFeedback: false,
        addingFeedback: {
            title: "",
            content: ""
        },
        allFeedbacksTable: {
            columns: [
                {
                    label: "",
                    field: "index",
                    sort: "asc"
                },
                {
                    label: "Submitted Dt",
                    field: "createTs",
                    sort: "asc"
                },
                {
                    label: "",
                    field: "viewButton",
                    sort: "asc"
                }
            ],
            rows: []
        },
        surveyAttempts: {
            columns: [
                /*{
                    label: "",
                    field: "index",
                    sort: "asc",
                    width: 100
                },*/
                {
                    label: "Name",
                    field: "name",
                    sort: "asc",
                    width: 500
                },/*
                {
                    label: "",
                    field: "viewSurvey",
                    sort: "asc"
                }*/
            ],
            rows: []
        },
        message: "",
        openSnackbar: "",
        surveyAttemptToView: {
            elements: []
        },
        showSurveyAttemptDialog: false
    }

    handleOpenSnackbar = () => {
        this.setState({ openSnackbar: true });
    };

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ openSnackbar: false });
    };

    componentDidMount() {
        this.initPage();
    }

    async initPage() {
        let accessRight = sessionStorage.getItem("accessRight");
        let moduleId = this.props.match.params.moduleId;
        if (moduleId && accessRight) {
            // console.log(moduleId);
            this.setState({
                accessRight: accessRight,
                moduleId: moduleId
            })
            // if admin or prof
            await axios
                .get(API_URL + "/feedback/retrieveAllFeedbackForModule/" + moduleId)
                .then((result) => {
                    // console.log(result)
                    let data = result.data.feedbacks;
                    let arr = [];
                    let idx = 1;
                    const method = this.viewFeedback;
                    Object.keys(data).forEach(function (key) {
                        let temp = {
                            index: idx,
                            createTs: new Date(data[key].createTs).toLocaleString(),
                            viewButton: (<MDBBtn size="sm" color="primary" onClick={e => method(data[key].feedback)}>View</MDBBtn>)
                        }
                        arr.push(temp);
                        idx++;
                    });
                    this.setState({
                        allFeedbacksTable: {
                            ...this.state.allFeedbacksTable,
                            rows: arr
                        }
                    })
                })
                .catch(error => {
                    this.setState({
                        editMode: false,
                        //message: error.response.data.errorMessage,
                        //openSnackbar: true
                    })
                    console.error("error in axios " + error);
                });

            await axios
                .get(`${API_URL}/feedback/retrieveSurveyAttempts?userId=${sessionStorage.getItem('userId')}&moduleId=${moduleId}`)
                .then((result) => {
                    // console.log(result.data);
                    let data = result.data.surveyAttempts;
                    let arr = [];
                    let idx = 1;
                    const method = this.viewSurvey;
                    Object.keys(data).forEach(function (key) {
                        let temp = {
                            name: data[key].surveyTaker.firstName + " " + data[key].surveyTaker.lastName,
                            //viewSurvey: (<MDBBtn size="sm" color="primary" onClick={e => method(data[key])}>View</MDBBtn>)
                            clickEvent: () => method(data[key])
                        }
                        arr.push(temp);
                        idx++;
                    });
                    this.setState({
                        surveyAttempts: {
                            ...this.state.surveyAttempts,
                            rows: arr
                        }
                    })
                })
                .catch(error => {
                    this.setState({
                        editMode: false,
                        //message: error.response.data.errorMessage,
                        //openSnackbar: true
                    })
                    console.error("error in axios " + error);
                });


            /*axios
                .get("http://localhost:3001/moduleAdhocFeedback")
                .then(result => {
                    let data = result.data;
                    let arr = [];
                    let idx = 1;
                    const method = this.viewFeedback;
                    Object.keys(data).forEach(function (key) {
                        let temp = {
                            index: idx,
                            submittedDt: data[key].submittedDt,
                            title: data[key].title,
                            viewButton: (<MDBBtn color="primary" size="sm" onClick={e => method(data[key].title, data[key].content)}>View</MDBBtn>)
                        }
                        arr.push(temp);
                        idx++;
                    });
                    this.setState({
                        ...this.state,
                        submittedFeedbacksTable: {
                            ...this.state.submittedFeedbacksTable,
                            rows: arr
                        }
                    });
                })
                .catch(error => {
                    console.error("error in axios " + error);
                });*/
        }
    }

    toggle = nr => () => {
        let modalNumber = "modal" + nr;
        this.setState({
            [modalNumber]: !this.state[modalNumber]
        });
    };

    viewFeedback = (content) => {
        this.setState({
            ...this.state,
            modalViewFeedback: true,
            viewingFeedback: {
                content: content
            }
        });
    }

    viewSurvey = (survey) => {
        let questionAttemptList = survey.questionAttemptList;
        let surveyDisplayArr = []
        let answerDict = {}
        Object.keys(questionAttemptList).forEach(function (key) {
            let question = {
                answer: questionAttemptList[key].answer,
                choices: questionAttemptList[key].question.choices,
                number: questionAttemptList[key].question.number,
                questionId: questionAttemptList[key].question.questionId,
                title: questionAttemptList[key].question.title,
                type: questionAttemptList[key].question.type,
                name: JSON.stringify(questionAttemptList[key].question.title)
            }

            surveyDisplayArr.push(question);
            answerDict[JSON.stringify(questionAttemptList[key].question.title)] = questionAttemptList[key].answer
        })
        console.log()
        this.setState({
            surveyAttemptToView: {
                pages: [
                    {
                        elements: surveyDisplayArr
                    }
                ],
                mode: 'display',
                data: answerDict
            },
            showSurveyAttemptDialog: true
        })
    }

    newAdhocFeedback = () => {
        this.setState({
            ...this.state,
            modalAddFeedback: true
        })
    }

    inputChangeHandler = (e) => {
        e.preventDefault();
        if (e.target.name == "titleInput") {
            this.setState({
                ...this.state,
                addingFeedback: {
                    ...this.state.addingFeedback,
                    title: e.target.value
                }
            })
        }
        if (e.target.name == "contentInput") {
            this.setState({
                ...this.state,
                addingFeedback: {
                    ...this.state.addingFeedback,
                    content: e.target.value
                }
            });
        }
    }

    submitHandler = event => {
        event.preventDefault();
        event.target.className += " was-validated";
        let addingFeedback = this.state.addingFeedback;
        let newData = {
            moduleId: this.state.moduleId,
            userId: 2,
            feedback: addingFeedback.content
        }
        if (addingFeedback.content) {
            axios({
                method: 'post',
                url: "http://localhost:8080/LMS-war/webresources/feedback",
                data: JSON.stringify(newData),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(() => {
                    this.setState({
                        ...this.state,
                        modalAddFeedback: false,
                        addingFeedback: {
                            title: "",
                            content: ""
                        },
                        message: "Feedback submitted successfully!",
                        openSnackbar: true
                    });
                    return this.initPage();
                })
                .catch((error) => {
                    this.setState({
                        editMode: false,
                        message: error.response.data.errorMessage,
                        openSnackbar: true
                    })
                    console.error("error in axios " + error);
                })
        }
    }

    goToSemesterEvaluation = () => {
        this.props.dataStore.setPath(`/modules/${this.state.moduleId}/feedback/evaluation`);
        this.props.history.push(`/modules/${this.state.moduleId}/feedback/evaluation`);
    }

    handleCloseSurveyDialog = () => {
        this.setState({
            ...this.state,
            showSurveyAttemptDialog: false
        })
    }

    fullScreenSurveyDialog = () => {
        let surveyAttemptToView = this.state.surveyAttemptToView;
        console.log(surveyAttemptToView)
        var model = new Survey.Model(surveyAttemptToView);
        model.data = surveyAttemptToView.data;
        return (
            <div>
                <Dialog fullScreen open={this.state.showSurveyAttemptDialog} onClose={e => this.handleCloseSurveyDialog()} TransitionComponent={Transition}>
                    <AppBar style={{ position: 'relative' }}>
                        <Toolbar>
                            <IconButton edge="start" color="inherit" onClick={e => this.handleCloseSurveyDialog()} aria-label="close">
                                <MDBIcon icon="times" />
                            </IconButton>
                            <Typography variant="h6" style={{ color: "white", marginLeft: "10px", flex: "1" }}>

                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <Survey.Survey
                        model={model}
                    />
                    <div className="mb-4" />
                </Dialog>
            </div>
        )
    }

    render() {
        let feedbacks = this.state.allFeedbacksTable;
        let accessRight = "Student";
        return (
            <div className={this.props.className}>
                <div className="module-sidebar-large"><ModuleSideNavigation moduleId={this.props.match.params.moduleId}></ModuleSideNavigation></div>
                <div className="module-navbar-small">
                    <ModuleSideNavigationDropdown moduleId={this.props.match.params.moduleId} activeTab={'Feedback'}></ModuleSideNavigationDropdown>
                </div>
                <div className="module-content">
                    <MDBEdgeHeader color="indigo darken-3" className="discussionPage" />
                    <MDBContainer style={{ paddingBottom: 120 }}>
                        <MDBRow>
                            <MDBCol md="12" className="mt-3 mx-auto">
                                <MDBJumbotron>
                                    <MDBRow>
                                        <MDBCol>
                                            <MDBRow>
                                                <MDBCol>
                                                    <h2 className="font-weight-bold"> Feedback </h2>
                                                    <hr className="my-3" />
                                                    {
                                                        this.state.accessRight == "Student" &&
                                                        <MDBBtn className="ml-0 mb-5" size="md" color="primary" onClick={e => { this.newAdhocFeedback() }}>New Adhoc Feedback</MDBBtn>
                                                    }
                                                </MDBCol>
                                            </MDBRow>
                                            {
                                                this.state.accessRight == "Teacher" &&
                                                <MDBRow>
                                                    <MDBCol>
                                                        <h5>All Submitted Feedback</h5>
                                                        <div className="mb-3"></div>
                                                    </MDBCol>
                                                </MDBRow>
                                            }
                                            {
                                                this.state.accessRight == "Teacher" && feedbacks.rows.length > 0 &&
                                                <MDBDataTable striped bordered hover searching={false} paging={true} data={feedbacks} />
                                            }
                                            {
                                                this.state.accessRight == "Teacher" && feedbacks.rows.length == 0 &&
                                                <div className="mt-3">No feedback submitted</div>
                                            }
                                            <MDBModal
                                                backdrop={true}
                                                isOpen={this.state.modalViewFeedback}
                                                toggle={this.toggle("ViewFeedback")}
                                            >
                                                <MDBModalHeader toggle={this.toggle("ViewFeedback")}>{this.state.viewingFeedback.title}</MDBModalHeader>
                                                <MDBModalBody>
                                                    {this.state.viewingFeedback.content}
                                                </MDBModalBody>
                                                <MDBModalFooter>
                                                    <MDBBtn color="secondary" onClick={this.toggle("ViewFeedback")}>
                                                        Close
                                        </MDBBtn>
                                                </MDBModalFooter>
                                            </MDBModal>

                                            <MDBModal
                                                backdrop={true}
                                                isOpen={this.state.modalAddFeedback}
                                                toggle={this.toggle("AddFeedback")}
                                            >
                                                <MDBModalHeader toggle={this.toggle("AddFeedback")}>Create New Feedback</MDBModalHeader>
                                                <form className="needs-validation" noValidate onSubmit={this.submitHandler}>
                                                    <MDBModalBody>
                                                        {/*<div className="form-row align-items-center">
                                                        <div className="col-12">
                                                            <label>Title</label>
                                                        </div>

                                                        <div className="col-12">
                                                            <input type="text" className="form-control mb-2" 
                                                                name="titleInput"
                                                                onChange={this.inputChangeHandler}
                                                                value={this.state.addingFeedback.title}
                                                                required />
                                                        </div>
                                                    </div>*/}
                                                        <div className="form-row align-items-center">
                                                            <div className="col-12">
                                                                <label>Feedback</label>
                                                            </div>
                                                            <div className="col-12">
                                                                <textarea type="text" className="form-control mb-2"
                                                                    name="contentInput"
                                                                    onChange={this.inputChangeHandler}
                                                                    value={this.state.addingFeedback.content}
                                                                    rows={5}
                                                                    required />
                                                            </div>
                                                        </div>
                                                    </MDBModalBody>
                                                    <MDBModalFooter>
                                                        <MDBBtn color="secondary" onClick={this.toggle("AddFeedback")}>
                                                            Cancel
                                                </MDBBtn>
                                                        <MDBBtn color="primary" type="submit">Submit</MDBBtn>
                                                    </MDBModalFooter>
                                                </form>
                                            </MDBModal>
                                            {
                                                this.state.accessRight == "Student" &&
                                                <MDBRow>
                                                    <MDBCol>
                                                        <h5 className="mt-5">End-of-Semester Evaluation</h5>
                                                        <div className="mb-3"></div>
                                                        <MDBBtn className="ml-0 mb-5" size="md" color="primary" onClick={e => { this.goToSemesterEvaluation() }}>Start Evaluation</MDBBtn>
                                                    </MDBCol>
                                                </MDBRow>
                                            }
                                            {
                                                this.state.accessRight == "Teacher" &&
                                                <>
                                                    <MDBRow>
                                                        <MDBCol>
                                                            <MDBRow>
                                                                <MDBCol>
                                                                    <h5 className="mt-5">End-of-Semester Evaluation</h5>
                                                                    <div className="mb-3"></div>
                                                                </MDBCol>
                                                            </MDBRow>
                                                            <MDBRow>
                                                                <MDBCol>
                                                                    <MDBDataTable data={this.state.surveyAttempts} bordered striped hover />
                                                                </MDBCol>
                                                            </MDBRow>
                                                        </MDBCol>
                                                    </MDBRow>
                                                    <MDBRow>
                                                        <MDBBtn color="blue" href={`/modules/${this.state.moduleId}/feedback/statistics`}>View Feedback Survey Analytics</MDBBtn>
                                                    </MDBRow>
                                                </>
                                            }
                                        </MDBCol>
                                    </MDBRow>
                                    {this.fullScreenSurveyDialog()}
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
                                </MDBJumbotron>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </div>
            </div>
        );
    }
}

export default styled(ModuleFeedbackPage)`
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
.align-right{
    float: right;
}
tbody + thead{
    display: none;
}
`;

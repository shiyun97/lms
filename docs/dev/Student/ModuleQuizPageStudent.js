import React, { Component } from "react";
import styled from 'styled-components';
import { MDBContainer, MDBRow, MDBCol, MDBIcon, MDBBtn, MDBCardBody, MDBCard, MDBDataTable, MDBCardHeader } from "mdbreact";
import ModuleSideNavigation from "../ModuleSideNavigation";
import { Snackbar } from '@material-ui/core';
import axios from 'axios';
import { observer, inject } from 'mobx-react';
import moment from 'moment';
import CanvasJSReact from '../../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

@inject('dataStore')
@observer
class ModuleQuizPageStudent extends Component {

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
                "field": "quizStatus",
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
        recallQuiz: false,

        quizItems: [],
        studentScoreItems: [],
        quizStatus: "retrieving",
        quizMessage: "Quiz Analytics is not available at the moment.",
    }

    componentDidMount() {
        this.initPage();
        this.getAllModuleQuizzes();
        this.getQuizAnalytics();
    }

    componentDidUpdate() {
        if (this.state.recallQuiz) {
            this.getAllModuleQuizzes();
        }
    }

    routeChange = (path) => {
        this.props.history.push(path);
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

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ openSnackbar: false });
    };

    getAllModuleQuizzes = () => {
        let userId = sessionStorage.getItem('userId');
        let moduleId = this.props.dataStore.getCurrModId;
        axios
            .get(` http://localhost:8080/LMS-war/webresources/Assessment/retrieveAllModuleQuiz/${moduleId}?userId=${userId}`)
            .then(result => {
                // console.log(result.data.quizzes)
                this.setState({ status: "done", quizzes: result.data.quizzes, recallQuiz: false })
            })
            .catch(error => {
                this.setState({ status: "error" })
                console.error("error in axios " + error);
            });
    }

    getQuizAnalytics = () => {
        let userId = sessionStorage.getItem('userId');
        var moduleId = this.props.dataStore.getCurrModId;
        axios
            .get(`http://localhost:8080/LMS-war/webresources/analytics/retrieveQuizAnalytics?userId=${userId}&moduleId=${moduleId}`)
            .then(result => {
                var temp = []
                var studentTemp = []
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
                            y: tempY
                        })
                        studentTemp.push({
                            label: item.title,
                            y: item.studentMarks
                        })
                        tempY = []
                    })
                    this.setState({
                        quizItems: temp,
                        studentScoreItems: studentTemp,
                        quizStatus: "done"
                    });
                }
            })
            .catch(error => {
                this.setState({
                    quizStatus: "error",
                });
                console.error("error in axios " + error);
            });
    }

    renderNoCardSection = () => {
        return (
            <MDBRow className="mb-4">
                <MDBCol md="12" className="mb-r" align="center">
                    <MDBCard>
                        <MDBCardHeader>Quiz Analytics</MDBCardHeader>
                        <MDBCardBody>
                            {this.state.quizMessage}
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

    renderQuizTable = () => {
        const optionsQuiz = {
            animationEnabled: true,
            exportEnabled: true,
            theme: "light2", // "light1", "light2", "dark1", "dark2"
            title: {
                text: "Quiz Analytics",
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
                toolTipContent: "<span style=\"color:#6D78AD\">{label}:</span> <br><b>Maximum:</b> {y[3]},<br><b>Q3:</b> {y[2]},<br><b>Median:</b> {y[4]}<br><b>Q1:</b> {y[1]}<br><b>Minimum:</b> {y[0]}",
                yValueFormatString: "0.0",
                dataPoints: this.state.quizItems
            },
            {
                type: "scatter",
                name: "Your Score",
                toolTipContent: "<span style=\"color:#C0504E\">{name}</span>: {y}",
                showInLegend: true,
                dataPoints: this.state.studentScoreItems
            }]
        }
        var quiz = this.state.quizzes;
        var moduleId = this.props.dataStore.getCurrModId;
        // console.log(quiz)
        if (this.state.quizzes.length !== 0) {
            var tempQuizzes = []
            for (let i = 0; i < this.state.quizzes.length; i++) {
                tempQuizzes.push({
                    quizId: quiz[i].quizId,
                    name: quiz[i].title,
                    openingDate: moment(quiz[i].openingDate).format("DD-MM-YYYY"),
                    closingDate: moment(quiz[i].closingDate).format("DD-MM-YYYY"),
                    status: quiz[i].publish ? "Open" : "Closed",
                    viewButton: <center><MDBBtn color="primary" outline size="sm" href={`/modules/${moduleId}/quiz/${quiz[i].quizId}`}>Attempt</MDBBtn></center>
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
                <ModuleSideNavigation moduleId={moduleId}></ModuleSideNavigation>
                <div className="module-content">
                    <MDBContainer className="mt-3">
                        <MDBRow style={{ paddingTop: 60 }}>
                            <MDBCol md="8">
                                <h2 className="font-weight-bold">
                                    Quiz
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
                            <MDBCol md="12" className="mt-3">
                                {this.state.quizStatus === "done" ? this.renderBoxPlot(optionsQuiz) : this.renderNoCardSection()}
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
                                    Quiz
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
            return this.renderTableWithMessage("Error in Retrieving Quizzes. Please try again later.");
        else if (this.state.status === "done")
            return this.renderQuizTable();
        else
            return this.renderTableWithMessage("No quizzes found.");
    }
}

export default styled(ModuleQuizPageStudent)`
.module-content{
    margin-left: 270px;
    margin-top: 40px;
}
`;

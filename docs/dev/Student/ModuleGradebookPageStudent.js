import React, { Component } from "react";
import styled from 'styled-components';
import { MDBContainer, MDBRow, MDBCol, MDBCardBody, MDBCard, MDBDataTable, MDBCardHeader, MDBEdgeHeader } from "mdbreact";
import ModuleSideNavigation from "../ModuleSideNavigation";
import ModuleSideNavigationDropdown from "../ModuleSideNavigationDropdown";
import axios from 'axios';
import { observer, inject } from 'mobx-react';
import CanvasJSReact from '../../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

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

        gradeItemsAnalytics: [],
        studentScoreItems: [],
        gradeItemStatus: "retrieving",
        gradeItemMessage: "Gradebook Analytics is not available at the moment.",
    }

    componentDidMount() {
        this.initPage();
        this.getAllGrades();
        this.getGradeItemAnalytics();
    }

    routeChange = (path) => {
        this.props.history.push(path);
    }

    getAllGrades = () => {
        let userId = sessionStorage.getItem('userId');
        let moduleId = this.props.dataStore.getCurrModId;
        axios
            .get(` http://localhost:8080/LMS-war/webresources/Assessment/retrieveStudentGrades?moduleId=${moduleId}&userId=${userId}`)
            .then(result => {
                // console.log(result.data.gradeItems)
                this.setState({ status: "done", gradeItems: result.data.gradeItems })
            })
            .catch(error => {
                if (error.response.data.errorMessage === "No grade entries for the student")
                    this.setState({ status: "error", label: "No grade entries found." })
                else
                    this.setState({ status: "error", label: error.response.data.errorMessage })
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
                var studentTemp = []
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
                        gradeItemsAnalytics: temp,
                        studentScoreItems: studentTemp,
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

    renderNoCardSection = () => {
        return (
            <MDBRow className="mb-4">
                <MDBCol md="12" className="mb-r" align="center">
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
                toolTipContent: "<span style=\"color:#6D78AD\">{label}:</span> <br><b>Maximum:</b> {y[3]},<br><b>Q3:</b> {y[2]},<br><b>Median:</b> {y[4]}<br><b>Q1:</b> {y[1]}<br><b>Minimum:</b> {y[0]}",
                yValueFormatString: "0.0",
                dataPoints: this.state.gradeItemsAnalytics
            },
            {
                type: "scatter",
                name: "Your Score",
                toolTipContent: "<span style=\"color:#C0504E\">{name}</span>: {y}",
                showInLegend: true,
                dataPoints: this.state.studentScoreItems
            }]
        }
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
                            <MDBCol md="8" className="module-sidebar-large">
                                <h2 className="font-weight-bold">
                                    Gradebook
                </h2>
                            </MDBCol>
                            <MDBCol md="8" align="center" className="module-navbar-small">
                                <h2 className="font-weight-bold">
                                    Gradebook
                </h2>
                            </MDBCol>
                            <MDBCol md="4" align="right">
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
                            <MDBCol md="12" className="mt-3">
                                {this.state.gradeItemStatus === "done" ? this.renderBoxPlot(optionsGradebook) : this.renderNoCardSection()}
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
                <div className="module-sidebar-large"><ModuleSideNavigation moduleId={moduleId}></ModuleSideNavigation></div>
                <div className="module-navbar-small">
                    <ModuleSideNavigationDropdown moduleId={moduleId} activeTab={'Gradebook'}></ModuleSideNavigationDropdown>
                </div>
                <div className="module-content">
                    <MDBContainer className="mt-3">
                        <MDBEdgeHeader color="indigo darken-3" className="multimediaPage" />
                        <MDBRow>
                            <MDBCol md="8" className="module-sidebar-large">
                                <h2 className="font-weight-bold">
                                    Gradebook
                </h2>
                            </MDBCol>
                            <MDBCol md="8" align="center" className="module-navbar-small">
                                <h2 className="font-weight-bold">
                                    Gradebook
                </h2>
                            </MDBCol>
                            <MDBCol md="4" align="right">
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

    initPage() {
        var pathname = location.pathname;
        pathname = pathname.split("/");
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

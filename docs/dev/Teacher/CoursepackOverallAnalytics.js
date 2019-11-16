import React, { Component } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import CoursepackSideNavigation from '../CoursepackSideNavigation';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon, MDBEdgeHeader, MDBJumbotron } from "mdbreact";
import axios from "axios";
import SwipeableViews from 'react-swipeable-views';
import { AppBar, Typography, Tabs, Tab, Paper } from '@material-ui/core';
import { observer, inject } from 'mobx-react';
import MainSideNavDropdown from '../MainSideNavDropdown';

const API = "http://localhost:8080/LMS-war/webresources/"

@inject('dataStore')
@observer
class CoursepackOverallAnalytics extends Component {

    state = {
        totalRevenue: [],
        title: [],
        totalEnrollment: [],
        value: 0
    }

    componentDidMount() {

        this.initPage()
    }

    initPage() {

        let totalRevenue = this.props.dataStore.getTotalRevenue
        let title = this.props.dataStore.getTitle
        let totalEnrollment = this.props.dataStore.getTotalEnrollment


        this.setState({ title: title, totalRevenue: totalRevenue, totalEnrollment: totalEnrollment })
    }


    handleChange = (event, value) => {
        this.setState({ value });
    };

    handleChangeIndex = index => {
        this.setState({ value: index });
    };


    getTotalRevenue = () => {
        const data = {
            labels: this.props.dataStore.getTitle,
            datasets: [
                {
                    label: 'Total Revenue',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: '#fb6d63',
                    borderColor: '#fb6d63',
                    pointBorderColor: '#fb6d63',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverBackgroundColor: '#fb6d63',
                    pointHoverBorderColor: '#fb6d63',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    data: this.state.totalRevenue,
                }
            ]
        }

        return (
            <div>
                <Bar
                    data={data}
                    height={120}
                />
            </div>
        );
    }

    getTotalEnrollment = () => {
        const data = {
            labels: this.props.dataStore.getTitle,
            datasets: [
                {
                    label: 'Total Enrollment',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: '#fb6d63',
                    borderColor: '#fb6d63',
                    pointBorderColor: '#fb6d63',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverBackgroundColor: '#fb6d63',
                    pointHoverBorderColor: '#fb6d63',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    data: this.state.totalEnrollment,
                }
            ]
        }
        const options = {
            scales: {
                yAxes: [{
                    ticks: {
                        precision: 0
                    }
                }]
            }
        };

        return (
            <div>
                <Bar
                    data={data}
                    height={120}
                    options={options}
                />
            </div>
        );

    }

    render() {
        return (
            <div className={this.props.className}>
                <div className="module-navbar-small">
                    <MainSideNavDropdown moduleId={this.props.moduleId} activeTab={'Coursepack'}></MainSideNavDropdown>
                </div>
                <MDBContainer style={{ paddingBottom: 240 }}>
                    <h2 className="font-weight-bold" style={{ paddingTop: 50 }}>
                    Analytics
                        </h2>
                    <hr />
                    <MDBRow>
                        <MDBCol md="12" className="mt-3 mx-auto">
                            <MDBJumbotron>

                                <AppBar position="static" color="default">
                                    <Tabs
                                        value={this.state.value}
                                        onChange={this.handleChange}
                                        indicatorColor="primary"
                                        textColor="primary"
                                        variant="fullWidth"
                                        aria-label="full width tabs example"
                                    >
                                        <Tab label="Total Enrollment" />
                                        <Tab label="Total Revenue" />
                                    </Tabs>
                                </AppBar>
                                <Paper>
                                    <SwipeableViews
                                        axis={"x-reverse"}
                                        index={this.state.value}
                                        onChangeIndex={this.handleChangeIndex}
                                    >
                                        <Typography component="div">
                                            {this.getTotalEnrollment()}
                                        </Typography>
                                        <Typography component="div">
                                            {this.getTotalRevenue()}
                                        </Typography>
                                    </SwipeableViews>
                                </Paper>
                            </MDBJumbotron>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </div>
        )
    }

}

export default CoursepackOverallAnalytics
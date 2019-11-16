import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import CoursepackSideNavigation from '../CoursepackSideNavigation';
import { MDBContainer } from "mdbreact";
import axios from "axios";
import SwipeableViews from 'react-swipeable-views';
import { AppBar, Typography, Tabs, Tab, Paper } from '@material-ui/core';
import CoursepackSideNavigationDropdown from '../CoursepackSideNavigationDropdown';
import styled from 'styled-components';

const API = "http://localhost:8080/LMS-war/webresources/"

class CoursepackAnalyticsPage extends Component {

    state = {
        totalStudent: [],
        value: 0,
        totalRevenue: 0.0
    }

    componentDidMount() {
        axios.get(`${API}CoursepackEnrollment/getNumberOfUsersEnrolled?coursepackId=${this.props.match.params.coursepackId}`)
            .then(result => {
                this.setState({
                    totalStudent: result.data.items,
                    totalRevenue: result.data.totalRevenue
                })
            })
            .catch(error => {
                console.error("error in axios " + error);
            });

        axios.get(`${API}Coursepack/getCoursepack/${this.props.match.params.coursepackId}`)
            .then(result => {
                this.setState({
                    price: result.data.price,
                })
            })
            .catch(error => {
                console.error("error in axios " + error);
            });
    }


    handleChange = (event, value) => {
        this.setState({ value });
    };

    handleChangeIndex = index => {
        this.setState({ value: index });
    };

    getEnrollmentData = () => {
        var January = []
        var February = []
        var March = []
        var April = []
        var May = []
        var June = []
        var July = []
        var August = []
        var September = []
        var October = []
        var November = []
        var December = []
        var total = []
        this.state.totalStudent && this.state.totalStudent.map((student) => {
            if (student.startDate.substring(5, 7) === '01') {
                January.push(student)
            } else if (student.startDate.substring(5, 7) === '02') {
                February.push(student)
            } else if (student.startDate.substring(5, 7) === '03') {
                March.push(student)
            } else if (student.startDate.substring(5, 7) === '04') {
                April.push(student)
            } else if (student.startDate.substring(5, 7) === '05') {
                May.push(student)
            } else if (student.startDate.substring(5, 7) === '06') {
                June.push(student)
            } else if (student.startDate.substring(5, 7) === '07') {
                July.push(student)
            } else if (student.startDate.substring(5, 7) === '08') {
                August.push(student)
            } else if (student.startDate.substring(5, 7) === '09') {
                September.push(student)
            } else if (student.startDate.substring(5, 7) === '10') {
                October.push(student)
            } else if (student.startDate.substring(5, 7) === '11') {
                November.push(student)
            } else if (student.startDate.substring(5, 7) === '12') {
                December.push(student)
            }
        })
        total.push(January.length, February.length, March.length, April.length, May.length, June.length, July.length, August.length, September.length, October.length, November.length, December.length)

        return total
    }

    getTotalEnrollment = () => {
        const data = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            datasets: [
                {
                    label: 'Number of Enrollment',
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
                    data: this.getEnrollmentData(),
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
                <Line
                    data={data}
                    height={120}
                    options={options}
                />
            </div>
        );
    }

    getRevenueData = () => {
        var January = []
        var February = []
        var March = []
        var April = []
        var May = []
        var June = []
        var July = []
        var August = []
        var September = []
        var October = []
        var November = []
        var December = []
        var total = []
        this.state.totalStudent && this.state.totalStudent.map((student) => {
            if (student.startDate.substring(5, 7) === '01') {
                January.push(student)
            } else if (student.startDate.substring(5, 7) === '02') {
                February.push(student)
            } else if (student.startDate.substring(5, 7) === '03') {
                March.push(student)
            } else if (student.startDate.substring(5, 7) === '04') {
                April.push(student)
            } else if (student.startDate.substring(5, 7) === '05') {
                May.push(student)
            } else if (student.startDate.substring(5, 7) === '06') {
                June.push(student)
            } else if (student.startDate.substring(5, 7) === '07') {
                July.push(student)
            } else if (student.startDate.substring(5, 7) === '08') {
                August.push(student)
            } else if (student.startDate.substring(5, 7) === '09') {
                September.push(student)
            } else if (student.startDate.substring(5, 7) === '10') {
                October.push(student)
            } else if (student.startDate.substring(5, 7) === '11') {
                November.push(student)
            } else if (student.startDate.substring(5, 7) === '12') {
                December.push(student)
            }
        })
        total.push(January.length * this.state.price, February.length * this.state.price, March.length * this.state.price, April.length * this.state.price, May.length * this.state.price, June.length * this.state.price, July.length * this.state.price, August.length * this.state.price, September.length * this.state.price, October.length * this.state.price, November.length * this.state.price, December.length * this.state.price)

        return total
    }

    getTotalRevenue = () => {
        const data = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
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
                    data: this.getRevenueData(),
                }
            ]
        }

        return (
            <div>
                <Line
                    data={data}
                    height={120}
                />
            </div>
        );
    }

    render() {
        console.log(this.state.totalStudent)

        return (
            <div className={this.props.className}>

                <div>
                    <div className="module-sidebar-large"><CoursepackSideNavigation /></div>
                    <div className="module-navbar-small">
                        <CoursepackSideNavigationDropdown />
                    </div>
                </div>

                <div className="module-content">

                    <MDBContainer className="mt-5" >
                    <h2 className="font-weight-bold" >Analytics</h2>

                        <hr />
                        <br />
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

                    </MDBContainer>
                </div>
            </div>
        )
    }

}

export default styled(CoursepackAnalyticsPage)`
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
}`
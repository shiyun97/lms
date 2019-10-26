import React, { Component } from "react";
import styled from 'styled-components';
import { MDBContainer, MDBModal, MDBModalHeader, MDBRow, MDBModalBody, MDBModalFooter, MDBCol, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from "mdbreact";
import { Dialog, DialogTitle, DialogContent, DialogActions, AppBar, Tabs, Tab, Typography, Paper, InputLabel, Select } from '@material-ui/core';
import axios from "axios";
import SwipeableViews from 'react-swipeable-views';

const API = "http://localhost:8080/LMS-war/webresources/"

class ModuleAttendancePageStudent extends Component {

    state = {
        value: 0,
        allLectures: "",
        allTutorial: "",
        allLecturesLength: "",
        tutorialList: "",
        attendanceList: "",
        attendanceListLength: "",
        attendedLecture: "",
        attendedTutorial: "",
        enrolledTutorialId: ""
    }

    componentDidMount() {
        this.initPage()
    }

    initPage() {
        let moduleId = this.props.moduleId;
        this.setState({ moduleId: moduleId })
        console.log(moduleId)

        // get all attendance for lecture
        axios.get(`${API}Attendance/getAllAttendance?moduleId=${moduleId}`)
            .then(result => {
                this.setState({ allLectures: result.data.attendanceList, allLecturesLength: result.data.attendanceList.length })
            })
            .catch(error => {
                console.error("error in axios " + error);
            });


        //get student's tutorials
        axios.get(`${API}studentEnrollment/retrieveStudentTutorials/${localStorage.getItem('userId')}`)
            .then(result => {
                this.setState({
                    enrolledTutorialId: result.data.tutorials[0]
                })
            })
            .catch(error => {
                console.error("error in axios " + error);
            });

        //get student's attendance
        axios.get(`${API}Attendance/getStudentModuleAttandance?userId=${localStorage.getItem('userId')}&moduleId=${moduleId}`)
            .then(result => {
                this.setState({
                    attendanceList: result.data.attendanceList,
                    attendanceListLength: result.data.attendanceList.length,
                    attendedLecture: this.getModuleAttendanceLecture(result.data.attendanceList),
                    attendedTutorial: this.getModuleAttendanceTutorial(result.data.attendanceList)
                })
            })
            .catch(error => {
                console.error("error in axios " + error);
            });
    }

    getModuleAttendanceLecture = (attendanceList) => {
        var attendedLecture = []

        if (attendanceList.length !== 0) {
            attendanceList && attendanceList.map((attended, index) => {
                if (attended.module) {
                    attendedLecture.push(attended)
                }
            })
        }
        return attendedLecture
    }

    getModuleAttendanceTutorial = (attendanceList) => {
        var attendedTutorial = []

        if (attendanceList.length !== 0) {
            attendanceList && attendanceList.map((attended, index) => {
                if (attended.tutorial) {
                    attendedTutorial.push(attended)
                }
            })
        }
        return attendedTutorial
    }

    handleChange = (event, value) => {
        this.setState({ value });

        axios.get(`${API}Attendance/getAllTutorialAttendance?tutorialId=${this.state.enrolledTutorialId.tutorialId}`)
            .then(result => {
                this.setState({
                    allTutorial: result.data.attendanceList
                })
            })
            .catch(error => {
                console.error("error in axios " + error);
            });
    };

    handleChangeIndex = index => {
        this.setState({ value: index });
    };

    showAttendance = () => {
        return (
            <div>
                <AppBar position="static" color="default">
                    <Tabs
                        value={this.state.value}
                        onChange={this.handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="fullWidth"
                        aria-label="full width tabs example"
                    >
                        <Tab label="Lecture" />
                        <Tab label="Tutorial" />
                    </Tabs>
                </AppBar>
                <Paper>
                    <SwipeableViews
                        axis={"x-reverse"}
                        index={this.state.value}
                        onChangeIndex={this.handleChangeIndex}
                    >
                        <Typography component="div">{this.displayLecture()}</Typography>
                        <Typography component="div">{this.displayTutorial()}</Typography>
                    </SwipeableViews>
                </Paper>
            </div>
        )
    }

    displayLecture = () => {

        //get all attendance dates for lecture
        var lectureAttendance = []
        if (this.state.allLecturesLength !== 0) {
            for (var i = 0; i < this.state.allLecturesLength; i++) {
                lectureAttendance.push({
                    date: (this.state.allLectures[i].startTs).substring(0, 10),
                    id: this.state.allLectures[i].attendanceId
                })
            }
        }

        return (
            <MDBTable>
                <MDBTableHead>
                    <tr>
                        <th>Date</th>
                        <th>Attendance</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    {lectureAttendance && lectureAttendance.map((lectureAttendance, index) => {
                        return (
                            <tr>
                                <td>{lectureAttendance.date}</td>
                                <td>{this.checkPresence(lectureAttendance.id)}</td>
                            </tr>
                        )
                    })}

                </MDBTableBody>
            </MDBTable>
        )
    }

    displayTutorial = () => {
        if (this.state.allTutorial !== "") {
            var tutorialAttendance = []
            if (this.state.allTutorial.length !== 0) {
                for (var i = 0; i < this.state.allTutorial.length; i++) {
                    tutorialAttendance.push({
                        date: (this.state.allTutorial[i].startTs).substring(0, 10),
                        id: this.state.allTutorial[i].attendanceId
                    })
                }
            }

        }

        return (
            <MDBTable>
                <MDBTableHead>
                    <tr>
                        <th>Date</th>
                        <th>Attendance</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    {tutorialAttendance && tutorialAttendance.map((tutorialAttendance, index) => {
                        return (
                            <tr>
                                <td>{tutorialAttendance.date}</td>
                                <td>{this.checkPresenceTutorial(tutorialAttendance.id)}</td>
                            </tr>
                        )
                    })}

                </MDBTableBody>
            </MDBTable>
        )
    }

    checkPresence = (lectureAttendanceId) => {

        var attendeesId = []
        this.state.attendedLecture && this.state.attendedLecture.map((attended, index) => {
            attendeesId.push(attended.attendanceId)
        })

        if (attendeesId.filter(e => e === lectureAttendanceId).length > 0) {
            return <div style={{ color: "green" }}>Present</div>
        } else {
            return <div style={{ color: "red" }}>Absent</div>
        }
    }

    checkPresenceTutorial = (tutorialAttendanceId) => {
        var attendeesId = []
        this.state.attendedTutorial && this.state.attendedTutorial.map((attended, index) => {
            attendeesId.push(attended.attendanceId)
        })

        if (attendeesId.filter(e => e === tutorialAttendanceId).length > 0) {
            return <div style={{ color: "green" }}>Present</div>
        } else {
            return <div style={{ color: "red" }}>Absent</div>
        }
    }

    render() {
        return (
            <MDBContainer>
                <MDBRow>
                    <MDBCol >
                        <h2 className="font-weight-bold"> Attendance </h2>
                    </MDBCol>
                </MDBRow>
                {this.showAttendance()}
            </MDBContainer>
        )
    }
}

export default styled(ModuleAttendancePageStudent)`
.module-content{
    margin - left: 270px;
    margin-top: 40px;
}
`;
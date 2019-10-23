import React, { Component } from "react";
import styled from 'styled-components';
import { MDBContainer, MDBModal, MDBModalHeader, MDBRow, MDBModalBody, MDBModalFooter, MDBCol, MDBBtn } from "mdbreact";
import { Dialog, DialogTitle, DialogContent, DialogActions, AppBar, Tabs, Tab, Typography, Paper, InputLabel, Select } from '@material-ui/core';
import axios from "axios";
import SwipeableViews from 'react-swipeable-views';
import { Table } from 'semantic-ui-react'

const API = "http://localhost:8080/LMS-war/webresources/"

class ModuleAttendancePageStudent extends Component {

    state = {
        value: 0,
        lectureList: "",
        tutorialList: "",
        attendanceList: ""
    }

    componentDidMount() {
        this.initPage()
    }

    initPage() {
        let moduleId = this.props.moduleId;
        this.setState({ moduleId: moduleId })
        console.log(moduleId)

        //get all lectures
        axios.get(`${API}ModuleMounting/getModule/${moduleId}`)
            .then(result => {
                this.setState({ lectureList: result.data.lectureDetails })
            })
            .catch(error => {
                console.error("error in axios " + error);
            });

        //get all tutorials
        axios.get(`${API}ModuleMounting/getAllTutorialByModule?moduleId=${moduleId}`)
            .then(result => {
                this.setState({ tutorialList: result.data.tutorials })
            })
            .catch(error => {
                console.error("error in axios " + error);
            });

        axios.get(`${API}Attendance/getStudentModuleAttandance?userId=${localStorage.getItem('userId')}&moduleId=${moduleId}`)
            .then(result => {
                this.setState({ attendanceList: result.data.attendanceList })
                console.log(this.state.attendanceList)
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
                        <Typography component="div">{/* this.displayLectureSlots() */}</Typography>
                        <Typography component="div">{/* this.displayTutorialSlots() */}</Typography>
                    </SwipeableViews>
                </Paper>
            </div>
        )
    }

    displayLectureSlots = () => {
        //get all attendance dates for lecture

        var lectureAttendanceDate = []
        var allLectureAttendance = this.state.allLectureAttendance;
        for (var i = -0; i < allLectureAttendance.length; i++) {
            lectureAttendanceDate.push({
                date: (allLectureAttendance[i].startTs).substring(0, 10),
                id: allLectureAttendance[i].attendanceId
            })
        }

        return (
            <div>
                <MDBRow>
                    <MDBCol align="right">
                        <select className="browser-default custom-select" style={{ maxWidth: 250 }}>
                            <option>Group</option>
                            <option value="1">Group 1</option>
                        </select>

                        <select className="browser-default custom-select" style={{ maxWidth: 250 }} onChange={this.handleLectureDate}>
                            <option>Date</option>
                            {lectureAttendanceDate && lectureAttendanceDate.map(
                                (lecture) => <option key={lecture.id} value={lecture.id}>{lecture.date}</option>)
                            }
                        </select>
                        <MDBBtn onClick={this.getLectureAttendance}>Get</MDBBtn>
                    </MDBCol>
                </MDBRow>
                {this.displaySelectedLectureAttendance()}
            </div>
        )
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
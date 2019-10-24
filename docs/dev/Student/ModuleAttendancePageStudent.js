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
        allLecturesLength: "",
        tutorialList: "",
        attendanceList: "",
        attendanceListLength: ""
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


        //get all tutorials


        axios.get(`${API}Attendance/getStudentModuleAttandance?userId=${localStorage.getItem('userId')}&moduleId=${moduleId}`)
            .then(result => {
                this.setState({ attendanceList: result.data.attendanceList, attendanceListLength: result.data.attendanceList.length })
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
                        <Typography component="div">{this.displayLecture()}</Typography>
                        <Typography component="div">{/* this.displayTutorialSlots() */}</Typography>
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

        var attendedLecture = []
        if (this.state.attendanceListLength !== 0) {
            for (var x = 0; x < this.state.attendanceListLength; x++) {
                if (this.state.attendanceList[x].module !== undefined) {
                    attendedLecture.push(this.state.attendanceList[x].attendanceId)
                }
            }
        }

        console.log(lectureAttendance)
        console.log(attendedLecture)

        lectureAttendance && lectureAttendance.map((attendance, index) => {
            console.log(attendance.date)
            return (
                <MDBTable>
                    <MDBTableHead>
                        <tr>
                            <th>Date</th>
                            <th>Attendance</th>
                        </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                        <tr>
                            <td>date</td>
                            <td>Mark</td>
                        </tr>
                    </MDBTableBody>
                </MDBTable>
            )
        })


        /*             return (
                        <MDBTable>
                            <MDBTableHead>
                                <tr>
                                    <th>Date</th>
                                    <th>Attendance</th>
                                </tr>
                            </MDBTableHead>
                            <MDBTableBody>
                                <tr>
                                    {/* <td>{attendance.date}</td> */
        /*                    <td>Mark</td>
                       </tr>
                   </MDBTableBody>
               </MDBTable>
           )  */

        // return (
        //     <div>
        //         <MDBRow>
        //             <MDBCol align="right">
        //                 <select className="browser-default custom-select" style={{ maxWidth: 250 }}>
        //                     <option>Group</option>
        //                     <option value="1">Group 1</option>
        //                 </select>

        //                 <select className="browser-default custom-select" style={{ maxWidth: 250 }} onChange={this.handleLectureDate}>
        //                     <option>Date</option>
        //                     {lectureAttendanceDate && lectureAttendanceDate.map(
        //                         (lecture) => <option key={lecture.id} value={lecture.id}>{lecture.date}</option>)
        //                     }
        //                 </select>
        //                 <MDBBtn onClick={this.getLectureAttendance}>Get</MDBBtn>
        //             </MDBCol>
        //         </MDBRow>
        //         {this.displaySelectedLectureAttendance()}
        //     </div>
        // )
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
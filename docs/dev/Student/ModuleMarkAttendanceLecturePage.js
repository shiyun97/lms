import React, { Component } from "react";
import { MDBCol, MDBBtn, MDBIcon } from "mdbreact";
import axios from "axios";
import { observer, inject } from 'mobx-react'
import { Snackbar } from '@material-ui/core';

const API = "http://172.17.42.98:8080/LMS-war/webresources/"

@inject('dataStore')
@observer
class ModuleMarkAttendanceLecturePage extends Component {

    state = {
        classId: "",
        tutorialId: "",
        present: false,
        attendanceId: "",
        userId: "",
        classType: "",
        message: "",
        openSnackbar: false,
    }

    componentDidMount() {

        var currentUrl = window.location.href
        var split = currentUrl.split('/')
        var userId = sessionStorage.getItem('userId')
        var attendanceId = split[split.length - 1]
        var classId = split[split.length - 2]
        var classType = split[split.length - 3]

        console.log(userId, attendanceId, classId, classType)

        this.setState({ attendanceId: attendanceId, userId: userId, classId: classId, classType: classType })

    }

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({ openSnackbar: false });
    };

    markAttendance = event => {
        console.log("mark attendance")
        axios.post(`${API}Attendance/signAttendance?moduleId=${this.state.classId}&userId=${this.state.userId}&attendanceId=${this.state.attendanceId}`)
            .then(result => {
                this.setState({ present: true })
            })
            .catch(error => {
                this.setState({
                    message: error.response.data,
                    openSnackbar: true,
                })
                console.error("error in axios " + error);
            });

    }

    render() {

        if (this.state.present === true) { //attendance marked
            return (
                <div className="mark-attendance">
                    <MDBCol align="center">
                        <MDBIcon align="center" icon="check" style={{ color: "green", size: 400 }} size="3x" />
                    </MDBCol>
                    <MDBCol align="center">

                        <h6>You may close this window</h6>
                    </MDBCol>
                </div>
            )
        } else { // attendance not mark
            return (
                <div className="mark-attendance">
                    <MDBCol align="center">

                        <MDBBtn color="success" onClick={this.markAttendance}>Present</MDBBtn>
                    </MDBCol>
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
                </div >
            )
        }
    }
}

export default ModuleMarkAttendanceLecturePage
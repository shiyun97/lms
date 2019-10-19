import React, { Component } from "react";
import { MDBContainer, MDBCol, MDBBtn, MDBIcon } from "mdbreact";
import axios from "axios";
import { observer, inject } from 'mobx-react'

const API = "http://localhost:8080/LMS-war/webresources/"

@inject('dataStore')
@observer
class MarkAttendanceStudent extends Component {

    state = {
        classId: "",
        tutorialId: "",
        present: false,
        attendanceId: "",
        userId: "",
        classType: ""
    }

    componentDidMount() {
        this.setState({
            classId: this.props.dataStore.getAttendanceClassId,
            attendanceId: this.props.dataStore.getAttendanceId,
            userId: localStorage.getItem("userId"),
            classType: this.props.dataStore.getAttendanceClassType
        })
    }

    markAttendance = event => {
        console.log("mark attendance")
        if (this.state.classType === 'lecture') {
            axios.post(`${API}Attendance/signAttendance?moduleId=${this.state.classId}&userId=${this.state.userId}&attendanceId=${this.state.attendanceId}`)
                .then(result => {
                    this.setState({ present: true })
                })
                .catch(error => {
                    console.error("error in axios " + error);
                });
        } else {
            axios.post(`${API}Attendance/signTutorialAttendance?tutorialId=${this.state.classId}&userId=${this.state.userId}&attendanceId=${this.state.attendanceId}`)
                .then(result => {
                    this.setState({ present: true })
                })
                .catch(error => {
                    console.error("error in axios " + error);
                });
        }
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
                </div >
            )
        }
    }
}

export default MarkAttendanceStudent
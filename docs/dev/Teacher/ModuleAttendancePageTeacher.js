import React, { Component } from "react";
import styled from 'styled-components';
import { MDBInput, MDBDataTable, MDBContainer, MDBModal, MDBModalHeader, MDBRow, MDBModalBody, MDBModalFooter, MDBCol, MDBBtn, MDBIcon } from "mdbreact";
import { Dialog, DialogTitle, DialogContent, DialogActions, AppBar, Tabs, Tab, Typography, Paper } from '@material-ui/core';
import axios from "axios";
import SwipeableViews from 'react-swipeable-views';
import { Snackbar } from '@material-ui/core';

const API = "http://localhost:8080/LMS-war/webresources/"
var QRCode = require('qrcode.react');

class ModuleAttendancePageTeacher extends Component {

  state = {
    modal: false,
    open: false,
    lectureList: "",
    tutorialList: "",
    classType: "",
    classgroup: "",
    attendanceId: "",
    value: 0,
    tableTutorialGroup: "",
    tableLectureDate: "",
    tableTutorialDate: "",
    allTutorialAttendance: "",
    allLectureAttendance: "",
    display: false,
    tutorialAttendees: "",
    lectureAttendees: "",
    chosen: [],
    studentListTutorial: "",
    studentListLecture: "",
    message: "",
    openSnackbar: false,
  }

  componentDidMount() {
    this.initPage();
  }

  initPage() {
    let moduleId = this.props.moduleId;
    this.setState({ moduleId: moduleId })

    //get all lectures
    axios.get(`${API}ModuleMounting/getModule/${moduleId}`)
      .then(result => {
        this.setState({ lectureList: result.data.lectureDetails })
      })
      .catch(error => {
        this.setState({ message: error.response.data, openSnackbar: true })
        console.error("error in axios " + error);
      });

    //get all tutorials
    axios.get(`${API}ModuleMounting/getAllTutorialByModule?moduleId=${moduleId}`)
      .then(result => {
        this.setState({ tutorialList: result.data.tutorials })
      })
      .catch(error => {
        this.setState({ message: error.response.data, openSnackbar: true })
        console.error("error in axios " + error);
      });

    //get all students in the module (lecture)
    axios.get(`${API}ModuleMounting/getAllStudentByModule?moduleId=${moduleId}`)
      .then(result => {
        this.setState({ studentListLecture: result.data.userList })
      })
      .catch(error => {
        this.setState({ message: error.response.data, openSnackbar: true })
        console.error("error in axios " + error);
      });

    //get all attendance in lecture
    axios.get(`${API}Attendance/getAllAttendance?moduleId=${moduleId}`)
      .then(result => {
        this.setState({ allLectureAttendance: result.data.attendanceList })
      })
      .catch(error => {
        this.setState({ message: error.response.data, openSnackbar: true })
        console.error("error in axios " + error);
      });
  }

  generateQRCode = event => {
    let url = window.location.href.split('/');
    var qrcode_url = "";
    /* console.log(url) */
    if (this.state.classType === 'lecture') { //lecture
      qrcode_url = url[0] + "/" + url[1] + "/" + url[2] + "/student/mobileLogin/" + this.state.classType + "/" + this.state.moduleId + "/" + this.state.attendanceId;

    } else { //tutorial
      qrcode_url = url[0] + "/" + url[1] + "/" + url[2] + "/student/mobileLogin/" + this.state.classType + "/" + this.state.classgroup + "/" + this.state.attendanceId;
      /* console.log("qrcode url: " + qrcode_url) */
    }
    return (
      <MDBCol align="center">
        {/* <QRCode value="http://172.17.43.255:3100" size={450} /> */}
        {<QRCode value={qrcode_url} size={450} />}
      </MDBCol>
    )
  }

  toggle = event => {
    this.setState({ modal: !this.state.modal })
  }

  handleSelectClasstype = event => {
    this.setState({ classType: event.target.value }, () => event);
  }

  handleSelectClassgroup = event => {
    this.setState({ classgroup: event.target.value })
    console.log(event.target.value)
  }

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleOpenSnackbar = () => {
    this.setState({ openSnackbar: true });
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ openSnackbar: false });
  };

  handleSelectTableTutorialGroup = event => {
    this.setState({ tableTutorialGroup: event.target.value })

    //tutorial id is selected ==> retrieve the attendance in the tutorial
    axios.get(`${API}Attendance/getAllTutorialAttendance?tutorialId=${event.target.value}`)
      .then(result => {
        this.setState({ allTutorialAttendance: result.data.attendanceList })
        console.log(this.state.allTutorialAttendance)
      })
      .catch(error => {
        this.setState({ message: error.response.data, openSnackbar: true })
        console.error("error in axios " + error);
      });
  }

  handleTableTutorialDate = event => {
    this.setState({ tableTutorialDate: event.target.value })
    console.log("selected tutorial attendance id" + event.target.value)
  }

  handleTableLectureDate = event => {
    this.setState({ tableLectureDate: event.target.value })
    console.log("selected lecture attendance id" + event.target.value)

  }

  displaySelect = () => {
    if (this.state.lectureList.length !== 0 && this.state.tutorialList.length !== 0) { //there is lecture and tutorials
      return (
        <select value={this.state.classType} onChange={this.handleSelectClasstype} className="browser-default custom-select">
          <option >Select Class type</option>
          <option value="lecture">Lecture</option>
          <option value="tutorial">Tutorial</option>
        </select>
      )
    } else if (this.state.lectureList.length !== 0) { //there is only lecture
      return (
        <select value={this.state.classType} onChange={this.handleSelectClasstype} className="browser-default custom-select">
          <option >Select Class type</option>
          <option value="lecture">Lecture</option>
        </select>
      )
    } else { // there is only tutorial
      return (
        <select value={this.state.classType} onChange={this.handleSelectClasstype} className="browser-default custom-select">
          <option >Select Class type</option>
          <option value="tutorial">Tutorial</option>
        </select>
      )
    }
  }

  displayVariousClasses = () => {
    if (this.state.classType === "lecture") {
      return (
        <select value={this.state.classgroup} onChange={this.handleSelectClassgroup} className="browser-default custom-select">
          <option>Choose an option</option>
          <option>{this.state.lectureList}</option>
        </select>
      )
    } else if (this.state.classType === "tutorial") {
      return (
        <select value={this.state.classgroup} onChange={this.handleSelectClassgroup} className="browser-default custom-select">
          <option>Choose an option</option>
          {this.state.tutorialList && this.state.tutorialList.map(
            (group, index) => <option key={index} value={group.tutorialId}>{group.timing}</option>)
          }
        </select>
      )
    } else {
      return null
    }
  }
  handleClickOpen = event => {
    let date = new Date()
    if ((this.state.classType === "") || (this.state.classType === "lecture" && this.state.classgroup === "") || (this.state.classType === 'tutorial' && this.state.classgroup === "")) {
      return (
        //TODO: add alert/ snackbar
        <h6>Please select all fields!</h6>
      )
    } else if (this.state.classType === 'lecture') { //create lecture attendance
      this.setState({ open: true, modal: false })
      axios.post(`${API}Attendance/createAttendance?moduleId=${this.state.moduleId}`, { startTs: date })
        .then(result => {
          /* alert(`lecture attendance ${result.data.attendanceId}  created`) */
          this.setState({
            attendanceId: result.data.attendanceId,
            openSnackbar: true,
            message: `Lecture attendance Id${result.data.attendanceId} created`
          })
          this.generateQRCode()
        })
        .catch(error => {
          this.setState({ message: error.response, openSnackbar: true })
          console.error("error in axios " + error);
        });

    } else if (this.state.classType === 'tutorial') { //create tutorial attendance
      this.setState({ open: true, modal: false })
      axios.post(`${API}Attendance/createTutorialAttendance?tutorialId=${this.state.classgroup}`, { startTs: date })
        .then(result => {
          this.setState({
            attendanceId: result.data.attendanceId,
            openSnackbar: true,
            message: `Tutorial attendance Id${result.data.attendanceId} created`
          })
          this.generateQRCode()
        })
        .catch(error => {
          this.setState({ message: error.response.data, openSnackbar: true })
          console.error("error in axios " + error);
        });
    } else {
      return null
    }
  }

  handleClickClose = event => {
    this.setState({ open: false })
    window.location.reload()
  }

  getCurrenDate = () => {
    var currentDate = new Date()
    return (
      <MDBCol align="right">
        <h3>{currentDate.getDate()}/{currentDate.getMonth()}/{currentDate.getFullYear()}</h3>
      </MDBCol>
    )
  }

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
            <Typography component="div">{this.displayLectureTable()}</Typography>
            <Typography component="div">{this.displayTutorialTable()}</Typography>
          </SwipeableViews>
        </Paper>
      </div>
    )
  }

  displayLectureTable = () => {
    var lectureAttendanceDate = []
    var allLectureAttendance = this.state.allLectureAttendance;
    for (var i = 0; i < allLectureAttendance.length; i++) {
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

            <select className="browser-default custom-select" style={{ maxWidth: 250 }} onChange={this.handleTableLectureDate} value={this.state.tableLectureDate}>
              <option>Date</option>
              {lectureAttendanceDate && lectureAttendanceDate.map(
                (lecture, index) => <option key={index} value={lecture.id}>{lecture.date}</option>)
              }
            </select>
            <MDBBtn onClick={this.getLectureAttendance}>Get</MDBBtn>
          </MDBCol>
        </MDBRow>
        {this.displaySelectedLectureAttendance()}
      </div>
    )
  }

  getLectureAttendance = event => {
    axios.get(`${API}Attendance/getAttendees?attendanceId=${this.state.tableLectureDate}`)
      .then(result => {
        this.setState({ lectureAttendees: result.data.attendees, display: true })
      })
      .catch(error => {
        this.setState({ message: error.response.data, openSnackbar: true })
        console.error("error in axios " + error);
      });
  }
  displaySelectedLectureAttendance = () => {
    const data = {
      columns: [
        {
          label: 'Student',
          field: 'student',
          sort: 'asc',
          width: 150
        },
        {
          label: 'Attendance',
          field: 'attendance',
          sort: 'asc',
          width: 150
        },
        {
          label: 'Check',
          field: 'check',
          width: 150
        },
      ],
      rows:
        this.lectureRowsData()
    }

    if (this.state.display === false) {
      return (
        "Please select a date"
      )
    } else {
      return (
        <div>
          <MDBDataTable
            style={{ textAlign: "center", verticalAlign: "center" }}
            striped
            bordered
            hover
            data={data}
            responsive
          />
          <MDBRow>
            <MDBCol align="left">
              <MDBBtn color="danger" onClick={this.deleteLectureAttendance}>Delete</MDBBtn>
            </MDBCol>

            <MDBCol align="right">
              <MDBBtn color="primary" onClick={this.markPresentLecture}>Mark Present</MDBBtn>
              <MDBBtn color="primary" onClick={this.markAbsentLecture}>Mark Absent</MDBBtn>
            </MDBCol>
          </MDBRow>
        </div>
      )
    }
  }

  lectureRowsData = () => {
    let attendance = [];
    this.state.studentListLecture && this.state.studentListLecture.map((attendees, index) =>
      attendance.push({
        student: attendees.firstName + " " + attendees.lastName,
        attendance: this.checkLecture(attendees.id),
        check: this.showCheckbox(),
        clickEvent: () => this.handleRowClick(attendees.id)
      })
    )
    return attendance
  }

  checkLecture = (studentId) => {
    var attendeesId = []
    if (this.state.lectureAttendees !== "") {
      for (var i = 0; i < this.state.lectureAttendees.length; i++) {
        attendeesId.push(this.state.lectureAttendees[i].id)
      }
    }

    if (attendeesId.filter(e => e === studentId).length > 0) {
      return <div style={{ color: "green" }}>Present</div>
    } else {
      return <div style={{ color: "red" }}>Absent</div>
    }
  }

  markPresentLecture = event => {
    var updateAsPresent = this.state.chosen
    for (var i = 0; i < updateAsPresent.length; i++) {
      axios.put(`${API}Attendance/addAttendee?attendanceId=${this.state.tableLectureDate}&userId=${updateAsPresent[i]}`)
        .then(result => {
          this.setState({
            openSnackbar: true,
            message: "Student(s) marked as present"
          })
          window.location.reload()
        })
        .catch(error => {
          this.setState({ message: error.response.data, openSnackbar: true })
          console.error("error in axios " + error);
        });
    }
  }

  markAbsentLecture = event => {
    var updateAsAbsent = this.state.chosen
    console.log(updateAsAbsent)
    console.log(this.state.tableLectureDate)
    for (var i = 0; i < updateAsAbsent.length; i++) {
      axios.put(`${API}Attendance/removeAttendee?attendanceId=${this.state.tableLectureDate}&userId=${updateAsAbsent[i]}`)
        .then(result => {
          this.setState({
            openSnackbar: true,
            message: "Student(s) marked as absent"
          })
          window.location.reload()
        })
        .catch(error => {
          this.setState({ message: error.response.data, openSnackbar: true })
          console.error("error in axios " + error);
        });
    }
  }

  deleteLectureAttendance = event => {
    axios.delete(`${API}Attendance/deleteAttendance?moduleId=${this.props.moduleId}&attendanceId=${this.state.tableLectureDate}`)
      .then(result => {
        this.setState({
          openSnackbar: true,
          message: "Lecture attendance successfully deleted"
        })
        window.location.reload()
      })
      .catch(error => {
        this.setState({ message: error.response.data, openSnackbar: true })
        console.error("error in axios " + error);
      });
  }

  displayTutorialTable = () => {
    return (
      <div>
        <MDBRow>
          <MDBCol align="right">
            <select className="browser-default custom-select" style={{ maxWidth: 250 }} onChange={this.handleSelectTableTutorialGroup} value={this.state.tableTutorialGroup}>
              <option>Group</option>
              {this.state.tutorialList && this.state.tutorialList.map(
                (group, index) => <option key={index} value={group.tutorialId}>Group {group.tutorialId}</option>)
              }
            </select>
            {this.displayTutorialAttendanceDate()}
            {/*  <select className="browser-default custom-select" style={{ maxWidth: 250 }} onChange={this.handleTutorialDate}>
              <option>Date</option>
              {tutorialAttendanceDate && tutorialAttendanceDate.map(
                (tutorial) => <option key={tutorial.id} value={tutorial.id}>{tutorial.date}</option>)
              }
            </select> */}
            <MDBBtn onClick={this.getTutorialAttendance}>Get</MDBBtn>
          </MDBCol>
        </MDBRow>
        {this.displaySelectedTutorialAttendance()}
      </div>
    )
  }

  displayTutorialAttendanceDate = () => {
    var tutorialAttendanceDate = []
    var allTutorialAttendance = this.state.allTutorialAttendance;
    if (this.state.allTutorialAttendance !== "") {
      for (var i = 0; i < allTutorialAttendance.length; i++) {
        tutorialAttendanceDate.push({
          date: (allTutorialAttendance[i].startTs).substring(0, 10),
          id: allTutorialAttendance[i].attendanceId
        })
      }
    }

    if (this.state.tableTutorialGroup !== "" && tutorialAttendanceDate !== "") {
      return (
        <select className="browser-default custom-select" style={{ maxWidth: 250 }} onChange={this.handleTableTutorialDate} value={this.state.tableTutorialDate}>
          <option>Date</option>
          {tutorialAttendanceDate && tutorialAttendanceDate.map(
            (tutorial, index) => <option key={index} value={tutorial.id}>{tutorial.date}</option>)
          }
        </select>
      )
    } else {
      return null
    }
  }

  getTutorialAttendance = event => {
    axios.get(`${API}Attendance/getAttendees?attendanceId=${this.state.tableTutorialDate}`)
      .then(result => {
        this.setState({
          tutorialAttendees: result.data.attendees,
          display: true,
        })
      })
      .catch(error => {
        this.setState({ message: error.response.data, openSnackbar: true })
        console.error("error in axios " + error);
      });

    //retrieve the class list in the tutorial
    axios.get(`${API}ManageGroup/getAllStudentByTutorial?tutorialId=${this.state.tableTutorialGroup}`)
      .then(result => {
        this.setState({ studentListTutorial: result.data.userList })
      })
      .catch(error => {
        this.setState({ message: error.response.data, openSnackbar: true })
        console.error("error in axios " + error);
      });
  }

  displaySelectedTutorialAttendance = () => {
    const data = {
      columns: [
        {
          label: 'Student',
          field: 'student',
          sort: 'asc',
          width: 150
        },
        {
          label: 'Attendance',
          field: 'attendance',
          sort: 'asc',
          width: 150
        },
        {
          label: 'Check',
          field: 'check',
          width: 150
        },
      ],
      rows:
        this.rowsData()
    }

    if (this.state.display === false) {
      return (
        "Please select a date"
      )
    } else {
      return (
        <div>
          <MDBDataTable
            style={{ textAlign: "center", verticalAlign: "center" }}
            striped
            bordered
            hover
            data={data}
            responsive
          />
          <MDBRow>
            <MDBCol align="left">
              <MDBBtn color="danger" onClick={this.deleteTutorialAttendance}>Delete</MDBBtn>
            </MDBCol>

            <MDBCol align="right">
              <MDBBtn color="primary" onClick={this.markPresent}>Mark Present</MDBBtn>
              <MDBBtn color="primary" onClick={this.markAbsent}>Mark Absent</MDBBtn>
            </MDBCol>
          </MDBRow>
        </div>
      )
    }
  }

  rowsData = () => {
    let attendance = [];
    this.state.studentListTutorial && this.state.studentListTutorial.map((attendees, index) =>
      attendance.push({
        student: attendees.firstName + " " + attendees.lastName,
        attendance: this.check(attendees.id),
        check: this.showCheckbox(),
        clickEvent: () => this.handleRowClick(attendees.id)
      })
    )
    return attendance
  }

  check = (studentId) => {
    var attendeesId = []
    if (this.state.tutorialAttendees !== "") {
      for (var i = 0; i < this.state.tutorialAttendees.length; i++) {
        attendeesId.push(this.state.tutorialAttendees[i].id)
      }
    }

    if (attendeesId.filter(e => e === studentId).length > 0) {
      return <div style={{ color: "green" }}>Present</div>
    } else {
      return <div style={{ color: "red" }}>Absent</div>
    }
  }

  handleRowClick = index => {
    this.state.chosen.indexOf(index) === -1 ? this.state.chosen.push(index) :
      this.state.chosen = this.state.chosen.filter(item => item !== index);
    console.log(this.state.chosen)
  }
  //TODO: align center
  showCheckbox = event => {
    return (
        <MDBInput type="checkbox" id="checkbox1" algin="center"/>
    )
  }

  deleteTutorialAttendance = event => {
    axios.delete(`${API}Attendance/deleteTutorialAttendance?tutorialId=${this.state.tableTutorialGroup}&attendanceId=${this.state.tableTutorialDate}`)
      .then(result => {
        this.setState({
          message: "Tutorial Attendance successfully deleted",
          openSnackbar: true
        })
        window.location.reload()
      })
      .catch(error => {
        this.setState({ message: error.response.data, openSnackbar: true })
        console.error("error in axios " + error);
      });
  }
  markPresent = event => {
    var updateAsPresent = this.state.chosen
    for (var i = 0; i < updateAsPresent.length; i++) {
      axios.put(`${API}Attendance/addAttendee?attendanceId=${this.state.tableTutorialDate}&userId=${updateAsPresent[i]}`)
        .then(result => {
          this.setState({
            openSnackbar: true,
            message: "Student(s) marked as present"
          })
          window.location.reload()
        })
        .catch(error => {
          this.setState({ message: error.response.data, openSnackbar: true })
          console.error("error in axios " + error);
        });
    }
  }
  markAbsent = event => {
    var updateAsAbsent = this.state.chosen
    console.log(updateAsAbsent)
    for (var i = 0; i < updateAsAbsent.length; i++) {
      axios.put(`${API}Attendance/removeAttendee?attendanceId=${this.state.tableTutorialDate}&userId=${updateAsAbsent[i]}`)
        .then(result => {
          this.setState({
            openSnackbar: true,
            message: "Student(s) marked as absent"
          })
          window.location.reload()
        })
        .catch(error => {
          this.setState({ message: error.response.data, openSnackbar: true })
          console.error("error in axios " + error);
        });
    }
  }

  render() {
    return (
      <div>
        <MDBContainer>
          <MDBRow>
            <MDBCol size="8">
              <h2 className="font-weight-bold"> Attendance </h2>
              <hr />
            </MDBCol>
            <MDBCol align="right" size="4">
              <MDBBtn onClick={this.toggle} color="primary" >Create Attendance</MDBBtn>
            </MDBCol>
          </MDBRow>
          <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
            <MDBModalHeader toggle={this.toggle}>Create Attendance</MDBModalHeader>
            <MDBModalBody>
              <MDBRow >
                <MDBCol>
                  {this.displaySelect()}
                </MDBCol>
              </MDBRow>
              <MDBRow style={{ paddingTop: "20px" }}>
                <MDBCol>
                  {this.displayVariousClasses()}
                </MDBCol>
              </MDBRow>
            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={this.toggle}>Close</MDBBtn>
              <MDBBtn color="primary" onClick={this.handleClickOpen}>Generate QRCode</MDBBtn> {/**generate qr code */}
            </MDBModalFooter>
          </MDBModal>

          <Dialog
            open={this.state.open}
            onClose={this.handleClickClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullScreen={true}
            fullWidth={true}
          >
            <DialogTitle id="alert-dialog-title">{this.getCurrenDate()}</DialogTitle>
            <DialogContent>
              {this.generateQRCode()}
            </DialogContent>
            <DialogActions>
              <MDBBtn variant="contained" color="primary" onClick={this.handleClickClose}>Close</MDBBtn>
            </DialogActions>
          </Dialog>

          {this.showAttendance()}

        </MDBContainer>
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
      </div>
    );
  }
}

export default styled(ModuleAttendancePageTeacher)`
.module-content{
  margin - left: 270px;
  margin-top: 40px;
    }
`;
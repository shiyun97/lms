import React, { Component } from "react";
import styled from 'styled-components';
import { MDBContainer, MDBModal, MDBModalHeader, MDBRow, MDBModalBody, MDBModalFooter, MDBCol, MDBBtn } from "mdbreact";
import { Dialog, DialogTitle, DialogContent, DialogActions, AppBar, Tabs, Tab, Typography, Paper, InputLabel, Select } from '@material-ui/core';
import axios from "axios";
import SwipeableViews from 'react-swipeable-views';
import { Table } from 'semantic-ui-react'

const API = "http://localhost:8080/LMS-war/webresources/"
var QRCode = require('qrcode.react');

class ModuleAttendancePageTeacher extends Component {

  state = {
    modal: false,
    open: false,
    classType: "",
    lectureList: "",
    tutorialList: "",
    moduleId: "",
    classgroup: "",
    index: 0,
    value: 0,
    moduleTitle: "",
    selectedLectureAttendance: "",
    selectedTutorialAttendance: "",
    studentListLecture: "",
    allLectureAttendance: ""
  }

  componentDidMount() {
    this.initPage();
  }

  initPage() {
    let moduleId = this.props.moduleId;
    this.setState({ moduleId: moduleId })
    console.log(moduleId)

    //get all lectures
    axios.get(`${API}ModuleMounting/getModule/${moduleId}`)
      .then(result => {
        this.setState({ lectureList: result.data.lectureDetails, moduleTitle: result.data.title })
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

    //get all students in the module (for lecture)
    axios.get(`${API}ModuleMounting/getAllStudentByModule?moduleId=${moduleId}`)
      .then(result => {
        this.setState({ studentListLecture: result.data.userList })
        console.log(this.state.studentListLecture)
      })
      .catch(error => {
        console.error("error in axios " + error);
      });

    //get all attendance for lecture
    axios.get(`${API}Attendance/getAllAttendance?moduleId=${moduleId}`)
      .then(result => {
        this.setState({ allLectureAttendance: result.data.attendanceList })
        console.log(this.state.allLectureAttendance)
      })
      .catch(error => {
        console.error("error in axios " + error);
      });
  }

  generateQRCode = event => {
    let url = window.location.href.split('/');
    // console.log(url)
    let qrcode_url = url[0] + "/" + url[1] + "/" + url[2] + "/login";

    return (
      <MDBCol align="center">
        <QRCode value="http://172.25.99.9:8081/" size={450} />
        {/* <QRCode value={qrcode_url} size={450} /> */}
      </MDBCol>
    )
  }

  handleClickOpen = event => {
    let date = new Date()
    if ((this.state.classType === "") || (this.state.classType==="lecture" && this.state.classgroup==="") || (this.state.classType==='tutorial' && this.state.classgroup==="")) {
      return (
        //TODO: add alert/ snackbar
        <h6>Please select all fields!</h6>
      )
    } else if (this.state.classType === 'lecture') { //create lecture attendance
      this.setState({ open: true, modal: false })
      axios.post(`${API}Attendance/createAttendance?moduleId=${this.state.moduleId}`, { startTs: date })
        .then(result => {
          alert("lecture attendance list created")
          this.generateQRCode()
        })
        .catch(error => {
          console.error("error in axios " + error);
        });
    } else { //create tutorial attendance
      axios.post(`${API}Attendance/createAttendance?tutoriald=${this.state.classgroup}`, { date })
        .then(result => {
          alert("tutorial attendance lsit created")
          this.generateQRCode()
        })
        .catch(error => {
          console.error("error in axios " + error);
        });
    }
  }

  handleClickClose = event => {
    this.setState({ open: false })
    this.initPage() //TODO: refresh the page
  }

  toggle = event => {
    this.setState({ modal: !this.state.modal })
  }

  handleSelectClasstype = event => {
    this.setState({ classType: event.target.value }, () => event);
  }

  handleSelectClassgroup = event => {
    this.setState({ classgroup: event.target.value })
  }

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };
  //TODO:
  showAttendance = () => {
    //attendance for the week
    // button to go back and forth of the week?

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
            <Typography component="div">{this.displayLectureSlots()}</Typography>
            <Typography component="div">{this.displayTutorialSlots()}</Typography>
          </SwipeableViews>
        </Paper>
      </div>
    )
  }

  displayLectureSlots = () => {
    //get all attendance dates for lecture
    /* var lectureAttendanceDate =[]
    for (var i=-0; i<lectureAttendanceDate.length; i++) {
      lectureAttendanceDate.push((this.state.allLectureAttendance.startTs).split) //FIXME: split the string to get the date
    } */
    return (
      <div>
        <MDBRow>
          <MDBCol align="right">
            <select className="browser-default custom-select" style={{ maxWidth: 250 }}>
              <option>Group</option>
              <option value="1">Group 1</option>
            </select>

            <select className="browser-default custom-select" style={{ maxWidth: 250 }}>
              <option>Date</option>
              {/**TODO: map the attendance dates */}
              <option value="1">{this.state.lectureList}</option>
            </select>
            <MDBBtn onClick={this.getLectureAttendance}>Get</MDBBtn>
          </MDBCol>
        </MDBRow>
        {this.displaySelectedLectureAttendance()}
      </div>
    )
  }

  getLectureAttendance = event => {
    //TODO:
    console.log("get lecture attendance by id")
    /*     axios.get(`${API}Attendance/getAllAttendance?moduleId=${moduleId}`)
          .then(result => {
            this.setState({ selectedLectureAttendance: result.data.lectureDetails, moduleTitle: result.data.title })
          })
          .catch(error => {
            console.error("error in axios " + error);
          }); */
  }

  displaySelectedLectureAttendance = () => {
    //TODO: update table. map out. put onclick on all cells
    /* if (this.state.selectedLectureAttendance.length !== 0) { */
    return (
      <div>
        <br />
        <MDBCol align="right">
          <h6 style={{ color: "red" }}>Click on the cells to mark the attendance</h6>
        </MDBCol>
        <Table celled striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell >Name</Table.HeaderCell>
              <Table.HeaderCell>Attendance</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell style={{ width: 550 }}>John</Table.Cell>
              <Table.Cell selectable>
                <a href='#'>Edit</a>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Jamie</Table.Cell>
              <Table.Cell>Approved</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Jill</Table.Cell>
              <Table.Cell>Denied</Table.Cell>
            </Table.Row>
            <Table.Row warning>
              <Table.Cell>John</Table.Cell>
              <Table.Cell>No Action</Table.Cell>

            </Table.Row>
            <Table.Row>
              <Table.Cell>Jamie</Table.Cell>
              <Table.Cell style={{ color: this.handleAttendanceColour() }} onClick={this.testClick}>Approved</Table.Cell>

            </Table.Row>
            <Table.Row>
              <Table.Cell>Jill</Table.Cell>
              <Table.Cell negative>Denied</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
        <MDBCol align="right">
          <MDBBtn color="danger" onClick={this.deleteLectureAttendance}>Delete</MDBBtn>
        </MDBCol>
      </div>
    )
    /* } */
  }

  //TODO: manual attendance marking
  testClick = event => {
    console.log("test")
  }

  //TODO: update colour based on click
  handleAttendanceColour = () => {
    return "green"
  }

  //TODO: lecture attendance id
  deleteLectureAttendance = event => {
    console.log("deleteLectureAttendance")
    /*     axios.delete(`${API}Attendance/deleteAttendance?moduleId=${this.props.moduleId}&attendanceId=${}`)
          .then(result => {
            console.log("Deleted")
            this.initPage()
          })
          .catch(error => {
            console.error("error in axios " + error);
          }); */
  }

  displayTutorialSlots = () => {
    return (
      <div>
        <MDBRow>
          <MDBCol align="right">
            <select className="browser-default custom-select" style={{ maxWidth: 250 }}>
              <option>Group</option>
              {this.state.tutorialList && this.state.tutorialList.map(
                (group) => <option key={group.tutorialId} value={group.timing}>{group.tutorialId}</option>)
              }
            </select>
            <select className="browser-default custom-select" style={{ maxWidth: 250 }}>
              <option>Date</option>
              {/**TODO: map the attendance dates */}
              {this.state.tutorialList && this.state.tutorialList.map(
                (group) => <option key={group.tutorialId} value={group.timing}>{group.tutorialId}</option>)
              }
            </select>
            <MDBBtn onClick={this.getTutorialAttendance}>Get</MDBBtn>
          </MDBCol>
        </MDBRow>
        {this.displaySelectedTutorialAttendance()}
      </div>
    )
  }

  getTutorialAttendance = event => {
    //TODO:
    console.log("get tutorial attendance by id")
    /*     axios.get(`${API}Attendance/getAllAttendance?moduleId=${moduleId}`)
      .then(result => {
        this.setState({ selectedLectureAttendance: result.data.lectureDetails, moduleTitle: result.data.title })
      })
      .catch(error => {
        console.error("error in axios " + error);
      }); */
  }

  displaySelectedTutorialAttendance = () => {
    //TODO:
    if (this.state.selectedTutorialAttendance.length !== 0) {
      return (
        <h2>display tutorial attendance</h2>
      )
    }
  }

  //TODO: tutorial attendance id and tutorial id
  deleteTutorialAttendance = event => {
    console.log("deleteTutorialAttendance")
    /*     axios.delete(`${API}Attendance/deleteAttendance?tutorialId=${}&attendanceId=${}`)
          .then(result => {
            console.log("Deleted")
            this.initPage()
          })
          .catch(error => {
            console.error("error in axios " + error);
          }); */
  }

  getCurrenDate = () => {
    var currentDate = new Date()
    return (
      <MDBCol align="right">
        <h3>{currentDate.getDate()}/{currentDate.getMonth()}/{currentDate.getFullYear()}</h3>
      </MDBCol>
    )
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
      //map the lectures
    } else if (this.state.classType === "tutorial") {
      return (
        <select value={this.state.classgroup} onChange={this.handleSelectClassgroup} className="browser-default custom-select">
          <option>Choose an option</option>
          {this.state.tutorialList && this.state.tutorialList.map(
            (group) => <option key={group.tutorialId} value={group.tutorialId}>{group.timing}</option>)
          }
        </select>
      )
      //map tutorials
    } else {
      return null
    }
  }

  render() {
    return (

      <MDBContainer>
        <MDBRow>
          <MDBCol size="8">
            <h2 className="font-weight-bold"> Attendance </h2></MDBCol>
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

        <hr className="my-3" />
        {this.showAttendance()}

      </MDBContainer>

    );
  }
}

export default styled(ModuleAttendancePageTeacher)`
.module-content{
          margin - left: 270px;
        margin-top: 40px;
    }
`;
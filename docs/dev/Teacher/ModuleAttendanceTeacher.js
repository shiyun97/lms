import React, { Component } from "react";
import styled from 'styled-components';
import { MDBContainer, MDBModal, MDBModalHeader, MDBRow, MDBModalBody, MDBModalFooter, MDBCol, MDBBtn } from "mdbreact";
import { Dialog, DialogTitle, DialogContent, DialogActions, AppBar, Tabs, Tab, Typography, Paper, InputLabel, Select } from '@material-ui/core';
import axios from "axios";
import SwipeableViews from 'react-swipeable-views';
import ModuleSideNavigation from "../ModuleSideNavigation";

const API = "http://localhost:8080/LMS-war/webresources/"
var QRCode = require('qrcode.react');

class ModuleAttendanceTeacher extends Component {

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
    selectedTutorialAttendance: ""
  }

  componentDidMount() {
    this.initPage();
  }

  initPage() {
    // get all lectures
    let moduleId = this.props.moduleId;
    this.setState({ moduleId: moduleId })
    console.log(moduleId)

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
  }

  //TODO: create attendance
  generateQRCode = event => {
    /*  axios.put(`${API}Attendance/createAttendance?moduleId=${this.state.moduleId}`, {
       // what to send in 
     })
       .then(result => { */
    return (
      //set the time for the qr code to expire
      <MDBCol align="center">
        <QRCode value="http://192.168.1.135:8082/myCourses" size={450} />
      </MDBCol>
    )
    /*  })
     .catch(error => {
       console.error("error in axios " + error);
     }); */
  }

  handleClickOpen = event => {
    if (this.state.classType === "") {
      return (
        //TODO: add alert/ snackbar
        <h6>Please select a classtype!</h6>
      )
    } else {
      this.setState({ open: true, modal: false })
    }
  }

  handleClickClose = event => {
    this.setState({ open: false })
    this.initPage()
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
    // breadcrumb to go back and forth of the week

    return (
      <div data-test="component-mediaUploadPage">
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
    //TODO:
    if (this.state.selectedLectureAttendance.length !== 0) {
      return (
        <h2>display lecture attendance</h2>
      )
    }
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
            (group) => <option key={group.tutorialId} value={group.timing}>{group.timing}</option>)
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
      <div className={this.props.className}>
        <ModuleSideNavigation moduleId={this.props.moduleId}></ModuleSideNavigation>
        <div className="module-content">

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
        </div>
      </div>
    );
  }
}

export default styled(ModuleAttendanceTeacher)`
.module-content{
          margin - left: 270px;
        margin-top: 40px;
    }
`;
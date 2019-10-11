import React, { Component } from "react";
import styled from 'styled-components';
import { MDBContainer, MDBModal, MDBModalHeader, MDBRow, MDBModalBody, MDBModalFooter, MDBCol, MDBIcon, MDBBtn, MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import ModuleSideNavigation from "./ModuleSideNavigation";
import SectionContainer from "../components/sectionContainer";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Modal, AppBar, Tabs, Tab, Typography, Paper } from '@material-ui/core';
import { Table, TabPane } from 'semantic-ui-react'
import axios from "axios";
import SwipeableViews from 'react-swipeable-views';


const API = "http://localhost:8080/LMS-war/webresources/"
var QRCode = require('qrcode.react');

class ModuleAttendancePage extends Component {

  state = {
    modal: false,
    open: false,
    classType: "",
    lectureList: "",
    tutorialList: "",
    moduleId: "",
    classgroup: "",
    index: 0
  }

  componentDidMount() {
    this.initPage();

  }

  initPage() {
    /* if (moduleId) {
        console.log(moduleId);
        // retrieve module & set state
    } */
    // get all lectures
    let moduleId = this.props.match.params.moduleId;
    this.setState({ moduleId: moduleId })
    console.log(moduleId)

    axios.get(`${API}ModuleMounting/getModule/${moduleId}`)
      .then(result => {
        console.log("lecture list: " + result.data.lectureDetails)

        this.setState({ lectureList: result.data.lectureDetails })
      })
      .catch(error => {
        console.error("error in axios " + error);
      });

    //get all tutorials
    axios.get(`${API}ModuleMounting/getAllTutorialByModule?moduleId=${moduleId}`)
      .then(result => {
        console.log("tutorial list: " + result.data.tutorials)
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
        <QRCode value="http://172.25.103.184:3100/" size={450} />
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
    window.location.reload()
    this.setState({ open: false })
    //TODO: axios display updated attendance list
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
{/*         <AppBar position="static" color="default">
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label="Item One" />
            <Tab label="Item Two" />
          </Tabs>
        </AppBar>
        <Paper>
          <SwipeableViews
            axis={"x-reverse"}
            index={this.state.value}
            onChangeIndex={this.handleChangeIndex}
          >
            <Typography
              component="div"
              role="tabpanel"
              hidden={this.state.value !== this.state.index}
              id={`full-width-tabpanel-${this.state.index}`}
              aria-labelledby={`full-width-tab-${this.state.index}`}
            >fist
            </Typography>
            <Typography
              component="div"
              role="tabpanel"
              hidden={this.state.value !== this.state.index}
              id={`full-width-tabpanel-${this.state.index}`}
              aria-labelledby={`full-width-tab-${this.state.index}`}
            >second
            </Typography>
          </SwipeableViews>
        </Paper> */}
      </div>
    )
  }

  getCurrenDate = () => {
    var currentDate = new Date()
    return (
      <MDBCol align="right">
        <h3>{currentDate.getDate()}/{currentDate.getMonth()}/{currentDate.getFullYear()}</h3>
      </MDBCol>
    )
  }
  //TODO:
  createAttendance = () => {
    return (
      <div>hello</div>
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
        <select value={this.state.classType} onChange={this.handleSelectClassgroup} className="browser-default custom-select">
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
        <ModuleSideNavigation moduleId={this.props.match.params.moduleId}></ModuleSideNavigation>
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

export default styled(ModuleAttendancePage)`
.module-content{
    margin-left: 270px;
    margin-top: 40px;
}
`;

import React, { Component } from "react";
import { MDBJumbotron, MDBCardBody, MDBCard, MDBCardTitle, MDBInputGroup, MDBCardText, MDBBreadcrumb, MDBBreadcrumbItem, MDBProgress, MDBIcon, MDBRow, MDBBtn, MDBCol, MDBAnimation, MDBModal, MDBModalBody, MDBModalFooter, MDBModalHeader } from "mdbreact";
import { NavLink } from 'react-router-dom';
import { Fab } from '@material-ui/core';
import axios from "axios";
import { observer, inject } from 'mobx-react';
import { TextField, Snackbar, Checkbox } from '@material-ui/core';
import moment from 'moment';

@inject('dataStore')
@observer
class DashboardPageTeacher extends Component {

  state = {
    status: "retrieving",
    annoucementList: [],
    modal1: false,
    openSnackbar: false,
    message: "",
    recall: "",
    analyticsList: [],
    analyticsMessage: "Analytics is not available at the moment.",

    //announcement fields
    content: "",
    emailNotification: false,
    publish: false,
    createdDate: "",
    lastUpdateDate: "",
    startDate: "",
    endDate: "",
    title: "",
    moduleId: ""
  };

  componentDidMount() {
    this.getTeacherModules();
    this.getActiveAnnouncementDetails();
    this.getListModuleAnalytics();
  }

  getTeacherModules = () => {
    const { userId } = this.props.dataStore;
    axios
      .get(`http://localhost:8080/LMS-war/webresources/module/retrieveTeacherModules/${userId}`)
      .then(result => {
        // console.log(result.data.modules)
        this.props.dataStore.updateModules(result.data.modules);
        this.setState({
          status: "done"
        });
      })
      .catch(error => {
        this.setState({
          status: "error"
        });
        console.error("error in axios " + error);
      });
  }

  getListModuleAnalytics = () => {
    const { userId } = this.props.dataStore;
    axios
      .get(`http://localhost:8080/LMS-war/webresources/analytics/retrieveListBarAnalytics?userId=${userId}`)
      .then(result => {
        this.setState({
          analyticsList: result.data.bars
        });
        // console.log(this.state.analyticsList)
      })
      .catch(error => {
        console.error("error in axios " + error);
      });
  }

  componentDidUpdate() {
    if (this.state.recall === "recallAnn")
      this.getActiveAnnouncementDetails();
  }

  handleOpenSnackbar = () => {
    this.setState({ openSnackbar: true });
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ openSnackbar: false });
  };

  toggle = (nr) => {
    let modalNumber = "modal" + nr;
    this.setState({
      [modalNumber]: !this.state[modalNumber]
    });
  };

  handleChange = event => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
    // console.log(event.target.value)
  }

  handleCheckBoxChange = name => event => {
    this.setState({ [name]: event.target.checked });
    // console.log(this.state.emailNotification, this.state.publish)
  };

  getActiveAnnouncementDetails = () => {
    axios
      .get(`http://localhost:8080/LMS-war/webresources/Annoucement/getAllAnnoucement`)
      .then(result => {
        // console.log(result.data.annoucementList)
        this.setState({ annoucementList: result.data.annoucementList, recall: "" })
      })
      .catch(error => {
        console.error("error in axios " + error);
      });
  }

  renderAnnouncementSet = (announcement) => {
    return (
      <>
        <MDBRow tag="div" key={announcement.annoucementId}>
          <MDBCol md="6">
            <h6 style={{ fontWeight: "bold" }}>{announcement.title}</h6>
          </MDBCol>
          <MDBCol md="6" align="right">
            <h6 style={{ fontStyle: "italic", fontSize: "10px" }}> {moment(announcement.startDate).format('DD-MM-YYYY HH:mm:ss')} </h6>
          </MDBCol>
          {announcement.module !== null && announcement.module !== undefined &&
            <>
              <MDBCol md="12">
                <h6 style={{ fontSize: "12px", fontWeight: "bold" }}>{announcement.module.code} {announcement.module.title}</h6>
              </MDBCol>
            </>
          }
          <MDBCol md="12"> {announcement.content} </MDBCol>
        </MDBRow>
        <hr />
      </>
    )
  }

  createAnnouncement = () => {
    // console.log(this.state)
    var createdDate = new Date;
    createdDate = moment(createdDate).format("DD-MM-YYYY HH:mm:ss")
    var lastUpdateDate = createdDate
    var startDate = this.state.startDate;
    startDate = moment(startDate).format("DD-MM-YYYY HH:mm:ss")
    var endDate = this.state.endDate;
    endDate = moment(endDate).format("DD-MM-YYYY HH:mm:ss")
    var userId = sessionStorage.getItem('userId');
    axios
      .post(`http://localhost:8080/LMS-war/webresources/Annoucement/createModuleAnnoucement/${this.state.moduleId}?userId=${userId}`, {
        content: this.state.content,
        emailNotification: this.state.emailNotification,
        // publish: this.state.publish,
        createdDate: createdDate,
        lastUpdatedDate: lastUpdateDate,
        startDate: startDate + ":00",
        endDate: endDate + ":00",
        title: this.state.title
      })
      .then(result => {
        // console.log(result.data.annoucementList)
        this.setState({ openSnackbar: true, message: "Announcement successfully created", recall: "recallAnn", modal1: false })
      })
      .catch(error => {
        this.setState({ message: error.response.data.errorMessage, openSnackbar: true })
        console.error("error in axios " + error);
      });
  }

  renderCreateAnnouncementModalBox = () => {
    return (
      <MDBModal isOpen={this.state.modal1} toggle={() => this.toggle(1)}>
        <MDBModalHeader
          className="text-center"
          titleClass="w-100 font-weight-bold"
          toggle={() => this.toggle(1)}
        >
          Create Announcement
    </MDBModalHeader>
        <MDBModalBody>
          <form className="mx-3 grey-text">
            <MDBRow>
              <MDBCol md="12">
                <label className="grey-text mt-4">
                  Announcement Title
                </label>
                <input type="text" name="title" onChange={this.handleChange} className="form-control" />
              </MDBCol>
              <MDBCol md="12">
                <label className="grey-text mt-4">
                  Announcement Content
                </label>
                <textarea rows="3" type="text" name="content" onChange={this.handleChange} className="form-control" />
                <br />
              </MDBCol>
              <MDBCol md="12" className="mt-4">
                <MDBInputGroup
                  containerClassName="mb-3"
                  prepend="Module"
                  inputs={
                    <select name="moduleId" onChange={this.handleChange} className="browser-default custom-select">
                      <option value="0">Choose...</option>
                      {this.props.dataStore.getModules.map((mod) => <option value={mod.moduleId}>{mod.title}</option>)}
                    </select>
                  }
                />
              </MDBCol>
              <MDBCol md="6" className="mt-4">
                <TextField
                  id="startDate"
                  label="Start Date"
                  type="datetime-local"
                  name="startDate"
                  value={this.state.startDate}
                  onChange={this.handleChange}
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </MDBCol>
              <MDBCol md="6" className="mt-4">
                <TextField
                  id="endDate"
                  label="End Date"
                  type="datetime-local"
                  name="endDate"
                  value={this.state.endDate}
                  onChange={this.handleChange}
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </MDBCol>
              <MDBCol md="12" className="mt-4">
                Email Notification
                <Checkbox
                  checked={this.state.emailNotification}
                  onChange={this.handleCheckBoxChange('emailNotification')}
                  value="emailNotification"
                  name="emailNotification"
                  color="primary"
                  inputProps={{
                    'aria-label': 'secondary checkbox',
                  }}
                />
              </MDBCol>
            </MDBRow>
          </form>
        </MDBModalBody>
        <MDBModalFooter className="justify-content-center">
          <MDBRow>
            <MDBCol md="6">
              <MDBBtn onClick={() => this.toggle(1)} color="grey">Cancel</MDBBtn>
            </MDBCol>
            <MDBCol md="6">
              <MDBBtn onClick={() => this.createAnnouncement()} color="primary">Create</MDBBtn>
            </MDBCol>
          </MDBRow>
        </MDBModalFooter>
      </MDBModal>
    )
  }

  renderModuleAnalyticSection = (module) => {
    const { classSize, lectureAttendance, bookedConsultations, totalConsultations, quizAttempts, forumContributions } = module;
    var attendancePercentage = lectureAttendance / classSize * 100
    var consultationsPercentage = bookedConsultations / totalConsultations * 100
    var quizPercentage = quizAttempts / classSize * 100
    var forumPercentage = forumContributions / classSize * 100
    return (
      <div key={module.moduleId}>
        <MDBRow className="mb-4">
          <MDBCol md="12">
            <MDBBreadcrumb>
              <MDBBreadcrumbItem>{module.moduleCode + " " + module.moduleTitle}</MDBBreadcrumbItem>
              <MDBBreadcrumbItem active>Analytics</MDBBreadcrumbItem>
            </MDBBreadcrumb>
            <br />
          </MDBCol>
        </MDBRow>
        <MDBRow className="mb-4">
          <MDBCol xl="3" md="6" className="mb-r">
            <MDBCard className="cascading-admin-card">
              <div className="admin-up">
                <a href={`/modules/${module.moduleId}/attendance`}><MDBIcon icon="calendar-check" className="primary-color" /></a>
                <div className="data">
                  <p tag="div">ATTENDANCE</p>
                  <h4>
                    <strong>{lectureAttendance}/{classSize}</strong>
                  </h4>
                </div>
              </div>
              <MDBCardBody>
                <MDBProgress value={attendancePercentage} color="blue" />
                <MDBCardText>Attendance of Latest Lecture</MDBCardText>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol xl="3" md="6" className="mb-r">
            <MDBCard className="cascading-admin-card">
              <div className="admin-up">
                <a href={`/modules/${module.moduleId}/consultation`}><MDBIcon icon="calendar-alt" className="warning-color" /></a>
                <div className="data">
                  <p>CONSULTATIONS</p>
                  <h4>
                    <strong>{bookedConsultations}/{totalConsultations}</strong>
                  </h4>
                </div>
              </div>
              <MDBCardBody>
                <MDBProgress value={consultationsPercentage} color="warning" />
                <MDBCardText>Booked Consultations</MDBCardText>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol xl="3" md="6" className="mb-r">
            <MDBCard className="cascading-admin-card">
              <div className="admin-up">
                <a href={`/modules/${module.moduleId}/quiz`}><MDBIcon icon="star" className="green lighten-1" /></a>
                <div className="data">
                  <p>QUIZ</p>
                  <h4>
                    <strong>{quizAttempts}/{classSize}</strong>
                  </h4>
                </div>
              </div>
              <MDBCardBody>
                <MDBProgress value={quizPercentage} color="success" />
                <MDBCardText>Attempts for Latest Quiz</MDBCardText>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol xl="3" md="6" className="mb-r">
            <MDBCard className="cascading-admin-card">
              <div className="admin-up">
                <a href={`/modules/${module.moduleId}/forum/topics`}><MDBIcon icon="comments" className="red accent-2" /></a>
                <div className="data">
                  <p>FORUM</p>
                  <h4>
                    <strong>{forumContributions}/{classSize}</strong>
                  </h4>
                </div>
              </div>
              <MDBCardBody>
                <MDBProgress value={forumPercentage} color="danger" />
                <MDBCardText>Students Contributed</MDBCardText>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol md="12" className="mb-r" align="center">
            <br />
            <MDBBtn color="grey" href={`/modules/${module.moduleId}/analytics`}>View Detailed Analytics</MDBBtn>
          </MDBCol>
        </MDBRow>
        <br />
        <br />
      </div>
    )
  }

  setCurrModuleId = (moduleId) => { this.props.dataStore.setCurrModId(moduleId) }

  render() {
    return (
      <MDBRow>
        <MDBCol md="12" className="mt-3 mx-auto">
          <MDBJumbotron>
            <h2 className="font-weight-bold">
              Dashboard
            </h2>
            <p className="text-muted mb-1">
              AY {this.props.dataStore.getYear} SEMESTER {this.props.dataStore.getSem}
            </p>
            <MDBRow>
              <MDBCol md="8" className="mt-4">
                {this.props.dataStore.getModules.length === 0 && <h5>No modules available.</h5>}
                <MDBRow id="categories">
                  {this.props.dataStore.getModules.map((mod) =>
                    <MDBCol md="4" key={mod.moduleId}>
                      <MDBAnimation reveal type="fadeInUp">
                        <NavLink to={`/modules/${mod.moduleId}/`} onClick={() => this.setCurrModuleId(mod.moduleId)} activeClassName="activeClass">
                          <MDBCard cascade className="my-3 grey lighten-4">
                            <MDBCardBody tag="div" cascade>
                              <h6>{mod.code}</h6>
                              <MDBCardTitle>{mod.title}</MDBCardTitle>
                              <MDBCardText style={{ paddingTop: 40 }}>
                                AY{mod.yearOffered} SEM{mod.semesterOffered}<br />
                                Prof. {mod.assignedTeacher.firstName} {mod.assignedTeacher.lastName}
                              </MDBCardText>
                            </MDBCardBody>
                          </MDBCard>
                        </NavLink>
                      </MDBAnimation>
                    </MDBCol>
                  )}
                </MDBRow>
              </MDBCol>
              <MDBCol md="4" className="mt-4">
                <MDBAnimation reveal type="fadeInUp">
                  <MDBCard cascade className="my-3 white scrollbar scrollbar-primary m-auto" style={{ maxHeight: "400px" }}>
                    <MDBCardBody cascade>
                      <MDBRow>
                        <MDBCol md="9">
                          <MDBCardTitle style={{ fontSize: "20px" }}>Announcements</MDBCardTitle>
                        </MDBCol>
                        <MDBCol md="3" align="right">
                          <Fab color="default" size="small" aria-label="add" onClick={() => this.toggle(1)}>
                            <MDBIcon icon="plus" />
                          </Fab>
                        </MDBCol>
                      </MDBRow>
                      <MDBCardText tag="h6" style={{ paddingTop: 40 }}>
                        {this.state.annoucementList.map((announcement) => this.renderAnnouncementSet(announcement))}
                      </MDBCardText>
                    </MDBCardBody>
                  </MDBCard>
                </MDBAnimation>
              </MDBCol>
            </MDBRow>
          </MDBJumbotron>
          <MDBJumbotron>
            <h2 className="font-weight-bold">
              Quick Module Overview
            </h2>
            <MDBRow>
              <MDBCol md="12" className="mt-4">
                {this.props.dataStore.getModules.length === 0 && <h5>No modules available.</h5>}
                {this.state.analyticsList.map((mod) => { return this.renderModuleAnalyticSection(mod) })}
              </MDBCol>
            </MDBRow>
          </MDBJumbotron>
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
        {this.renderCreateAnnouncementModalBox()}
      </MDBRow>
    );
  }
}

export default DashboardPageTeacher;

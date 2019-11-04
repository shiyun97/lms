import React, { Component } from "react";
import { MDBJumbotron, MDBCardBody, MDBCard, MDBCardTitle, MDBCardText, MDBRow, MDBCol, MDBAnimation } from "mdbreact";
import { NavLink } from 'react-router-dom';
import axios from "axios";
import { observer, inject } from 'mobx-react';
import moment from 'moment';

@inject('dataStore')
@observer
class DashboardPageStudent extends Component {

  state = {
    status: "retrieving",
    annoucementList: []
  };

  componentDidMount() {
    const { userId } = this.props.dataStore
    axios
      .get(`http://localhost:8080/LMS-war/webresources/studentEnrollment/retrieveStudentModules/${userId}`)
      .then(result => {
        console.log(result.data.modules)
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

    this.getActiveAnnouncementDetails();
  }

  getActiveAnnouncementDetails = () => {
    axios
      .get(`http://localhost:8080/LMS-war/webresources/Annoucement/getAllAnnoucement`)
      .then(result => {
        // console.log(result.data.annoucementList)
        this.setState({ annoucementList: result.data.annoucementList })
      })
      .catch(error => {
        console.error("error in axios " + error);
      });
  }

  renderAnnouncementSet = (announcement) => {
    return (
      <>
        <MDBRow>
          <MDBCol md="6">
            <h6 style={{ fontWeight: "bold" }}>{announcement.title}</h6>
          </MDBCol>
          <MDBCol md="6" align="right">
            <h6 style={{ fontStyle: "italic", fontSize: "10px" }}> {moment(announcement.startDate).format('DD-MM-YYYY HH:mm:ss')} </h6>
          </MDBCol>
          {(announcement.module !== null || announcement.module !== undefined) &&  
            <>
              <MDBCol md="12">
                <h6 style={{ fontSize: "12px" }}>{announcement.module.code} {announcement.module.title}</h6>
                <h6 style={{ fontSize: "12px" }}>Posted by: {announcement.owner}</h6>
              </MDBCol>
            </>
          }
          <MDBCol md="12"> {announcement.content} </MDBCol>
        </MDBRow>
        <hr />
      </>
    )
  }

  setCurrModuleId = (moduleId) => { this.props.dataStore.setCurrModId(moduleId) }

  render() {
    console.log("test")
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
                            <MDBCardBody cascade>
                              <h6>{mod.code}</h6>
                              <MDBCardTitle>{mod.title}</MDBCardTitle>
                              <MDBCardText style={{ paddingTop: 40 }}>
                                AY{this.props.dataStore.getYear} SEM{this.props.dataStore.getSem} <br />
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
                  <MDBCard cascade className="my-3 white scrollbar scrollbar-primary m-auto" style={{ maxHeight: "600px" }}>
                    <MDBCardBody cascade>
                      <MDBRow>
                        <MDBCol md="9">
                          <MDBCardTitle style={{ fontSize: "20px" }}>Announcements</MDBCardTitle>
                        </MDBCol>
                        <MDBCol md="3" align="right">
                          {/* <Fab color="default" size="small" aria-label="add">
                            <MDBIcon icon="plus" />
                          </Fab> */}
                        </MDBCol>
                      </MDBRow>
                      <MDBCardText style={{ paddingTop: 40 }}>
                        {this.state.annoucementList.map((announcement) => this.renderAnnouncementSet(announcement))}
                      </MDBCardText>
                    </MDBCardBody>
                  </MDBCard>
                </MDBAnimation>
              </MDBCol>
            </MDBRow>
          </MDBJumbotron>
        </MDBCol>
      </MDBRow>
    );
  }
}

export default DashboardPageStudent;

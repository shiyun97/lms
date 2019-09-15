import React, { Component } from "react";
import Fab from '@material-ui/core/Fab';
import { MDBEdgeHeader, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBJumbotron, MDBCardBody, MDBCard, MDBCardTitle, MDBCardText, MDBIcon, MDBContainer, MDBRow, MDBCol, MDBAnimation } from "mdbreact";
import { NavLink } from 'react-router-dom';

class DashboardPage extends Component {

  state = {
    modal1: false
  };

  toggle = nr => () => {
    let modalNumber = "modal" + nr;
    this.setState({
      [modalNumber]: !this.state[modalNumber]
    });
  };

  render() {
    return (
      <>
        <MDBEdgeHeader color="indigo darken-3" className="loginPage" />
        <MDBContainer style={{ paddingBottom: 240 }}>
          <MDBRow>
            <MDBCol md="12" className="mt-3 mx-auto">
              <MDBJumbotron>
                <h2 className="font-weight-bold">
                  Dashboard
      </h2>
                <p className="text-muted mb-1">
                  AY XX/XX SEMESTER XX
          </p>
                <MDBRow>
                  <MDBCol md="8" className="mt-4">
                    <MDBRow id="categories">
                      <MDBCol md="4">
                        <MDBAnimation reveal type="fadeInUp">
                          <MDBCard cascade className="my-3 white lighten-4">
                            <MDBCardBody cascade align="center">
                              <Fab onClick={this.toggle(1)} color="primary" size="small" aria-label="add">
                                <MDBIcon icon="plus" />
                              </Fab>
                              <MDBCardTitle align="center" style={{ paddingTop: 20 }} className="grey-text">
                                Create New Module
                          </MDBCardTitle>
                            </MDBCardBody>
                          </MDBCard>
                        </MDBAnimation>
                      </MDBCol>
                      <MDBCol md="4">
                        <MDBAnimation reveal type="fadeInUp">
                          <NavLink to="/modules/:moduleId/" activeClassName="activeClass">
                            <MDBCard cascade className="my-3 grey lighten-4">
                              <MDBCardBody cascade>
                                <h6>XX1234</h6>
                                <MDBCardTitle>MODULE NAME</MDBCardTitle>
                                <MDBCardText style={{ paddingTop: 40 }}>
                                  AY XX/XX SEM XX <br />
                                  PROFESSOR'S NAME
                          </MDBCardText>
                              </MDBCardBody>
                            </MDBCard>
                          </NavLink>
                        </MDBAnimation>
                      </MDBCol>
                      <MDBCol md="4">
                        <MDBAnimation reveal type="fadeInUp">
                          <NavLink to="/modules/:moduleId/" activeClassName="activeClass">
                            <MDBCard cascade className="my-3 grey lighten-4">
                              <MDBCardBody cascade>
                                <h6>XX1234</h6>
                                <MDBCardTitle>MODULE NAME</MDBCardTitle>
                                <MDBCardText style={{ paddingTop: 40 }}>
                                  AY XX/XX SEM XX <br />
                                  PROFESSOR'S NAME
                          </MDBCardText>
                              </MDBCardBody>
                            </MDBCard>
                          </NavLink>
                        </MDBAnimation>
                      </MDBCol>
                    </MDBRow>
                    <MDBRow id="categories">
                      <MDBCol md="4">
                        <MDBAnimation reveal type="fadeInUp">
                          <NavLink to="/modules/:moduleId/" activeClassName="activeClass">
                            <MDBCard cascade className="my-3 grey lighten-4">
                              <MDBCardBody cascade>
                                <h6>XX1234</h6>
                                <MDBCardTitle>MODULE NAME</MDBCardTitle>
                                <MDBCardText style={{ paddingTop: 40 }}>
                                  AY XX/XX SEM XX <br />
                                  PROFESSOR'S NAME
                          </MDBCardText>
                              </MDBCardBody>
                            </MDBCard>
                          </NavLink>
                        </MDBAnimation>
                      </MDBCol>
                      <MDBCol md="4">
                        <MDBAnimation reveal type="fadeInUp">
                          <NavLink to="/modules/:moduleId/" activeClassName="activeClass">
                            <MDBCard cascade className="my-3 grey lighten-4">
                              <MDBCardBody cascade>
                                <h6>XX1234</h6>
                                <MDBCardTitle>MODULE NAME</MDBCardTitle>
                                <MDBCardText style={{ paddingTop: 40 }}>
                                  AY XX/XX SEM XX <br />
                                  PROFESSOR'S NAME
                          </MDBCardText>
                              </MDBCardBody>
                            </MDBCard>
                          </NavLink>
                        </MDBAnimation>
                      </MDBCol>
                      <MDBCol md="4">
                        <MDBAnimation reveal type="fadeInUp">
                          <NavLink to="/modules/:moduleId/" activeClassName="activeClass">
                            <MDBCard cascade className="my-3 grey lighten-4">
                              <MDBCardBody cascade>
                                <h6>XX1234</h6>
                                <MDBCardTitle>MODULE NAME</MDBCardTitle>
                                <MDBCardText style={{ paddingTop: 40 }}>
                                  AY XX/XX SEM XX <br />
                                  PROFESSOR'S NAME
                          </MDBCardText>
                              </MDBCardBody>
                            </MDBCard>
                          </NavLink>
                        </MDBAnimation>
                      </MDBCol>
                    </MDBRow>
                  </MDBCol>
                  <MDBCol md="4" className="mt-4">
                    <MDBAnimation reveal type="fadeInUp">
                      <MDBCard cascade className="my-3 white scrollbar scrollbar-primary m-auto" style={{ maxHeight: "300px" }}>
                        <MDBCardBody cascade>
                          <MDBRow>
                            <MDBCol md="9">
                              <MDBCardTitle style={{ fontSize: "20px" }}>Announcements</MDBCardTitle>
                            </MDBCol>
                            <MDBCol md="3" align="right">
                              <Fab color="default" size="small" aria-label="add">
                                <MDBIcon icon="plus" />
                              </Fab>
                            </MDBCol>
                          </MDBRow>
                          <MDBCardText style={{ paddingTop: 40 }}>
                            <MDBRow>
                              <MDBCol md="6">
                                <h6 style={{ fontWeight: "bold" }}>Title of Announcement</h6>
                              </MDBCol>
                              <MDBCol md="6" align="right">
                                <h6 style={{ fontStyle: "italic", fontSize: "10px" }}>
                                  {/* DATE OF POST */} xx/xx/xxxx
                        </h6>
                              </MDBCol>
                              <MDBCol md="12">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </MDBCol>
                            </MDBRow>
                            <hr />
                            <MDBRow>
                              <MDBCol md="6">
                                <h6 style={{ fontWeight: "bold" }}>Title of Announcement</h6>
                              </MDBCol>
                              <MDBCol md="6" align="right">
                                <h6 style={{ fontStyle: "italic", fontSize: "10px" }}>
                                  {/* DATE OF POST */} xx/xx/xxxx
                        </h6>
                              </MDBCol>
                              <MDBCol md="12">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </MDBCol>
                            </MDBRow>
                            <hr />
                            <MDBRow>
                              <MDBCol md="6">
                                <h6 style={{ fontWeight: "bold" }}>Title of Announcement</h6>
                              </MDBCol>
                              <MDBCol md="6" align="right">
                                <h6 style={{ fontStyle: "italic", fontSize: "10px" }}>
                                  {/* DATE OF POST */} xx/xx/xxxx
                        </h6>
                              </MDBCol>
                              <MDBCol md="12">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </MDBCol>
                            </MDBRow>
                          </MDBCardText>
                        </MDBCardBody>
                      </MDBCard>
                      <br />
                      <MDBCard cascade className="my-3 white scrollbar scrollbar-primary m-auto" style={{ maxHeight: "300px" }}>
                        <MDBCardBody cascade>
                          <MDBCardTitle style={{ fontSize: "20px" }}>What's Due</MDBCardTitle>
                          <MDBCardText style={{ paddingTop: 40 }}>
                            <strong>Task Name</strong>
                            <br />Due Date
                  <hr />
                            <strong>Task Name</strong>
                            <br />Due Date
                  <hr />
                            <strong>Task Name</strong>
                            <br />Due Date
                  <hr />
                            <strong>Task Name</strong>
                            <br />Due Date
                  <hr />
                            <strong>Task Name</strong>
                            <br />Due Date
                </MDBCardText>
                        </MDBCardBody>
                      </MDBCard>
                    </MDBAnimation>
                  </MDBCol>
                </MDBRow>
              </MDBJumbotron>
            </MDBCol>
          </MDBRow>
          <MDBModal isOpen={this.state.modal1} toggle={this.toggle(1)}>
            <MDBModalHeader
              className="text-center"
              titleClass="w-100 font-weight-bold"
              toggle={this.toggle(1)}
            >
              Create Module
                        </MDBModalHeader>
            <MDBModalBody>
              <form className="mx-3 grey-text">
                <MDBRow>
                  <MDBCol md="6" className="mt-4">
                    <label className="grey-text">
                      Academic Career
                                        </label>
                    <input type="text" className="form-control" />
                  </MDBCol>
                  <MDBCol md="6" className="mt-4">
                    <label className="grey-text">
                      Term
                                        </label>
                    <input type="text" className="form-control" />
                  </MDBCol>
                  <br />
                  <MDBCol md="12" className="mt-4">
                    <MDBCard color="warning-color" text="white" className="text-center">
                      <MDBCardBody>
                        You are not able to change the Academic Career and Term once the module is created. Please check that you have indicated the correct academic year and semester.
                                    </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                  <MDBCol md="12" className="mt-4">
                    <label className="grey-text">
                      Module Code
                                        </label>
                  </MDBCol>
                  <MDBCol md="7">
                    <input type="text" className="form-control" />
                  </MDBCol>
                  <MDBCol md="5" align="right">
                    <MDBBtn outline size="sm" color="primary">Generate Code</MDBBtn>
                  </MDBCol>
                  <MDBCol md="12" className="mt-4">
                    <label className="grey-text">
                      Module Title
                                        </label>
                    <input type="text" className="form-control" />
                  </MDBCol>
                  <MDBCol md="6" className="mt-4">
                    <label className="grey-text">
                      Faculty
                                        </label>
                    <input type="text" className="form-control" />
                  </MDBCol>
                  <MDBCol md="6" className="mt-4">
                    <label className="grey-text">
                      Department
                                        </label>
                    <input type="text" className="form-control" />
                  </MDBCol>
                  <MDBCol md="6" className="mt-4">
                    <label className="grey-text">
                      Start Date
                                        </label>
                    <input type="text" className="form-control" />
                  </MDBCol>
                  <MDBCol md="6" className="mt-4">
                    <label className="grey-text">
                      End Date
                                        </label>
                    <input type="text" className="form-control" />
                  </MDBCol>
                </MDBRow>
              </form>
            </MDBModalBody>
            <MDBModalFooter className="justify-content-center">
              <MDBRow>
                <MDBCol md="6">
                  <MDBBtn onClick={this.toggle(1)} color="grey">Cancel</MDBBtn>
                </MDBCol>
                <MDBCol md="6">
                  <MDBBtn onClick={this.toggle(1)} color="primary">Create</MDBBtn>
                </MDBCol>
              </MDBRow>
            </MDBModalFooter>
          </MDBModal>
        </MDBContainer>
      </>
    );
  }
}

export default DashboardPage;

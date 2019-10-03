import React, { Component } from "react";
import { MDBEdgeHeader, MDBJumbotron, MDBCardBody, MDBCard, MDBCardTitle, MDBCardText, MDBIcon, MDBContainer, MDBRow, MDBCol, MDBAnimation } from "mdbreact";
import { NavLink } from 'react-router-dom';
import axios from "axios";
import { observer, inject } from 'mobx-react';

@inject('dataStore')
@observer
class DashboardPageStudent extends Component {

  state = {
    status: "retrieving"
  };

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
              <MDBCol md="12" className="mt-4">
                <MDBRow id="categories">
                  <MDBCol md="4">
                    <MDBAnimation reveal type="fadeInUp">
                      <NavLink to="/modules/:moduleId/" activeClassName="activeClass">
                        <MDBCard cascade className="my-3 grey lighten-4">
                          <MDBCardBody cascade>
                            <h6>XX1234</h6>
                            <MDBCardTitle>MODULE NAME</MDBCardTitle>
                            <MDBCardText style={{ paddingTop: 40 }}>
                              AY{this.state.year} SEM {this.state.semester} <br />
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
              {/* <MDBCol md="4" className="mt-4">
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
                                 xx/xx/xxxx
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
                                 xx/xx/xxxx
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
                                  xx/xx/xxxx
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
                  </MDBCol> */}
            </MDBRow>
          </MDBJumbotron>
        </MDBCol>
      </MDBRow>
    );
  }
}

export default DashboardPageStudent;

import React, { Component } from "react";
import { MDBEdgeHeader, MDBJumbotron, MDBCardBody, MDBCard, MDBCardTitle, MDBCardText, MDBIcon, MDBContainer, MDBRow, MDBCol, MDBAnimation } from "mdbreact";
import { NavLink } from 'react-router-dom';
import axios from "axios";

class DashboardPage extends Component {

  state = {
    year: "",
    semester: 0,
    status: "retrieving"
  };

  componentDidMount() {
    axios
      .get(`http://localhost:8080/LMS-war/webresources/studentEnrollment/getCurrentScheduleDetails`)
      .then(result => {
        console.log(result)
        this.setState({
          year: result.data.year,
          semester: result.data.semester,
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
                  AY {this.state.year} SEMESTER {this.state.semester}
                </p>
                <MDBRow>
                  <MDBCol md="8" className="mt-4">
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
                </MDBRow>
              </MDBJumbotron>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </>
    );
  }
}

export default DashboardPage;

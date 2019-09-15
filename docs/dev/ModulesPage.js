import React, { Component } from "react";
import { MDBInputGroup, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBCardBody, MDBCard, MDBCardTitle, MDBCardText, MDBNavLink, MDBContainer, MDBRow, MDBCol, MDBAnimation } from "mdbreact";
import { NavLink } from 'react-router-dom';

class ModulesPage extends Component {

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
            <MDBContainer style={{ paddingBottom: 240 }}>
                <MDBRow>
                    <MDBCol md="8" className="mt-4">
                        <h2 className="font-weight-bold" style={{ paddingTop: 50 }}>
                            Modules
                    </h2>
                        <MDBInputGroup
                            containerClassName="mb-3"
                            style={{ width: 300 }}
                            prepend="Term"
                            inputs={
                                <select className="browser-default custom-select">
                                    <option value="0">AY XX/XX SEMESTER XX</option>
                                    <option value="1">Past Semesters</option>
                                </select>
                            }
                        />
                    </MDBCol>
                    <MDBCol align="right" md="4" className="mt-4" style={{ paddingTop: 50 }}>
                        <MDBBtn onClick={this.toggle(1)} color="primary">Create Module</MDBBtn>
                    </MDBCol>
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
                    <MDBCol md="12">
                        <hr className="my-5" />
                        <MDBRow id="categories">
                            <MDBCol md="3">
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
                            <MDBCol md="3">
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
                            <MDBCol md="3">
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
                            <MDBCol md="3">
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
                            <MDBCol md="3">
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
                            <MDBCol md="3">
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
            </MDBContainer>
        );
    }
}

export default ModulesPage;

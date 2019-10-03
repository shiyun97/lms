import React, { Component } from "react";
import { MDBCardBody, MDBCard, MDBCardTitle, MDBCardText, MDBNavLink, MDBContainer, MDBRow, MDBCol, MDBAnimation } from "mdbreact";
import { NavLink } from 'react-router-dom';
import axios from "axios";
import { observer, inject } from 'mobx-react';

@inject('dataStore')
@observer
class ModulesPageStudent extends Component {

    state = {
        status: "retrieving"
    };

    render() {
        return (
            <MDBCol md="12">
                <hr className="my-5" />
                <MDBRow id="categories">
                    {/* {this.props.dataStore.getModules.map((mod) => */}
                        <MDBCol md="3">
                            <MDBAnimation reveal type="fadeInUp">
                                <NavLink to={`/modules/:moduleId/`} activeClassName="activeClass">
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
                    {/* )} */}
                </MDBRow>
            </MDBCol>
        );
    }
}

export default ModulesPageStudent;

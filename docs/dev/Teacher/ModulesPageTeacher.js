import React, { Component } from "react";
import { MDBCardBody, MDBCard, MDBCardTitle, MDBCardText, MDBNavLink, MDBContainer, MDBRow, MDBCol, MDBAnimation } from "mdbreact";
import { NavLink } from 'react-router-dom';
import axios from "axios";
import { observer, inject } from 'mobx-react';

@inject('dataStore')
@observer
class ModulesPageTeacher extends Component {

    state = {
        status: "retrieving"
    };

    componentDidMount() {
        const { userId } = this.props.dataStore
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

    render() {
        return (
            <MDBCol md="12">
                <hr className="my-5" />
                {this.props.dataStore.getModules.length === 0 && <h5>No modules available.</h5>}
                <MDBRow id="categories">
                    {this.props.dataStore.getModules.map((mod) =>
                        <MDBCol md="3" key={mod.moduleId}>
                            <MDBAnimation reveal type="fadeInUp">
                                <NavLink to={`/modules/${mod.moduleId}/`} activeClassName="activeClass">
                                    <MDBCard cascade className="my-3 grey lighten-4">
                                        <MDBCardBody cascade>
                                            <h6>{mod.code}</h6>
                                            <MDBCardTitle>{mod.title}</MDBCardTitle>
                                            <MDBCardText style={{ paddingTop: 40 }}>
                                                AY{this.props.dataStore.getYear} SEM{this.props.dataStore.getSem}<br />
                                                Prof. {this.props.dataStore.getFirstName} {this.props.dataStore.getLastName}
                                            </MDBCardText>
                                        </MDBCardBody>
                                    </MDBCard>
                                </NavLink>
                            </MDBAnimation>
                        </MDBCol>
                    )}
                </MDBRow>
            </MDBCol>
        );
    }
}

export default ModulesPageTeacher;

import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBCardText } from "mdbreact";
import { observer, inject } from 'mobx-react';
import styled from 'styled-components';
import ModuleSideNavigation from "./../ModuleSideNavigation";

@inject('dataStore')
@observer
class ModuleQuizPageCreateQuiz extends Component {

    state = {
        studentName: "",
        username: "",
        userId: "",
        email: "",
        moduleId: 0,
        message: ""
    }

    initPage() {
        let moduleId = this.props.match.params.moduleId;
        if (moduleId) {
            // console.log(moduleId);
            // retrieve module & set state
            this.setState({ moduleId: moduleId })
        }
    }

    componentDidMount() {
        this.initPage();
    }

    render() {
        return (
            <div className={this.props.className}>
                <ModuleSideNavigation moduleId={this.props.match.params.moduleId}></ModuleSideNavigation>
                <div className="module-content">
            <MDBContainer className="mt-3">
                <MDBRow style={{ paddingTop: 60 }}>
                    <MDBCol md="8">
                        <h2 className="font-weight-bold">
                            Create Quiz
                    </h2>
                    </MDBCol>
                    <MDBCol md="4" align="right">
                        {/* to edit profile for coursepack users */}
                        {this.props.dataStore.accessRight === "Public" && <MDBBtn color="primary">Edit Profile</MDBBtn>}
                    </MDBCol>
                </MDBRow>
                <MDBRow className="py-3">
                    <MDBCol md="12">
                        <MDBCard cascade className="my-3 grey lighten-4">
                            <MDBCardBody cascade>
                                <MDBCardText style={{ paddingTop: 10 }}>
                                    <strong>Create Quiz</strong>
                                    <MDBRow>
                                        <MDBCol md="2">
                                            First Name: <br />
                                            Last Name: <br />
                                            Username:<br />
                                            User ID:
                </MDBCol>
                                        <MDBCol md="10">
                                            {this.props.dataStore.getFirstName}
                                            <br />{this.props.dataStore.getLastName}
                                            <br />{this.props.dataStore.getUsername}
                                            <br />{this.props.dataStore.getUserId}
                                        </MDBCol>
                                    </MDBRow>
                                    {/* <MDBBtn size="sm" outline color="primary">Change Password</MDBBtn> */}
                                </MDBCardText>
                                <MDBCardText style={{ paddingTop: 10 }}>
                                    <strong>Contact Details</strong>
                                    <br />
                                    <MDBRow>
                                        <MDBCol md="2">
                                            Email:
                </MDBCol>
                                        <MDBCol md="10">
                                            {this.props.dataStore.getEmail}
                                        </MDBCol>
                                    </MDBRow>
                                </MDBCardText>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
            </div>
            </div>
        );
    }
}

export default styled(ModuleQuizPageCreateQuiz)`
.module-content{
    margin-left: 270px;
    margin-top: 40px;
}
`;
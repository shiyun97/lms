import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBIcon, MDBCardBody, MDBInputGroup, MDBCardText, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from "mdbreact";
import { observer, inject } from 'mobx-react';
import axios from "axios";
import { Snackbar } from '@material-ui/core';
import { Redirect } from "react-router-dom";
import styled from 'styled-components';
import MainSideNavDropdown from "./MainSideNavDropdown";

@inject('dataStore')
@observer
class UserProfilePage extends Component {

    state = {
        openSnackbar: false,
        username: "",
        userId: "",
        email: "",
        message: "",
        userId: 0,
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        gender: "",
        userRole: "",
        username: "",
        status: "",
        modal1: false,
        modal2: false
    }

    componentDidUpdate() {
        let userId = sessionStorage.getItem('userId')
        if (this.state.status === "recallUsers") {
            event.preventDefault();
            axios
                .get(`http://localhost:8080/LMS-war/webresources/User/getUser/${userId}`)
                .then(result => {
                    // console.log(result)
                    this.setState({ status: "" });
                    this.props.dataStore.setSignInStatus(
                        true,
                        result.data.email,
                        result.data.password,
                        result.data.accessRight
                    )
                    this.props.dataStore.setUserDetails(
                        result.data.userId,
                        result.data.gender,
                        result.data.firstName,
                        result.data.lastName,
                        result.data.username
                    )
                })
                .catch(error => {
                    this.setState({ status: "error" });
                    console.error("error in axios " + error);
                });
        }
    }

    editUser = () => {
        event.preventDefault();
        this.toggle(1);
        axios
            // .post("http://localhost:3001/newUser", {
            .post(`http://localhost:8080/LMS-war/webresources/User/updateUser`, {
                userId: this.state.userId,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                password: this.state.password,
                gender: this.state.gender,
                accessRight: this.state.accessRight,
                username: this.state.username
            })
            .then(result => {
                this.setState({
                    status: "recallUsers",
                    message: "User details updated successfully!",
                    openSnackbar: true
                });
            })
            .catch(error => {
                this.setState({
                    message: error.response.data.errorMessage,
                    openSnackbar: true
                });
                console.error("error in axios " + error);
            });
    }

    deleteUser = (userId) => {
        event.preventDefault();
        axios
            .delete(`http://localhost:8080/LMS-war/webresources/User/deleteUser?userId=${userId}`)
            .then(result => {
                this.setState({
                    status: "logout",
                    message: "User deleted successfully!",
                    openSnackbar: true
                });
                this.props.dataStore.setSignOutStatus();
            })
            .catch(error => {
                this.setState({
                    message: "Unable to delete user.",
                    openSnackbar: true
                });
                console.error("error in axios " + error);
            });
        this.toggle(2);
    }

    toggle = (nr) => {
        let modalNumber = "modal" + nr;
        this.setState({
            [modalNumber]: !this.state[modalNumber]
        });

        this.updateUserState();
    };

    renderEditUserModalBox = () => {
        return (
            <MDBModal isOpen={this.state.modal2} toggle={() => this.toggle(2)}>
                <MDBModalHeader
                    className="text-center"
                    titleClass="w-100 font-weight-bold"
                    toggle={() => this.toggle(2)}
                >
                    Delete Account
                        </MDBModalHeader>
                <MDBModalBody>
                    <center>You will not be able to revert this action. <br />
                        Are you sure you wish to delete account?</center>
                </MDBModalBody>
                <MDBModalFooter className="justify-content-center">
                    <MDBRow>
                        <MDBCol md="6">
                            <MDBBtn onClick={() => this.toggle(2)} color="grey">Cancel</MDBBtn>
                        </MDBCol>
                        <MDBCol md="6">
                            <MDBBtn onClick={() => this.deleteUser(this.props.dataStore.getUserId)} color="primary">Delete</MDBBtn>
                        </MDBCol>
                    </MDBRow>
                </MDBModalFooter>
            </MDBModal>
        )
    }

    renderDeleteUserModalBox = () => {
        return (
            <MDBModal isOpen={this.state.modal1} toggle={() => this.toggle(1)}>
                <MDBModalHeader
                    className="text-center"
                    titleClass="w-100 font-weight-bold"
                    toggle={() => this.toggle(1)}
                >
                    Update User Details
                        </MDBModalHeader>
                <MDBModalBody>
                    <form className="mx-3 grey-text">
                        <MDBRow>
                            <MDBCol md="6" className="mt-4">
                                <label className="grey-text">
                                    First Name
                                        </label>
                                <input type="text" className="form-control" defaultValue={this.state.firstName} onChange={this.handleChange} name="firstName" />
                            </MDBCol>
                            <MDBCol md="6" className="mt-4">
                                <label className="grey-text">
                                    Last Name
                                        </label>
                                <input type="text" className="form-control" defaultValue={this.state.lastName} onChange={this.handleChange} name="lastName" />
                            </MDBCol>
                            <br />
                            <MDBCol md="12" className="mt-4">
                                <label className="grey-text">
                                    Username
                                        </label>
                                <input type="text" className="form-control" defaultValue={this.state.username} onChange={this.handleChange} name="username" />
                            </MDBCol>
                            <br />
                            <MDBCol md="12" className="mt-4">
                                <label className="grey-text">
                                    Email
                                        </label>
                                <input type="text" className="form-control" defaultValue={this.state.email} onChange={this.handleChange} name="email" />
                            </MDBCol>
                            <MDBCol md="12" className="mt-4">
                                <label className="grey-text">
                                    Password
                                        </label>
                            </MDBCol>
                            <MDBCol md="12">
                                <input type="text" className="form-control" onChange={this.handleChange} defaultValue={this.state.password} name="password" />
                            </MDBCol>
                            <MDBCol md="12" className="mt-4">
                                <MDBInputGroup
                                    style={{ paddingTop: 32 }}
                                    containerClassName="mb-3"
                                    prepend="Gender"
                                    inputs={
                                        <select name="gender" value={this.state.gender} onChange={this.handleChange} className="browser-default custom-select">
                                            <option value="0">Choose...</option>
                                            <option value="Female">Female</option>
                                            <option value="Male">Male</option>
                                        </select>
                                    }
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
                            <MDBBtn onClick={() => this.editUser()} color="primary">Update</MDBBtn>
                        </MDBCol>
                    </MDBRow>
                </MDBModalFooter>
            </MDBModal>
        )
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

    handleChange = event => {
        event.preventDefault();
        this.setState({ [event.target.name]: event.target.value });
    }

    updateUserState = () => {
        this.setState({
            userId: this.props.dataStore.getUserId,
            firstName: this.props.dataStore.getFirstName,
            lastName: this.props.dataStore.getLastName,
            email: this.props.dataStore.getEmail,
            password: this.props.dataStore.getPassword,
            gender: this.props.dataStore.getGender,
            accessRight: this.props.dataStore.getAccessRight,
            username: this.props.dataStore.getUsername
        })
    }

    render() {
        if (this.state.status === "logout") {
            return <Redirect to={`/coursepack/login`} />
        }
        return (
            <div className={this.props.className}>
                <div className="module-navbar-small">
                    <MainSideNavDropdown moduleId={this.props.moduleId} activeTab={'Account'}></MainSideNavDropdown>
                </div>
                <div className="module-content">
                    <MDBContainer className="mt-3">
                        <MDBRow style={{ paddingTop: 60 }}>
                            <MDBCol md="8">
                                <h2 className="font-weight-bold">
                                    Your Account
                    </h2>
                            </MDBCol>
                            <MDBCol md="4" align="right">
                                {this.props.dataStore.accessRight === "Public" &&
                                    <><MDBBtn color="deep-orange" onClick={() => this.toggle(1)}>Edit Profile</MDBBtn>
                                        <MDBBtn color="grey" onClick={() => this.toggle(2)}>Delete Account</MDBBtn></>
                                }
                            </MDBCol>
                        </MDBRow>
                        <MDBRow className="py-3">
                            <MDBCol md="12">
                                <MDBCard cascade className="my-3 grey lighten-4">
                                    <MDBCardBody cascade>
                                        <MDBCardText style={{ paddingTop: 10 }}>
                                            <strong>Account Details</strong>
                                            <MDBRow>
                                                <MDBCol md="2">
                                                    First Name:
                                        </MDBCol>
                                                <MDBCol md="10">
                                                    {this.props.dataStore.getFirstName}
                                                </MDBCol>
                                                <MDBCol md="2">
                                                    Last Name:
                                        </MDBCol>
                                                <MDBCol md="10">
                                                    {this.props.dataStore.getLastName}
                                                </MDBCol>
                                                <MDBCol md="2">
                                                    Username:
                                        </MDBCol>
                                                <MDBCol md="10">
                                                    {this.props.dataStore.getUsername}
                                                </MDBCol>
                                                <MDBCol md="2">
                                                    User ID:
                                        </MDBCol>
                                                <MDBCol md="10">
                                                    {this.props.dataStore.getUserId}
                                                </MDBCol>
                                            </MDBRow>
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
                                                <MDBCol md="2">
                                                    Password:
                                        </MDBCol>
                                                <MDBCol md="10">
                                                    ********
                                        </MDBCol>
                                            </MDBRow>
                                        </MDBCardText>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                        </MDBRow>
                        {this.renderEditUserModalBox()}
                        {this.renderDeleteUserModalBox()}
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
                    </MDBContainer>
                </div>
            </div>
        );
    }
}

export default styled(UserProfilePage)`
.module-content{
    margin-top: 10px;
}
@media screen and (min-width: 800px) {
    .module-content{
        margin-left: 0px;
    }
    .module-navbar-small{
        display: none;
    }
    .module-sidebar-large{
        display: block;
    }
}
@media screen and (max-width: 800px) {
    .module-sidebar-large{
        display: none;
    }
    .module-navbar-small{
        display: block;
    }
}

.new-paragraph{
    margin-top: 0;
    margin-bottom: 1rem;
}
.align-right{
    float: right;
}
`;

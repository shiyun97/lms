import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBInputGroup, MDBCardText, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from "mdbreact";
import { observer, inject } from 'mobx-react';

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
        username: ""
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
                    status: "recallUsers",
                    message: "User deleted successfully!",
                    openSnackbar: true
                });
            })
            .catch(error => {
                this.setState({
                    message: "Unable to delete user.",
                    openSnackbar: true
                });
                console.error("error in axios " + error);
            });
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
                            {/* <MDBCol md="12" className="mt-4">
                                <label className="grey-text">
                                    Password
                                        </label>
                            </MDBCol>
                            <MDBCol md="12">
                                <input type="text" className="form-control" onChange={this.handleChange} defaultValue={this.state.password} name="password" />
                            </MDBCol> */}
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
                            {/* <MDBCol md="6" className="mt-4">
                                <MDBInputGroup
                                    style={{ paddingTop: 32 }}
                                    containerClassName="mb-3"
                                    prepend="User Role"
                                    inputs={
                                        <select name="accessRight" value={this.state.accessRight} onChange={this.handleChange} className="browser-default custom-select">
                                            <option value="0">Choose...</option>
                                            <option value="Teacher">Teacher</option>
                                            <option value="Student">Student</option>
                                            <option value="Admin">Admin</option>
                                            <option value="Public">Public</option>
                                        </select>
                                    }
                                />
                            </MDBCol> */}
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
        // console.log(this.state.accessRight) 
        // console.log(this.state.gender)
        // console.log(this.state.password)
        // console.log(this.state.email)
        // console.log(this.state.username)
        // console.log(this.state.firstName)
        // console.log(this.state.lastName)
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
        return (
            <MDBContainer className="mt-3">
                <MDBRow style={{ paddingTop: 60 }}>
                    <MDBCol md="8">
                        <h2 className="font-weight-bold">
                            Your Account
                    </h2>
                    </MDBCol>
                    <MDBCol md="4" align="right">
                        {/* to edit profile for coursepack users */}
                        {this.props.dataStore.accessRight === "Public" &&
                            <><MDBBtn color="primary" onClick={() => this.toggle(1)}>Edit Profile</MDBBtn>
                                <MDBBtn color="grey" onClick={() => this.deleteUser(this.props.dataStore.getUserId)}>Delete Account</MDBBtn></>
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
                                            Email: <br />
                                            Password:
                                        </MDBCol>
                                        <MDBCol md="10">
                                            {this.props.dataStore.getEmail} <br />
                                            ********
                                        </MDBCol>
                                    </MDBRow>
                                </MDBCardText>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
                {this.renderEditUserModalBox()}
            </MDBContainer>
        );
    }
}

export default UserProfilePage;

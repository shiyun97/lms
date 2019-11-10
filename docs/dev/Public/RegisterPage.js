import React, { Component } from "react";
import { MDBEdgeHeader, MDBContainer, MDBRow, MDBCol, MDBJumbotron, MDBAnimation, MDBInputGroup, MDBIcon } from "mdbreact";
import { observer, inject } from 'mobx-react';
import axios from "axios";
import Snackbar from '@material-ui/core/Snackbar';
import logo from '../img/coursepack-logo.jpg';

@inject('dataStore')
@observer
class RegisterPage extends Component {

    state = {
        creationSuccess: false,
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        gender: "",
        userRole: "",
        username: "",
        status: "",
        message: "",
        hidden: true,
        openSnackbar: false
    }

    submitHandler = event => {
        event.preventDefault();
        event.target.className += " was-validated";

        axios
            .put(`http://localhost:8080/LMS-war/webresources/User/createUser`, {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                password: this.state.password,
                gender: this.state.gender,
                accessRight: "Public",
                username: this.state.username
            })
            .then(result => {
                this.setState({
                    creationSuccess: true,
                    status: "done"
                });
            })
            .catch(error => {
                this.setState({
                    status: "error",
                    openSnackbar: true,
                    message: error.response.data.errorMessage
                });
                console.error("error in axios " + error);
            });
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

    handleOpenSnackbar = () => {
        this.setState({ openSnackbar: true });
    };

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ openSnackbar: false });
    };

    render() {
        // console.log(this.props.dataStore.getPath)
        if (this.state.creationSuccess === true) {
            return (
                <>
                    <MDBEdgeHeader color="indigo darken-3" className="loginPage" />
                    <MDBAnimation type="zoomIn" duration="500ms">
                        <MDBContainer>
                            <MDBRow>
                                <MDBCol md="8" className="mt-3 mx-auto">
                                    <MDBJumbotron>
                                        {this.state.status === "done" && <h3 className="text-center" style={{ fontWeight: "bold" }}>YOUR ACCOUNT IS SUCCESSFULLY CREATED!</h3>}
                                        {this.state.status === "done" && <center><a href="/coursepack/login">Login Now!</a></center>}
                                    </MDBJumbotron>
                                </MDBCol>
                            </MDBRow>
                        </MDBContainer>
                    </MDBAnimation>
                </>
            )
        }
        return (
            <>
                <MDBEdgeHeader color="indigo darken-3" className="loginPage" />
                <MDBAnimation type="zoomIn" duration="500ms">
                    <MDBContainer>
                        <MDBRow>
                            <MDBCol md="8" className="mt-3 mx-auto">
                                <MDBJumbotron>
                                    <center><img src={logo} width="50%" /></center>
                                    <h5 className="text-center">
                                        Create New Account
                                    </h5>
                                    <ul className="list-unstyled example-components-list">
                                        <form className="needs-validation" onSubmit={this.submitHandler}>
                                            <MDBRow>
                                                <MDBCol md="6" className="mt-4">
                                                    <label className="grey-text">
                                                        First Name
                                                    </label>
                                                    <input type="text" className="form-control" onChange={this.handleChange} name="firstName" required />
                                                </MDBCol>
                                                <MDBCol md="6" className="mt-4">
                                                    <label className="grey-text">
                                                        Last Name
                                                    </label>
                                                    <input type="text" className="form-control" onChange={this.handleChange} name="lastName" required />
                                                </MDBCol>
                                                <br />
                                                <MDBCol md="6" className="mt-4">
                                                    <label className="grey-text">
                                                        Username
                                                    </label>
                                                    <input type="text" className="form-control" onChange={this.handleChange} name="username" required />
                                                </MDBCol>
                                                <MDBCol md="6" className="mt-4">
                                                    <MDBInputGroup
                                                        style={{ paddingTop: 32 }}
                                                        containerClassName="mb-3"
                                                        prepend="Gender"
                                                        required
                                                        inputs={
                                                            <select name="gender" onChange={this.handleChange} className="browser-default custom-select">
                                                                <option value="0">Choose...</option>
                                                                <option value="Female">Female</option>
                                                                <option value="Male">Male</option>
                                                            </select>
                                                        }
                                                    />
                                                </MDBCol>
                                                <MDBCol md="6" className="mt-4">
                                                    <label className="grey-text">
                                                        Email
                                                    </label>
                                                    <input type="email" className="form-control" onChange={this.handleChange} name="email" required />
                                                    <div className="invalid-feedback">
                                                        Please provide a valid email.
                                                    </div>
                                                    <div className="valid-feedback">Looks good!</div>
                                                </MDBCol>
                                                <MDBCol md="6" className="mt-4">
                                                    <label className="grey-text">
                                                        Password
                                                    </label>
                                                    <MDBRow>
                                                        <MDBCol md="10">
                                                            <input type={this.state.hidden ? "password" : "text"} className="form-control" onChange={this.handleChange} name="password" defaultValue={this.state.password} required />
                                                        </MDBCol>
                                                        <MDBCol md="2" align="left">
                                                            <span onClick={() => this.setState({ hidden: !this.state.hidden })} class="fa fa-fw fa-eye field-icon toggle-password"></span>
                                                        </MDBCol>
                                                    </MDBRow>
                                                </MDBCol>
                                                <MDBCol md="12" className="mt-4">
                                                    <div className="text-center mt-4">
                                                        <button className="btn btn-indigo" type="submit">
                                                            Sign Up
                                                        </button>
                                                    </div>
                                                </MDBCol>
                                            </MDBRow>
                                        </form>
                                    </ul>
                                    <center>Already have an account?<a href="/coursepack/login"> Login here.</a></center>
                                </MDBJumbotron>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
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
                </MDBAnimation>
            </>
        )
    }
    ;
}

export default RegisterPage;

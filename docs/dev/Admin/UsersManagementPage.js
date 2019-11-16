import React, { Component } from "react";
import { MDBDataTable, MDBInputGroup, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBIcon } from "mdbreact";
import axios from "axios";
import { RandomPassword } from "../utils/RandomPassword";
import { observer, inject } from 'mobx-react';
import { Snackbar } from '@material-ui/core';
import styled from 'styled-components';
import MainSideNavDropdown from "../MainSideNavDropdown";

@inject('dataStore')
@observer
class UsersManagementPage extends Component {

    state = {
        modal1: false,
        userId: 0,
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        gender: "",
        userRole: "",
        username: "",
        columns: [
            {
                "label": "User Id",
                "field": "userId",
                "width": 50,
                "attributes": {
                    "aria-controls": "DataTable",
                    "aria-label": "Name"
                }
            },
            {
                "label": "First Name",
                "field": "firstName",
                "width": 150,
                "attributes": {
                    "aria-controls": "DataTable",
                    "aria-label": "Name"
                }
            },
            {
                "label": "Last Name",
                "field": "lastName",
                "width": 150,
                "attributes": {
                    "aria-controls": "DataTable",
                    "aria-label": "Name"
                }
            },
            {
                "label": "Gender",
                "field": "gender",
                "width": 100
            },
            {
                "label": "Email",
                "field": "email",
                "width": 270
            },
            {
                "label": "Username",
                "field": "username",
                "width": 100
            },
            {
                "label": "",
                "field": "",
                "width": 100
            },
            {
                "label": "Achievements",
                "field": "achievenemts",
                "width": 100
            },
        ],
        rows: [{ label: "Retrieving data..." }],
        status: "retrieving",
        openSnackbar: false,
        message: ""
    };

    getAllUserDetails = () => {
        axios
            .get(`http://localhost:8080/LMS-war/webresources/User/getAllUser`)
            .then(result => {
                // console.log(result)
                var publicUserList = []
                result.data.userList.map((row) => {
                    if (row.accessRight === "Public")
                        publicUserList.push(row)
                })
                this.setState({
                    rows: publicUserList,
                    status: "done",
                });
            })
            .catch(error => {
                this.setState({
                    status: "error",
                    message: "An error has occured in retrieving data.",
                    openSnackbar: true
                });
                console.error("error in axios " + error);
            })
    }

    componentDidMount() {
        this.getAllUserDetails();
    }

    componentDidUpdate() {
        if (this.state.status === "recallUsers")
            this.getAllUserDetails();
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

    updateUserState = (user) => {
        console.log(user.accessRight)
        this.setState({
            userId: user.userId,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.password,
            gender: user.gender,
            accessRight: user.accessRight,
            username: user.username
        })
    }

    editUser = () => {
        event.preventDefault();
        this.toggle(1);
        axios
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

    generatePwd() {
        let pwd = new RandomPassword()
            .setLength(8)
            .setLowerCase(true)
            .setUpperCase(false)
            .setNumberCase(true)
            .setSymbol(false)
            .generate();
        this.setState({ password: pwd });
    }

    handleChange = event => {
        event.preventDefault();
        this.setState({ [event.target.name]: event.target.value });
    }

    toggle = (nr, row) => {
        let modalNumber = "modal" + nr;
        this.setState({
            [modalNumber]: !this.state[modalNumber]
        });

        if (row !== undefined) {
            this.updateUserState(row);
        }
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
                            </MDBCol> */}
                            {/* <MDBCol md="6">
                                <input type="text" className="form-control" onChange={this.handleChange} disabled value={this.state.password} />
                            </MDBCol> */}
                            {/* <MDBCol md="6" align="right"> </MDBCol> */}
                            <MDBCol md="12">
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

    renderUserTable = (tableData) => {
        return (
            <div className={this.props.className}>
                <div className="module-navbar-small">
                    <MainSideNavDropdown moduleId={this.props.moduleId} activeTab={'Public Users'}></MainSideNavDropdown>
                </div>
                <div className="module-content">
                    <MDBContainer className="mt-3">
                        <MDBRow style={{ paddingTop: 60 }}>
                            <MDBCol md="12">
                                <h2 className="font-weight-bold">
                                    Public Users Management
                </h2>
                            </MDBCol>
                        </MDBRow>
                        {this.renderEditUserModalBox()}
                        <MDBRow className="py-3">
                            <MDBCol md="12">
                                <MDBCard>
                                    <MDBCardBody>
                                        <MDBDataTable striped bordered hover scrollX scrollY maxHeight="400px" data={tableData} pagesAmount={4} />
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                        </MDBRow>
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
        )
    }

    renderTableWithMessage = (message) => {
        const data = () => ({ columns: this.state.columns, rows: [{ label: message }] })

        const tableData = {
            columns: [...data().columns.map(col => {
                col.width = 200;
                return col;
            })], rows: [...data().rows]
        }
        return (
            <div className={this.props.className}>
                <div className="module-navbar-small">
                    <MainSideNavDropdown moduleId={this.props.moduleId} activeTab={'Public Users'}></MainSideNavDropdown>
                </div>
                <div className="module-content">
                    <MDBContainer className="mt-3">
                        <MDBRow style={{ paddingTop: 60 }}>
                            <MDBCol md="12">
                                <h2 className="font-weight-bold">
                                    Users Management
                </h2>
                            </MDBCol>
                            {this.renderEditUserModalBox()}
                        </MDBRow>
                        <MDBRow className="py-3">
                            <MDBCol md="12">
                                <MDBCard>
                                    <MDBCardBody>
                                        <MDBDataTable striped bordered hover scrollX scrollY maxHeight="400px" data={tableData} pagesAmount={4} />
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </div>
            </div>
        )
    }

    renderAwaiting = () => {
        return (
            <div className={this.props.className}>
                <div className="module-navbar-small">
                    <MainSideNavDropdown moduleId={this.props.moduleId} activeTab={'Public Users'}></MainSideNavDropdown>
                </div>
                <div className="module-content">
                    <MDBContainer className="mt-3">
                        <MDBRow style={{ paddingTop: 60 }} align="center">
                            <MDBCol md="12">
                                <div className="spinner-border text-primary" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </div>
            </div>
        )
    }

    viewUserAchievements = (userId) => {
        this.props.history.push(`/coursepack/users/achievements/${userId}`)
    }

    render() {
        var newRows = []
        const row = this.state.rows
        for (let i = 0; i < row.length; i++) {
            newRows.push({
                userId: row[i].userId,
                firstName: row[i].firstName,
                lastName: row[i].lastName,
                gender: row[i].gender,
                email: row[i].email,
                username: row[i].username,
                editButton: <MDBRow align="center">
                    <MDBCol md={6}><MDBIcon onClick={() => this.toggle(1, row[i])} style={{ cursor: "pointer", textShadow: "1px 0px 1px #000000" }} icon="edit" /></MDBCol>
                    <MDBCol md={6}><MDBIcon onClick={() => this.deleteUser(row[i].userId)} style={{ cursor: "pointer", textShadow: "1px 0px 1px #000000" }} icon="trash" /></MDBCol>
                </MDBRow>,
                achievements: <MDBCol align="center" md={6}><MDBBtn color="deep-orange" size="sm" onClick={() => this.viewUserAchievements(row[i].userId)}>View</MDBBtn></MDBCol>,
            })
        }
        const data = () => ({ columns: this.state.columns, rows: newRows })

        const widerData = {
            columns: [...data().columns.map(col => {
                col.width = 150;
                return col;
            })], rows: [...data().rows.map(row => {
                return row;
            })]
        }

        if (this.state.status === "retrieving")
            return this.renderAwaiting();
        else if (this.state.status === "error")
            return this.renderTableWithMessage("Error in Retrieving Data. Please try again later.");
        else if (this.state.status === "done")
            return this.renderUserTable(widerData);
        else
            return this.renderTableWithMessage("No data found.");
    }
}

export default styled(UsersManagementPage)`
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

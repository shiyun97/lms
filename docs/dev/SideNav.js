import React, { Component } from 'react';
import { MDBListGroup, MDBListGroupItem, MDBIcon } from 'mdbreact';
import { NavLink } from 'react-router-dom';
import { observer, inject } from 'mobx-react'

@inject('dataStore')
@observer
class SideNav extends Component {

    logOutUser = () => {
        this.props.dataStore.setSignOutStatus();
    }

    updatePath = (path) => {
        this.props.dataStore.setPath(path);
    }

    renderCoursepackSideNav = () => {
        // Coursepack Dashboard
        // My Courses
        // Users (Admin)
        // Account
        // Login / Logout
        return (
            <div className="sidebar-fixed position-fixed">
                <div style={{ backgroundColor: "#000", padding: "0px", paddingTop: "10px", paddingBottom: "70px", textAlign: "center", color: "#fff" }}>
                    <MDBIcon icon="graduation-cap" />
                    <br /> <p style={{ fontSize: "10px" }}>FLIPIT</p>
                </div>
                {this.props.dataStore.getSignInStatus ?
                    <>
                        <MDBListGroup className="list-group-flush">
                            <NavLink to="/coursepack/dashboard" activeClassName="activeClass" onClick={() => this.updatePath("/coursepack/dashboard")}>
                                <MDBListGroupItem style={{ backgroundColor: "#000", padding: "0px", paddingTop: "10px", paddingBottom: "2px", textAlign: "center" }}>
                                    <MDBIcon icon="chart-pie" />
                                    <br /> <p style={{ fontSize: "10px" }}>Dashboard</p>
                                </MDBListGroupItem>
                            </NavLink>
                            {(this.props.dataStore.accessRight !== "Admin" || this.props.dataStore.accessRight !== "Public") &&
                                <NavLink to="/modules" activeClassName="activeClass" onClick={() => this.updatePath("/modules")}>
                                    <MDBListGroupItem style={{ backgroundColor: "#000", padding: "0px", paddingTop: "10px", paddingBottom: "2px", textAlign: "center" }}>
                                        <MDBIcon icon="table" />
                                        <br /> <p style={{ fontSize: "10px" }}>Modules</p>
                                    </MDBListGroupItem>
                                </NavLink>
                            }
                            {this.props.dataStore.accessRight !== "Admin" &&
                                <NavLink to="/coursepack/enrolledCourses" activeClassName="activeClass" onClick={() => this.updatePath("/coursepack/enrolledCourses")}>
                                    <MDBListGroupItem style={{ backgroundColor: "#000", padding: "0px", paddingTop: "10px", paddingBottom: "2px", textAlign: "center" }}>
                                        <MDBIcon icon="book" />
                                        <br /> <p style={{ fontSize: "10px" }}>My Courses</p>
                                    </MDBListGroupItem>
                                </NavLink>
                            }
                            {this.props.dataStore.accessRight === "Admin" &&
                                <NavLink to="/coursepack/users" activeClassName="activeClass" onClick={() => this.updatePath("/coursepack/users")}>
                                    <MDBListGroupItem style={{ backgroundColor: "#000", padding: "0px", paddingTop: "10px", paddingBottom: "2px", textAlign: "center" }}>
                                        <MDBIcon icon="users-cog" />
                                        <br /> <p style={{ fontSize: "10px" }}>Users</p>
                                    </MDBListGroupItem>
                                </NavLink>
                            }
                            <NavLink to="/coursepack/account" activeClassName="activeClass" onClick={() => this.updatePath("/coursepack/account")}>
                                <MDBListGroupItem style={{ backgroundColor: "#000", padding: "0px", paddingTop: "10px", paddingBottom: "2px", textAlign: "center" }}>
                                    <MDBIcon icon="user" />
                                    <br /> <p style={{ fontSize: "10px" }}>Account</p>
                                </MDBListGroupItem>
                            </NavLink>
                            <NavLink onClick={() => this.logOutUser()} to="/coursepack/login" activeClassName="activeClass">
                                <MDBListGroupItem style={{ backgroundColor: "#000", position: "absolute", bottom: "0px", paddingBottom: "2px", textAlign: "center" }}>
                                    <MDBIcon icon="sign-out-alt" />
                                    <br /> <p style={{ fontSize: "10px" }}>Logout</p>
                                </MDBListGroupItem>
                            </NavLink>
                        </MDBListGroup>
                    </> :
                    <MDBListGroup className="list-group-flush">
                        <NavLink to="/coursepack/login" onClick={() => this.updatePath("/coursepack/login")} activeClassName="activeClass">
                            <MDBListGroupItem style={{ backgroundColor: "#000", position: "absolute", bottom: "0px", paddingBottom: "2px", textAlign: "center" }}>
                                <MDBIcon icon="sign-out-alt" />
                                <br /> <p style={{ fontSize: "10px" }}>Login</p>
                            </MDBListGroupItem>
                        </NavLink>
                    </MDBListGroup>
                }
            </div>
        )
    }

    renderFlipItSideNav = () => {
        // LMS Dashboard
        // Modules
        // Coursepack
        // Account
        // Logout
        return (
            this.props.dataStore.getSignInStatus &&
            <div className="sidebar-fixed position-fixed">
                <div style={{ backgroundColor: "#000", padding: "0px", paddingTop: "10px", paddingBottom: "70px", textAlign: "center", color: "#fff" }}>
                    <MDBIcon icon="graduation-cap" />
                    <br /> <p style={{ fontSize: "10px" }}>FLIPIT</p>
                </div>
                <MDBListGroup className="list-group-flush">=
                        <NavLink to="/dashboard" activeClassName="activeClass" onClick={() => this.updatePath("/dashboard")}>
                        <MDBListGroupItem style={{ backgroundColor: "#000", padding: "0px", paddingTop: "10px", paddingBottom: "2px", textAlign: "center" }}>
                            <MDBIcon icon="chart-pie" />
                            <br /> <p style={{ fontSize: "10px" }}>Dashboard</p>
                        </MDBListGroupItem>
                    </NavLink>
                    {this.props.dataStore.accessRight !== "Admin" &&
                        <NavLink to="/modules" activeClassName="activeClass" onClick={() => this.updatePath("/modules")}>
                            <MDBListGroupItem style={{ backgroundColor: "#000", padding: "0px", paddingTop: "10px", paddingBottom: "2px", textAlign: "center" }}>
                                <MDBIcon icon="table" />
                                <br /> <p style={{ fontSize: "10px" }}>Modules</p>
                            </MDBListGroupItem>
                        </NavLink>
                    }
                    <NavLink to="/coursepack/dashboard" activeClassName="activeClass" onClick={() => this.updatePath("/coursepack/dashboard")}>
                        <MDBListGroupItem style={{ backgroundColor: "#000", padding: "0px", paddingTop: "10px", paddingBottom: "2px", textAlign: "center" }}>
                            <MDBIcon icon="book" />
                            <br /> <p style={{ fontSize: "10px" }}>Courses</p>
                        </MDBListGroupItem>
                    </NavLink>
                    <NavLink to="/account" activeClassName="activeClass" onClick={() => this.updatePath("/account")}>
                        <MDBListGroupItem style={{ backgroundColor: "#000", padding: "0px", paddingTop: "10px", paddingBottom: "2px", textAlign: "center" }}>
                            <MDBIcon icon="user" />
                            <br /> <p style={{ fontSize: "10px" }}>Account</p>
                        </MDBListGroupItem>
                    </NavLink>
                    <NavLink onClick={() => this.logOutUser()} to="/login" activeClassName="activeClass">
                        <MDBListGroupItem style={{ backgroundColor: "#000", position: "absolute", bottom: "0px", paddingBottom: "2px", textAlign: "center" }}>
                            <MDBIcon icon="sign-out-alt" />
                            <br /> <p style={{ fontSize: "10px" }}>Logout</p>
                        </MDBListGroupItem>
                    </NavLink>
                </MDBListGroup>
            </div>
        )
    }

    render() {
        if (this.props.dataStore.accessRight !== "Public") {
            console.log(this.props.dataStore.getPath)
            if (this.props.dataStore.getPath.includes("/coursepack"))
                return this.renderCoursepackSideNav();
            return this.renderFlipItSideNav();
        } else {
            console.log(this.props.dataStore.getPath)
            if (this.props.dataStore.getPath.includes("/coursepack"))
                return this.renderCoursepackSideNav();
            return <div></div>
        }
    };
}

export default SideNav;
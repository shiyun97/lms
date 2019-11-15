import React, { Component } from "react";
import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand,
    NavbarNav,
    MDBNavItem,
    MDBNavLink,
    MDBNavbarToggler,
    MDBCollapse
} from "mdbreact";

import { observer, inject } from 'mobx-react'

@inject('dataStore')
@observer
class MainSideNavDropdown extends Component {

    state = {
        collapseID: ''
    }

    toggleCollapse = collapseID => () => {
        this.setState(prevState => ({ collapseID: (prevState.collapseID !== collapseID ? collapseID : '') }));
    }

    logOutUser = () => {
        this.props.dataStore.setSignOutStatus();
    }

    updatePath = (path) => {
        this.props.dataStore.setPath(path);
    }

    componentDidMount() {
        var pathname = location.pathname;
        this.props.dataStore.setPath(pathname);
    }

    renderCoursepackSideNav = () => {
        let moduleId = this.props.moduleId;
        let activeTab = this.props.activeTab;
        return (
            <MDBNavbar style={{ backgroundColor: "#fb6d63" }} dark>
                <MDBContainer>
                    <MDBNavbarBrand href="/coursepack/dashboard" className="Navbar-coursepack-title">
                        <strong>Coursepack</strong>
                    </MDBNavbarBrand>
                    <MDBNavbarToggler className="white-text" onClick={this.toggleCollapse('navbarCollapse1')} />
                    <MDBCollapse id="navbarCollapse1" isOpen={this.state.collapseID} navbar>
                        <NavbarNav left>
                            {this.props.dataStore.getSignInStatus ?
                                <>
                                    {(this.props.dataStore.accessRight !== "Admin" && this.props.dataStore.accessRight !== "Teacher") &&
                                        <MDBNavItem active={activeTab == "Dashboard"}>
                                            <MDBNavLink exact={true} to={`/coursepack/dashboard`} onClick={() => this.updatePath("/coursepack/dashboard")}>
                                                Dashboard
                                            </MDBNavLink>
                                        </MDBNavItem>
                                    }
                                    {(this.props.dataStore.accessRight !== "Admin" && this.props.dataStore.accessRight !== "Public") &&
                                        <MDBNavItem active={activeTab == "Module"}>
                                            <MDBNavLink exact={true} to={`/modules`} onClick={() => this.updatePath("/modules")}>
                                                Module
                                            </MDBNavLink>
                                        </MDBNavItem>
                                    }
                                    {this.props.dataStore.accessRight !== "Admin" &&
                                        <MDBNavItem active={activeTab == "My Coursepacks"}>
                                            <MDBNavLink exact={true} to={`/coursepack/myCourses`} onClick={() => this.updatePath("/coursepack/myCourses")}>
                                                My Coursepacks
                                            </MDBNavLink>
                                        </MDBNavItem>
                                    }
                                    {(this.props.dataStore.accessRight !== "Admin" && this.props.dataStore.accessRight !== "Teacher") &&
                                        <MDBNavItem active={activeTab == "My Achievements"}>
                                            <MDBNavLink exact={true} to={`/coursepack/achievements/view/badges`} onClick={() => this.updatePath("/coursepack/achievements/view/badges")}>
                                                My Achievements
                                            </MDBNavLink>
                                        </MDBNavItem>
                                    }
                                    {this.props.dataStore.accessRight === "Admin" &&
                                        <MDBNavItem active={activeTab == "Achievements"}>
                                            <MDBNavLink exact={true} to={`/coursepack/dashboard/admin`} onClick={() => this.updatePath("/coursepack/dashboard/admin")}>
                                                Achievements
                                            </MDBNavLink>
                                        </MDBNavItem>
                                    }
                                    {(this.props.dataStore.accessRight === "Admin" &&
                                        <MDBNavItem active={activeTab == "LMP"}>
                                            <MDBNavLink exact={true} to={`/dashboard`} onClick={() => this.updatePath("/dashboard")}>
                                                LMP
                                            </MDBNavLink>
                                        </MDBNavItem>
                                    )}
                                    {this.props.dataStore.accessRight === "Admin" &&
                                        <MDBNavItem active={activeTab == "Public Users"}>
                                            <MDBNavLink exact={true} to={`/coursepack/users`} onClick={() => this.updatePath("/coursepack/users")}>
                                                Public Users
                                            </MDBNavLink>
                                        </MDBNavItem>
                                    }
                                    <MDBNavItem active={activeTab == "Account"}>
                                        <MDBNavLink exact={true} to={`/coursepack/account`} onClick={() => this.updatePath("/coursepack/account")}>
                                            Account
                                            </MDBNavLink>
                                    </MDBNavItem>
                                    {(this.props.dataStore.accessRight === "Student" || this.props.dataStore.accessRight === "Teacher") &&
                                        <MDBNavItem>
                                            <MDBNavLink exact={true} onClick={() => this.logOutUser()} to="/login">
                                                Logout
                                    </MDBNavLink>
                                        </MDBNavItem>
                                    }
                                    {this.props.dataStore.accessRight === "Admin" &&
                                        <MDBNavItem>
                                            <MDBNavLink exact={true} onClick={() => this.logOutUser()} to="/admin">
                                                Logout
            </MDBNavLink>
                                        </MDBNavItem>
                                    }
                                    {this.props.dataStore.accessRight === "Public" &&
                                        <MDBNavItem>
                                            <MDBNavLink exact={true} onClick={() => this.logOutUser()} to="/coursepack/login">
                                                Logout
                                    </MDBNavLink>
                                        </MDBNavItem>
                                    }
                                </>
                                :
                                <MDBNavItem active={activeTab == "Login"}>
                                    <MDBNavLink exact={true} to={`/coursepack/login`} onClick={() => this.updatePath("/coursepack/login")}>
                                        Login
                                    </MDBNavLink>
                                </MDBNavItem>
                            }
                        </NavbarNav>
                    </MDBCollapse>
                </MDBContainer>
            </MDBNavbar>
        )
    }

    renderFlipItSideNav = () => {
        let moduleId = this.props.moduleId;
        let activeTab = this.props.activeTab;
        // LMS Dashboard
        // Modules
        // Coursepack
        // Account
        // Logout
        return (
            this.props.dataStore.getSignInStatus &&
            <MDBNavbar color="indigo" dark>
                <MDBContainer>
                    <MDBNavbarBrand className="white-text">
                    </MDBNavbarBrand>
                    <MDBNavbarToggler className="white-text" onClick={this.toggleCollapse('navbarCollapse1')} />
                    <MDBCollapse id="navbarCollapse1" isOpen={this.state.collapseID} navbar>
                        <NavbarNav left>
                            <MDBNavItem active={activeTab == "Dashboard"}>
                                <MDBNavLink exact={true} to={`/dashboard`} onClick={() => this.updatePath("/dashboard")}>
                                    Dashboard
                                </MDBNavLink>
                            </MDBNavItem>
                            {this.props.dataStore.accessRight !== "Admin" &&
                                <MDBNavItem active={activeTab == "Modules"}>
                                    <MDBNavLink exact={true} to={`/modules`} onClick={() => this.updatePath("/modules")}>
                                        Modules
                                </MDBNavLink>
                                </MDBNavItem>
                            }
                            {(this.props.dataStore.accessRight !== "Admin" && this.props.dataStore.accessRight !== "Teacher") &&
                                <MDBNavItem active={activeTab == "Coursepack"}>
                                    <MDBNavLink exact={true} to="/coursepack/dashboard" onClick={() => this.updatePath("/coursepack/dashboard")}>
                                        Coursepack
                                    </MDBNavLink>
                                </MDBNavItem>
                            }
                            {this.props.dataStore.accessRight === "Teacher" &&
                                <MDBNavItem active={activeTab == "Coursepack"}>
                                    <MDBNavLink exact={true} to="/coursepack/myCourses" onClick={() => this.updatePath("/coursepack/myCourses")}>
                                        Coursepack
                                    </MDBNavLink>
                                </MDBNavItem>
                            }
                            {this.props.dataStore.accessRight === "Admin" &&
                                <MDBNavItem active={activeTab == "Coursepack"}>
                                    <MDBNavLink exact={true} to="/coursepack/dashboard/admin" onClick={() => this.updatePath("/coursepack/dashboard/admin")}>
                                        Coursepack
                                    </MDBNavLink>
                                </MDBNavItem>
                            }
                            <MDBNavItem active={activeTab == "Account"}>
                                <MDBNavLink exact={true} to={`/account`}>
                                    Account
                                    </MDBNavLink>
                            </MDBNavItem>
                            {(this.props.dataStore.accessRight === "Student" || this.props.dataStore.accessRight === "Teacher") &&
                                <MDBNavItem>
                                    <MDBNavLink exact={true} onClick={() => this.logOutUser()} to="/login">
                                        Logout
                                    </MDBNavLink>
                                </MDBNavItem>
                            }
                            {this.props.dataStore.accessRight === "Admin" &&
                                <MDBNavItem>
                                    <MDBNavLink exact={true} onClick={() => this.logOutUser()} to="/admin">
                                        Logout
            </MDBNavLink>
                                </MDBNavItem>
                            }
                        </NavbarNav>
                    </MDBCollapse>
                </MDBContainer>
            </MDBNavbar>
        )
    }

    render() {
        if (this.props.dataStore.accessRight !== "Public") {
            // console.log(this.props.dataStore.getPath)
            if (this.props.dataStore.getPath.includes("/coursepack"))
                return this.renderCoursepackSideNav();
            return this.renderFlipItSideNav();
        } else {
            // console.log(this.props.dataStore.getPath)
            if (this.props.dataStore.getPath.includes("/coursepack"))
                return this.renderCoursepackSideNav();
            return <div></div>
        }
    }
}

export default MainSideNavDropdown;
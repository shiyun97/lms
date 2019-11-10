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
            <MDBNavbar style={{ color: "#fb6d63" }}>
                <MDBContainer>
                    <MDBNavbarBrand className="white-text">
                    </MDBNavbarBrand>
                    <MDBNavbarToggler className="white-text" onClick={this.toggleCollapse('navbarCollapse1')} />
                    <MDBCollapse id="navbarCollapse1" isOpen={this.state.collapseID} navbar>
                        <NavbarNav left>
                            <MDBNavItem active={activeTab == "Module Overview"}>
                                <MDBNavLink exact={true} to={`/modules/${moduleId}/`}>Dashboard</MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem active={activeTab == "Module Details"}>
                                <MDBNavLink exact={true} to={`/modules/${moduleId}/moduleDetails`}>Module</MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem active={activeTab == "Class & Groups"}>
                                <MDBNavLink exact={true} to={`/modules/${moduleId}/students`}>Coursepack</MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem active={activeTab == "Announcements"}>
                                <MDBNavLink exact={true} to={`/modules/${moduleId}/announcements`}>My Coursepacks</MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem active={activeTab == "Files"}>
                                <MDBNavLink exact={true} to={`/modules/${moduleId}/files`}>My Achievements</MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem active={activeTab == "Forum"}>
                                <MDBNavLink exact={true} to={`/modules/${moduleId}/forum`}>Achievements</MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem active={activeTab == "Gradebook"}>
                                <MDBNavLink exact={true} to={`/modules/${moduleId}/gradebook`}>LMP</MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem active={activeTab == "Quiz"}>
                                <MDBNavLink exact={true} to={`/modules/${moduleId}/quiz`}>Public Users</MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem active={activeTab == "Multimedia"}>
                                <MDBNavLink exact={true} to={`/modules/${moduleId}/multimedia`}>Account</MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem active={activeTab == "Consultation"}>
                                <MDBNavLink exact={true} to={`/modules/${moduleId}/consultation`}>Login</MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem active={activeTab == "Attendance"}>
                                <MDBNavLink exact={true} to={`/modules/${moduleId}/attendance`}>Logout</MDBNavLink>
                            </MDBNavItem>
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
                            <MDBNavItem>
                                <MDBNavLink exact={true}  onClick={() => this.logOutUser()} to="/login">
                                    Logout
                                    </MDBNavLink>
                            </MDBNavItem>
                        </NavbarNav>
                    </MDBCollapse>
                </MDBContainer>
            </MDBNavbar>
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
    }
}

export default MainSideNavDropdown;
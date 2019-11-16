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
class CoursepackSideNavigationDropdown extends Component {

    state = {
        collapseID: ''
    }

    componentDidMount() {
        var pathname = location.pathname;
        pathname = pathname.split("/");
        // console.log(pathname[2])
        this.props.dataStore.setCurrCoursepackId(pathname[2]);
    }

    logOutUser = () => {
        this.props.dataStore.setSignOutStatus();
    }

    toggleCollapse = collapseID => () => {
        this.setState(prevState => ({ collapseID: (prevState.collapseID !== collapseID ? collapseID : '') }));
    }

    render() {
        var courseId = this.props.dataStore.getCurrCoursepackId;
        return <MDBNavbar dark style={{ backgroundColor: "#fb6d63" }}>
            <MDBContainer>
                <MDBNavbarBrand className="white-text">
                </MDBNavbarBrand>
                <MDBNavbarToggler className="white-text" onClick={this.toggleCollapse('navbarCollapse1')} />
                <MDBCollapse id="navbarCollapse1" isOpen={this.state.collapseID} navbar>
                    <NavbarNav left>
                        <MDBNavItem>
                            <MDBNavLink exact={true} to={`/coursepack/myCourses`}>Back to My Coursepacks</MDBNavLink>
                        </MDBNavItem>
                        <MDBNavItem>
                            <MDBNavLink exact={true} to={`/coursepack/${courseId}`}>Preview</MDBNavLink>
                        </MDBNavItem>
                        <MDBNavItem>
                            <MDBNavLink to={`/coursepack/${courseId}/edit`}>Manage Coursepack</MDBNavLink>
                        </MDBNavItem>
                        <MDBNavItem>
                            <MDBNavLink to={`/coursepack/${courseId}/multimedia`}>Multimedia</MDBNavLink>
                        </MDBNavItem>
                        <MDBNavItem>
                            <MDBNavLink to={`/coursepack/${courseId}/quiz`}>Quizzes</MDBNavLink>
                        </MDBNavItem>
                        <MDBNavItem>
                            <MDBNavLink to={`/coursepack/${courseId}/arrangements`}>Arrangements</MDBNavLink>
                        </MDBNavItem>
                        <MDBNavItem>
                            <MDBNavLink to={`/coursepack/${courseId}/feedback`}>Ratings</MDBNavLink>
                        </MDBNavItem>
                        <MDBNavItem>
                            <MDBNavLink to={`/coursepack/${courseId}/forum/topics`}>Forum</MDBNavLink>
                        </MDBNavItem>
                        {sessionStorage.getItem("accessRight") === "Teacher" &&
                            <MDBNavItem>
                                <MDBNavLink to={`/coursepack/${courseId}/analytics`}>Analytics</MDBNavLink>
                            </MDBNavItem>
                        }
                        <MDBNavItem>
                            <MDBNavLink exact={true} onClick={() => this.logOutUser()} to="/login">
                                Logout
                        </MDBNavLink>
                        </MDBNavItem>
                    </NavbarNav>
                </MDBCollapse>
            </MDBContainer>
        </MDBNavbar>
    }
}

export default CoursepackSideNavigationDropdown;
import React, { Component } from "react";
import {
    MDBContainer, MDBNav, MDBNavItem, MDBNavLink, MDBTabContent, MDBTabPane, MDBBtn, MDBCard, MDBCardBody, MDBCardText, MDBMedia,
    MDBCardTitle, MDBRow, MDBCol
} from "mdbreact";
import axios from "axios";
import { NavLink } from 'react-router-dom'

const API_MOCK = "http://localhost:3001"
const API = "http://localhost:8080/LMS-war/webresources/"

class CoursepackDashboardPageTeacher extends Component {

    state = {
        activeItem: "1",
        createdCoursepacks: "",
        coursepackId: "",
    }

    componentDidMount() {
        axios.get(`${API}Coursepack/getUserCoursepack/${localStorage.getItem('userId')}`)
            .then(result => {
                this.setState({ createdCoursepacks: result.data.coursepack })
            })
            .catch(error => {
                console.error("error in axios " + error);
            });
    }

    toggle = tab => e => {
        if (this.state.activeItem !== tab) {
            this.setState({
                activeItem: tab
            });
        }
    }

    //TODO: not published
    showAllDrafts = () => {


        return (
            <MDBContainer>
                <MDBRow>
                    {this.state.createdCoursepacks && this.state.createdCoursepacks.map((course) => {
                        return (
                            <MDBCol size="3" key={course.id} style={{paddingBottom: 30}}>
                                <NavLink to={`/coursepack/${course.coursepackId}/`} activeClassName="activeClass">
                                    <MDBCard>
                                        <MDBCardBody>
                                            {/* <MDBMedia object src="https://mdbootstrap.com/img/Photos/Others/placeholder1.jpg" alt="" /> */}
                                            <MDBCardTitle>
                                                <MDBCardText>{course.title}</MDBCardText>
                                                <MDBCardText>{course.category}</MDBCardText>
                                                <MDBCardText>SGD {course.price}</MDBCardText>
                                            </MDBCardTitle>
                                        </MDBCardBody>
                                    </MDBCard>
                                </NavLink>

                            </MDBCol>
                        )
                    })}
                </MDBRow>
            </MDBContainer>
        )
    }

    displayCourses = () => {
        return (
            <MDBContainer>
                <MDBNav className="nav-tabs mt-5">
                    <MDBNavItem>
                        <MDBNavLink to="#" active={this.state.activeItem === "1"} onClick={this.toggle("1")} role="tab" >Published</MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                        <MDBNavLink to="#" active={this.state.activeItem === "2"} onClick={this.toggle("2")} role="tab" >Drafts</MDBNavLink>
                    </MDBNavItem>
                    <MDBCol align="right">
                        <NavLink to="/coursepack/create/" style={{ color: 'white' }}>
                            <MDBBtn color="primary">Create</MDBBtn>
                        </NavLink>
                    </MDBCol>
                </MDBNav>
                <MDBTabContent activeItem={this.state.activeItem} >
                    <br />
                    <MDBTabPane tabId="1" role="tabpanel">
                        {/* this.showAllPublishedCourses() */}
                    </MDBTabPane>
                    <MDBTabPane tabId="2" role="tabpanel">
                        {this.showAllDrafts()}
                    </MDBTabPane>
                </MDBTabContent>
            </MDBContainer>
        )
    }

    render() {
        return (
            <MDBContainer style={{ paddingBottom: 240 }}>
                <MDBRow>
                    <MDBCol md="8" className="mt-4">
                        <h2 className="font-weight-bold" style={{ paddingTop: 50 }}>
                            Coursepack
                        </h2>
                        <hr/>
                    </MDBCol>
                    <MDBContainer>
                        {this.displayCourses()}
                    </MDBContainer>
                </MDBRow>
            </MDBContainer>
        )
    }
}

export default CoursepackDashboardPageTeacher
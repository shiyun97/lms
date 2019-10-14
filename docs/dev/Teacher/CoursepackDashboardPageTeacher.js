import React, { Component } from "react";
import {
    MDBContainer, MDBNav, MDBNavItem, MDBNavLink, MDBTabContent, MDBTabPane, MDBBtn, MDBCard, MDBCardBody, MDBCardText, MDBMedia,
    MDBCardTitle, MDBRow, MDBCol
} from "mdbreact";
import axios from "axios";
import { NavLink } from 'react-router-dom'

const API = "http://localhost:3001"

class CoursepackDashboardPageTeacher extends Component {

    state = {
        activeItem: "1",
        createdCoursepacks: "",
        coursepackId: ""
    }

    componentDidMount() {
        axios.get(`${API}/coursepack`)
            .then(result => {
                this.setState({ createdCoursepacks: result.data })
                console.log(this.state.createdCoursepacks)
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

    //TODO: check start date against current
    showAllDrafts = () => {
        return (
            <MDBContainer>
                <MDBRow>
                    {this.state.createdCoursepacks && this.state.createdCoursepacks.map((course) => {
                        return (
                            <MDBCol size="3" key={course.id}>
                                <NavLink to={`/coursepack/${course.id}/`}activeClassName="activeClass">
                                    <MDBCard>
                                        <MDBCardBody>
                                            <MDBMedia object src="https://mdbootstrap.com/img/Photos/Others/placeholder1.jpg" alt="" />
                                            <MDBCardTitle>
                                                <MDBCardText>{course.courseTitle}</MDBCardText>
                                                <MDBCardText>{course.category}</MDBCardText>
                                                <MDBCardText>{course.price}</MDBCardText>
                                                <MDBCardText>{course.teacher}</MDBCardText>
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
                        <MDBBtn><NavLink to="/coursepack/create/" style={{ color: 'white' }}> Create </NavLink></MDBBtn>
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
            <MDBContainer>
                {this.displayCourses()}
            </MDBContainer>
        )
    }
}

export default CoursepackDashboardPageTeacher
import React, { Component } from "react";
import CoursepackTopNav from "./CoursepackTopNav";
import {
    MDBContainer, MDBCarouselInner, MDBView, MDBCarouselItem, MDBCarousel, MDBCol, MDBBtn, MDBRow,
    MDBCard, MDBCardImage, MDBCardGroup, MDBCardBody, MDBCardText, MDBCardTitle, MDBMedia, MDBNavbar,
    MDBNavbarBrand, MDBNavbarToggler, MDBNavbarNav, MDBNavLink, MDBCollapse, MDBNavItem, MDBIcon, NavLink
} from "mdbreact"; import axios from "axios";

const API = "http://localhost:3001"

class CoursepackCategoryView extends Component {

    state = {
        coursepackList: ""
    }

    componentDidMount() {
        axios.get(`${API}/coursepack`)
            .then(result => {
                this.setState({ coursepackList: result.data })
                console.log(this.state.coursepackList)
            })
            .catch(error => {
                console.error("error in axios " + error);
            });
    }

    displayPopularCourses = () => {
        return (
            <div>
                <h5><b>Popular Courses</b></h5>

                <MDBRow>
                    {this.state.coursepackList && this.state.coursepackList.map((course) => {
                        return (
                            <MDBCol size="3" key={course.id}>
                                <NavLink to={`/coursepack/${course.id}/`} activeClassName="activeClass">
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
            </div>
        )
    }

    displayTrendingCourses = () => {
        return (
            <div>
                <h5><b>Trending Courses</b></h5>

                <MDBRow>
                    {this.state.coursepackList && this.state.coursepackList.map((course) => {
                        return (
                            <MDBCol size="3" key={course.id}>
                                <NavLink to={`/coursepack/${course.id}/`} activeClassName="activeClass">
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
            </div>
        )

    }

    render() {
        return (
            <div>
                <CoursepackTopNav />

                <MDBContainer style={{ paddingTop: 100 }} >
                    {this.displayPopularCourses()}
                    <br/><br/>
                    {this.displayTrendingCourses()}
                </MDBContainer>
            </div>
        )
    }
}

export default CoursepackCategoryView
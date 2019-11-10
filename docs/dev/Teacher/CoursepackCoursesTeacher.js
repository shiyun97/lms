import React, { Component } from "react";
import { MDBContainer, MDBBtn, MDBCard, MDBCardBody, MDBCardText, MDBCardTitle, MDBRow, MDBCol } from "mdbreact";
import axios from "axios";
import { NavLink } from 'react-router-dom'

const API_MOCK = "http://localhost:3001"
const API = "http://localhost:8080/LMS-war/webresources/"

class CoursepackCoursesTeacher extends Component {

    state = {
        activeItem: "1",
        createdCoursepacks: "",
        coursepackId: "",
    }

    componentDidMount() {
        axios.get(`${API}Coursepack/getAllCoursepack/`)
            .then(result => {
                this.setState({ createdCoursepacks: result.data.coursepack, published: result.data.coursepack })
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

    showAll = () => {


        return (
            <MDBContainer>
                <MDBRow>
                    {this.state.createdCoursepacks && this.state.createdCoursepacks.map((course) => {
                        return (
                            <MDBCol md="3" key={course.coursepackId} style={{ paddingBottom: 30 }}>
                                <NavLink to={`/coursepack/${course.coursepackId}/`} activeClassName="activeClass">
                                    <MDBCard style={{height: 150}}>
                                        <MDBCardBody>
                                            {/* <MDBMedia object src="https://mdbootstrap.com/img/Photos/Others/placeholder1.jpg" alt="" /> */}
                                            <MDBCardTitle>
                                                <MDBCardText><b>{course.title}</b></MDBCardText>
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

                {this.showAll()}

            </MDBContainer>
        )
    }

    render() {
        return (
            <MDBContainer style={{ paddingBottom: 240 }}>
                <MDBRow size="12" >
                    <MDBCol size="8">
                        <h2 className="font-weight-bold" style={{ paddingTop: 50 }}>
                            Coursepack
                        </h2>
                    </MDBCol>
                    <MDBCol size="4" align="right" style={{paddingTop:40, paddingRight: 30}}>
                        <NavLink to="/coursepack/create/" style={{ color: 'white' }}>
                            <MDBBtn color="primary">Create</MDBBtn>
                        </NavLink>
                    </MDBCol>

                </MDBRow>
                <hr />
                {this.displayCourses()}
            </MDBContainer >
        )
    }
}

export default CoursepackCoursesTeacher
import React, { Component } from "react";
import { MDBContainer, MDBBtn, MDBRow, MDBCol } from "mdbreact";
import axios from "axios";
import { NavLink } from 'react-router-dom'
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { observer, inject } from 'mobx-react';

const API_MOCK = "http://localhost:3001"
const API = "http://localhost:8080/LMS-war/webresources/"

@inject('dataStore')
@observer
class CoursepackCoursesTeacher extends Component {

    state = {
        activeItem: "1",
        createdCoursepacks: "",
        coursepackId: "",
    }

    componentDidMount() {
        axios.get(`${API}Coursepack/getUserCoursepack/${sessionStorage.getItem("userId")}`)
            .then(result => {
                this.setState({ createdCoursepacks: result.data.coursepack, published: result.data.coursepack, coursepackList: this.getCoursepackList(result.data.coursepack) })
                this.props.dataStore.setCoursepacks(this.state.coursepackList);
            })
            .catch(error => {
                console.error("error in axios " + error);
            });
    }

    getCoursepackList = (coursepacks) => {
        var list = []
        coursepacks && coursepacks.map((cp) => {
            list.push({title: cp.title, id: cp.coursepackId })
        })
        return list
    }

    toggle = tab => e => {
        if (this.state.activeItem !== tab) {
            this.setState({
                activeItem: tab
            });
        }
    }

    showAll = () => {
        let coursepackList = this.state.createdCoursepacks;

        if (coursepackList.length == 0) {
            return (
                <div className={this.props.className}>
                    <MDBRow>
                        No coursepacks enrolled yet.
                    </MDBRow>
                </div>
            )
        }

        return (
            <MDBRow>
                {coursepackList && coursepackList.map((course, index) => {
                    return (
                        <MDBCol md="3" key={course.coursepackId} style={{ paddingBottom: 30 }}>
                            <Card style={{ display: "flex" }}>
                                <CardActionArea>
                                    <NavLink to={`/coursepack/${course.coursepackId}/`} style={{ marginBottom: 0 }}>
                                        <CardMedia
                                            style={{ height: 140 }}
                                            image={course.imageLocation}
                                            title={course.title}
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" style={{ color: "#000000" }}>
                                                {course.title}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                                {course.assignedTeacher.firstName + " " + course.assignedTeacher.lastName}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                <div style={{ width: 200, display: "flex", marginTop: 10 }}>
                                                    <Rating name="hover-side" value={course.rating} precision={0.1} readOnly size="small" /><span className="ml-2">{course.rating && course.rating.toFixed(1)}</span>
                                                </div>
                                            </Typography>
                                        </CardContent>
                                    </NavLink>
                                </CardActionArea>
                            </Card>
                        </MDBCol>
                    )
                })}
            </MDBRow>
        )
        /*return (
            <MDBContainer>
                <MDBRow>
                    {coursepackList && coursepackList.map((course) => {
                        return (
                            <MDBCol md="3" key={course.coursepackId} style={{ paddingBottom: 30 }}>
                                <NavLink to={`/coursepack/${course.coursepackId}/`} activeClassName="activeClass">
                                    <MDBCard style={{height: 150}}>
                                        <MDBCardBody>
                                            {/* <MDBMedia object src="https://mdbootstrap.com/img/Photos/Others/placeholder1.jpg" alt="" /> 
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
        )*/
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
                <MDBRow md="12" >
                    <MDBCol md="8">
                        <h2 className="font-weight-bold" style={{ paddingTop: 50 }}>
                            Coursepack
                        </h2>
                    </MDBCol>
                    <MDBCol md="4" align="right" style={{ paddingTop: 40, paddingRight: 30 }}>
                        <NavLink to="/coursepack/create/" style={{ color: 'white' }}>
                            <MDBBtn color="deep-orange">Create</MDBBtn>
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
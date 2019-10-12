import React, { Component } from "react";
import {
    MDBContainer, MDBNav, MDBNavItem, MDBNavLink, MDBTabContent, MDBTabPane, MDBCarouselInner, MDBView, MDBCarouselItem, MDBCarousel, MDBCol, MDBBtn, MDBRow,
    MDBCard, MDBCardImage, MDBCardGroup, MDBCardBody, MDBCardText, MDBCardTitle
} from "mdbreact";
import axios from "axios";
import { CardActionArea, CardMedia, CardContent, Typography, Card } from "@material-ui/core";
import { NavLink, Redirect, Route } from 'react-router-dom'


const API = "http://localhost:3001"

class CoursepackDashboardTeacher extends Component {

    state = {
        activeItem: "1",
        createdCoursepacks: "",
        redirect: false,
        courseId: ""
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

    setRedirect = id => {
        this.setState({ redirect: true, courseId: id })
    }

    //TODO: userid and coursepackid
    renderRediect = () => {
        if (this.state.redirect) {
            return <Redirect to={{ pathname: '/coursepack/details/:userId/', state: { courseId: this.state.courseId } }} />
        }
    }

    //TODO: check start date against current
    showAllPublishedCourses = () => {
        return (
            <MDBContainer>
                <MDBRow>
                    {this.state.createdCoursepacks && this.state.createdCoursepacks.map((course) => {
                        return (
                            <MDBCol size="3" key={course.id}>
                                <Card style={{ maxHeight: 300 }}>
                                    {this.renderRediect()}
                                    <CardActionArea onClick={() => this.setRedirect(course.id)}>
                                        <CardMedia
                                            style={{ height: 140 }}
                                            image="/static/images/cards/contemplative-reptile.jpg"
                                            title="Contemplative Reptile"
                                        />
                                        <CardContent>
                                           {/*  <Typography gutterBottom variant="h5" component="h2"> */}
                                                {course.courseTitle}
                                           {/*  </Typography>
                                            <Typography variant="body2" color="textSecondary" component="p"> */}
                                                {course.category}
                                           {/*  </Typography>
                                            <Typography variant="body2" color="textSecondary" component="p"> */}
                                                {course.price}
                                          {/*   </Typography>
                                            <Typography variant="body2" color="textSecondary" component="p"> */}
                                                {course.teacher}
                                            {/* </Typography> */}
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </MDBCol>
                        )
                    })}
                </MDBRow>
            </MDBContainer>
        )
    }

    //TODO: check start date against current
    showAllScheduledCourses = () => {
        return (
            <MDBContainer>
                <MDBRow>
                    {this.state.createdCoursepacks && this.state.createdCoursepacks.map((course) => {
                        return (
                            <MDBCol size="3" key={course.id}>
                                <Card style={{ maxHeight: 300 }}>
                                    {this.renderRediect()}
                                    <CardActionArea onClick={this.setRedirect}>
                                        <CardMedia
                                            style={{ height: 140 }}
                                            image="/static/images/cards/contemplative-reptile.jpg"
                                            title="Contemplative Reptile"
                                        />
                                        <CardContent>
                                           {/*  <Typography gutterBottom variant="h5" component="h2"> */}
                                                {course.courseTitle}
                                           {/*  </Typography>
                                            <Typography variant="body2" color="textSecondary" component="p"> */}
                                                {course.category}
                                            {/* </Typography>
                                            <Typography variant="body2" color="textSecondary" component="p"> */}
                                                {course.price}
                                           {/*  </Typography>
                                            <Typography variant="body2" color="textSecondary" component="p"> */}
                                                {course.teacher}
                                           {/*  </Typography> */}
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
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
                        <MDBNavLink to="#" active={this.state.activeItem === "1"} onClick={this.toggle("2")} role="tab" >Published Courses</MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                        <MDBNavLink to="#" active={this.state.activeItem === "2"} onClick={this.toggle("3")} role="tab" >Scheduled Courses</MDBNavLink>
                    </MDBNavItem>
                </MDBNav>
                <MDBTabContent activeItem={this.state.activeItem} >
                    <MDBTabPane tabId="1" role="tabpanel">
                        {this.showAllPublishedCourses()}
                    </MDBTabPane>
                    <MDBTabPane tabId="2" role="tabpanel">
                        {this.showAllScheduledCourses()}
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

export default CoursepackDashboardTeacher
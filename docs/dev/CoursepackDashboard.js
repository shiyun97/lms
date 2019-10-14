import React, { Component } from "react";
import {
  MDBContainer, MDBCarouselInner, MDBView, MDBCarouselItem, MDBCarousel, MDBCol, MDBBtn, MDBRow,
  MDBCard, MDBCardImage, MDBCardGroup, MDBCardBody, MDBCardText, MDBCardTitle
} from "mdbreact";
import axios from "axios";
import { NavLink, Redirect, Route } from 'react-router-dom'
import { CardActionArea, CardMedia, CardContent, Typography, CardActions, Button, Card } from "@material-ui/core";
import ModuleSideNavigation from "./ModuleSideNavigation";
import ModuleSideNavigationDropdown from "./ModuleSideNavigationDropdown";
import CoursepackDashboardPageTeacher from "./Teacher/CoursepackDashboardPageTeacher";
import CoursepackDashboardPageStudent from "./Student/CoursepackDashbaordPageStudent";

const API = "http://localhost:3001"

class CoursepackDashboard extends Component {


  heading = () => {
    return (
      <div>
        <MDBRow>
          <h3>
            <b>Welcome, (username)!</b>
          </h3>
          <MDBCol align="right">
            <MDBBtn><NavLink to="/myCourses" style={{ color: 'white' }}> My Courses </NavLink>
            </MDBBtn>
          </MDBCol>
        </MDBRow>
        <hr />
      </div>
    );
  };

 
  mediaCarousel = () => {
    return (
      <MDBCarousel
        interval={1500}
        activeItem={1}
        length={3}
        showControls={true}
        showIndicators={true}
        className="recommended_courses"
      >
        <MDBCarouselInner>
          <MDBCarouselItem itemId="1">
            <MDBView>
              <img
                className="recommend_1"
                src="https://mdbootstrap.com/img/Photos/Slides/img%20(131).jpg"
                alt="First slide"
              />
            </MDBView>
          </MDBCarouselItem>
          <MDBCarouselItem itemId="2">
            <MDBView>
              <img
                className="recommend_2"
                src="https://mdbootstrap.com/img/Photos/Slides/img%20(132).jpg"
                alt="Second slide"
              />
            </MDBView>
          </MDBCarouselItem>
          <MDBCarouselItem itemId="3">
            <MDBView>
              <img
                className="recommend_3"
                src="https://mdbootstrap.com/img/Photos/Slides/img%20(133).jpg"
                alt="Third slide"
              />
            </MDBView>
          </MDBCarouselItem>
        </MDBCarouselInner>
      </MDBCarousel>
    );
  };

  courseRecommendation = () => {
    return (
      <MDBContainer>
        <h4>You might be interested</h4>
        <hr />
        {/* <Card style={{ maxWidth: 500 }}> */}
        <MDBRow>
          {this.state.coursepackList && this.state.coursepackList.map((course) => {
            return (
              <MDBCol size="3" key={course.id}>
                <Card style={{ maxHeight: 300 }}>
                  {this.renderRediect()}
                  <CardActionArea /* onClick={() => this.handleCard(course.id)} */ onClick={this.setRedirect}>
                    <CardMedia
                      style={{ height: 140 }}
                      image="/static/images/cards/contemplative-reptile.jpg"
                      title="Contemplative Reptile"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {course.courseTitle}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                        {course.category}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                        {course.price}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                        {course.teacher}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </MDBCol>
            )
          })}
        </MDBRow>
      </MDBContainer>
    )
  };

  lastAccessed = () => {
    return (

      <MDBCardGroup deck className="mt-3">
        <MDBCard>
          <MDBCardImage
            src="https://mdbootstrap.com/img/Photos/Others/images/16.jpg"
            alt="MDBCard image cap"
            top
            hover
            overlay="white-slight"
          />
          <MDBCardBody>
            <MDBCardTitle tag="h5">Course Title</MDBCardTitle>
            <MDBCardText>Prof Name</MDBCardText>
            <MDBCardText>Rating</MDBCardText>
            <MDBCardText>Price</MDBCardText>
          </MDBCardBody>
        </MDBCard>

        <MDBCard>
          <MDBCardImage
            src="https://mdbootstrap.com/img/Photos/Others/images/14.jpg"
            alt="MDBCard image cap"
            top
            hover
            overlay="white-slight"
          />

          <MDBCardBody>
            <MDBCardTitle tag="h5">Course Title</MDBCardTitle>
            <MDBCardText>Prof Name</MDBCardText>
            <MDBCardText>Rating</MDBCardText>
            <MDBCardText>Price</MDBCardText>
          </MDBCardBody>
        </MDBCard>

        <MDBCard>
          <MDBCardImage
            src="https://mdbootstrap.com/img/Photos/Others/images/15.jpg"
            alt="MDBCard image cap"
            top
            hover
            overlay="white-slight"
          />

          <MDBCardBody>
            <MDBCardTitle tag="h5">Course Title</MDBCardTitle>
            <MDBCardText>Prof Name</MDBCardText>
            <MDBCardText>Rating</MDBCardText>
            <MDBCardText>Price</MDBCardText>
          </MDBCardBody>
        </MDBCard>

        <MDBCard>
          <MDBCardImage
            src="https://mdbootstrap.com/img/Photos/Others/images/15.jpg"
            alt="MDBCard image cap"
            top
            hover
            overlay="white-slight"
          />

          <MDBCardBody>
            <MDBCardTitle tag="h5">Course Title</MDBCardTitle>
            <MDBCardText>Prof Name</MDBCardText>
            <MDBCardText>Rating</MDBCardText>
            <MDBCardText>Price</MDBCardText>
          </MDBCardBody>
        </MDBCard>
      </MDBCardGroup>

    )
  }

  checkUserEnrolled = () => {
    // if user is not enrolled into any courses
    return this.mediaCarousel();
    // else 
    // return this.lastAccessed();
  };

  render() {
    let accessRight = localStorage.getItem("accessRight")
    return (
      <MDBContainer style={{ paddingBottom: 240 }}>
        <MDBRow>
          <MDBCol md="8" className="mt-4">
            <h2 className="font-weight-bold" style={{ paddingTop: 50 }}>
              Coursepack
          </h2>
          </MDBCol>
          {accessRight === "Student" && <CoursepackDashboardPageStudent />}
          {/*  {accessRight === "Public" && <CoursepackDashboardPageStudent />} TODO: */}
          {accessRight === "Teacher" && <CoursepackDashboardPageTeacher />}

        </MDBRow>
      </MDBContainer>
    )
  }
}

export default CoursepackDashboard;

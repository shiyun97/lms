import React, { Component } from "react";
import {
  MDBContainer, MDBCarouselInner, MDBView, MDBCarouselItem, MDBCarousel, MDBCol, MDBBtn, MDBRow,
  MDBCard, MDBCardImage, MDBCardGroup, MDBCardBody, MDBCardText, MDBCardTitle, MDBMedia, MDBNavbar,
  MDBNavbarBrand, MDBNavbarToggler, MDBNavbarNav, MDBNavLink, MDBCollapse, MDBNavItem, MDBIcon
} from "mdbreact";
import axios from "axios";
import { NavLink } from 'react-router-dom';
import VideoThumbnail from 'react-video-thumbnail';
import biz from '../biz.jpg'
import design from '../design.jpg'
import cprog from '../cprog.jpg'
import CoursepackTopNav from "../CoursepackTopNav";

const API = "http://localhost:8080/LMS-war/webresources/"
const FILE_SERVER = "http://127.0.0.1:8887/";

class CoursepackDashboardPageStudent extends Component {
  state = {
    coursepackList: "",
    category: ["Computer Science", "Business Management", "Engineering"],
    filesList: ""
  }

  componentDidMount() {
    axios.get(`${API}Coursepack/getAllCoursepack`)
      .then(result => {
        this.setState({ coursepackList: result.data.coursepack })
      })
      .catch(error => {
        console.error("error in axios " + error);
      });


    //get all coursepack multimedia
    axios.get(`${API}file/retrieveAllMultimediaForCoursepacks`)
      .then(result => {
        this.setState({ filesList: result.data.files })
      })
      .catch(error => {
        console.error("error in axios " + error);
      });
  }


  mediaCarousel = () => {
    return (
      <MDBCol align="center">

       {/*  <MDBCarousel
          interval={1500}
          activeItem={1}
          length={3}
          showControls={true}
          showIndicators={true}
          style={{ height: 400, width: 700 }}
        >
          {this.state.coursepackList && this.state.coursepackList.map((coursepack, index) => {
            return (
              <NavLink to={`/coursepack/${coursepack.coursepackId}`}>
                <MDBCarouselInner item>
                  <MDBCarouselItem itemId={index}>
                    {this.showImage(index)}
                  </MDBCarouselItem>
                </MDBCarouselInner>
              </NavLink>

            )
          })}
        </MDBCarousel> */}
      </MDBCol >
    );
  };

  showImage = (index) => {
    if (index === 1) {
      return (
        <MDBView>
          <img
            className="d-block w-100"
            src={biz}
            alt="First slide"
          />
        </MDBView>
      )
    } else if (index === 2) {
      return (
        <MDBView>
          <img
            className="d-block w-100"
            src={cprog}
            alt="First slide"
          />
        </MDBView>
      )
    } else if (index === 3) {
      return (
        <MDBView>
          <img
            className="d-block w-100"
            src={design}
            alt="First slide"
          />
        </MDBView>
      )
    } else {
      return null
    }
  }

  courseRecommendation = () => {
    return (
      <MDBContainer>
        <h4><b>You might be interested</b></h4>
        <hr />
        <MDBRow>
          {this.state.coursepackList && this.state.coursepackList.map((course) => {
            return (
              <MDBCol size="3" key={course.coursepackId} style={{ paddingBottom: 30 }}>
                <NavLink to={`/coursepack/${course.coursepackId}/`} activeClassName="activeClass">
                  <MDBCard >
                    <MDBCardBody>
                      <MDBMedia object src="https://mdbootstrap.com/img/Photos/Others/placeholder1.jpg" alt="" />
                      <MDBCardTitle>
                        <MDBCardText>{course.title}</MDBCardText>
                        <MDBCardText>{course.category}</MDBCardText>
                        <MDBCardText>{course.price}</MDBCardText>
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
  };


  render() {
    console.log("student")
    return (
      <div>
        <CoursepackTopNav />

        <MDBContainer style={{ paddingTop: 100 }} >
          {this.mediaCarousel()}
          <br />
          <br />
          <br />
          {this.courseRecommendation()}
        </MDBContainer>
      </div>
    );
  }
}
export default CoursepackDashboardPageStudent;

import React, { Component } from "react";
import {
  MDBContainer, MDBCarouselInner, MDBView, MDBCarouselItem, MDBCarousel, MDBCol, MDBBtn, MDBRow,
  MDBCard, MDBCardImage, MDBCardGroup, MDBCardBody, MDBCardText, MDBCardTitle
} from "mdbreact";
import axios from "axios";
import { NavLink } from 'react-router-dom'



const API = "http://localhost:3001"

class CourseManagementExploreCourses extends Component {
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

  //will display carousel if student has no exisitng courses
  //will display student's current courses if he has enrolled into some
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
      <div>
        <h4>You might be interested</h4>

        <MDBCardGroup deck className="mt-3">
          {this.state.coursepackList && this.state.coursepackList.map((course) => {
            return (
              <MDBCard key={course.id}>
                <MDBCardImage
                  src="https://mdbootstrap.com/img/Photos/Others/images/16.jpg"
                  alt="MDBCard image cap"
                  top
                  hover
                  overlay="white-slight"
                />
                <MDBCardBody>
                  <MDBCardTitle tag="h5">{course.courseCode}</MDBCardTitle>
                  <MDBCardText>{course.teacher}</MDBCardText>
{/*                   <Rating value={course.rating} readOnly />
 */}
                  <MDBCardText>{course.rating}</MDBCardText>
                  <MDBCardText>SGD {course.price}</MDBCardText>
                </MDBCardBody>
              </MDBCard>

            )
          })}

{/* 
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
          </MDBCard>*/}
        </MDBCardGroup> 
      </div>
    );
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
    return (
      <MDBContainer className="mt-5">
        {this.heading()}
        {this.checkUserEnrolled()}
        <br />
        <br />
        {this.courseRecommendation()}

        <br />
      </MDBContainer>
    );
  }
}

export default CourseManagementExploreCourses;

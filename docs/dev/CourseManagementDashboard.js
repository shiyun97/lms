import React, { Component } from "react";
import { MDBContainer, MDBCarouselInner, MDBView, MDBCarouselItem, MDBCarousel, MDBCard, MDBCardImage, MDBCardGroup, MDBCardBody, MDBCardText, MDBCardTitle } from "mdbreact";

class CourseManagementDashboard extends Component {
  heading = () => {
    return (
      <div>
        <h3><b>Welcome, (username)!</b></h3>
        <hr/>
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
    );
  };

  render() {
    return (
      <MDBContainer className="mt-5">
        {this.heading()}
        {this.mediaCarousel()}
        <br /><br />
        <h4>You might be interested</h4>

        {this.courseRecommendation()}
        {this.courseRecommendation()}

        <br/>
      </MDBContainer>
    );
  }
}

export default CourseManagementDashboard;

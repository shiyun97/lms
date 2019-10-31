import React, { Component } from "react";
import {
  MDBContainer, MDBCarouselInner, MDBView, MDBCarouselItem, MDBCarousel, MDBCol, MDBRow,
  MDBCard, MDBCardBody, MDBCardText, MDBCardTitle, MDBMedia
} from "mdbreact";
import axios from "axios";
import { NavLink } from 'react-router-dom';
import VideoThumbnail from 'react-video-thumbnail';
import biz from './biz.jpg'
import design from './design.jpg'
import cprog from './cprog.jpg'
import CoursepackTopNav from "./CoursepackTopNav";

const API = "http://localhost:8080/LMS-war/webresources/"
const FILE_SERVER = "http://127.0.0.1:8887/";

class CoursepackDashboardPage extends Component {
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
      <MDBContainer>
        <MDBCarousel
          activeItem={1}
          length={3}
          showControls={true}
          showIndicators={false}
          className="z-depth-1"
          slide
        >
          <MDBCarouselInner>
            <NavLink to='/coursepack/42'>
              <MDBCarouselItem itemId="1" >
                <MDBView>
                  <img
                    className="d-block w-100"
                    src={cprog}
                    alt="First slide"
                    style={{ height: 400, width: 250 }}
                  />
                </MDBView>
              </MDBCarouselItem>
            </NavLink>
            <NavLink to='/coursepack/43'>
              <MDBCarouselItem itemId="2">
                <MDBView>
                  <img
                    className="d-block w-100"
                    src={biz}
                    alt="Second slide"
                    style={{ height: 400, width: 250 }}
                  />
                </MDBView>
              </MDBCarouselItem>
            </NavLink>
            <NavLink to="/coursepack/44">
              <MDBCarouselItem itemId="3">
                <MDBView>
                  <img
                    className="d-block w-100"
                    src={design}
                    alt="Third slide"
                    style={{ height: 400, width: 250 }}
                  />
                </MDBView>
              </MDBCarouselItem>
            </NavLink>
          </MDBCarouselInner>
        </MDBCarousel>
      </MDBContainer >
    );
  }

  courseRecommendation = () => {
    return (
      <MDBContainer>
        <h4><b>You might be interested</b></h4>
        <hr />
        <MDBRow>
          {this.state.coursepackList && this.state.coursepackList.map((course, index) => {
            return (
              <MDBCol size="3" key={course.coursepackId} style={{ paddingBottom: 30 }}>
                <NavLink to={`/coursepack/${course.coursepackId}/`} activeClassName="activeClass">
                  <MDBCard style={{ height: 180 }} >
                    <MDBCardBody>
                      <MDBMedia object src={this.getImage(index)} alt="" />
                      <MDBCardTitle>
                        <MDBCardText><h6><b>{course.title}</b></h6></MDBCardText>
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

  getImage = (index) => {
    return <div>cprog</div>
  }

  render() {
    console.log("student")
    return (
      <div>
        <CoursepackTopNav />
        <MDBContainer style={{ paddingBottom: 240 }}>


          <MDBContainer style={{ paddingTop: 100 }} >
            {this.mediaCarousel()}
            <br />
            <br />
            <br />
            {this.courseRecommendation()}
          </MDBContainer>
        </MDBContainer>
      </div>
    );
  }
}
export default CoursepackDashboardPage;

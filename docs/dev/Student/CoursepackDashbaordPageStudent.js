import React, { Component } from "react";
import {
  MDBContainer, MDBCarouselInner, MDBView, MDBCarouselItem, MDBCarousel, MDBCol, MDBBtn, MDBRow,
  MDBCard, MDBCardImage, MDBCardGroup, MDBCardBody, MDBCardText, MDBCardTitle, MDBMedia, MDBNavbar,
  MDBNavbarBrand, MDBNavbarToggler, MDBNavbarNav, MDBNavLink, MDBCollapse, MDBNavItem, MDBIcon
} from "mdbreact";
import axios from "axios";
import { NavLink } from 'react-router-dom';
import VideoThumbnail from 'react-video-thumbnail';
import Night from '../night.mp4'
import Pexels from '../pexels.mp4'
import CoursepackTopNav from "../CoursepackTopNav";


const API_MOCK = "http://localhost:3001"
const API = "http://localhost:8080/LMS-war/webresources/"
const FILE_SERVER = "http://127.0.0.1:8887/";

class CoursepackDashboardPageStudent extends Component {
  state = {
    coursepackList: "",
    category: "",
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

    axios.get(`${API}/category`)
      .then(result => {
        this.setState({ category: result.data })
        console.log(result.data)
      })
      .catch(error => {
        console.error("error in axios " + error);
      });

    //get all coursepack multimedia
    axios.get(`${API}file/retrieveAllMultimediaForCoursepacks`) //FIXME:
      .then(result => {
        this.setState({ filesList: result.data.files })
        console.log(result.data)
      })
      .catch(error => {
        console.error("error in axios " + error);
      });
  }

  //TODO:
  handleClick = event => {
    console.log("go into course view")
  }

  mediaCarousel = () => {
    return (
      <MDBCol align="center">
        <MDBCarousel
          interval={1500}
          activeItem={1}
          length={5}
          showControls={true}
          showIndicators={true}
          style={{ height: 400, width: 700 }}
        >
          <MDBCarouselInner>
            {this.state.filesList && this.state.filesList.map((file, index) => {
              let savedFileName = file && file.location.split('\\')[1];
              let fullPath = FILE_SERVER + savedFileName;
              return (
                <MDBCarouselItem itemId={index} onClick={this.handleClick}>
                  <MDBView >
                    <VideoThumbnail
                      videoUrl={fullPath}
                      thumbnailHandler={(thumbnail) => thumbnail}
                      width={680}
                      height={500}
                    />
                  </MDBView>
                </MDBCarouselItem>

              )
            })}
          </MDBCarouselInner>
        </MDBCarousel>
      </MDBCol>
    );
  };

  courseRecommendation = () => {
    return (
      <MDBContainer>
        <h4><b>You might be interested</b></h4>
        <hr />
        <MDBRow>
          {this.state.coursepackList && this.state.coursepackList.map((course) => {
            return (
              <MDBCol size="3" key={course.coursepackId} style={{paddingBottom: 30}}>
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

  // lastAccessed = () => {
  //   //only show if student is enrolled into some courses
  //   return (
  //     <MDBContainer>
  //       <h4>Continue from where you are</h4>
  //       <hr />
  //       {/* <Card style={{ maxWidth: 500 }}> */}
  //       <MDBRow>
  //         {this.state.coursepackList && this.state.coursepackList.map((course) => {
  //           return (
  //             <MDBCol size="3" key={course.id}>
  //               <Card style={{ maxHeight: 300 }}>
  //                 <CardActionArea >
  //                   <CardMedia
  //                     style={{ height: 140 }}
  //                     image="/static/images/cards/contemplative-reptile.jpg"
  //                     title="Contemplative Reptile"
  //                   />
  //                   <CardContent>
  //                     <Typography gutterBottom variant="h5" component="h2">
  //                       {course.courseTitle}
  //                     </Typography>
  //                     <Typography variant="body2" color="textSecondary" component="p">
  //                       {course.category}
  //                     </Typography>
  //                     <Typography variant="body2" color="textSecondary" component="p">
  //                       {course.price}
  //                     </Typography>
  //                     <Typography variant="body2" color="textSecondary" component="p">
  //                       {course.teacher}
  //                     </Typography>
  //                   </CardContent>
  //                 </CardActionArea>
  //               </Card>
  //             </MDBCol>
  //           )
  //         })}
  //       </MDBRow>
  //     </MDBContainer>)
  // }

  render() {
    console.log("student")
    return (
      <div>
        <CoursepackTopNav />

        <MDBContainer style={{ paddingTop: 100 }} >
          {this.mediaCarousel()}
          <br />
          {/* this.lastAccessed() */}
          <br />
          <br />
          {this.courseRecommendation()}
        </MDBContainer>
      </div>
    );
  }
}
export default CoursepackDashboardPageStudent;

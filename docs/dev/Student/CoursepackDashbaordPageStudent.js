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


const API = "http://localhost:3001"

class CoursepackDashboardPageStudent extends Component {
  state = {
    coursepackList: "",
    category: ""
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

    axios.get(`${API}/category`)
      .then(result => {
        this.setState({ category: result.data })
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
          length={3}
          showControls={true}
          showIndicators={true}
          style={{ height: 400, width: 700 }}
        >
          <MDBCarouselInner>
            <MDBCarouselItem itemId="1" onClick={this.handleClick}>
              <MDBView >
                <VideoThumbnail
                  videoUrl={Night}
                  thumbnailHandler={(thumbnail) => (thumbnail)}
                  width={680}
                  height={500}
                />
              </MDBView>
            </MDBCarouselItem>
            <MDBCarouselItem itemId="2" onClick={this.handleClick}>
              <MDBView>
                <VideoThumbnail
                  videoUrl={Pexels}
                  thumbnailHandler={(thumbnail) => (thumbnail)}
                  width={680}
                  height={500}
                />
              </MDBView>
            </MDBCarouselItem>
            <MDBCarouselItem itemId="3" onClick={this.handleClick}>
              <MDBView>
                <VideoThumbnail
                  videoUrl={Night}
                  thumbnailHandler={(thumbnail) => (thumbnail)}
                  width={680}
                  height={500}
                />
              </MDBView>
            </MDBCarouselItem>
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
       <CoursepackTopNav/>

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

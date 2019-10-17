import React, { Component } from "react";
import {
  MDBContainer, MDBCarouselInner, MDBView, MDBCarouselItem, MDBCarousel, MDBCol, MDBBtn, MDBRow,
  MDBCard, MDBCardImage, MDBCardGroup, MDBCardBody, MDBCardText, MDBCardTitle, MDBMedia
} from "mdbreact";
import axios from "axios";
import { NavLink } from 'react-router-dom'

const API = "http://localhost:3001"

class CoursepackDashboardPageStudent extends Component {
  state = {
    coursepackList: "",
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
      </MDBCol>
    );
  };

  courseRecommendation = () => {
    return (
      <MDBContainer>
        <h4>You might be interested</h4>
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

      <MDBContainer className="mt-5">
        <hr />
        {this.mediaCarousel()}
        <br />
        <br />
        {/* this.lastAccessed() */}
        <br />
        <br />
        {this.courseRecommendation()}
      </MDBContainer>
    );
  }
}
export default CoursepackDashboardPageStudent;

import React, { Component } from "react";
import { observer, inject } from 'mobx-react';
import {
  MDBContainer,
  MDBCarouselInner,
  MDBView,
  MDBCarouselItem,
  MDBCarousel,
  MDBCol,
  MDBRow,
  MDBIcon,
  MDBJumbotron,
  MDBNav,
  MDBNavItem,
  MDBNavLink
} from "mdbreact";
import axios from "axios";
import { NavLink } from 'react-router-dom';
import VideoThumbnail from 'react-video-thumbnail';
import biz from './img/biz.jpg'
import design from './img/design.jpg'
import cprog from './img/cprog.jpg'
import coursepackBanner from './img/coursepack-banner.jpg';
import CoursepackTopNav, { CategoryTopNav } from "./CoursepackTopNav";
import { Rating } from '@material-ui/lab';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Snackbar from '@material-ui/core/Snackbar';
import styled from 'styled-components';
import MainSideNavDropdown from "./MainSideNavDropdown";


const API = "http://localhost:8080/LMS-war/webresources/"
const FILE_SERVER = "http://127.0.0.1:8887/";

@inject('dataStore')
@observer
class CoursepackDashboardPage extends Component {
  state = {
    categories: [],
    coursepackList: [],
    recommendedCoursepackList: [],
    userCoursepackList: [],
    category: [],
    filesList: "",
    cartNum: 0,
    message: "",
    openSnackbar: false,
  }

  componentDidMount() {
    // get all categories
    axios.get(`${API}Coursepack/getAllCategories`)
      .then(result => {
        this.setState({ categories: result.data.categories })
        console.log(result.data)
      })
      .catch(error => {
        console.error("error in axios " + error);
      });

    // get all coursepacks
    axios.get(`${API}Coursepack/getAllCoursepack`)
      .then(result => {
        console.log(result.data)
        this.setState({ coursepackList: result.data.coursepack })
      })
      .catch(error => {
        console.error("error in axios " + error);
      });

    // get recommended coursepacks
    axios.get(`${API}Coursepack/getRecommendedCoursepack?userId=${sessionStorage.getItem("userId")}`)
      .then(result => {
        console.log(result.data)
        this.setState({ recommendedCoursepackList: result.data.coursepack })
      })
      .catch(error => {
        console.error("error in axios " + error);
      });

    // get all coursepacks of student / public user
    axios.get(`${API}Coursepack/getUserCoursepack/${sessionStorage.getItem("userId")}`)
      .then(result => {
        console.log(result.data)
        this.setState({ userCoursepackList: result.data.coursepack })
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

    // get cart items if any
    let cart = sessionStorage.getItem("cart");
    let cartNum = 0;
    if (cart != undefined && cart != null) {
      let cartObjs = JSON.parse(cart);
      cartNum = cartObjs.length;
    }
    this.setState({
      cartNum: cartNum
    })
  }

  handleOpenSnackbar = () => {
    this.setState({ openSnackbar: true });
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ openSnackbar: false });
  };

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

  addToCart = (course) => {
    let cart = sessionStorage.cart;
    if (cart != null && cart != undefined) {
      let cartObjs = JSON.parse(cart);
      let found = false
      let idx = 0;
      for (idx = 0; (idx < cartObjs.length) && found == false; idx++) {
        let obj = cartObjs[idx];
        if (obj.coursepackId == course.coursepackId) {
          found = true
          // do not add to cart again, send alert
          console.log("found in cart alr");
          this.setState({
            openSnackbar: true,
            message: "Item has been added into cart already!"
          })
        }
      }

      let userCoursepackList = this.state.userCoursepackList;
      for (idx = 0; (idx < userCoursepackList.length) && found == false; idx++) {
        let obj = userCoursepackList[idx];
        if (obj.coursepackId == course.coursepackId) {
          found = true
          // do not add to cart again, send alert
          console.log("found in cart alr");
          this.setState({
            openSnackbar: true,
            message: "You have bought this item already!"
          })
        }
      }

      if (found == false) {
        // add to cart
        cartObjs.push(course);
        sessionStorage.setItem("cart", JSON.stringify(cartObjs));
        this.setState({
          cartNum: cartObjs.length
        })
      }
    }
    else {
      let cartObjs = [course]
      sessionStorage.setItem("cart", JSON.stringify(cartObjs));
      this.setState({
        cartNum: cartObjs.length
      })
    }
    console.log(sessionStorage.getItem("cart"))
  }

  enrollCourse = (course) => {
    let found = false;
    let idx = 0;
    let userCoursepackList = this.state.userCoursepackList;
    for (idx = 0; (idx < userCoursepackList.length) && found == false; idx++) {
      let obj = userCoursepackList[idx];
      if (obj.coursepackId == course.coursepackId) {
        found = true
        // do not enroll again, send alert
        this.setState({
          openSnackbar: true,
          message: "You have enrolled in this coursepack already!"
        })
      }
    }

    if (course && sessionStorage.getItem("userId") && found == false) {
      axios
        .put(`${API}CoursepackEnrollment/enrollCoursepack?userId=${sessionStorage.getItem("userId")}&coursepackId=${course.coursepackId}`)
        .then(result => {
          this.setState({
            openSnackbar: true,
            message: "Enrolled into coursepack succesfully"
          })
          this.props.dataStore.setPath(`/coursepack/myCourses`);
          this.props.history.push(`/coursepack/myCourses`);
        })
        .catch(error => {
          this.setState({
            openSnackbar: false,
            message: "An error occurred, please try again"
          })
          console.error("error in axios " + error);
        });
    }
  }

  /*
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
  };*/

  viewAllCoursepacks = () => {
    this.props.dataStore.setPath(`/coursepacks`);
    this.props.history.push(`/coursepacks`);
  }

  // get courses to discover (all)
  discoverCoursepacks = () => {
    let coursepackList = this.state.coursepackList;
    let displayCoursepackList = coursepackList;
    if (displayCoursepackList.length > 8) {
      displayCoursepackList = displayCoursepackList.slice(0, 8);
    }

    return (
      <>
        <h4><b>Discover coursepacks</b></h4>
        <hr />
        <MDBRow>
          <MDBCol>
            <span style={{ float: "right", textDecorationLine: "underline", cursor: "pointer" }} className="mb-2" onClick={e => this.viewAllCoursepacks()}>
              View all coursepacks >
            </span>
          </MDBCol>
        </MDBRow>
        <MDBRow>
          {displayCoursepackList && displayCoursepackList.map((course, index) => {
            return (
              <MDBCol md="3" key={course.coursepackId} style={{ paddingBottom: 30 }}>
                <Card>
                  <CardActionArea>
                    <NavLink to={`/coursepack/${course.coursepackId}/`} style={{ marginBottom: 0 }}>
                      <CardMedia
                        style={{ height: 140 }}
                        image={course.imageLocation}
                        title={course.title}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2" style={{ color: "#000000" }}>
                          {course.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                          {course.assignedTeacher.firstName + " " + course.assignedTeacher.lastName}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                          <div style={{ width: 200, display: "flex", marginTop: 10 }}>
                            <Rating name="hover-side" value={course.rating} precision={0.1} readOnly size="small" />
                            <Box ml={2}>{course.rating.toFixed(1) + " (" + course.ratingList.length + ")"}</Box>
                          </div>
                        </Typography>
                        <Typography gutterBottom variant="h6" component="h2" style={{ color: "#000000", marginTop: 10 }}>
                          {sessionStorage.getItem("accessRight") === "Student" ? "FREE" : "S$" + course.price.toFixed(2)}
                        </Typography>
                      </CardContent>
                    </NavLink>
                  </CardActionArea>
                  {
                    sessionStorage.getItem("accessRight") === "Public" && <CardActions>
                      <Button variant="contained" color="secondary" onClick={e => this.addToCart(course)}>
                        Add To Cart
                      </Button>
                    </CardActions>
                  }
                  {
                    sessionStorage.getItem("accessRight") === "Student" && <CardActions>
                      <Button variant="contained" color="secondary" onClick={e => this.enrollCourse(course)}>
                        Enroll Now
                      </Button>
                    </CardActions>
                  }
                </Card>
              </MDBCol>
            )
          })}
        </MDBRow>
      </>
    )
  };

  // get courses student not enrolled in
  courseRecommendation = () => {
    let coursepackList = this.state.recommendedCoursepackList;
    let displayCoursepackList = coursepackList;
    if (displayCoursepackList.length > 4) {
      displayCoursepackList = displayCoursepackList.slice(0, 4);
    }
    return (
      <div className={this.props.className}>
        <h4 className="mt-5"><b>You might be interested</b></h4>
        <hr />
        <MDBRow>
          {coursepackList && coursepackList.map((course, index) => {
            return (
              <MDBCol md="3" key={course.coursepackId} style={{ paddingBottom: 30 }}>
                <Card>
                  <CardActionArea>
                    <NavLink to={`/coursepack/${course.coursepackId}/`} style={{ marginBottom: 0 }}>
                      <CardMedia
                        style={{ height: 140 }}
                        image={course.imageLocation}
                        title={course.title}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2" style={{ color: "#000000" }}>
                          {course.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                          {course.assignedTeacher.firstName + " " + course.assignedTeacher.lastName}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                          <div style={{ width: 200, display: "flex", marginTop: 10 }}>
                            <Rating name="hover-side" value={course.rating} precision={0.1} readOnly size="small" />
                            <Box ml={2}>{course.rating.toFixed(1) + " (" + course.ratingList.length + ")"}</Box>
                          </div>
                        </Typography>
                        <Typography gutterBottom variant="h6" component="h2" style={{ color: "#000000", marginTop: 10 }}>
                          {sessionStorage.getItem("accessRight") === "Student" ? "FREE" : "S$" + course.price.toFixed(2)}
                        </Typography>
                      </CardContent>
                    </NavLink>
                  </CardActionArea>

                  <CardActions>
                    {
                      sessionStorage.getItem("accessRight") === "Public" &&
                      <Button variant="contained" color="secondary" onClick={e => this.addToCart(course)}>
                        Add To Cart
                      </Button>
                    }
                    {
                      sessionStorage.getItem("accessRight") === "Student" &&
                      <Button variant="contained" color="secondary" onClick={e => this.enrollCourse(course)}>
                        Enroll Now
                      </Button>
                    }
                  </CardActions>
                </Card>
              </MDBCol>
            )
          })}
        </MDBRow>
      </div>
    )
  };

  renderSnackbar = () => {
    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={this.state.openSnackbar}
        autoHideDuration={6000}
        onClose={this.handleClose}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{this.state.message}</span>}
        action={[
          <MDBIcon icon="times" color="white" onClick={this.handleClose} style={{ cursor: "pointer" }} />,
        ]}
      />
    )
  }

  getImage = (index) => {
    return <div>cprog</div>
  }

  showCategory = (categoryId) => {
    this.props.dataStore.setPath('/coursepacks/' + categoryId);
    this.props.history.push('/coursepacks/' + categoryId);
  }

  render() {
    let categories = this.state.categories;
    return (
      <div className={this.props.className}>
        <CoursepackTopNav cartNum={this.state.cartNum} />
        <MDBJumbotron style={{ paddingLeft: 260, paddingBottom: 40, maxHeight: 10, marginBottom: 0, float: "center", backgroundColor: "#f0f0f0"}} className="categoryBar">
          <div>
            <MDBNav>
              {
                categories.length > 0 && categories.map((category, index) => {
                  return (
                    <MDBNavItem>
                      <MDBNavLink active={false} to={`/coursepacks/${category.categoryId}`} onClick={e => this.showCategory(category.categoryId)}
                        style={{ color: "black" }}>
                        {category.name}
                      </MDBNavLink>
                    </MDBNavItem>
                  )
                })
              }
            </MDBNav>
          </div>
        </MDBJumbotron>
        <MDBContainer style={{ paddingBottom: 240 }} className="bannerPaddingTop">
          {/*this.mediaCarousel()*/}
          <img
            src={coursepackBanner}
            alt="FlipIT"
            width="100%"
          />
          <br />
          <br />
          <br />
          {this.discoverCoursepacks()}
          {this.courseRecommendation()}
          {this.renderSnackbar()}
        </MDBContainer>
      </div>
    );
  }
}
export default styled(CoursepackDashboardPage)`
@media screen and (max-width: 800px) {
  .categoryBar {
    display: none;
  }

  .bannerPaddingTop {
    margin-top: 50px;
  }
}
`;

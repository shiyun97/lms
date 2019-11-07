import React, { Component } from "react";
import { observer, inject } from 'mobx-react'
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

const API = "http://localhost:8080/LMS-war/webresources/"
const FILE_SERVER = "http://127.0.0.1:8887/";

@inject('dataStore')
@observer
class CoursepackDashboardPage extends Component {
  state = {
    categories: [],
    coursepackList: "",
    category: ["Computer Science", "Business Management", "Engineering"],
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

    axios.get(`${API}Coursepack/getAllCoursepack`)
      .then(result => {
        console.log(result.data)
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
      let idx=0;
      for (idx=0; (idx < cartObjs.length) && found == false; idx++) {
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
    let firstCoursepackList = coursepackList;
    if (coursepackList.length > 4) {
      firstCoursepackList = coursepackList.slice(0,4);
    }
    let secondCoursepackList = coursepackList.slice(4);
    if (coursepackList.length > 8) {
      secondCoursepackList = coursepackList.slice(4, 8);
    }
    
    return (
      <div className={this.props.className}>
        <h4><b>Discover coursepacks</b></h4>
        <hr />
        <MDBRow>
          <MDBCol>
            <span style={{float: "right", textDecorationLine:"underline", cursor: "pointer"}} className="mb-2" onClick={e => this.viewAllCoursepacks()}>
              View all coursepacks >
            </span>
          </MDBCol>
        </MDBRow>
        <MDBRow>
          {firstCoursepackList && firstCoursepackList.map((course, index) => {
            return (
              <MDBCol size="3" key={course.coursepackId} style={{ paddingBottom: 30 }}>
                {/*<MDBCard style={{ width: "15rem", height: "18rem" }} className="mr-2">
                      <MDBCardImage className="img-fluid" src={cprog} waves />
                      <MDBCardBody>
                        <MDBCardTitle><h6><b>{course.title}</b></h6></MDBCardTitle>
                          <MDBCardText>{course.category}</MDBCardText>
                          <MDBCardText>{course.price}</MDBCardText>
                      </MDBCardBody>
                    </MDBCard>*/}
                <Card style={{ height: "25rem" }}>
                  <CardActionArea>
                    <NavLink to={`/coursepack/${course.coursepackId}/`} style={{ marginBottom: 0 }}>
                      <CardMedia
                        style={{ height: 140 }}
                        image={cprog}
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
                            <Rating name="hover-side" value={course.rating} readOnly size="small" />
                            <Box ml={2}>{course.rating.toFixed(1) + " (" + course.ratingList.length + ")"}</Box>
                          </div>
                        </Typography>
                        <Typography gutterBottom variant="h6" component="h2" style={{ color: "#000000", marginTop: 10 }}>
                          {"S$" + course.price.toFixed(2)}
                        </Typography>
                      </CardContent>
                    </NavLink>
                  </CardActionArea>

                  <CardActions>
                    <Button variant="contained" color="secondary"  onClick={e => this.addToCart(course)}>
                      Add To Cart
                    </Button>
                  </CardActions>
                </Card>
              </MDBCol>
            )
          })}
        </MDBRow>

        <MDBRow>
          {secondCoursepackList && secondCoursepackList.map((course, index) => {
            return (
              <MDBCol size="3" key={course.coursepackId} style={{ paddingBottom: 30 }}>
                <Card style={{ height: "25rem" }}>
                  <CardActionArea>
                    <NavLink to={`/coursepack/${course.coursepackId}/`} style={{ marginBottom: 0 }}>
                      <CardMedia
                        style={{ height: 140 }}
                        image={cprog}
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
                            <Rating name="hover-side" value={course.rating} readOnly size="small" />
                            <Box ml={2}>{course.rating.toFixed(1) + " (" + course.ratingList.length + ")"}</Box>
                          </div>
                        </Typography>
                        <Typography gutterBottom variant="h6" component="h2" style={{ color: "#000000", marginTop: 10 }}>
                          {"S$" + course.price.toFixed(2)}
                        </Typography>
                      </CardContent>
                    </NavLink>
                  </CardActionArea>

                  <CardActions>
                    <Button variant="contained" color="secondary"  onClick={e => this.addToCart(course)}>
                      Add To Cart
                    </Button>
                  </CardActions>
                </Card>
              </MDBCol>
            )
          })}
        </MDBRow>
      </div>
    )
  };

  // get courses student not enrolled in
  courseRecommendation = () => {
    return (
      <div className={this.props.className}>
        <h4 className="mt-5"><b>You might be interested</b></h4>
        <hr />
        <MDBRow>
          {this.state.coursepackList && this.state.coursepackList.map((course, index) => {
            return (
              <MDBCol size="3" key={course.coursepackId} style={{ paddingBottom: 30 }}>
                {/*<MDBCard style={{ width: "15rem", height: "18rem" }} className="mr-2">
                      <MDBCardImage className="img-fluid" src={cprog} waves />
                      <MDBCardBody>
                        <MDBCardTitle><h6><b>{course.title}</b></h6></MDBCardTitle>
                          <MDBCardText>{course.category}</MDBCardText>
                          <MDBCardText>{course.price}</MDBCardText>
                      </MDBCardBody>
                    </MDBCard>*/}
                <Card style={{ height: "25rem" }}>
                  <CardActionArea>
                    <NavLink to={`/coursepack/${course.coursepackId}/`} style={{ marginBottom: 0 }}>
                      <CardMedia
                        style={{ height: 140 }}
                        image={cprog}
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
                            <Rating name="hover-side" value={course.rating} readOnly size="small" />
                            <Box ml={2}>{course.rating.toFixed(1) + " (" + course.ratingList.length + ")"}</Box>
                          </div>
                        </Typography>
                        <Typography gutterBottom variant="h6" component="h2" style={{ color: "#000000", marginTop: 10 }}>
                          {"S$" + course.price.toFixed(2)}
                        </Typography>
                      </CardContent>
                    </NavLink>
                  </CardActionArea>

                  <CardActions>
                    <Button variant="contained" color="secondary" onClick={e => this.addToCart(course)}>
                      Add To Cart
                    </Button>
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
      <div>
        <CoursepackTopNav cartNum={this.state.cartNum} />
        <MDBJumbotron style={{ paddingLeft: 260, paddingBottom: 40, height: 10, marginBottom: 0, float: "center" }}>
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
        <MDBContainer style={{ paddingBottom: 240 }}>


          <MDBContainer style={{ paddingTop: 16 }} >
            {/*this.mediaCarousel()*/}
            <img
              src={coursepackBanner}
              alt="FlipIT"
              style={{ maxWidth: 1130 }}
            />
            <br />
            <br />
            <br />
            {this.discoverCoursepacks()}
            {this.courseRecommendation()}
            {this.renderSnackbar()}
          </MDBContainer>
        </MDBContainer>
      </div>
    );
  }
}
export default CoursepackDashboardPage;

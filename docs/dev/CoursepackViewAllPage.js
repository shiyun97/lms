import React, { Component } from "react";
import { observer, inject } from 'mobx-react';
import { NavLink, NavItem } from 'react-router-dom';
import {
  MDBContainer, 
  MDBJumbotron,
  MDBBtn, 
  MDBCol, 
  MDBRow,
  MDBCardTitle,
  MDBIcon,
  MDBNav,
  MDBNavItem,
  MDBNavLink
} from "mdbreact";
import axios from "axios";
import { Rating } from '@material-ui/lab';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import CoursepackTopNav from "./CoursepackTopNav";
import cprog from './img/cprog.jpg';

const API = "http://localhost:8080/LMS-war/webresources/"

@inject('dataStore')
@observer
class CoursepackViewAllPage extends Component {

    state = {
        userCoursepackList: [],
        categories: [],
        categoryId: "",
        categoryName: "",
        coursepacks: [],
        cartNum: 0,
        openSnackbar: false,
        message: ""
    }

    componentDidMount() {
        this.initPage()
    }

    initPage() {
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

        // get all coursepacks of student / public user
        axios.get(`${API}Coursepack/getUserCoursepack/${sessionStorage.getItem("userId")}`)
            .then(result => {
                console.log(result.data)
                this.setState({ userCoursepackList: result.data.coursepack })
            })
            .catch(error => {
                console.error("error in axios " + error);
            });

        // get all categories
        axios.get(`${API}Coursepack/getAllCategories`)
            .then(result => {
                this.setState({ categories: result.data.categories })
                console.log(result.data)
            })
            .catch(error => {
                console.error("error in axios " + error);
            });

        var pathname = location.pathname;
        pathname = pathname.split('/');
        let categoryId = pathname[2];
        console.log(categoryId);
        // have a category id
        if (categoryId) {
            categoryId = pathname[2]
            
            axios.get(`${API}Coursepack/getCategoryById?categoryId=${categoryId}`)
                .then(result => {
                    this.setState({ 
                        categoryId: categoryId,
                        categoryName: result.data.name,
                        coursepacks: result.data.coursepackList 
                    })
                })
                .catch(error => {
                    console.error("error in axios " + error);
                });
        }
        // no category id
        else {

            axios.get(`${API}Coursepack/getAllCoursepack`)
                .then(result => {
                    this.setState({ coursepacks: result.data.coursepack })
                })
                .catch(error => {
                    console.error("error in axios " + error);
                });
        }
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

    addToCart = (course) => {
        let cart = sessionStorage.cart;
        if (cart != null && cart != undefined) {
            let cartObjs = JSON.parse(cart);
            console.log(cartObjs)
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


    showCategory = (categoryId) => {
        axios.get(`${API}Coursepack/getCategoryById?categoryId=${categoryId}`)
            .then(result => {
                this.setState({
                    categoryId: categoryId,
                    categoryName: result.data.name,
                    coursepacks: result.data.coursepackList
                })
            })
            .catch(error => {
                console.error("error in axios " + error);
            });

        this.props.dataStore.setPath('/coursepacks/' + categoryId);
        this.props.history.push('/coursepacks/' + categoryId);
    }

    noCoursepacks = () => {
        return (
            <MDBRow>
                <MDBCol>
                    <div>No coursepacks available.</div>
                </MDBCol>
            </MDBRow>
        )
    }

    showCoursepacks = () => {
        let coursepacks = this.state.coursepacks;
        return (
            <MDBRow middle>
                <MDBCol>
                    <MDBRow>
                        <MDBRow>
                            <MDBCol>
                                <span style={{ float: "right" }}><h4 className="mb-3">{coursepacks.length + " Coursepacks"}</h4></span>
                            </MDBCol>
                        </MDBRow>
                    </MDBRow>
                    {
                        coursepacks.map((coursepack) => (<div>
                            <hr style={{ borderTop: "1px solid rgba(0,0,0,.1)" }} />
                            <MDBRow>
                                <div className="container-fluid section py-3 px-0 justify-content d-flex mr-5">
                                    <MDBCol md="3" lg="3">
                                        <img src={coursepack.imageLocation} className="img-fluid" />
                                    </MDBCol>
                                    <MDBCol md="5" lg="5">
                                        <MDBRow>
                                            <NavLink to={`/coursepack/${coursepack.coursepackId}/`} style={{ marginBottom: 0 }}>
                                                <h4 style={{ color: "#000000" }}><b>{coursepack.title}</b></h4>
                                            </NavLink>
                                        </MDBRow>
                                        <MDBRow>
                                            <Typography variant="body2" color="textSecondary" component="p">{"By " + coursepack.assignedTeacher.firstName + " " + coursepack.assignedTeacher.lastName}</Typography>
                                        </MDBRow>
                                        <div className="mb-1" />
                                        <MDBRow>
                                            <Typography variant="body2" color="textSecondary" component="p">{coursepack.description}</Typography>
                                        </MDBRow>
                                    </MDBCol>
                                    <MDBCol md="2" lg="2">
                                    </MDBCol>
                                    <MDBCol md="2" lg="2">
                                        <MDBRow>
                                            <b style={{ color: "#f44336", fontSize: "18px" }}>
                                                {
                                                    (sessionStorage.getItem("accessRight") === "Public" || !sessionStorage.getItem("accessRight")) && <span>S${coursepack.price.toFixed(2)}</span>
                                                }
                                                {
                                                    sessionStorage.getItem("accessRight") === "Student" && <span>FREE</span>
                                                }
                                            </b>
                                        </MDBRow>
                                        <div className="mb-2" />
                                        <MDBRow>
                                            <Rating name="hover-side" value={coursepack.rating} precision={0.1} readOnly size="small" />
                                            <Box ml={2} style={{ fontSize: "14px" }}>{coursepack.rating.toFixed(1)}</Box>
                                        </MDBRow>
                                        <MDBRow>
                                            <Typography variant="body2" color="textSecondary">{" (" + coursepack.ratingList.length + " ratings)"}</Typography>
                                        </MDBRow>
                                        <div className="mb-2" />
                                        <MDBRow>
                                            {
                                                sessionStorage.getItem("accessRight") === "Public" &&
                                                <Button variant="contained" color="secondary" onClick={e => this.addToCart(coursepack)}>
                                                    Add To Cart
                                                </Button>
                                            }
                                            {
                                                sessionStorage.getItem("accessRight") === "Student" &&
                                                <Button variant="contained" color="secondary" onClick={e => this.enrollCourse(coursepack)}>
                                                    Enroll Now
                                                </Button>
                                            }
                                        </MDBRow>
                                    </MDBCol>
                                </div>
                            </MDBRow>
                        </div>
                        ))
                    }
                </MDBCol>
            </MDBRow>
        )
    }

    showBreadcrumb = () => {
        return (
            <MDBRow>
                <Paper elevation={0} style={{ backgroundColor: "#505763" }}>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link href="/coursepack/dashboard" color="inherit" >
                            <MDBIcon icon="home" style={{ color: "#a1a7b3" }} />
                        </Link>
                        {
                            this.state.categoryName && <Typography style={{ color: "#fff" }}>All {this.state.categoryName} Coursepacks</Typography>
                        }
                        {
                            !this.state.categoryName && <Typography style={{ color: "#fff" }}>All Coursepacks</Typography>
                        }
                    </Breadcrumbs>
                </Paper>
            </MDBRow>
        )
    }

    renderSnackbar = () => {
        console.log("snackbar")
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

    render() {
        let coursepacks = this.state.coursepacks;
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

                <MDBJumbotron style={{ padding: 0, backgroundColor: "#505763", width: "100%" }}>
                    <MDBCol className="text-white">
                        <MDBCol className="py-3">
                            <MDBCardTitle className="h1-responsive pt-2 m-3 ml-5 px-5">
                                { this.showBreadcrumb()}
                                <MDBRow>
                                    {
                                        this.state.categoryName && <span>All {this.state.categoryName} Coursepacks</span>
                                    }
                                    {
                                        !this.state.categoryName && <span>All Coursepacks</span>
                                    }
                                </MDBRow>
                            </MDBCardTitle>
                        </MDBCol>
                    </MDBCol>
                </MDBJumbotron>
                <MDBContainer style={{ paddingBottom: 240 }}>
                    <MDBContainer style={{ paddingTop: 17 }} >
                        <MDBCol>
                            {
                                coursepacks.length == 0 && this.noCoursepacks()
                            }
                            {
                                coursepacks.length > 0 && this.showCoursepacks()
                            }
                        </MDBCol>
                        {this.renderSnackbar()}
                    </MDBContainer>
                </MDBContainer>
            </div>
        );
    }
}

export default CoursepackViewAllPage;
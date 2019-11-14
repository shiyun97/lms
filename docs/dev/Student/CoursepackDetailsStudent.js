import React, { Component } from "react";
import { observer, inject } from 'mobx-react';
import styled from 'styled-components';
import {
    MDBContainer,
    MDBCol,
    MDBBtn,
    MDBRow,
    MDBIcon,
    MDBProgress,
    MDBJumbotron,
    MDBNavItem,
    MDBNav,
    MDBNavLink,
    MDBMedia,
    MDBCard
} from "mdbreact";
import axios from "axios";
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, ExpansionPanel, ExpansionPanelSummary, Typography, ExpansionPanelDetails } from "@material-ui/core";
import { NavLink } from 'react-router-dom';
import SectionContainer from "../../components/sectionContainer";
import 'babel-polyfill';
import { Rating } from '@material-ui/lab';
import TextField from '@material-ui/core/TextField';
import Slide from '@material-ui/core/Slide';
import Snackbar from '@material-ui/core/Snackbar';
import CoursepackTopNav from "../CoursepackTopNav";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const API_MOCK = "http://localhost:3001"
const API = "http://localhost:8080/LMS-war/webresources/"

@inject('dataStore')
@observer
class CoursepackDetailsStudent extends Component {

    state = {
        courseDetails: "",
        open: false,
        coursepackId: "",
        courseOutline: "",
        listOfOutlineId: "",
        ratings: [],
        averageRating: 0,
        ratingSpread: [0, 0, 0, 0, 0],
        ratingValues: [5, 4, 3, 2, 1],
        modalAddRating: false,
        ratingCommentInput: "",
        ratingStarsInput: 5,
        message: "",
        openSnackbar: false,
        ratingCoursepackId: "",
        categories: [],
        studentEnrolled: false,
        cartNum: 0,
        openSnackbar: false,
        message: "",
        userCoursepackList: []
    }

    componentDidMount() {
        let coursepackId = this.props.coursepackId;
        this.setState({ coursepackId: coursepackId })
        axios.get(`${API}Coursepack/getCoursepack/${coursepackId}`)
            .then(result => {
                this.setState({
                    courseDetails: result.data,
                    courseOutline: result.data.outlineList.sort((a, b) => (a.number - b.number)),
                    listOfOutlineId: this.getListOfOutlineId(result.data.outlineList)
                })
                console.log(this.state.courseDetails)
            })
            .catch(error => {
                console.error("error in axios " + error);
            });

        this.initPage();
    }

    initPage() {
        window.scrollTo(0, 0)
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

        var pathname = location.pathname;
        pathname = pathname.split('/');
        let ratingCoursepackId = pathname[2];
        this.setState({ ratingCoursepackId: ratingCoursepackId })
        axios
            .get(`${API}feedback/retrieveAllRatings?coursepackId=${ratingCoursepackId}`)
            .then((result) => {
                console.log(result);
                let data = result.data;
                if (data) {
                    this.setState({
                        ratings: data.ratings,
                        averageRating: data.avg,
                        ratingSpread: [data.per5, data.per4, data.per3, data.per2, data.per1]
                    })
                }
            })
            .catch(error => {
                console.error("error in axios " + error);
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

        if (sessionStorage.getItem("userId")) {
            axios
                .get(`${API}CoursepackEnrollment/findStudentInCoursepack?userId=${sessionStorage.getItem("userId")}&coursepackId=${ratingCoursepackId}`)
                .then((result) => {
                    console.log(result);
                    if (result) {
                        this.setState({
                            studentEnrolled: true
                        })
                    }
                })
                .catch(error => {
                    console.error("error in axios " + error);
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

    showCategory = (categoryId) => {
        this.props.dataStore.setPath('/coursepacks/' + categoryId);
        this.props.history.push('/coursepacks/' + categoryId);
    }

    getListOfOutlineId = (outlines) => {
        var list = []
        if (outlines.length !== 0) {
            for (var i = 0; i < outlines.length; i++) {
                list.push(outlines[i].outlineId)
            }
            return list
        }
    }

    getListOfLessonOrderId = (lessonOrder) => {
        var list = []
        if (lessonOrder.length !== 0) {
            for (var i = 0; i < lessonOrder.length; i++) {
                list.push(lessonOrder[i].lessonOrderId)
            }
            return list
        }
    }

    proceedToLogin = () => {
        this.props.dataStore.setPath('/coursepack/login');
        this.props.history.push('/coursepack/login');
    }

    proceedToCourseDetails = () => {
        this.props.dataStore.setPath(`/coursepack/${this.state.coursepackId}/assessments`);
        this.props.history.push(`/coursepack/${this.state.coursepackId}/assessments`);
    }

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

    showDescriptions = () => {
        return (
            <MDBContainer style={{ paddingTop: 20 }}>
                <MDBRow>
                    <MDBCol size="8" className="text-white">
                        <h2 style={{ paddingBottom: 20, paddingTop: 20, fontWeight: "bold" }}>{this.state.courseDetails.title}</h2>
                        <h5 style={{ paddingBottom: 60 }}> {this.state.courseDetails.description}</h5>
                        <h7>*Complete all videos and/ or quizzes to get badges/ certificates</h7>
                        {/*<h6> SGD {this.state.courseDetails.price}</h6>*/}

                        {/*<MDBCol align="right">
                            <NavLink to={`/coursepack/${this.state.coursepackId}/assessments`}>
                                <MDBBtn color="primary" >View Course</MDBBtn>
                            </NavLink>
                        </MDBCol>*/}
                    </MDBCol>
                    <MDBCol size="1" />
                    <MDBCol size="3">
                        <MDBCard style={{ width: "22rem", minHeight: "12rem", marginTop: 20 }}>
                            <MDBMedia object src={this.state.courseDetails && this.state.courseDetails.imageLocation} className="img-fluid" alt="" style={{ minHeight: "120px" }} />
                            <div style={{ padding: 20 }}>
                                <MDBRow><MDBCol>
                                    <span style={{ fontSize: "35px", fontWeight: "bold" }}>
                                        {this.state.courseDetails.price && "S$ " + this.state.courseDetails.price.toFixed(2)}
                                    </span>
                                </MDBCol></MDBRow>
                                <MDBRow><MDBCol>
                                    <br />
                                    {
                                        this.state.studentEnrolled === true &&
                                        <Button variant="contained" color="secondary" style={{ height: "55px" }} fullWidth onClick={e => this.proceedToCourseDetails()}>
                                            Proceed to Course
                                        </Button>
                                    }
                                    {
                                        this.state.studentEnrolled === false && sessionStorage.getItem("accessRight") == "Public" &&
                                        <Button variant="contained" color="secondary" style={{ height: "55px" }} fullWidth onClick={e => this.addToCart(this.state.courseDetails)}>
                                            Add To Cart
                                        </Button>
                                    }
                                    {
                                        this.state.studentEnrolled === false && sessionStorage.getItem("accessRight") == "Student" &&
                                        <Button variant="contained" color="secondary" style={{ height: "55px" }} fullWidth onClick={e => this.enrollCourse(this.state.courseDetails)}>
                                            Enroll Now
                                        </Button>
                                    }
                                    {
                                        this.state.studentEnrolled === false && !sessionStorage.getItem("userId") && <div>
                                            <Typography variant="body2" color="textSecondary" component="p" style={{ fontSize: "18px", marginBottom: "10px" }}>Please login to purchase</Typography>
                                            <Button variant="contained" color="secondary" style={{ height: "55px" }} fullWidth onClick={e => this.proceedToLogin()}>
                                                Proceed to Login
                                            </Button>
                                        </div>
                                    }
                                </MDBCol></MDBRow>
                            </div>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        )
    }

    getLessonOrder = outlineId => {
        axios.get(`${API}Coursepack/getLessonOrderByOutlineId/${outlineId}`)
            .then(result => {
                this.setState({
                    lessonOrder: result.data.lessonOrder.sort((a, b) => (a.number - b.number)),
                    listOfLessonOrderId: this.getListOfLessonOrderId(result.data.lessonOrder),
                })
            })
            .catch(error => {
                console.error("error in axios " + error);
            });
    }

    handleExpandChange = index => {
        this.setState({ changeExpand: index })
    }

    checkExpanded = (index) => {
        if (index === this.state.changeExpand) {
            return true
        }
        return false
    }

    showOutline = () => {
        return (
            <MDBContainer>
                {this.state.courseOutline && this.state.courseOutline.map((outline, index) => {

                    return (
                        <ExpansionPanel
                            key={index}
                            expanded={this.checkExpanded(index)}
                            onChange={() => this.handleExpandChange(index)}
                        >
                            <ExpansionPanelSummary
                                expandIcon={<MDBIcon icon="angle-down" />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                key={index}
                                onClick={() => this.getLessonOrder(outline.outlineId)}
                            >
                                <Typography key={index}>
                                    {outline.name}
                                </Typography>
                            </ExpansionPanelSummary>

                            <ExpansionPanelDetails>
                                <MDBContainer>
                                    <MDBRow>
                                        {this.displayUploaded()}
                                    </MDBRow>
                                </MDBContainer>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    )
                })
                }
            </MDBContainer >
        )
    }

    displayUploaded = () => {
        var order = []
        this.state.lessonOrder && this.state.lessonOrder.map((lessons, index) => {
            order.push(lessons.file || lessons.quiz)
        })
        order = order.filter(Boolean)
        return (
            this.state.lessonOrder && this.state.lessonOrder.map((lessons, index) => {
                return (
                    <MDBCol key={index} size="12">
                        {order[index].title}
                        {order[index].name}
                    </MDBCol>
                )
            })

        )
    }

    showTeacherBackground = () => {//FIXME: teacher's background
        return (
            <div>
                <h4> Teacher's Background</h4>
                <hr />
                <h6>{this.state.courseDetails.teacherBackground}</h6>
            </div>
        )
    }

    // for adding rating
    toggleModal = nr => () => {
        let modalNumber = "modal" + nr;
        if (nr == "UploadMultimedia") {
            this.setState({
                ...this.state,
                uploadedMultimedia: [],
                [modalNumber]: !this.state[modalNumber]
            })
        }
        else {
            this.setState({
                ...this.state,
                [modalNumber]: !this.state[modalNumber]
            });
        }
    };

    addRating = () => {
        this.setState({
            modalAddRating: true
        })
    }

    inputChangeHandler = (e) => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        });
        console.log(e.target.name + " " + e.target.value)
    }

    setValue = (newValue) => {
        console.log(newValue)
        this.setState({
            ratingStarsInput: newValue
        })
    }

    submitHandler = (e) => {
        e.preventDefault();
        console.log(this.state.ratingCommentInput);
        console.log(this.state.ratingStarsInput);
        let ratingCommentInput = this.state.ratingCommentInput;
        let ratingStarsInput = this.state.ratingStarsInput;
        if (ratingCommentInput && ratingStarsInput) {
            let request = {
                userId: sessionStorage.getItem('userId'),
                coursepackId: this.state.ratingCoursepackId,
                rating: ratingStarsInput,
                comment: ratingCommentInput
            }
            axios
                .post(`${API}feedback/createRating`, request)
                .then((result) => {
                    console.log(result);
                    this.setState({
                        ratingStarsInput: "",
                        ratingCommentInput: "",
                        modalAddRating: false,
                        message: "Rating added successfully",
                        openSnackbar: true
                    })
                    return this.initPage();
                })
                .catch(error => {
                    this.setState({
                        ratingStarsInput: "",
                        ratingCommentInput: "",
                        modalAddRating: false,
                        message: error.response.data.errorMessage,
                        openSnackbar: true
                    })
                    console.error("error in axios " + error);
                });
        }
    }

    showAddRatingDialog() {
        return <Dialog
            open={this.state.modalAddRating}
            onClose={this.toggleModal("AddRating")}
            TransitionComponent={Transition}
            keepMounted
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth="80px"
            className={this.props.className}
        >
            <DialogTitle id="alert-dialog-title">
                Add Rating
        </DialogTitle>
            <form className="needs-validation" noValidate onSubmit={this.submitHandler}>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" style={{ maxWidth: "100%" }}>
                        <MDBContainer>
                            <Rating name="simple-controlled"
                                value={this.state.ratingStarsInput}
                                precision={1}
                                size="large"
                                onChange={(event, newValue) => {
                                    this.setValue(newValue);
                                }} />
                            <TextField
                                name="ratingCommentInput"
                                label="Share your opinion of this course."
                                multiline
                                fullWidth
                                rows="4"
                                margin="normal"
                                variant="outlined"
                                value={this.state.ratingCommentInput}
                                onChange={this.inputChangeHandler}
                            /></MDBContainer>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color="secondary" onClick={this.toggleModal("AddRating")}>
                        Cancel
                </Button>
                    <Button color="primary" type="submit">Save</Button>
                </DialogActions>
            </form>
        </Dialog>
    }

    getFeedback = () => {
        let ratingSpread = this.state.ratingSpread;
        let ratingValues = this.state.ratingValues;
        let ratings = this.state.ratings;
        return (
            <div className={this.props.className}>
                {sessionStorage.getItem('accessRight') === 'Teacher' ? <CoursepackSideNavigation courseId={this.props.coursepackId} /> : null}
                {/*                 <CoursepackSideNavigation courseId={this.props.coursepackId} />
 */}
                <MDBContainer style={{ paddingTop: 20 }}>
                    {sessionStorage.getItem('accessRight') !== 'Teacher' ? (
                        <MDBRow>
                            <MDBCol>
                                <div style={{ float: "right" }}>
                                    {/*<MDBBtn onClick={e => this.addRating()} color="primary">Rate</MDBBtn>
                                    {this.showAddRatingDialog()}*/}
                                </div>
                            </MDBCol>
                        </MDBRow>
                    )
                        : null
                    }
                    {/* <MDBBtn onClick={e => this.addRating()} color="primary">Rate</MDBBtn>
                    {this.showAddRatingDialog()} */}
                    <MDBRow>
                        <MDBCol className="col-md-3">
                            <MDBRow>
                                <div style={{ fontSize: "4rem" }}>{this.state.averageRating.toFixed(1)}</div>
                            </MDBRow>
                            <MDBRow>
                                <Rating value={this.state.averageRating} readOnly precision={0.1} />
                            </MDBRow>
                            <MDBRow>
                                <div className="mt-1" style={{ color: "#808080" }}>Average Rating</div>
                            </MDBRow>
                        </MDBCol>
                        <MDBCol className="col-md-6">
                            {ratingSpread.map((rating, index) => (
                                <MDBProgress value={rating} className="my-2" key={index} />
                            ))}
                        </MDBCol>
                        <MDBCol className="col-md-2">
                            <div className="mt-1" />
                            {ratingValues.map((ratingValue, index) => (
                                <Rating value={ratingValue} key={index} precision={0.1} readOnly size="small" />
                            ))}
                        </MDBCol>
                        <MDBCol className="col-md-1">
                            {ratingSpread.map((rating, index) => (
                                <div className="my-2" key={index} style={{ fontSize: "11px" }}>
                                    <span>{rating} %</span>
                                </div>
                            ))}
                        </MDBCol>
                    </MDBRow>
                    <div className="mt-4" />
                    <MDBRow>
                        <MDBCol>
                            <MDBRow><h5>Reviews</h5></MDBRow>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow className="mt-2">
                        <MDBCol>
                            {
                                ratings.length == 0 && <div>No reviews to show</div>
                            }
                            {
                                ratings.length > 0 && <div>
                                    {ratings.map((rating, index) => (
                                        <div>
                                            <MDBRow>
                                                <MDBCol className="col-md-1">
                                                    <MDBIcon icon="user-circle" size="3x" style={{ color: "#808080" }} />
                                                </MDBCol>
                                                <MDBCol className="col-md-3">
                                                    {rating.user.firstName + " " + rating.user.lastName}
                                                </MDBCol>
                                                <MDBCol className="col-md-8">
                                                    <Rating value={rating.rating} readOnly precision={0.1} /><br />
                                                    {rating.comment}
                                                </MDBCol>
                                            </MDBRow>
                                            <div className="mb-5" />
                                        </div>
                                    ))}
                                </div>
                            }
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </div>
        )
    }

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

    render() {
        let cartNum = this.state.cartNum;
        let categories = this.state.categories;
        return (
            <div>
                <CoursepackTopNav cartNum={cartNum} />
                <MDBJumbotron style={{ paddingLeft: 260, paddingBottom: 40, height: 10, marginBottom: 0, float: "center", backgroundColor: "#f0f0f0" }}>
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
                <div style={{ paddingLeft: 70 }}>

                    <div style={{ backgroundColor: '#505763', minHeight: 250, maxHeight: 250 }}>
                        <div>
                            <MDBContainer>
                                {this.showDescriptions()}
                            </MDBContainer>

                        </div>
                    </div>
                    <div style={{ paddingTop: 50, marginRight: 450, paddingRight: 30, paddingLeft: 30 }}>
                        <SectionContainer>
                            <MDBContainer style={{ paddingRight: 50 }}>
                                <h4>Course Outline</h4>
                                <hr />
                                {this.showOutline()}
                            </MDBContainer>
                        </SectionContainer>
                        <SectionContainer>
                            <MDBContainer style={{ paddingRight: 50 }}>
                                <h4>Student Feedback</h4>
                                <hr />
                                {this.getFeedback()}
                            </MDBContainer>
                        </SectionContainer>
                        <SectionContainer>
                            <MDBContainer>
                                {this.showTeacherBackground()}
                            </MDBContainer>
                        </SectionContainer>
                    </div>
                </div >
                {this.renderSnackbar()}
            </div>
        )
    }
}


export default styled(CoursepackDetailsStudent)`
module-content{
    margin - left: 270px;
    margin-top: 40px;
},
`;
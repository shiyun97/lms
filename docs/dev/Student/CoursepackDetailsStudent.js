import React, { Component } from "react";
import styled from 'styled-components';
import { MDBContainer, MDBCol, MDBBtn, MDBRow, MDBMedia, MDBCard, MDBIcon, MDBProgress } from "mdbreact";
import axios from "axios";
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, ExpansionPanel, ExpansionPanelSummary, Typography, ExpansionPanelDetails } from "@material-ui/core";
import { NavLink } from 'react-router-dom';
import SectionContainer from "../../components/sectionContainer";
import 'babel-polyfill';
import { Rating } from '@material-ui/lab';
import TextField from '@material-ui/core/TextField';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const API_MOCK = "http://localhost:3001"
const API = "http://localhost:8080/LMS-war/webresources/"


class CoursepackDetailsStudent extends Component {

    state = {
        courseDetails: "",
        open: false,
        coursepackId: "",
        courseOutline: "",
        listOfOutlineId: "",
        ratings: [
            {
                ratingId: 2,
                comment: "This is a good course. yay",
                rating: 5,
                user: {
                    firstName: "John",
                    lastName: "Doe"
                }
            },
            {
                ratingId: 3,
                comment: "This is a good course. yay",
                rating: 4.5,
                user: {
                    firstName: "Tom",
                    lastName: "Doe"
                }
            }
        ],
        averageRating: 4.6,
        ratingSpread: [64, 29, 6, 1, 0],
        ratingValues: [5, 4, 3, 2, 1],
        modalAddRating: false,
        ratingCommentInput: "",
        ratingStarsInput: 5,
        message: "",
        openSnackbar: false,
        ratingCoursepackId: ""
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

    showDescriptions = () => {
        return (
            <MDBContainer style={{ paddingTop: 20 }}>
                <MDBRow>
                    <MDBCol size="8">
                        <h2 style={{ paddingBottom: 20 }}>{this.state.courseDetails.title}</h2>
                        <h5 style={{ paddingBottom: 20 }}> {this.state.courseDetails.description}</h5>
                        <h6> SGD {this.state.courseDetails.price}</h6>

                        <MDBCol align="right">
                            <MDBBtn color="primary" onClick={this.viewCourse} >View Course</MDBBtn>
                        </MDBCol>
                    </MDBCol>
                    <MDBCol size="4">
                        {/*                         <MDBCard style={{ width: "23rem", minHeight: "12rem" }}>
                            <MDBMedia object src="https://mdbootstrap.com/img/Photos/Others/placeholder1.jpg" alt="" />
                        </MDBCard> */}
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
                                    <MDBBtn onClick={e => this.addRating()} color="primary">Rate</MDBBtn>
                                    {this.showAddRatingDialog()}
                                </div>
                            </MDBCol>
                        </MDBRow>
                    )
                        : null
                    }
                    {/* <MDBBtn onClick={e => this.addRating()} color="primary">Rate</MDBBtn>
                    {this.showAddRatingDialog()} */}
                    <MDBRow>
                        <MDBCol>
                            <h5>Student Feedback</h5>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol className="col-md-3">
                            <MDBRow>
                                <div style={{ fontSize: "4rem" }}>{this.state.averageRating}</div>
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
                                <Rating value={ratingValue} key={index} readOnly size="small" />
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
                            <h5>Reviews</h5>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow className="mt-2">
                        <MDBCol>
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
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </div>
        )
    }



    render() {
        return (

            <div style={{ paddingTop: 70, paddingLeft: 70 }}>

                <div style={{ backgroundColor: '#B8CECD', minHeight: 250 }}>
                    <div>
                        <MDBContainer>
                            {this.showDescriptions()}
                        </MDBContainer>
                    </div>
                </div>
                <div style={{ paddingTop: 50, paddingRight: 30, paddingLeft: 30 }}>
                    <SectionContainer>
                        <MDBContainer >
                            <h4>Course Outline</h4>
                            <hr />
                            {this.showOutline()}
                        </MDBContainer>
                    </SectionContainer>
                    <SectionContainer>
                        {this.getFeedback()}
                    </SectionContainer>
                    <SectionContainer>
                        <MDBContainer>
                            {this.showTeacherBackground()}
                        </MDBContainer>

                    </SectionContainer>
                </div>
            </div >
        )
    }
}


export default styled(CoursepackDetailsStudent)`
module-content{
    margin - left: 270px;
    margin-top: 40px;
},
`;
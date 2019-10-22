import React, { Component } from "react";
import styled from 'styled-components';
import {
    MDBContainer,
    MDBCol,
    MDBBtn,
    MDBRow,
    MDBMedia,
    MDBCard,
    MDBIcon,
    MDBModal,
    MDBModalHeader,
    MDBModalBody,
    MDBModalFooter,
    MDBListGroup,
    MDBListGroupItem,
    MDBProgress
} from "mdbreact";
import CoursepackSideNavigation from "./CoursepackSideNavigation";
import axios from "axios";
import 'babel-polyfill';
import { Rating } from '@material-ui/lab';
import TextField from '@material-ui/core/TextField';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@material-ui/core";
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

class CoursepackFeedbackPage extends Component {

    state = {
        coursepackId: "",
        ratings: [
            {
                ratingId: 2,
                description: "This is a good course. yay",
                rating: 5,
                user: {
                    firstName: "John",
                    lastName: "Doe"
                }
            },
            {
                ratingId: 3,
                description: "This is a good course. yay",
                rating: 4.5,
                user: {
                    firstName: "Tom",
                    lastName: "Doe"
                }
            }
        ],
        averageRating: 4.6,
        ratingSpread: [64,29,6,1,0],
        modalAddRating: false,
        ratingCommentInput: "",
        ratingStarsInput: 5
    }

    componentDidMount() {
        this.initPage();
    }

    async initPage() {
        let coursepackId = this.props.match.params.coursepackId;
        let accessRight = localStorage.getItem("accessRight");

        // get ratings list
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
                    <DialogContentText id="alert-dialog-description" style={{maxWidth: "100%"}}>
                        <MDBContainer>
                        <Rating name="simple-controlled" 
                            value={this.state.ratingStarsInput} 
                            precision={1}
                            size="large"
                            onChange={(event, newValue) => {
                                this.setValue(newValue);
                              }}/>
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

    render() {
        let ratingSpread = this.state.ratingSpread;
        let ratings = this.state.ratings;
        return (
            <div className="module-content">
                <CoursepackSideNavigation courseId={this.props.match.params.coursepackId} />

                <MDBContainer style={{ paddingTop: 50 }}>
                    <MDBBtn onClick={e => this.addRating()} color="primary">Rate</MDBBtn>
                    {this.showAddRatingDialog()}
                    <MDBRow>
                        <MDBCol>
                            <h5>Student Feedback</h5>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol className="col-md-4">
                            <MDBRow>
                                <div style={{fontSize: "4rem"}}>{this.state.averageRating}</div>
                            </MDBRow>
                            <MDBRow>
                                <Rating value={this.state.averageRating} readOnly precision={0.1} />
                            </MDBRow>
                            <MDBRow>
                                <div className="mt-1" style={{color: "#808080"}}>Average Rating</div>
                            </MDBRow>
                        </MDBCol>
                        <MDBCol className="col-md-7">
                            {ratingSpread.map((rating, index) => (
                                <MDBProgress value={rating} className="my-2" key={index} />
                            ))}
                        </MDBCol>
                        <MDBCol className="col-md-1">
                            {ratingSpread.map((rating, index) => (
                                <div className="my-2" key={index} style={{fontSize: "11px"}}>{rating} %</div>
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
                                            <MDBIcon icon="user-circle" size="3x" style={{color: "#808080"}} />
                                        </MDBCol>
                                        <MDBCol className="col-md-3">
                                            {rating.user.firstName + " " + rating.user.lastName}
                                        </MDBCol>
                                        <MDBCol className="col-md-8">
                                            <Rating value={rating.rating} readOnly precision={0.1} /><br/>
                                            {rating.description}
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
}

export default styled(CoursepackFeedbackPage)`
module-content{
    margin-left: 270px;
}
`
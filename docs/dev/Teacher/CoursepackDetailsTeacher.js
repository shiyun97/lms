import React, { Component } from "react";
import { observer, inject } from 'mobx-react';
import styled from 'styled-components';
import { MDBContainer, MDBCol, MDBBtn, MDBRow, MDBIcon, MDBProgress, MDBCard, MDBMedia } from "mdbreact";
import axios from "axios";
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, ExpansionPanel, ExpansionPanelSummary, Typography, ExpansionPanelDetails } from "@material-ui/core";
import CoursepackSideNavigation from "../CoursepackSideNavigation";
import CoursepackSideNavigationDropdown from "../CoursepackSideNavigationDropdown";
import SectionContainer from "../../components/sectionContainer";
import { Snackbar } from '@material-ui/core';
import 'babel-polyfill';
import { NavLink } from 'react-router-dom';
import { Rating } from '@material-ui/lab';
import TextField from '@material-ui/core/TextField';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const API = "http://localhost:8080/LMS-war/webresources/"

@inject('dataStore')
@observer
class CoursepackDetailsTeacher extends Component {

    state = {
        courseDetails: "",
        open: false,
        courseOutline: "",
        listOfOutlineId: "",
        coursepackId: "",
        ratings: [],
        averageRating: 0,
        ratingSpread: [0, 0, 0, 0, 0],
        ratingValues: [5, 4, 3, 2, 1],
        message: "",
        openSnackbar: false,
    }

    componentDidMount() {
        window.scrollTo(0, 0)
        let coursepackId = this.props.coursepackId;
        let accessRight = sessionStorage.getItem("accessRight");
        if (coursepackId) {
            this.setState({
                coursepackId: coursepackId
            })
            // get ratings list
            axios
                .get(`${API}feedback/retrieveAllRatings?coursepackId=${coursepackId}`)
                .then((result) => {
                    console.log(result);
                    let data = result.data;
                    this.setState({
                        ratings: data.ratings,
                        averageRating: data.avg,
                        ratingSpread: [data.per5, data.per4, data.per3, data.per2, data.per1]
                    })
                })
                .catch(error => {
                    console.error("error in axios " + error);
                });
        }

        axios.get(`${API}Coursepack/getCoursepack/${coursepackId}`)
            .then(result => {
                this.setState({
                    courseDetails: result.data,
                    courseOutline: result.data.outlineList.sort((a, b) => (a.number - b.number)),
                    listOfOutlineId: this.getListOfOutlineId(result.data.outlineList)
                })
            })
            .catch(error => {
                console.error("error in axios " + error);
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
                    <MDBCol md="8" sm="12" className="text-white">
                        <h2 style={{ paddingBottom: 20, paddingTop: 20, fontWeight: "bold" }}>{this.state.courseDetails.title}</h2>
                        <h5 style={{ paddingBottom: 30 }}> {this.state.courseDetails.description}</h5>
                        <span style={{ fontSize: "1rem" }}>*Complete all videos and/ or quizzes to get badges/ certificates</span>

                        <div className="description-button-small">
                            <br/>
                            <span style={{ fontSize: "35px", fontWeight: "bold" }}>
                                {this.state.courseDetails.price && "S$ " + this.state.courseDetails.price.toFixed(2)}
                            </span>
                            <br />
                            <Button variant="contained" style={{ backgroundColor: "#fb6d63", height: "55px" }} fullWidth onClick={e => this.proceedToCourseDetails()} disabled>
                                Proceed to Course
                            </Button>

                            <br />
                        </div>

                        {/*<MDBCol align="right">
                        <NavLink to={`/coursepack/${this.state.coursepackId}/assessments`}>
                            <MDBBtn color="primary" >View Course</MDBBtn>
                        </NavLink>
                    </MDBCol>*/}
                    </MDBCol>
                    <MDBCol md="1" />
                    <MDBCol md="3" sm="0"  className="description-card-small">
                        <MDBCard style={{ width: "20rem", minHeight: "12rem", marginTop: 20 }}>
                            <MDBMedia object src={this.state.courseDetails && this.state.courseDetails.imageLocation} className="img-fluid" alt="" style={{ minHeight: "120px" }} />
                            <div style={{ padding: 20 }}>
                                <MDBRow><MDBCol>
                                    <span style={{ fontSize: "35px", fontWeight: "bold" }}>
                                        {this.state.courseDetails.price && "S$ " + this.state.courseDetails.price.toFixed(2)}
                                    </span>
                                </MDBCol></MDBRow>
                                <MDBRow><MDBCol>
                                    <br />
                                    <Button variant="contained" style={{ height: "55px", backgroundColor: "#fb6d63" }} fullWidth disabled onClick={e => this.proceedToCourseDetails()}>
                                        Proceed to Coursepack
                                    </Button>
                                </MDBCol></MDBRow>
                            </div>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>)
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
                this.setState({ message: error.response, openSnackbar: true })
                console.error("error in axios " + error);
            });
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

    handleExpandChange = index => {
        this.setState({ changeExpand: index })
    }

    checkExpanded = (index) => {
        if (index === this.state.changeExpand) {
            return true
        }
        return false
    }

    showCoursepackOutline = () => {
        if (this.state.courseOutline) {
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
        } else {
            return "No outline"
        }
    }

    showLessonOrder = (outline) => {
        if (outline.lessonOrder === "") { 
            return <h4>No lesson order</h4>
        }
        else {
            return (
                outline.lessonOrder && outline.lessonOrder.map((order, index) => {
                    return (
                        <MDBContainer ley={index}>
                            <MDBRow size="12">
                                {order.number} {order.name}
                                <br />
                            </MDBRow>
                        </MDBContainer>
                    )
                }))
        }
    }

    showTeacherBackground = () => {
        return (
            <div>
                <h4> Teacher's Background</h4>
                <hr />
                <h6>{this.state.courseDetails.teacherBackground}</h6>
            </div>
        )
    }

    proceedToCourseDetails = () => {
        this.props.dataStore.setPath(`/coursepack/${this.state.coursepackId}/assessments`);
        this.props.history.push(`/coursepack/${this.state.coursepackId}/assessments`);
    }

    getFeedback = () => {
        let ratingSpread = this.state.ratingSpread;
        let ratingValues = this.state.ratingValues;
        let ratings = this.state.ratings;
        return (
            <div className={this.props.className}>
                {/* {sessionStorage.getItem('accessRight') === 'Teacher' ? <CoursepackSideNavigation courseId={this.props.coursepackId} /> : null}
                                <CoursepackSideNavigation courseId={this.props.coursepackId} />
 */}
                <MDBContainer style={{ paddingTop: 20 }}>
                    <MDBRow>
                        <MDBCol md="3">
                            <MDBRow>
                                <div style={{ fontSize: "4rem" }}>{this.state.averageRating && this.state.averageRating.toFixed(1)}</div>
                            </MDBRow>
                            <MDBRow>
                                <Rating value={this.state.averageRating} readOnly precision={0.1} />
                            </MDBRow>
                            <MDBRow>
                                <div className="mt-1" style={{ color: "#808080" }}>Average Rating</div>
                            </MDBRow>
                        </MDBCol>
                        <MDBCol md="6">
                            {ratingSpread.map((rating, index) => (
                                <MDBProgress value={rating} className="my-2" key={index} />
                            ))}
                        </MDBCol>
                        <MDBCol md="2">
                            <div className="mt-1" />
                            {ratingValues.map((ratingValue, index) => (
                                <Rating value={ratingValue} key={index} precision={0.1} readOnly size="small" />
                            ))}
                        </MDBCol>
                        <MDBCol md="1">
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

    getFeedbackSmall = () => {
        let ratingSpread = this.state.ratingSpread;
        let ratingValues = this.state.ratingValues;
        let ratings = this.state.ratings;
        return (
            <div className={this.props.className}>
                {/*sessionStorage.getItem('accessRight') === 'Teacher' ? <CoursepackSideNavigation courseId={this.props.coursepackId} /> : null*/}

                <MDBContainer>
                    <MDBRow>
                        <MDBCol>
                            <MDBRow>
                                <div style={{ fontSize: "4rem" }}>{this.state.averageRating && this.state.averageRating.toFixed(1)}</div>
                            </MDBRow>
                            <MDBRow>
                                <Rating value={this.state.averageRating} readOnly precision={0.1} />
                            </MDBRow>
                            <MDBRow>
                                <div className="mt-1" style={{ color: "#808080" }}>Average Rating</div>
                                <br/>
                            </MDBRow>
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
        return (
            <div className={this.props.className}>
                {sessionStorage.getItem('accessRight') === 'Teacher' ?
                    <div>
                        <div className="module-sidebar-large"><CoursepackSideNavigation courseId={this.props.coursepackId} /></div>
                        <div className="module-navbar-small">
                            <CoursepackSideNavigationDropdown courseId={this.props.coursepackId} />
                        </div>
                    </div>
                    : null}
                <div className="description-large">
                    <div className="module-content" style={{ paddingTop: 0 }}>
                        <div style={{ backgroundColor: '#505763', minHeight: 250, maxHeight: 250 }}>
                            <div>
                                <MDBContainer>
                                    {this.showDescriptions()}
                                </MDBContainer>
                            </div>
                        </div>
                        <div style={{ paddingTop: 50, paddingRight: 30, paddingLeft: 20, marginRight: 330, }}>
                            <SectionContainer>
                                <MDBContainer>
                                    <h4>Course Outline</h4>
                                    <hr />
                                    {this.showCoursepackOutline()}
                                </MDBContainer>
                            </SectionContainer>
                            <SectionContainer>
                                <MDBContainer>
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
                    </div>
                    
                </div>

                <div className="description-small">
                    <div style={{ paddingTop: 0, marginTop: 0 }}>
                        <div style={{ backgroundColor: '#505763', minHeight: 375, maxHeight: 375 }}>
                            <div>
                                <MDBContainer>
                                    {this.showDescriptions()}
                                </MDBContainer>
                            </div>
                        </div>
                        <div style={{ paddingTop: 50 }}>
                            <SectionContainer>
                                <MDBContainer>
                                    <h4>Course Outline</h4>
                                    <hr />
                                    {this.showCoursepackOutline()}
                                </MDBContainer>
                            </SectionContainer>
                            <SectionContainer>
                                <MDBContainer>
                                    <h4>Student Feedback</h4>
                                    <hr />
                                    {this.getFeedbackSmall()}
                                </MDBContainer>
                            </SectionContainer>
                            <SectionContainer>
                                <MDBContainer>
                                    {this.showTeacherBackground()}
                                </MDBContainer>

                            </SectionContainer>
                        </div>
                    </div>
                    
                </div>

                {this.renderSnackbar()}
            </div>
        )
    }
}


export default styled(CoursepackDetailsTeacher)`
@media screen and (min-width: 800px) {
    .module-content {
        margin-left: 180px;
        margin-top: 0px;
    }
    .module-navbar-small {
        display: none;
    }
    .module-sidebar-large {
        display: block;
    }
    .description-large {
        padding-left: 70px;
    }
    .description-small {
        display: none;
    }
    .description-button-small {
        display: none;
    }
}
@media screen and (max-width: 800px) {
    .module-sidebar-large{
        display: none;
    }
    .module-navbar-small{
        display: block;
    }
    .description-card-small {
        display: none;
    }
    .description-small {
        margin-top: 0px;
    }
    .description-large {
        display: none;
    }
}
`;
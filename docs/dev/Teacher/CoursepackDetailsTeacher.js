import React, { Component } from "react";
import styled from 'styled-components';
import { MDBContainer, MDBCol, MDBBtn, MDBRow, MDBMedia, MDBCard, MDBIcon } from "mdbreact";
import axios from "axios";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, ExpansionPanel, ExpansionPanelSummary, Typography, ExpansionPanelDetails } from "@material-ui/core";
import CoursepackSideNavigation from "../CoursepackSideNavigation";
import SectionContainer from "../../components/sectionContainer";

const API = "http://localhost:8080/LMS-war/webresources/"

class CoursepackDetailsTeacher extends Component {

    state = {
        courseDetails: "",
        open: false,
    }

    componentDidMount() {

        let coursepackId = this.props.coursepackId;
        axios.get(`${API}Coursepack/getCoursepack/${coursepackId}`)
            .then(result => {
                this.setState({ courseDetails: result.data })
                console.log(this.state.courseDetails)
            })
            .catch(error => {
                console.error("error in axios " + error);
            });
    }

    viewCourse = event => {
        console.log("view assessments")
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
            </MDBContainer>)
    }

    showCoursepackOutline = () => {
        if (this.state.courseDetails.outline === 0) { //FIXME:
            return <h4>No outline created</h4>
        }
        return (
            <MDBContainer>
                {this.state.courseDetails.outlineList && this.state.courseDetails.outlineList.map((outline, index) => {
                    return (
                        <ExpansionPanel key={index}>
                            <ExpansionPanelSummary
                                expandIcon={<MDBIcon icon="angle-down" />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography >{outline.name}</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                {this.showLessonOrder(outline)}
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    )
                })}
            </MDBContainer>
        )
    }

    showLessonOrder = (outline) => {
        if (outline.lessonOrder === "") { //FIXME:
            return <h4>No lesson order</h4>
        }
        else {
            return (
                outline.lessonOrder && outline.lessonOrder.map((order, index) => {
                    return (
                        <MDBContainer ley={index}>
                            <MDBRow size="12">
                                {order.number}. {order.name}
                                <br />
                            </MDBRow>
                        </MDBContainer>
                    )
                }))
        }
    }

    showTeacherBackground = () => {//FIXME: teacher's background
        return (
            <div>
                <h4> Background</h4> 
                <hr />
                <h6>{this.state.courseDetails.teacherBackground}</h6>
            </div>
        )
    }

    render() {
        return (

            <div className="module-content" style={{ paddingTop: 20 }}>
                <CoursepackSideNavigation courseId={this.props.coursepackId} />
                <div style={{ backgroundColor: '#B8CECD', minHeight: 250 }}>
                    <div>
                        <MDBContainer>
                            {this.showDescriptions()}
                        </MDBContainer>
                    </div>
                </div>
                <div style={{ paddingTop: 50, paddingRight: 30 }}>
                    <SectionContainer>
                        <MDBContainer >
                            <h4>Course Outline</h4>
                            <hr />
                            {this.showCoursepackOutline()}
                        </MDBContainer>
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


export default styled(CoursepackDetailsTeacher)`
module-content{
    margin - left: 270px;
    margin-top: 40px;
},
`;
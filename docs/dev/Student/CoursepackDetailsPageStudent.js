import React, { Component } from "react";
import styled from 'styled-components';
import { MDBContainer, MDBCol, MDBBtn, MDBRow, MDBMedia, MDBCard, MDBIcon } from "mdbreact";
import axios from "axios";
import { ExpansionPanel, ExpansionPanelSummary, Typography, ExpansionPanelDetails } from "@material-ui/core";
import { NavLink } from 'react-router-dom';
import SectionContainer from "../../components/sectionContainer";
import CoursepackFeedbackPage from "../CoursepackFeedbackPage";

const API_MOCK = "http://localhost:3001"
const API = "http://localhost:8080/LMS-war/webresources/"


class CoursepackDetailsPageStudent extends Component {

    state = {
        courseDetails: "",
        open: false,
        coursepackId: "",
        courseOutline: "",
        listOfOutlineId: ""
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
                        <CoursepackFeedbackPage/>
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


export default styled(CoursepackDetailsPageStudent)`
module-content{
    margin - left: 270px;
    margin-top: 40px;
},
`;
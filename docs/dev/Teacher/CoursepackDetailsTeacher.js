import React, { Component } from "react";
import styled from 'styled-components';
import { MDBContainer, MDBCol, MDBBtn, MDBRow, MDBMedia, MDBCard, MDBIcon } from "mdbreact";
import axios from "axios";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, ExpansionPanel, ExpansionPanelSummary, Typography, ExpansionPanelDetails } from "@material-ui/core";
import CoursepackSideNavigation from "../CoursepackSideNavigation";

const API = "http://localhost:3001"

class CoursepackDetailsTeacher extends Component {

    state = {
        courseDetails: "",
        open: false,
    }

    componentDidMount() {
        let coursepackId = this.props.coursepackId;
        axios.get(`${API}/coursepack/${coursepackId}`)
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
                        <h1>{this.state.courseDetails.courseTitle}</h1>
                        <h3>{this.state.courseDetails.courseDescription}</h3>
                        <MDBBtn color="primary" onClick={this.viewCourse} >View Course</MDBBtn>
                    </MDBCol>
                    <MDBCol size="4">
                        <MDBCard style={{ width: "23rem", minHeight: "12rem" }}>
                            <MDBMedia object src="https://mdbootstrap.com/img/Photos/Others/placeholder1.jpg" alt="" />
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>)
    }

    showCoursepackOutline = () => {
        return (
            <MDBContainer>
                {this.state.courseDetails.outline && this.state.courseDetails.outline.map((outline, index) => {
                    return (
                        <ExpansionPanel key={index}>
                            <ExpansionPanelSummary
                                expandIcon={<MDBIcon icon="angle-down" />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography >{outline}</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Typography>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                    sit amet blandit leo lobortis eget.
                        </Typography>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>

                    )
                })}
            </MDBContainer>
        )
    }

    render() {
        console.log("teacher")
        return (

            <div className="module-content">
                <CoursepackSideNavigation courseId={this.props.coursepackId}/>


                <div style={{ backgroundColor: '#B8CECD', minHeight: 250 }}>
                    < div /* className="module-content" */>
                        <MDBContainer>
                            {this.showDescriptions()}
                        </MDBContainer>
                    </div>
                </div>
                <MDBContainer style={{ paddingTop: 50 }}>
                    {this.showCoursepackOutline()}
                </MDBContainer>
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
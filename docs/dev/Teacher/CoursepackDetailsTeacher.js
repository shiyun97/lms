import React, { Component } from "react";
import styled from 'styled-components';
import { MDBContainer, MDBCol, MDBBtn, MDBRow, MDBMedia, MDBCard } from "mdbreact";
import axios from "axios";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Slide } from "@material-ui/core";


const API = "http://localhost:3001"

class CoursepackDetailsTeacher extends Component {

    state = {
        courseDetails: "",
        open: false,
    }

    componentDidMount() {
        axios.get(`${API}/coursepack/1`)
            .then(result => {
                this.setState({ courseDetails: result.data })
                console.log(this.state.courseDetails)
            })
            .catch(error => {
                console.error("error in axios " + error);
            });
    }

    viewAssessments = event => {
        console.log("view assessments")
    }

    showDescriptions = () => {
        return (
            <MDBContainer style={{ paddingTop: 20 }}>
                <MDBRow>
                    <MDBCol size="8">
                        <h1>{this.state.courseDetails.courseTitle}</h1>
                        <h3>{this.state.courseDetails.courseDescription}</h3>
                        <MDBBtn color="primary" onClick={this.viewAssessments} >View Assessments</MDBBtn>
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
            <h3>course outline</h3>
        )
    }

   
    handleClickOpen = event => {
        this.setState({ open: true })
    }

    handleClose = event => {
        this.setState({ open: false })
    }

    deleteCourse = event => {
        console.log("delete course")
        this.setState({ open: false })
    }

    editCourseInformation = event => {
        console.log("edit course information")
    }

    render() {
        return (
            <div style={{ paddingTop: 50 }}>
                <MDBContainer>
                    <MDBCol align="right">
                        <MDBBtn onClick={this.editCourseInformation}>Edit</MDBBtn>
                    </MDBCol>
                </MDBContainer>
                <div style={{ backgroundColor: '#B8CECD', minHeight: 250 }}>
                    < div /* className="module-content" */>
                        <MDBContainer>
                            {this.showDescriptions()}
                        </MDBContainer>
                    </div>
                </div>
                <MDBContainer>
                    {this.showCoursepackOutline()}
                    <MDBCol align="right">
                        <MDBBtn color="danger" onClick={this.handleClickOpen}>Delete Course</MDBBtn>
                        <Dialog open={this.state.open} onClose={this.handleClickOpen}>
                            <DialogTitle>Delete Course</DialogTitle>
                            <DialogContent>
                                Are you sure to delete <b>{this.state.courseDetails.courseTitle}</b> ? <br />
                                <p style={{ color: "red" }}>This action CANNOT be reverted.</p>
                            </DialogContent>
                            <DialogActions>
                                <MDBBtn onClick={this.handleClose} color="primary">Cancel</MDBBtn>
                                <MDBBtn color="danger" onClick={this.deleteCourse}>Delete</MDBBtn>
                            </DialogActions>
                        </Dialog>
                    </MDBCol>
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
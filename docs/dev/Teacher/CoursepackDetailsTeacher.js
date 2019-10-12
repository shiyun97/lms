import React, { Component } from "react";
import {
    MDBContainer, MDBCarouselInner, MDBView, MDBCarouselItem, MDBCarousel, MDBCol, MDBBtn, MDBRow,
    MDBCard, MDBCardImage, MDBCardGroup, MDBCardBody, MDBCardText, MDBCardTitle
} from "mdbreact";
import Box from '@material-ui/core';
import SectionContainer from "../../components/sectionContainer";
import { Advertisement } from 'semantic-ui-react'

const API = "http://localhost:3001"

class CoursepackDetailsTeacher extends Component {

    componentDidMount() {

    }

    showDescriptions = () => {
        return (
            <div>

                <h1>title</h1>
                <h3>description</h3>
                <h6>button to enroll</h6>
            </div>
        )
    }

    showCoursepackOutline = () => {
        return (
            <h3>outline</h3>
        )
    }

    render() {
        return (
            <MDBContainer>
                {this.showDescriptions()}
                {this.showCoursepackOutline()}
            </MDBContainer>
        )
    }
}


export default CoursepackDetailsTeacher;
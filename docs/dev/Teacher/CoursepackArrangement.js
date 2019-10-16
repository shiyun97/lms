import React, { Component } from 'react';
import CoursepackSideNavigation from '../CoursepackSideNavigation';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon } from "mdbreact";

class CoursepackArrangements extends Component {

    state={
        coursepackId: ""
    }

    componentDidMount() {

    }



    render() {
        console.log(this.props.match.params.coursepackId)

        return (
            <div className="module-content">
                <CoursepackSideNavigation coursepackId={this.props.match.params.coursepackId} />

                <MDBContainer className="mt-5" >create drag and drop</MDBContainer>
                </div>
                )
            }
        }
        
export default CoursepackArrangements;
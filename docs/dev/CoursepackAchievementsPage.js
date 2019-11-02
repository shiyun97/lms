import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import CoursepackAchievementsAdmin from "./Admin/CoursepackAchievementsAdmin";

class CoursepackAchievementsPage extends Component {


    render() {
        return (
            <MDBContainer className="mt-5">
                <CoursepackAchievementsAdmin/>

                
            </MDBContainer>
        )
    }
}

export default CoursepackAchievementsPage; 
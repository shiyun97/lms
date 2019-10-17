import React, { Component } from "react";
import styled from 'styled-components';
import CoursepackDetailsTeacher from "./Teacher/CoursepackDetailsTeacher";
import CoursepackDetailsPageStudent from "./Student/CoursepackDetailsPageStudent";

class CoursepackDetails extends Component {

    render() {
        let accessRight = localStorage.getItem("accessRight")
        return (
            <div>
                {accessRight === "Student" && <CoursepackDetailsPageStudent  coursepackId={this.props.match.params.coursepackId} />}
                {accessRight === "Teacher" && <CoursepackDetailsTeacher  coursepackId={this.props.match.params.coursepackId} />}
                {/* accessRight === "Public" && <CoursepackDashboardPageStudent /> */TODO:}  
            </div>
        )
    }
}


export default styled(CoursepackDetails)`
module-content{
    margin - left: 0px;
    margin-top: 40px;
},
`;
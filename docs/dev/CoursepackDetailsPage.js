import React, { Component } from "react";
import styled from 'styled-components';
import CoursepackDetailsTeacher from "./Teacher/CoursepackDetailsTeacher";
import CoursepackDetailsStudent from "./Student/CoursepackDetailsStudent";

class CoursepackDetailsPage extends Component {

    render() {
        let accessRight = sessionStorage.getItem("accessRight")
        return (
            <div>
                {(accessRight === "Student" || accessRight === "Public") && <CoursepackDetailsStudent coursepackId={this.props.match.params.coursepackId} />}
                {accessRight === "Teacher" && <CoursepackDetailsTeacher coursepackId={this.props.match.params.coursepackId} />}
            </div>
        )
    }
}


export default styled(CoursepackDetailsPage)`
module-content{
    margin - left: 0px;
    margin-top: 40px;
},
`;
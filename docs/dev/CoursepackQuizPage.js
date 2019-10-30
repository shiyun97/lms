import React, { Component } from "react";
import styled from 'styled-components';
import CoursepackQuizPageTeacher from "./Teacher/CoursepackQuizPageTeacher";
import AccessDeniedPage from "./AccessDeniedPage";

class CoursepackQuizPage extends Component {

    state = {
        moduleId: 0, //NEED TO CHANGE TO COURSEPACK
    }

    componentDidMount() {
        this.initPage();
    }

    initPage() {
        let moduleId = this.props.match.params.moduleId; //NEED TO CHANGE TO COURSEPACK
        if (moduleId) {
            // console.log(moduleId);
            // retrieve module & set state
            this.setState({ moduleId: moduleId }) //NEED TO CHANGE TO COURSEPACK
        }
    }

    render() {
        let accessRight = sessionStorage.getItem("accessRight")
        if (accessRight === "Teacher")
            return <CoursepackQuizPageTeacher moduleId={this.props.moduleId} /> //NEED TO CHANGE TO COURSEPACK
        else
            return <AccessDeniedPage />
    }
}

export default styled(CoursepackQuizPage)`
.module-content{
    margin-left: 270px;
    margin-top: 40px;
}
`;

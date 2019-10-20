import React, { Component } from "react";
import styled from 'styled-components';
import ModuleQuizPageStudent from "./Student/ModuleQuizPageStudent";
import ModuleQuizPageTeacher from "./Teacher/ModuleQuizPageTeacher";
import AccessDeniedPage from "./AccessDeniedPage";
import axios from 'axios';
import { observer, inject } from 'mobx-react';
import moment from 'moment';

@inject('dataStore')
@observer
class ModuleQuizPage extends Component {

    state = {
        moduleId: 0,
        status: "",
        message: "",
        openSnackbar: false,
        quizzes: []
    }

    componentDidMount() {
        this.initPage();
        this.getAllModuleQuizzes();
    }

    handleChange = event => {
        event.preventDefault();
        this.setState({ [event.target.name]: event.target.value });
    }

    initPage() {
        let moduleId = this.props.match.params.moduleId;
        if (moduleId) {
            // console.log(moduleId);
            // retrieve module & set state
            this.setState({ moduleId: moduleId })
            this.props.dataStore.setCurrModId(moduleId);
        }
    }

    getAllModuleQuizzes = () => {
        let userId = localStorage.getItem('userId');
        let moduleId = this.props.dataStore.getCurrModId;
        let accessRight = localStorage.getItem("accessRight")
        axios
        .get(` http://localhost:8080/LMS-war/webresources/Assessment/retrieveAllModuleQuiz/${moduleId}?userId=${userId}`)
        .then(result => {
            // console.log(result.data.quizzes)
            this.setState({ message: "Successfully retrieved quizzes!", quizzes: result.data.quizzes })
        })
        .catch(error => {
            this.setState({ status: "error" })
            console.error("error in axios " + error);
        });
       
    }

    render() {
        let accessRight = localStorage.getItem("accessRight")
        if (accessRight === "Student")
            return <ModuleQuizPageStudent moduleId={this.state.moduleId} quizzes={this.state.quizzes} />
        else if (accessRight === "Teacher")
            return <ModuleQuizPageTeacher moduleId={this.state.moduleId} quizzes={this.state.quizzes} />
        else
            return <AccessDeniedPage />
    }
}

export default styled(ModuleQuizPage)`
.module-content{
    margin-left: 270px;
    margin-top: 40px;
}
`;

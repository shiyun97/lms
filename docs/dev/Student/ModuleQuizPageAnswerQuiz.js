import React, { Component } from "react";
import axios from 'axios';
import { observer, inject } from 'mobx-react';
import styled from 'styled-components';
import ModuleQuizPageAnswerAdaptiveQuiz from './ModuleQuizPageAnswerAdaptiveQuiz';
import ModuleQuizPageAnswerNormalQuiz from './ModuleQuizPageAnswerNormalQuiz';

@inject('dataStore')
@observer
class ModuleQuizPageAnswerQuiz extends Component {

  state = {
    studentName: "",
    username: "",
    userId: "",
    email: "",
    moduleId: 0,
    message: "",
    status: "retrieving",
    json: {}
  }

  initPage() {
    var pathname = location.pathname;
    pathname = pathname.split("/");
    // console.log(pathname[2])
    this.props.dataStore.setCurrModId(pathname[2]);
    this.props.dataStore.setCurrQuizId(pathname[4]);
  }

  componentDidMount() {
    this.initPage();
    this.getModuleQuiz();
  }

  getModuleQuiz = () => {
    let userId = localStorage.getItem('userId');
    let quizId = this.props.dataStore.getCurrQuizId;
    axios
      .get(`http://localhost:8080/LMS-war/webresources/Assessment/retrieveModuleQuiz/${quizId}?userId=${userId}`)
      .then(result => {
        // console.log(result.data)
        var newJson = result.data;
        newJson['completedHtml'] = "<p><h4>You have completed the quiz!</h4></p>";
        this.setState({ status: "done", json: newJson })
      })
      .catch(error => {
        this.setState({ status: "error" })
        console.error("error in axios " + error);
      });
  }

  render() {
    if (this.state.status === "done") {
      if (this.state.json.quizType === "adaptive")
        return <ModuleQuizPageAnswerAdaptiveQuiz />;
      else
        return <ModuleQuizPageAnswerNormalQuiz />;
    } else
      return (<h3>Retrieving</h3>);
  }
}

export default styled(ModuleQuizPageAnswerQuiz)`
.module-content{
    margin-left: 270px;
    margin-top: 40px;
}
`;
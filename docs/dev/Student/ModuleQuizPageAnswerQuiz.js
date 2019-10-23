import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBBtn } from "mdbreact";
import axios from 'axios';
import { observer, inject } from 'mobx-react';
import styled from 'styled-components';
import ModuleSideNavigation from "../ModuleSideNavigation";
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
        if (result.data.reachedMaxAttempt) {
          this.setState({ status: "maximumAttempt" })
        } else
        this.setState({ status: "done", json: newJson })
      })
      .catch(error => {
        this.setState({ status: "error" })
        console.error("error in axios " + error);
      });
  }

  render() {
    var moduleId = this.props.dataStore.getCurrModId;
    if (this.state.status === "done") {
      if (this.state.json.quizType === "adaptive")
        return <ModuleQuizPageAnswerAdaptiveQuiz />;
      else
        return <ModuleQuizPageAnswerNormalQuiz />;
    } else if (this.state.status === "retrieving") {
      return (
        <div className={this.props.className}>
          <ModuleSideNavigation moduleId={moduleId}></ModuleSideNavigation>
          <div className="module-content">
            <MDBContainer className="mt-3">
              <MDBRow className="py-3">
                <MDBCol md="12">
                  <MDBCard cascade className="my-3 grey lighten-4" style={{ padding: 20 }}>
                    <h3>Retrieving Quiz Details...</h3>
                  </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </div>
      </div>
      )
    } else if (this.state.status === "error") {
      return (
        <div className={this.props.className}>
          <ModuleSideNavigation moduleId={moduleId}></ModuleSideNavigation>
          <div className="module-content">
            <MDBContainer className="mt-3">
              <MDBRow className="py-3">
                <MDBCol md="12">
                  <MDBCard cascade className="my-3 grey lighten-4" style={{ padding: 20 }}>
                    <h3>Unable to retrieve quiz details. Please try again later.</h3>
                  </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </div>
      </div>
      )
    } else if (this.state.status === "maximumAttempt") {
      return (
        <div className={this.props.className}>
          <ModuleSideNavigation moduleId={moduleId}></ModuleSideNavigation>
          <div className="module-content">
            <MDBContainer className="mt-3">
              <MDBRow className="py-3">
                <MDBCol md="12">
                  <MDBCard cascade className="my-3 grey lighten-4" style={{ padding: 20 }}>
                    <h3>Sorry, you have exhausted all your quiz attempts.</h3>
                  </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </div>
      </div>
      )
    } else {
      return (
        <div className={this.props.className}>
          <ModuleSideNavigation moduleId={moduleId}></ModuleSideNavigation>
          <div className="module-content">
            <MDBContainer className="mt-3">
              <MDBRow className="py-3">
                <MDBCol md="12">
                  <MDBCard cascade className="my-3 grey lighten-4" style={{ padding: 20 }}>
                    <h3>No such quiz exist.</h3>
                  </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </div>
      </div>
      )
    }
  }
}

export default styled(ModuleQuizPageAnswerQuiz)`
.module-content{
    margin-left: 270px;
    margin-top: 40px;
}
`;
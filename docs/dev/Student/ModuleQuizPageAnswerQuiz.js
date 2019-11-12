import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBBtn } from "mdbreact";
import axios from 'axios';
import { observer, inject } from 'mobx-react';
import styled from 'styled-components';
import ModuleSideNavigation from "../ModuleSideNavigation";
import ModuleQuizPageAnswerAdaptiveQuiz from './ModuleQuizPageAnswerAdaptiveQuiz';
import ModuleQuizPageAnswerNormalQuiz from './ModuleQuizPageAnswerNormalQuiz';
import ModuleSideNavigationDropdown from "../ModuleSideNavigationDropdown";

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
    let userId = sessionStorage.getItem('userId');
    let quizId = this.props.dataStore.getCurrQuizId;
    axios
      .get(`http://localhost:8080/LMS-war/webresources/Assessment/retrieveModuleQuiz/${quizId}?userId=${userId}`)
      .then(result => {
        // console.log(result.data)
        var newJson = result.data;
        newJson['completedHtml'] = "<p><h4>You have completed the quiz!</h4></p>";
        if (result.data.reachedMaxAttempt) {
          this.setState({ status: "maximumAttempt", json: newJson })
        } else
          this.setState({ status: "done", json: newJson })
      })
      .catch(error => {
        this.setState({ status: "error" })
        console.error("error in axios " + error);
      });
  }

  renderEmptyCardWithMessage = (message) => {
    var moduleId = this.props.dataStore.getCurrModId;
    return (
      <div className={this.props.className}>
        <div className="module-sidebar-large"><ModuleSideNavigation moduleId={moduleId}></ModuleSideNavigation></div>
        <div className="module-navbar-small">
          <ModuleSideNavigationDropdown moduleId={moduleId} activeTab={'Quiz'}></ModuleSideNavigationDropdown>
        </div>
        <div className="module-content">
          <MDBContainer className="mt-3">
            <MDBRow className="py-3">
              <MDBCol md="12">
                <MDBCard cascade className="my-3 grey lighten-4" style={{ padding: 20 }}>
                  <h5>{message}</h5>
                </MDBCard>
                {this.state.json.publishAnswer === true &&
                  <>
                    <br />
                    <br />
                    <h1>Quiz Answers</h1>
                    <MDBCard cascade className="my-3 grey lighten-4" style={{ padding: 20 }}>
                      {/* {console.log(this.state.json.pages[0].elements)} */}
                      <p>{this.state.json.pages[0].elements.map((element) =>
                        <>
                          <b><h6>Question {element.number}</h6></b>
                          {element.title} <br />
                          <br />
                          Correct Answer: {element.correctAnswer} <br />
                          Explanation: {element.explanation} <br />
                          <br />
                          <hr />
                        </>
                      )}</p>
                    </MDBCard>
                  </>
                }
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </div>
      </div>
    )
  }

  render() {
    var moduleId = this.props.dataStore.getCurrModId;
    if (this.state.status === "done") {
      if (this.state.json.quizType === "adaptive")
        return <ModuleQuizPageAnswerAdaptiveQuiz />;
      else
        return <ModuleQuizPageAnswerNormalQuiz />;
    } else if (this.state.status === "retrieving") {
      return this.renderEmptyCardWithMessage("Retrieving Quiz Details...");
    } else if (this.state.status === "error") {
      return this.renderEmptyCardWithMessage("Unable to retrieve quiz details. Please try again later.")
    } else if (this.state.status === "maximumAttempt") {
      return this.renderEmptyCardWithMessage("Sorry, you have no quiz attempts left.")
    } else {
      return this.renderEmptyCardWithMessage("No such quiz exist.")
    }
  }
}

export default styled(ModuleQuizPageAnswerQuiz)`
.module-content{
    margin-top: 40px;
}
@media screen and (min-width: 800px) {
    .module-content{
        margin-left: 270px;
    }
    .module-navbar-small{
        display: none;
    }
    .module-sidebar-large{
        display: block;
    }
}
@media screen and (max-width: 800px) {
    .module-sidebar-large{
        display: none;
    }
    .module-navbar-small{
        display: block;
    }
}
`;
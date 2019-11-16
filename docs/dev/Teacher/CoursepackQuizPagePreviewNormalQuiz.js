import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBBtn } from "mdbreact";
import axios from 'axios';
import { observer, inject } from 'mobx-react';
import styled from 'styled-components';
import * as Survey from "survey-react";
import CoursepackSideNavigation from "../CoursepackSideNavigation";
import CoursepackSideNavigationDropdown from "../CoursepackSideNavigationDropdown";

var pathname = location.pathname;
pathname = pathname.split("/");
var quizId = pathname[4]
var answers = []
var json = {}

@inject('dataStore')
@observer
class CoursepackQuizPagePreviewNormalQuiz extends Component {

  state = {
    studentName: "",
    username: "",
    userId: "",
    email: "",
    coursepackId: 0,
    message: "",
    status: "retrieving",
    start: false
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
      .get(`http://localhost:8080/LMS-war/webresources/Assessment/retrieveCoursepackQuiz/${quizId}?userId=${userId}`)
      .then(result => {
        // console.log(result.data)
        var newJson = result.data;
        newJson['completedHtml'] = "<p><h4>You have completed the quiz!</h4></p>";
        newJson['showTimerPanel'] = "none";
        json = newJson
        this.setState({ status: "done" })
      })
      .catch(error => {
        this.setState({ status: "error" })
        console.error("error in axios " + error);
      });
  }

  onValueChanged(result) {
    // match question name with answer and question Id
    var tempResult = result.data
    var questionAttempts = Object.keys(tempResult);
    var questions = json.pages[0].elements;
    // console.log(result.data)
    for (var i = 0; i < questionAttempts.length; i++) {
      // console.log(questionAttempts[i].substr(8, questionAttempts[i].length))
      var questionNumber = questionAttempts[i].substr(8, questionAttempts[i].length)
      for (var j = 0; j < questions.length; j++) {
        if (questionNumber == questions[j].number) {
          if (tempResult[questionAttempts[i]].text === undefined)
            answers[questionNumber - 1] = { questionId: questions[j].questionId, answer: tempResult[questionAttempts[i]] }
          else {
            answers[questionNumber - 1] = { questionId: questions[j].questionId, answer: tempResult[questionAttempts[i]].text } //, quizId: 1
          }
        }
      }
    }
    // console.log(answers)
  }

  onComplete = (result) => { }

  submitAnswers = () => {
    var quizId = this.props.dataStore.getCurrQuizId;
    console.log(json, quizId);
  }

  render() {
    // console.log(json)
    var model = new Survey.Model(json);
    var coursepackId = this.props.dataStore.getCurrModId;
    if (this.state.start) {
      return (
        <div className={this.props.className}>
          {sessionStorage.getItem('accessRight') === 'Teacher' ?
            <div>
              <div className="module-sidebar-large"><CoursepackSideNavigation courseId={coursepackId} /></div>
              <div className="module-navbar-small">
                <CoursepackSideNavigationDropdown courseId={coursepackId} />
              </div>
            </div>
            : null}
          <div className="module-content">
            <MDBContainer className="mt-3">
              <MDBRow className="py-3">
                <MDBCol md="12">
                  <MDBCard cascade className="my-3 grey lighten-4">
                    {this.state.status === "done" &&
                      <Survey.Survey
                        model={model}
                        onComplete={() => this.onComplete()}
                        onValueChanged={this.onValueChanged}
                      />
                    }
                    {this.state.status !== "done" && <h5 align="center" style={{ padding: 20 }}>Error in retrieving quiz. Please try again later.</h5>}
                  </MDBCard>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </div>
        </div>
      );

    } else {
      return (
        <div className={this.props.className}>
          {sessionStorage.getItem('accessRight') === 'Teacher' ?
            <div>
              <div className="module-sidebar-large"><CoursepackSideNavigation courseId={coursepackId} /></div>
              <div className="module-navbar-small">
                <CoursepackSideNavigationDropdown courseId={coursepackId} />
              </div>
            </div>
            : null}
          <div className="module-content">
            <MDBContainer className="mt-3">
              <MDBRow className="py-3">
                <MDBCol md="12">
                  <MDBCard cascade className="my-3 grey lighten-4" style={{ padding: 20 }}>
                    <MDBBtn color="blue" onClick={() => { this.setState({ start: true }) }}><h4>Start Quiz</h4></MDBBtn>
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

export default styled(CoursepackQuizPagePreviewNormalQuiz)`
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
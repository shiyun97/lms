import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBBtn } from "mdbreact";
import axios from 'axios';
import { observer, inject } from 'mobx-react';
import styled from 'styled-components';
import * as Survey from "survey-react";
import ModuleSideNavigation from "../ModuleSideNavigation";
import ModuleSideNavigationDropdown from "../ModuleSideNavigationDropdown";

var pathname = location.pathname;
pathname = pathname.split("/");
var quizId = pathname[4]
var answers = []
var json = {
  title: "Quiz 1",
  showProgressBar: "top",
  description: "This is to test your knowledge on [topic].", //instructions
  quizType: "normal",
  questionsOrder: "random", // normal => "initial"
  openingDate: "", //datetime
  closingDate: "", //datetime
  noOfAttempts: 1,
  completedHtml: "<p><h4>You have completed the quiz!</h4></p>",
  startSurveyText: "Start",
  completeText: "Submit",
  showTimerPanel: "top",
  maxTimeToFinish: 60, // in seconds
  pages: [
    {
      "name": "page1",
      "elements": [
        {
          "type": "radiogroup", //mcq
          "name": "question1",
          "number": 1,
          "title": "What is a MCQ question?",
          "isRequired": true,
          "choices": [
            {
              "text": "Answer Choice 1"
            },
            {
              "text": "Answer Choice 2"
            },
            {
              "text": "Answer Choice 3"
            },
            {
              "text": "Answer Choice 4"
            }
          ],
        },
        {
          "type": "radiogroup",
          "name": "question2",
          "number": 2,
          "title": "Do you ask questions?",
          "isRequired": true,
          "choices": [
            {
              "text": "Answer Choice 1"
            },
            {
              "text": "Answer Choice 2"
            },
            {
              "text": "Answer Choice 3"
            },
            {
              "text": "Answer Choice 4"
            }
          ]
        },
        {
          "type": "text", //text
          "name": "question3",
          "number": 3,
          "title": "What is a multiple choice question?",
          "isRequired": true,
        }
      ]
    }
  ]
}

@inject('dataStore')
@observer
class ModuleQuizPageAnswerNormalQuiz extends Component {

  state = {
    studentName: "",
    username: "",
    userId: "",
    email: "",
    moduleId: 0,
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
      .get(`http://localhost:8080/LMS-war/webresources/Assessment/retrieveModuleQuiz/${quizId}?userId=${userId}`)
      .then(result => {
        // console.log(result.data)
        var newJson = result.data;
        newJson['completedHtml'] = "<p><h4>You have completed the quiz!</h4></p>";
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

  onComplete = (result) => {
    let userId = sessionStorage.getItem('userId');
    // console.log(quizId)
    // console.log(answers)
    axios
      .post(`http://localhost:8080/LMS-war/webresources/Assessment/createQuizAttempt?userId=${userId}`, {
        quizId: quizId,
        questionAttempts: answers
      })
      .then(result => {
        console.log("success")
        // this.setState({ status: "done", quizzes: result.data.quizzes })
      })
      .catch(error => {
        // this.setState({ status: "error" })
        console.log("error")
        console.error("error in axios " + error);
      });
  }

  submitAnswers = () => {
    var quizId = this.props.dataStore.getCurrQuizId;
    console.log(json, quizId);
  }

  render() {
    // console.log(json)
    var model = new Survey.Model(json);
    var moduleId = this.props.dataStore.getCurrModId;
    if (this.state.start) {
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
          <div className="module-sidebar-large"><ModuleSideNavigation moduleId={moduleId}></ModuleSideNavigation></div>
          <div className="module-navbar-small">
            <ModuleSideNavigationDropdown moduleId={moduleId} activeTab={'Quiz'}></ModuleSideNavigationDropdown>
          </div>
          <div className="module-content">
            <MDBContainer className="mt-3">
              <MDBRow className="py-3">
                <MDBCol md="12">
                  <MDBCard cascade className="my-3 grey lighten-4" style={{ padding: 20 }} align="center">
                    <h3>{json.title}</h3>
                    {json.description}
                    <br />
                    <br />
                    Please read the questions carefully.
                    <br />
                    You have {json.maxTimeToFinish} minutes to complete the quiz.
                    <br />
                    You only have {json.noOfAttempts} attempts.
                    <br />
                    <br />
                    <MDBBtn color="blue" onClick={() => { this.setState({ start: true }) }} style={{ maxWidth: 250 }}>
                      Start Quiz
                      </MDBBtn>
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

export default styled(ModuleQuizPageAnswerNormalQuiz)`
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
import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBBtn } from "mdbreact";
import axios from 'axios';
import { observer, inject } from 'mobx-react';
import styled from 'styled-components';
import * as Survey from "survey-react";
import ModuleSideNavigation from "../ModuleSideNavigation";

var pathname = location.pathname;
pathname = pathname.split("/");
var quizId = pathname[4]
var answers = []
var json = {
  title: "Quiz 9",
  showProgressBar: "top",
  description: "This is to test your knowledge on [topic].", //instructions
  quizType: "adaptive",
  questionsOrder: "initial", // normal => "initial"
  openingDate: "", //datetime
  closingDate: "", //datetime
  noOfAttempts: 1,
  goNextPageAutomatic: true,
  showNavigationButtons: false,
  completedHtml: "<p><h4>You have completed the quiz!</h4></p>",
  completeText: "Submit",
  showTimerPanel: "top",
  maxTimeToFinish: 60, // in seconds
  pages: [
    {
      "elements": [
        {
          "questionId": 483,
          "type": "radiogroup",
          "title": "What is a MCQ question?",
          "number": 1,
          "explanation": "this is an explanation",
          "correctAnswer": "Answer Choice 3",
          "points": 1,
          "level": 1,
          "isRequired": true,
          "choices": [
            "Answer Choice 1",
            "Answer Choice 2",
            "Answer Choice 3",
            "Answer Choice 4"
          ],
          "html": null
        },
      ],
    },
    {
      "elements": [
        {
          "questionId": 487,
          "type": "radiogroup",
          "title": "Do you ask questions  a?",
          "number": 5,
          "explanation": null,
          "correctAnswer": "Answer Choice 1",
          "points": 3,
          "level": 1,
          "isRequired": true,
          "choices": [
            "Answer Choice 1",
            "Answer Choice 2",
            "Answer Choice 3",
            "Answer Choice 4"
          ],
          "html": null
        }
      ],
    },
    {
      "elements": [
        {
          "questionId": 486,
          "type": "radiogroup",
          "title": "Do you ask questionss?",
          "number": 4,
          "explanation": null,
          "correctAnswer": "Answer Choice 1",
          "points": 3,
          "level": 3,
          "isRequired": true,
          "choices": [
            "Answer Choice 1",
            "Answer Choice 2",
            "Answer Choice 3",
            "Answer Choice 4"
          ],
          "html": null
        },
      ]
    },
    {
      "elements": [
        {
          "questionId": 484,
          "type": "radiogroup",
          "title": "Do you ask questions?",
          "number": 2,
          "explanation": null,
          "correctAnswer": "Answer Choice 1",
          "points": 3,
          "level": 2,
          "isRequired": true,
          "choices": [
            "Answer Choice 1",
            "Answer Choice 2",
            "Answer Choice 3",
            "Answer Choice 4"
          ],
          "html": null
        },
      ]
    },
  ]
}
var page = 0

@inject('dataStore')
@observer
class ModuleQuizPagePreviewAdaptiveQuiz extends Component {

  state = {
    studentName: "",
    username: "",
    userId: "",
    email: "",
    moduleId: 0,
    message: "",
    status: "retrieving",
    start: false,
    pages: []
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

  // arrange pages according to quiz level
  arrangeQuizLevels = () => {
    // console.log("json", json.pages[0].elements)
    var currPages = json.pages[0].elements
    var pages = [] // {pageNum: 0, level: 1}

    // console.log(currPages)
    for (var i = 0; i < currPages.length; i++) {
      // console.log(currPages[i].level)
      pages.push({ pageNum: i, level: currPages[i].level })
    }
    // console.log(pages)
    this.setState({ pages: pages })
  }

  rearrangePages = () => {
    var currPages = json.pages[0].elements
    var newPages = []
    for (var i = 0; i < currPages.length; i++) {
      // console.log(currPages[i])
      newPages.push({ elements: [currPages[i]] })
    }
    // console.log(newPages)
    json.pages = newPages
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
        newJson['showPrevButton'] = false
        newJson['maxTimeToFinish'] = 0
        newJson['showTimerPanel'] = false
        json = newJson
        this.rearrangePages();
        this.setState({ status: "done" })
        this.arrangeQuizLevels();
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

  doOnCurrentPageChanged = (result) => {
    console.log(page)
    page = 2
  }

  onComplete = (result) => {
    let userId = sessionStorage.getItem('userId');
    // console.log(quizId)
    // console.log(answers)
    // axios
    //   .post(`http://localhost:8080/LMS-war/webresources/Assessment/createQuizAttempt?userId=${userId}`, {
    //     quizId: quizId,
    //     questionAttempts: answers
    //   })
    //   .then(result => {
    //     console.log("success")
    //     // this.setState({ status: "done", quizzes: result.data.quizzes })
    //   })
    //   .catch(error => {
    //     // this.setState({ status: "error" })
    //     console.log("error")
    //     console.error("error in axios " + error);
    //   });
  }

  submitAnswers = () => {
    var quizId = this.props.dataStore.getCurrQuizId;
    console.log(json, quizId);
  }

  render() {
    console.log(page)
    // console.log(json)
    var model = new Survey.Model(json);
    var moduleId = this.props.dataStore.getCurrModId;
    if (this.state.start) {
      return (
        <div className={this.props.className}>
          <ModuleSideNavigation moduleId={moduleId}></ModuleSideNavigation>
          <div className="module-content">
            <MDBContainer className="mt-3">
              <MDBRow className="py-3">
                <MDBCol md="12">
                  {/* <h1>Adaptive</h1> */}
                  <MDBCard cascade className="my-3 grey lighten-4">
                    {this.state.status === "done" &&
                      <Survey.Survey
                        model={model}
                        onComplete={() => this.onComplete()}
                        doOnCurrentPageChanged={this.doOnCurrentPageChanged}
                        currentPageNo={page}
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
          <ModuleSideNavigation moduleId={moduleId}></ModuleSideNavigation>
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

export default styled(ModuleQuizPagePreviewAdaptiveQuiz)`
.module-content{
    margin-left: 270px;
    margin-top: 40px;
}
`;
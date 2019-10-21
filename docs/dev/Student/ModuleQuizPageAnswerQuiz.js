import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBCard } from "mdbreact";
import axios from 'axios';
import { observer, inject } from 'mobx-react';
import moment from 'moment';
import styled from 'styled-components';
import * as Survey from "survey-react";
import ModuleSideNavigation from "./../ModuleSideNavigation";

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
    json: {
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
          // "level": 1, //only for adaptive,
          //"explanation" : "Explanation/ Feedback of Question",
          // "correctAnswer" : "Answer Choice 1",
          // "points": 1,
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
          // "level": 1, //only for adaptive
          //"explanation" : "Explanation/ Feedback of Question",
          // "correctAnswer" : "Answer Choice 1",
          // "points": 1,
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
          // "level": 1, //only for adaptive,
          //"explanation" : "Explanation/ Feedback of Question",
          // "correctAnswer" : "Answer Choice 1",
          // "points" : 1
        }
      ]
    }
  ]
    }
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
    var tempJson = this.json
    axios
      .get(`http://localhost:8080/LMS-war/webresources/Assessment/retrieveModuleQuiz/${quizId}?userId=${userId}`)
      .then(result => {
        // this.setState({ status: "done" })
        this.setState({ status: "done", json: result.data })
      })
      .catch(error => {
        this.setState({ status: "error" })
        console.error("error in axios " + error);
      });
  }

  onValueChanged(result) {
    console.log("value changed!");
  }

  onComplete(result) {
    console.log("Complete!");
    console.log(result);
  }

  render() {
    // console.log(this.state.json)
    var model = new Survey.Model(this.state.json);
    var moduleId = this.props.dataStore.getCurrModId;
    return (
      <div className={this.props.className}>
        <ModuleSideNavigation moduleId={moduleId}></ModuleSideNavigation>
        <div className="module-content">
          <MDBContainer className="mt-3">
            <MDBRow className="py-3">
              <MDBCol md="12">
                <MDBCard cascade className="my-3 grey lighten-4">
                  {this.state.status === "done" && 
                  <Survey.Survey
                    model={model}
                    onComplete={this.onComplete}
                    onValueChanged={this.onValueChanged}
                  />
                  }
                  {this.state.status !== "done" && <h1>Failed</h1> }
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </div>
      </div>
    );
  }
}

export default styled(ModuleQuizPageAnswerQuiz)`
.module-content{
    margin-left: 270px;
    margin-top: 40px;
}
`;
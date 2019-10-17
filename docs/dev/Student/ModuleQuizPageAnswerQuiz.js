import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBCard } from "mdbreact";
import { observer, inject } from 'mobx-react';
import styled from 'styled-components';
import * as Survey from "survey-react";
import ModuleSideNavigation from "./../ModuleSideNavigation";

@inject('dataStore')
@observer
class ModuleQuizPageAnswerQuiz extends Component {
  json = {
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
    "pages": [
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
  };

  // closingDate: "2019-10-17T00:00:00",
  // completeText: "Submit",
  // description: "This is to test your knowledge on [topic].",
  // maxMarks: 7.0,
  // maxTimeToFinish: 60,
  // noOfAttempts: 1,
  // openingDate: "2019-10-15T00:00:00",
  // pages: [
  //     {
  //         "elements": [
  //             {
  //                 "choices": [
  //                     "Answer Choice 1",
  //                     "Answer Choice 2",
  //                     "Answer Choice 3",
  //                     "Answer Choice 4"
  //                 ],
  //                 "correctAnswer": "Answer Choice 3",
  //                 "isRequired": true,
  //                 "number": 1,
  //                 "points": 1.0,
  //                 "questionId": 355,
  //                 "type": "radiogroup"
  //             },
  //             {
  //                 "choices": [
  //                     "Answer Choice 1",
  //                     "Answer Choice 2",
  //                     "Answer Choice 3",
  //                     "Answer Choice 4"
  //                 ],
  //                 "correctAnswer": "Answer Choice 1",
  //                 "isRequired": true,
  //                 "number": 2,
  //                 "points": 3.0,
  //                 "questionId": 356,
  //                 "type": "radiogroup"
  //             },
  //             {
  //                 "choices": [],
  //                 "isRequired": true,
  //                 "number": 3,
  //                 "points": 3.0,
  //                 "questionId": 357,
  //                 "type": "text"
  //             }
  //         ],
  //         "name": "page1"
  //     }
  // ],
  // publish: false,
  // questionsOrder: "initial",
  // quizId: 358,
  // quizType: "adaptive",
  // showProgressBar: "top",
  // showTimerPanel: "top",
  // startSurveyText: "Start",
  // title: "Quiz 1"

  state = {
    studentName: "",
    username: "",
    userId: "",
    email: "",
    moduleId: 0,
    message: ""
  }

  initPage() {
    let moduleId = this.props.match.params.moduleId;
    if (moduleId) {
      // console.log(moduleId);
      // retrieve module & set state
      this.setState({ moduleId: moduleId })
    }
  }

  componentDidMount() {
    this.initPage();
  }

  onValueChanged(result) {
    console.log("value changed!");
  }

  onComplete(result) {
    console.log("Complete!");
    console.log(result);
  }

  render() {
    var model = new Survey.Model(this.json);
    return (
      <div className={this.props.className}>
        <ModuleSideNavigation moduleId={this.props.match.params.moduleId}></ModuleSideNavigation>
        <div className="module-content">
          <MDBContainer className="mt-3">
            <MDBRow className="py-3">
              <MDBCol md="12">
                <MDBCard cascade className="my-3 grey lighten-4">
                  {/* content */}
                  <Survey.Survey
                    model={model}
                    onComplete={this.onComplete}
                    onValueChanged={this.onValueChanged}
                  />
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
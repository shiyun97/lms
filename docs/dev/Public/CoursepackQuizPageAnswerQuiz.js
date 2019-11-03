import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBBtn } from "mdbreact";
import axios from 'axios';
import { observer, inject } from 'mobx-react';
import styled from 'styled-components';
import * as Survey from "survey-react";

var pathname = location.pathname;
pathname = pathname.split("/");
var answers = [];
var json = {}

@inject('dataStore')
@observer
class CoursepackQuizPageAnswerQuiz extends Component {

  state = {
    studentName: "",
    username: "",
    userId: "",
    email: "",
    moduleId: 0,
    message: "",
    status: "retrieving"
  }

  initPage() {
    this.props.dataStore.setCurrQuizId(354); // NEED TO UPDATE THE QUIZ ID
  }

  componentDidMount() {
    this.initPage();
    this.getCoursepackQuiz();
  }

  getCoursepackQuiz = () => {
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
        this.props.dataStore.setMaxMarks(result.data.maxMarks)
        // this.props.dataStore.setCurrScore(result.data.currScore) // NEED TO CHECK FOR PREVIOUS ATTEMPT SCORE
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
            answers[questionNumber - 1] = {
              questionId: questions[j].questionId,
              answer: tempResult[questionAttempts[i]],
              correctAnswer: questions[j].correctAnswer,
              question: questions[j].title
            }
          else {
            answers[questionNumber - 1] = {
              questionId: questions[j].questionId, answer:
                tempResult[questionAttempts[i]].text,
              correctAnswer: questions[j].correctAnswer,
              question: questions[j].title
            } //, quizId: 1
          }
        }
      }
    }
    // console.log(answers)
  }

  onComplete = (result) => {
    var score = 0
    for (var i = 0; i < answers.length; i++) {
      if (answers[i].answer == answers[i].correctAnswer) {
        score++;
      }
    }
    this.props.dataStore.setCurrScore(score);
    this.props.dataStore.attempted = true;
    if (this.props.dataStore.getCurrScore === this.props.dataStore.getMaxMarks) {
      // call api to unlock quiz
    }
  }

  renderQuiz = () => {
    var model = new Survey.Model(json);
    return (
      <MDBContainer className="mt-3" align="left">
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
    );
  }

  renderQuizResults = () => {
    return (
      <MDBContainer className="mt-3" align="left">
        <MDBRow className="py-3">
          <MDBCol md="12">
            <h2>Quiz Results</h2>
            <h3>Score: {this.props.dataStore.getCurrScore} / {this.props.dataStore.getMaxMarks}</h3>
            <br />
            {answers.map((answer) => {
              return (
                <>
                  <p>
                    Question: {answer.question} <br />
                    Your Answer: {answer.answer} <br />
                  </p>
                  {answer.answer != answer.correctAnswer && <MDBBtn color="red" disabled>WRONG</MDBBtn>}
                  {answer.answer == answer.correctAnswer && <MDBBtn color="green" disabled>RIGHT</MDBBtn>}
                  <hr />
                </>
              )
            })}
            {
              this.props.dataStore.getCurrScore !== this.props.dataStore.getMaxMarks &&
              <center><MDBBtn onClick={() => { this.props.dataStore.attempted = false }}>Reattempt</MDBBtn></center>
            }
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    )
  }

  render() {
    // if already attempted quiz or got full marks, render quiz results
    if (this.props.dataStore.getCurrScore === this.props.dataStore.getMaxMarks || this.props.dataStore.getCoursepackQuizAttempt)
      return this.renderQuizResults();
    else
      return this.renderQuiz();
  }
}

export default styled(CoursepackQuizPageAnswerQuiz)`
.module-content{
    margin-left: 270px;
    margin-top: 40px;
}
`;
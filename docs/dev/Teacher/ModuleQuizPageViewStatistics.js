import React, { Component } from "react";
import { MDBContainer, MDBEdgeHeader, MDBRow, MDBCol, MDBCard, MDBProgress, MDBBreadcrumb, MDBBreadcrumbItem, MDBCardBody, MDBIcon } from "mdbreact";
import axios from 'axios';
import { observer, inject } from 'mobx-react';
import styled from 'styled-components';
import ModuleSideNavigation from "../ModuleSideNavigation";
import ModuleSideNavigationDropdown from "../ModuleSideNavigationDropdown";

@inject('dataStore')
@observer
class ModuleQuizPageViewStatistics extends Component {

  state = {
    moduleId: 0,
    status: "retrieving",
    title: "",
    description: "",
    attempts: 0,
    questions: [],
  }

  initPage() {
    var pathname = location.pathname;
    pathname = pathname.split("/");
    this.props.dataStore.setCurrModId(pathname[2]);
    this.props.dataStore.setCurrQuizId(pathname[4]);
  }

  componentDidMount() {
    this.initPage();
    this.getModuleQuizStatistics()
  }

  getModuleQuizStatistics = () => {
    let quizId = this.props.dataStore.getCurrQuizId;
    axios
      .get(`http://localhost:8080/LMS-war/webresources/Assessment/retrieveQuizStatistics?quizId=${quizId}`)
      .then(result => {
        this.setState({
          status: "done",
          title: result.data.title,
          description: result.data.description,
          attempts: result.data.attempts,
          questions: result.data.questions
        })
      })
      .catch(error => {
        this.setState({ status: "error" })
      });
  }

  renderQuestionStatistics = (question, index) => {
    return (
      <>
        <b>Question {index}</b>
        {question.question}
        <br />
        <br />
        Correct Answer: {question.correctAnswer}
        <br />
        <br />
        {question.answers && question.answers.map((answer) => {
          const count = answer.count;
          var answerPercentage = (count / this.state.attempts * 100).toFixed(2)
          return (
            <>
              <p>{answer.answer}</p>
              <MDBRow>
                <MDBCol md="5">
                  <MDBProgress value={answerPercentage} color="blue" />
                </MDBCol>
                <MDBCol md="2">
                  {answerPercentage}%
              </MDBCol>
                <MDBCol md="5"></MDBCol>
              </MDBRow>
            </>
          )
        })}
        <hr />
      </>
    )
  }

  renderResults = () => {
    if (this.state.status === "done") {
      return (
        <MDBCard cascade className="my-3" style={{ padding: 20 }}>
          <h4>Quiz Statistics</h4>
          <br />
          Quiz Title: {this.state.title} <br />
          Description: {this.state.description} <br />
          No. of Attempts: {this.state.attempts}
          <h6 style={{ fontStyle: "italic" }}>
            <br />
            Note: Short Answer questions are removed from quiz statistics.
          </h6>
          <hr />
          <br />
          {this.state.questions.map((question, index) => { return this.renderQuestionStatistics(question, index + 1) })}
        </MDBCard>
      )
    } else if (this.state.status === "error") {
      return (
        <MDBCard cascade className="my-3" style={{ padding: 20 }}>
          <h5>Quiz Statistics is not available at the moment.</h5>
        </MDBCard>
      )
    }
  }

  render() {
    var moduleId = this.props.dataStore.getCurrModId;
    return (
      <div className={this.props.className}>
        <div className="module-sidebar-large"><ModuleSideNavigation moduleId={moduleId}></ModuleSideNavigation></div>
        <div className="module-navbar-small">
          <ModuleSideNavigationDropdown moduleId={moduleId} activeTab={'Gradebook'}></ModuleSideNavigationDropdown>
        </div>
        <div className="module-content">
          <MDBEdgeHeader color="indigo darken-3" className="analyticsPage" />
          <MDBContainer className="mt-3">
            <MDBRow className="py-3">
              <MDBCol md="12">
                <MDBCard>
                  <MDBCardBody id="breadcrumb" className="d-flex align-items-center justify-content-between">
                    <MDBBreadcrumb>
                      <MDBBreadcrumbItem><a href={`/modules/${moduleId}/quiz`}>Quiz</a></MDBBreadcrumbItem>
                      <MDBBreadcrumbItem active>Statistics</MDBBreadcrumbItem>
                    </MDBBreadcrumb>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
              <MDBCol md="12">
                {this.renderResults()}
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </div>
      </div>
    )
  }
}

export default styled(ModuleQuizPageViewStatistics)`
.module-content{
    margin-top: 0px;
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
import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBCardText, MDBIcon } from "mdbreact";
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
      "pages": [
       {
        "name": "page1",
        "elements": [
         {
          "type": "text",
          "name": "question1",
          "title": "Short Answer Question?",
          "level": 1
         },
         {
          "type": "radiogroup",
          "name": "question2",
          "title": "MCQ Question",
          "level": 1,
          "choices": [
           "item1",
           "item2",
           "item3"
          ]
         }
        ]
       }
      ],
      completedHtml: "<p><h4>You have completed the quiz.</h4></p>"
     };

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
      console.log("Complete! " + result);
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
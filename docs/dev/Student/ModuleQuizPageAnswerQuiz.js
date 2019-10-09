import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBCardText } from "mdbreact";
import { observer, inject } from 'mobx-react';
import styled from 'styled-components';
import ModuleSideNavigation from "./../ModuleSideNavigation";
import Quiz from 'react-quiz-component';

@inject('dataStore')
@observer
class ModuleQuizPageAnswerQuiz extends Component {

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

    render() {
        const quiz =  {
        "quizTitle": "React Quiz Component Demo",
        "quizSynopsis": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim",
        "questions": [
          {
            "question": "How can you access the state of a component from inside of a member function?",
            "questionType": "text",
            "answerSelectionType": "single",
            "answers": [
              "this.getState()",
              "this.prototype.stateValue",
              "this.state",
              "this.values"
            ],
            "correctAnswer": "3",
            "messageForCorrectAnswer": "Correct answer. Good job.",
            "messageForIncorrectAnswer": "Incorrect answer. Please try again.",
            "explanation": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            "point": "20"
          },
          {
            "question": "ReactJS is developed by _____?",
            "questionType": "text",
            "answerSelectionType": "single",
            "answers": [
              "Google Engineers",
              "Facebook Engineers"
            ],
            "correctAnswer": "2",
            "messageForCorrectAnswer": "Correct answer. Good job.",
            "messageForIncorrectAnswer": "Incorrect answer. Please try again.",
            "explanation": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            "point": "20"
          },
          {
            "question": "ReactJS is an MVC based framework?",
            "questionType": "text",
            "answerSelectionType": "single",
            "answers": [
              "True",
              "False"
            ],
            "correctAnswer": "2",
            "messageForCorrectAnswer": "Correct answer. Good job.",
            "messageForIncorrectAnswer": "Incorrect answer. Please try again.",
            "explanation": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            "point": "10"
          },
          {
            "question": "Which of the following concepts is/are key to ReactJS?",
            "questionType": "text",
            "answerSelectionType": "single",
            "answers": [
              "Component-oriented design",
              "Event delegation model",
              "Both of the above",
            ],
            "correctAnswer": "3",
            "messageForCorrectAnswer": "Correct answer. Good job.",
            "messageForIncorrectAnswer": "Incorrect answer. Please try again.",
            "explanation": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            "point": "30"
          },
          {
            "question": "Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
            "questionType": "photo",
            "answerSelectionType": "single",
            "answers": [
              "https://dummyimage.com/600x400/000/fff&text=A",
              "https://dummyimage.com/600x400/000/fff&text=B",
              "https://dummyimage.com/600x400/000/fff&text=C",
              "https://dummyimage.com/600x400/000/fff&text=D"
            ],
            "correctAnswer": "1",
            "messageForCorrectAnswer": "Correct answer. Good job.",
            "messageForIncorrectAnswer": "Incorrect answer. Please try again.",
            "explanation": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            "point": "20"
          },
          {
            "question": "What are the advantages of React JS?",
            "questionType": "text",
            "answerSelectionType": "multiple",
            "answers": [
              "React can be used on client and as well as server side too",
              "Using React increases readability and makes maintainability easier. Component, Data patterns improves readability and thus makes it easier for manitaining larger apps",
              "React components have lifecycle events that fall into State/Property Updates",
              "React can be used with any other framework (Backbone.js, Angular.js) as it is only a view layer"
            ],
            "correctAnswer": [1, 2, 4],
            "messageForCorrectAnswer": "Correct answer. Good job.",
            "messageForIncorrectAnswer": "Incorrect answer. Please try again.",
            "explanation": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            "point": "20"
          },
        ]
      } 
        return (
            <div className={this.props.className}>
                <ModuleSideNavigation moduleId={this.props.match.params.moduleId}></ModuleSideNavigation>
                <div className="module-content">
            <MDBContainer className="mt-3">
                <MDBRow style={{ paddingTop: 60 }}>
                    <MDBCol md="12">
                        <h2 className="font-weight-bold">
                            Quiz 1
                    </h2>
                    </MDBCol>
                </MDBRow>
                <MDBRow className="py-3">
                    <MDBCol md="12">
                        <MDBCard cascade className="my-3 grey lighten-4">
                            <MDBCardBody cascade>
                                <MDBCardText style={{ paddingTop: 10 }}>
                                <Quiz quiz={quiz} shuffle={true}/>
                                </MDBCardText>
                            </MDBCardBody>
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
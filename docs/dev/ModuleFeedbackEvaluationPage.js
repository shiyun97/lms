import React, { Component } from "react";
import { observer, inject } from 'mobx-react';
import styled from 'styled-components';
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBBtn
} from "mdbreact";
import ModuleSideNavigation from "./ModuleSideNavigation";
import ModuleSideNavigationDropdown from "./ModuleSideNavigationDropdown";
import axios from "axios";
import 'babel-polyfill';
import Snackbar from '@material-ui/core/Snackbar';
import * as Survey from "survey-react";
import "survey-react/survey.css";

@inject('dataStore')
@observer
class ModuleFeedbackEvaluationPage extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            moduleId: "",
            message: "",
            openSnackbar: false,
            evaluation: [],
            surveyId: "",
            isCompleted: false 
        };
        this.onCompleteComponent = this.onCompleteComponent.bind(this);
        this.onValueChanged = this.onValueChanged.bind(this);
    }
    onCompleteComponent(s) {
        // values to send back
        console.log(s.valuesHash)
        let answers = s.valuesHash;
        let questions = this.state.evaluation.pages[0].elements;
        let request = {
            surveyId: this.state.surveyId,
            questionAttempts: [
                {
                    questionId: questions[1].questionId,
                    answer: answers['question2']
                },
                {
                    questionId: questions[2].questionId,
                    answer: answers['question3']
                },
                {
                    questionId: questions[3].questionId,
                    answer: answers['question4']
                },
                {
                    questionId: questions[4].questionId,
                    answer: answers['question5']
                },
                {
                    questionId: questions[5].questionId,
                    answer: answers['question6']
                },
                {
                    questionId: questions[6].questionId,
                    answer: answers['question7']
                },
                {
                    questionId: questions[8].questionId,
                    answer: answers['question9']
                },
                {
                    questionId: questions[9].questionId,
                    answer: answers['question10']
                },
                {
                    questionId: questions[10].questionId,
                    answer: answers['question11']
                },
                {
                    questionId: questions[11].questionId,
                    answer: answers['question12']
                },
                {
                    questionId: questions[12].questionId,
                    answer: answers['question13']
                },
                {
                    questionId: questions[13].questionId,
                    answer: answers['question14']
                },
                {
                    questionId: questions[14].questionId,
                    answer: answers['question15']
                },
                {
                    questionId: questions[15].questionId,
                    answer: answers['question16']
                },
                {
                    questionId: questions[16].questionId,
                    answer: answers['question17']
                }
            ]
        }
        console.log(request)
        this.setState({ isCompleted: true });
    }

    onValueChanged(e) {
        console.log(e.valuesHash)
        console.log(e.valuesHash['question2'])
    }

    handleOpenSnackbar = () => {
        this.setState({ openSnackbar: true });
    };

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ openSnackbar: false });
    };

    componentDidMount() {
        this.initPage();
    }

    async initPage() {
        let moduleId = this.props.match.params.moduleId;
        if (moduleId) {
            // retrieve questions
            await axios
                .get("http://localhost:3002/feedbackEvaluation2")
                .then((result) => {
                    console.log(result);
                    if (result) {
                        let data = result.data;
                        if (data) {
                            this.setState({
                                moduleId: moduleId,
                                evaluation: {
                                    pages: result.data.pages
                                },
                                surveyId: result.data.surveyId
                            });
                        }
                    }
                    
                })
                .catch(error => {
                    this.setState({
                        message: error.response.data.errorMessage,
                        openSnackbar: true
                    })
                    console.error("error in axios " + error);
                });
        }
    }

    goToFeedBackMainPage = () => {
        this.props.dataStore.setPath(`/modules/${this.state.moduleId}/feedback`);
        this.props.history.push(`/modules/${this.state.moduleId}/feedback`);
    }

    render() {
        let evaluation = this.state.evaluation;
        var model = new Survey.Model(evaluation);
        if (this.state.evaluation.pages) {
            var surveyRender = !this.state.isCompleted ? (
                <Survey.Survey
                    model={model}
                    showCompletedPage={false}
                    onComplete={this.onCompleteComponent}
                    onValueChanged={this.onValueChanged}
                />
            ) : null;
            var onCompleteComponent = this.state.isCompleted ? (
                <MDBCol>
                    Thank you for your feedback. <br />
                    <MDBBtn color="primary" size="md" className="ml-0" onClick={e => this.goToFeedBackMainPage()}>Back to Feedback Page</MDBBtn>
                </MDBCol>
            ) : null;
            return (
                <div className={this.props.className}>
                    <div className="module-sidebar-large"><ModuleSideNavigation moduleId={this.props.match.params.moduleId}></ModuleSideNavigation></div>
                    <div className="module-navbar-small">
                        <ModuleSideNavigationDropdown moduleId={this.props.match.params.moduleId} activeTab={'Feedback'}></ModuleSideNavigationDropdown>
                    </div>
                    <div className="module-content">
                        <MDBContainer>
                            <MDBRow>
                                <MDBCol>
                                    <h5 className="font-weight-bold mb-2" style={{textTransform: "uppercase"}}>Evaluation On Teacher / Module Exercise </h5>

                                </MDBCol>
                            </MDBRow>
                            <MDBRow>
                                {surveyRender}
                                {onCompleteComponent}
                            </MDBRow>
                        </MDBContainer>
                    </div>
                </div>
            );
        }
        return (<div></div>)
    }
}

export default styled(ModuleFeedbackEvaluationPage)`
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
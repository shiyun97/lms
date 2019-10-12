import React, { Component } from "react";
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

class ModuleFeedbackEvaluationPage extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            moduleId: "",
            message: "",
            openSnackbar: false,
            evaluation: {
            },
            isCompleted: false 
        };
        this.onCompleteComponent = this.onCompleteComponent.bind(this);
        this.onValueChanged = this.onValueChanged.bind(this);
    }
    onCompleteComponent(s, options) {
        // values to send back
        console.log(s.valuesHash)
        this.setState({ isCompleted: true });
    }

    onValueChanged(e) {
        console.log(e.valuesHash)
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
                .get("http://localhost:3002/feedbackEvaluation")
                .then((result) => {
                    console.log(result);
                    if (result) {
                        let data = result.data;
                        if (data) {
                            this.setState({
                                moduleId: moduleId,
                                evaluation: {
                                    pages: result.data.pages
                                }
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
        this.props.history.push(`/modules/${this.state.moduleId}/feedback`);
    }

    render() {
        let evaluation = this.state.evaluation;
        if (this.state.evaluation.pages) {
            var surveyRender = !this.state.isCompleted ? (
                <Survey.Survey
                    json={evaluation}
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
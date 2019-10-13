import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBCardText, MDBIcon } from "mdbreact";
import { observer, inject } from 'mobx-react';
import styled from 'styled-components';
import ModuleSideNavigation from "./../ModuleSideNavigation";
import { Stepper, Step, StepLabel, Button, Typography } from '@material-ui/core';

@inject('dataStore')
@observer
class ModuleQuizPageCreateQuiz extends Component {

    state = {
        studentName: "",
        username: "",
        userId: "",
        email: "",
        moduleId: 0,
        message: "",
        instructions: "",
        quizTitle: "",
        activeStep: 0,
        steps: ['Quiz Configuration', 'Build Quiz', 'Marking Scheme']
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

    handleSubmit = () => {

    }

    handleReset = () => {
        this.setState({ activeStep: 0 });
    };

    handleNext = () => {
        const currStep = this.state.activeStep;
        this.setState({ activeStep: currStep + 1 });
    };

    handleBack = () => {
        const currStep = this.state.activeStep;
        this.setState({ activeStep: currStep - 1 });
    };

    handleChange = event => {
        event.preventDefault();
        this.setState({ [event.target.name]: event.target.value });
    }

    getStepContent = (stepIndex) => {
        switch (stepIndex) {
            case 0:
                return (
                    <div style={{ padding: 60 }}>
                        <h4 className="text-center">
                            Quiz Configuration
                    </h4>
                        <ul className="list-unstyled example-components-list">
                            <form onSubmit={this.checkLogIn} name="quiz-form" onSubmit={() => { this.handleSubmit() }}>
                                <br />
                                <label className="grey-text">
                                    Quiz Title
                    </label>
                                <input type="text" name="quizTitle" onChange={this.handleChange} className="form-control" />
                                <br />
                                <label className="grey-text">
                                    Instructions
                    </label>
                                <input type="text" name="instructions" onChange={this.handleChange} className="form-control" />
                                <div className="text-center mt-4">
                                    <MDBBtn type="submit" color="blue">Submit</MDBBtn>
                                </div>
                            </form>
                        </ul>
                    </div>
                );
            case 1:
                return 'What is an ad group anyways?';
            case 2:
                return 'This is the bit I really care about!';
            default:
                return 'Unknown stepIndex';
        }
    }

    render() {
        const { steps, activeStep } = this.state;
        return (
            <div className={this.props.className}>
                <ModuleSideNavigation moduleId={this.props.match.params.moduleId}></ModuleSideNavigation>
                <div className="module-content">
                    <MDBContainer className="mt-3">
                        <MDBRow style={{ paddingTop: 60 }}>
                            <MDBCol md="12">
                                <h2 className="font-weight-bold">
                                    <a href="/modules/:moduleId/quiz">Quiz</a>
                                    <MDBIcon icon="angle-right" className="ml-4 mr-4" /> Create Quiz
                                </h2>
                            </MDBCol>
                        </MDBRow>
                        <MDBRow className="py-3">
                            <MDBCol md="12">
                                <MDBCard cascade className="grey lighten-4" style={{ padding: 50 }}>
                                    <Stepper activeStep={activeStep} alternativeLabel>
                                        {steps.map(label => (
                                            <Step key={label}>
                                                <StepLabel>{label}</StepLabel>
                                            </Step>
                                        ))}
                                    </Stepper>
                                    <div>
                                        {activeStep === steps.length ? (
                                            <div>
                                                <Typography>All steps completed</Typography>
                                                <Button onClick={() => this.handleReset()}>Reset</Button>
                                            </div>
                                        ) : (
                                                <div>
                                                    <Typography>{this.getStepContent(activeStep)}</Typography>
                                                    <div>
                                                        <Button
                                                            disabled={activeStep === 0}
                                                            onClick={() => this.handleBack()}
                                                        >
                                                            Back
                                                        </Button>
                                                        <Button variant="contained" color="primary" onClick={() => this.handleNext()}>
                                                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                                        </Button>
                                                    </div>
                                                </div>
                                            )}
                                    </div>
                                </MDBCard>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </div>
            </div>
        );
    }
}

export default styled(ModuleQuizPageCreateQuiz)`
.module-content{
    margin-left: 270px;
    margin-top: 40px;
}
`;
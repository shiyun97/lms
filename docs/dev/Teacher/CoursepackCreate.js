import React, { Component } from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon } from "mdbreact";
import SectionContainer from "../../components/sectionContainer";
import axios from "axios";
import { NavLink } from 'react-router-dom'
import { Stepper, StepLabel, Typography, Step, StepContent, Button } from '@material-ui/core';
import Dropzone from 'react-dropzone';

const API = "http://localhost:3001"

class CoursePackCreate extends Component {

    state = {
        activeStep: 1,
        steps: ['Course Information', 'Upload Videos', 'Create Quiz', 'Arrangements'],
        userId: "",
        courseCode: "",
        courseTitle: "",
        courseDescription: "",
        category: "",
        startDate: "",
        endDate: "",
        price: "",
        categories: "",
        heading: "",
        uploadedFile: "",
        outline: [],
    }

    componentDidMount() {
        let userId = localStorage.getItem("userId")
        this.setState({ userId: userId })
        axios.get(`${API}/category`)
            .then(result => {
                this.setState({ categories: result.data })
                console.log(this.state.categories)
            })
            .catch(error => {
                console.error("error in axios " + error);
            });
    }

    handleOnChange = event => {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleSelectCategory = event => {
        this.setState({ category: event.target.value }, () => event);
    }

    courseInformation = () => {
        return (
            <SectionContainer>
                <MDBContainer>
                    <MDBRow>
                        <MDBCol sm="4">Course Code: </MDBCol>
                        <MDBCol sm="8">
                            <input
                                value={this.state.courseCode}
                                name="courseCode"
                                type="text"
                                className="form-control"
                                placeholder="Course Code"
                                onChange={this.handleOnChange}
                            />
                        </MDBCol>
                    </MDBRow>

                    <MDBRow style={{ paddingTop: "20px" }}>
                        <MDBCol sm="4">Course Title: </MDBCol>
                        <MDBCol sm="8">
                            <input
                                value={this.state.courseTitle}
                                name="courseTitle"
                                type="text"
                                className="form-control"
                                placeholder="Course Title"
                                onChange={this.handleOnChange}
                            />
                        </MDBCol>
                    </MDBRow>

                    <MDBRow style={{ paddingTop: "20px" }}>
                        <MDBCol sm="4">Course Description: </MDBCol>
                        <MDBCol sm="8">
                            <textarea
                                value={this.state.courseDescription}
                                name="courseDescription"
                                type="text"
                                className="form-control"
                                placeholder="Course Description"
                                onChange={this.handleOnChange}
                                rows={8}
                            />
                        </MDBCol>
                    </MDBRow>

                    {/**TODO: dropdown of available categories that they can create  */}
                    <MDBRow style={{ paddingTop: "20px" }}>
                        <MDBCol sm="4">Category: </MDBCol>
                        <MDBCol sm="8">
                            <select value={this.state.category} onChange={this.handleSelectCategory} className="browser-default custom-select">
                                <option>Choose a category</option>
                                {this.state.categories && this.state.categories.map(
                                    (category, index) => <option key={index} value={category}>{category}</option>)
                                }
                            </select>

                        </MDBCol>
                    </MDBRow>

                    <MDBRow style={{ paddingTop: "20px" }}>
                        <MDBCol sm="4">Price: </MDBCol>
                        <MDBCol sm="8">
                            <input
                                value={this.state.price}
                                name="price"
                                type="number"
                                pattern="[0-9]*"
                                inputMode="numeric"
                                className="form-control"
                                placeholder="Price"
                                onChange={this.handleOnChange}
                            />
                        </MDBCol>
                    </MDBRow>

                    <MDBRow style={{ paddingTop: "20px" }}>
                        <MDBCol sm="4">Start Date: </MDBCol>
                        <MDBCol sm="8">
                            <input
                                value={this.state.startDate}
                                name="startDate"
                                type="date"
                                className="form-control"
                                placeholder="Start Date"
                                onChange={this.handleOnChange}
                            />
                        </MDBCol>
                    </MDBRow>

                    <MDBRow style={{ paddingTop: "20px" }}>
                        {this.outline()}
                    </MDBRow>
                </MDBContainer>
            </SectionContainer>
        )
    }

    onDrop = (uploadedFile) => {
        console.log(uploadedFile)
        this.setState({ uploadedFile: uploadedFile });
    }

    uploadFileOnChange = () => {
        console.log("file on change")
    }

    addSection = event => {
        this.setState(prevState => ({ outline: [...prevState.outline, ''] }))
    }

    handleChange = (index, event) => {
        let outline = [...this.state.outline];
        outline[index] = event.target.value;
        this.setState({ outline });
        console.log(this.state.outline)
    }

    removeSection = index => {
        let outline = [...this.state.outline];
        outline.splice(index, 1);
        this.setState({ outline });
    }

    createUI = () => {
        return this.state.outline.map((outline, index) =>
            <div key={index}>
                <input type="text" value={outline || ''} onChange={this.handleChange.bind(this, index)} />
                <input type='button' value='remove' onClick={() => this.removeSection(index)} />
            </div>
        )
    }


    outline = () => {
        return (
            <div>
                {this.createUI()}
                <MDBBtn onClick={this.addSection}>Add</MDBBtn>
            </div>
        )
    }


    handleSubmit = (e) => { e.preventDefault() }

    getStepContent = step => {
        switch (step) {
            case 0:
                return this.courseInformation()
            case 1:
                return /* this.courseStructure() */ "Upload videos"
            case 2:
                return 'Create quiz';
            case 3:
                return 'Arrange videos and quiz';
            default:
                return 'Unknown step';
        }
    }

    handleStepperNext = event => {
        this.setState({ activeStep: this.state.activeStep + 1 })
        if (this.state.activeStep === this.state.steps.length - 1) {
            console.log("create")
            //TODO: send in userid. this is the last step
            axios.post(`${API}/coursepack`, {
                courseCode: this.state.courseCode,
                courseTitle: this.state.courseTitle,
                courseDescription: this.state.courseDescription,
                category: this.state.category,
                startDate: this.state.startDate,
            })
                .then(result => {
                    console.log(result.data)
                    //TODO: go to teacher's dashboard
                })
                .catch(error => {
                    this.setState({ status: "error" })
                    console.error("error in axios " + error);
                });
        }
    }

    handleBack = event => {
        this.setState({ activeStep: this.state.activeStep - 1 })
    }

    stepper = () => {
        return (
            <div style={{ width: '90%' }}>
                <Stepper activeStep={this.state.activeStep}>
                    {this.state.steps.map((label, index) => {
                        return (
                            <Step key={label} >
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        )
                    })}
                </Stepper>
                <div>
                    {this.state.activeStep === this.state.steps.length ? (
                        <div>
                            {/*TODO: redirect to dashboard*/}
                            <Typography>
                                Course created!
                            </Typography>
                        </div>

                    ) : (
                            <div>
                                {this.getStepContent(this.state.activeStep)}
                                <MDBBtn color="primary">
                                    <NavLink to="/coursepack/coursesDashboard" style={{ color: 'white' }}> Cancel</NavLink>
                                </MDBBtn>
                                <MDBBtn disabled={this.state.activeStep === 0} onClick={this.handleBack}>
                                    Back
                                    </MDBBtn>
                                <MDBBtn onClick={this.handleStepperNext}>
                                    {this.state.activeStep === this.state.steps.length - 1 ? 'Create Course' : 'Next'}
                                </MDBBtn>
                            </div>
                        )}
                </div>
            </div>
        )
    }

    render() {
        return (
            <MDBContainer className="mt-5">
                <h3><b>Create Course</b></h3>
                <hr />
                <br />
                {this.stepper()}

            </MDBContainer>
        );
    }
}
export default CoursePackCreate
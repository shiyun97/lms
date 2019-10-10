import React, { Component } from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from "mdbreact";
import SectionContainer from "../../components/sectionContainer";
import axios from "axios";

const API = "http://localhost:3001"

class CoursePackCreate extends Component {

    state = {
        userId: "",
        courseCode: "",
        courseTitle: "",
        courseDescription: "",
        category: "",
        startDate: "",
        endDate: "",
        price: "",
        categories: ""
    }

    componentDidMount() {
        let userId = localStorage.getItem("userId")
        this.setState({userId: userId})
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

    //userid
    createCoursepack = event => {
        axios.post(`${API}/coursepack`, {
            courseCode: this.state.courseCode,
            courseTitle: this.state.courseTitle,
            courseDescription: this.state.courseDescription,
            category: this.state.category,
            startDate: this.state.startDate,
            endDate: this.state.endDate
        })
            .then(result => {
                console.log(result.data)
            })
            .catch(error => {
                this.setState({ status: "error" })
                console.error("error in axios " + error);
            });
    }

    cancel = event => {
        this.props.history.go(-1)
    }

    form = () => {
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
                            <input
                                value={this.state.courseDescription}
                                name="courseDescription"
                                type="text"
                                className="form-control"
                                placeholder="Course Description"
                                onChange={this.handleOnChange}
                            />
                        </MDBCol>
                    </MDBRow>

                    {/**FIXME: dropdown of available categories that they can create  */}
                    <MDBRow style={{ paddingTop: "20px" }}>
                        <MDBCol sm="4">Category: </MDBCol>
                        <MDBCol sm="8">
                        <select value={this.state.category} onChange={this.handleSelectCategory} className="browser-default custom-select">
                                <option>Choose your option</option>
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
                        <MDBCol sm="4">End Date: </MDBCol>
                        <MDBCol sm="8">
                            <input
                                value={this.state.endDate}
                                name="endDate"
                                type="date"
                                className="form-control"
                                placeholder="End Date"
                                onChange={this.handleOnChange}
                            />
                        </MDBCol>
                    </MDBRow>

                    <MDBCol align="right">
                        <MDBBtn color="primary" onClick={this.createCoursepack}>Create</MDBBtn>
                        <MDBBtn color="primary" onClick={this.cancel}>Cancel</MDBBtn>
                    </MDBCol>


                </MDBContainer>
            </SectionContainer>
        )


    }

    render() {
        return (
            <MDBContainer className="mt-5">
                <h3><b>Create Course</b></h3>
                <hr />
                <br />
                {this.form()}

            </MDBContainer>
        );
    }
}


export default CoursePackCreate
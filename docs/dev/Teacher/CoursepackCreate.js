import React, { Component } from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon } from "mdbreact";
import SectionContainer from "../../components/sectionContainer";
import axios from "axios";
import { NavLink } from 'react-router-dom'
import Dropzone from 'react-dropzone';

const API = "http://localhost:3001"

class CoursePackCreate extends Component {

    state = {
        userId: "",
        courseCode: "",
        courseTitle: "",
        courseDescription: "",
        category: "",
        startDate: "",
        price: "",
        categories: "",
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
                    {this.outline()}
                </MDBContainer>
            </SectionContainer>
        )
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

    outline = () => {
        return (
            <div>
                {this.state.outline.map((outline, index) => {
                    return (
                        <MDBRow style={{ paddingTop: "20px" }} key={index}>
                            <MDBCol size="4">Section {index + 1}:</MDBCol>
                            <MDBCol size="8">
                                <input
                                    value={outline}
                                    name="outline"
                                    type="text"
                                    className="form-control"
                                    placeholder="Eg. Introduction"
                                    onChange={this.handleChange.bind(this, index)} />
                                <input type='button' value='remove' onClick={() => this.removeSection(index)} />
                            </MDBCol>
                        </MDBRow>
                    )
                })}
                <MDBBtn onClick={this.addSection}> Add Section</MDBBtn>
            </div>
        )
    }

    handleCreate = event => {
        const { courseCode, courseTitle, courseDescription, category, startDate, price, outline } = this.state
        console.log("create coursepack")
        axios.post(`${API}/category`, {
            courseCode: courseCode,
            courseTitle: courseTitle,
            courseDescription: courseDescription,
            category: category,
            startDate: startDate,
            price: price,
            outline: outline
        })
            .then(result => {
                alert("created")
                console.log(this.state.categories)
            })
            .catch(error => {
                console.error("error in axios " + error);
            });
    }

    render() {
        return (
            <MDBContainer className="mt-5" >
                <h3><b>Create Course</b></h3>
                <hr />
                <br />
                {this.form()}

                <NavLink to="/coursepack/dashboard" style={{ color: 'white' }}>
                    <MDBBtn color="primary"> Cancel </MDBBtn>
                </NavLink>
                <MDBBtn onClick={this.handleCreate}>Create</MDBBtn>
            </MDBContainer>
        );
    }
}
export default CoursePackCreate
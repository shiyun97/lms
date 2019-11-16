import React, { Component } from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from "mdbreact";
import SectionContainer from "../../components/sectionContainer";
import axios from "axios";
import { NavLink } from 'react-router-dom'

const API_MOCK = "http://localhost:3001"
const API = "http://localhost:8080/LMS-war/webresources/"

class CoursepackCreatePage extends Component {

    state = {
        userId: "",
        courseCode: "",
        courseTitle: "",
        courseDescription: "",
        imageLocation: "",
        retrievedCategories: [],
        categories: ["Computer Science", "Information System", "Information Security", "Business Management", "Engineering"],
        startDate: "",
        price: "",
        category: "",
        categoryId: ""
    }

    componentDidMount() {
        let userId = sessionStorage.getItem("userId")
        this.setState({ userId: userId })

        // get all categories
        axios.get(`${API}Coursepack/getAllCategories`)
            .then(result => {
                this.setState({ retrievedCategories: result.data.categories })
                console.log(result.data)
            })
            .catch(error => {
                console.error("error in axios " + error);
            });
    }

    handleOnChange = event => {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleSelectCategory = event => {
        this.setState({ categoryId: event.target.value }, () => event);
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
                                required
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
                                required
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
                                required
                                onChange={this.handleOnChange}
                                rows={8}
                            />
                        </MDBCol>
                    </MDBRow>

                    <MDBRow style={{ paddingTop: "20px" }}>
                        <MDBCol sm="4">Category: </MDBCol>
                        <MDBCol sm="8">
                            <select value={this.state.categoryId} onChange={this.handleSelectCategory} className="browser-default custom-select" required>
                                <option>Choose a category</option>
                                {this.state.retrievedCategories && this.state.retrievedCategories.map(
                                    (category, index) => <option key={index} value={category.categoryId}>{category.name}</option>)
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
                                required
                                placeholder="Price"
                                onChange={this.handleOnChange}
                            />
                        </MDBCol>
                    </MDBRow>

                    <MDBRow style={{ paddingTop: "20px" }}>
                        <MDBCol sm="4">Cover Image Weblink: </MDBCol>
                        <MDBCol sm="8">
                            <input
                                value={this.state.imageLocation}
                                name="imageLocation"
                                type="text"
                                className="form-control"
                                required
                                placeholder="Image weblink"
                                onChange={this.handleOnChange}
                            />
                        </MDBCol>
                    </MDBRow>

                </MDBContainer>
            </SectionContainer>
        )
    }

    handleCreate = event => {
        const { courseCode, courseTitle, courseDescription, categoryId, imageLocation, price, userId } = this.state
        console.log(userId)
        axios.put(`${API}Coursepack/createCoursepack?userId=${userId}`, {
            code: courseCode,
            title: courseTitle,
            description: courseDescription,
            categoryId: categoryId,
            imageLocation: imageLocation,
            price: price
        })
            .then(result => {
                this.props.history.go(-1)
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

                <NavLink to="/coursepack/myCourses" style={{ color: 'white' }}>
                    <MDBBtn color="blue-grey"> Cancel </MDBBtn>
                </NavLink>
                <MDBBtn color="deep-orange" onClick={this.handleCreate}>Create</MDBBtn>
            </MDBContainer>
        );
    }
}
export default CoursepackCreatePage
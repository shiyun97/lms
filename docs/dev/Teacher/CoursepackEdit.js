import React, { Component } from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from "mdbreact";
import SectionContainer from "../../components/sectionContainer";
import axios from "axios";
import CoursepackSideNavigation from '../CoursepackSideNavigation';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, ExpansionPanel, ExpansionPanelSummary, Typography, ExpansionPanelDetails } from "@material-ui/core";

const API_MOCK = "http://localhost:3001"
const API = "http://localhost:8080/LMS-war/webresources/"

class CoursePackEdit extends Component {

    state = {
        coursepackId: "",
        courseCode: "",
        courseTitle: "",
        courseDescription: "",
        category: "",
        price: "",
        categories: "",
        disabled: true,
        editSave: "Edit",
        open: false,
        publish: false
    }

    componentDidMount() {
        /* let userId = localStorage.getItem("userId") */
        /*         this.setState({ userId: userId })
         */
        /*         let coursepackId = this.props.match.params.coursepackId;
         */
        /*         this.setState({ coursepackId: coursepackId })
         */

        let coursepackId = 18 //TODO: remove
        this.setState({ coursepackId: coursepackId })
        axios.get(`${API_MOCK}/category`) //FIXME:
            .then(result => {
                this.setState({ categories: result.data })
                console.log(this.state.categories)
            })
            .catch(error => {
                console.error("error in axios " + error);
            });

        // axios.get(`${API}Coursepack/getCoursepack/${coursepackId}`)
        axios.get(`${API}Coursepack/getCoursepack/${coursepackId}`)
            .then(result => {
                this.setState({
                    courseCode: result.data.code,
                    courseTitle: result.data.title,
                    courseDescription: result.data.description,
                    /* category: result.data.category, */
                    price: result.data.price,
                })
            })
            .catch(error => {
                console.error("error in axios " + error);
            });
    }

    handleClickOpen = event => {
        this.setState({ open: true })
    }

    handleClose = event => {
        this.setState({ open: false })
    }

    deleteCourse = event => {
        this.setState({ open: false })
        axios.delete(`${API}Coursepack/deleteCoursepack?coursepackId=${this.state.coursepackId}`)
            .then(result => {
                alert("deleted")
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

    editSave = event => {
        this.setState({ disabled: false, editSave: "Save" })
        if (this.state.editSave === "Save") {
            this.setState({ disabled: true })
            const { courseCode, courseTitle, courseDescription, category, price } = this.state
            axios.post(`${API}Coursepack/updateCoursepack?coursepackId=${this.state.coursepackId}`, {
                code: courseCode,
                title: courseTitle,
                description: courseDescription,
                category: category,
                price: price
            })
                .then(result => {
                    alert("updated")
                })
                .catch(error => {
                    alert(error)
                    console.error("error in axios " + error);
                });
        }
    }

    publish = event => {
        const { courseCode, courseTitle, courseDescription, category, price } = this.state
        axios.post(`${API}Coursepack/updateCoursepack?coursepackId=${this.state.coursepackId}`, {
            code: courseCode,
            title: courseTitle,
            description: courseDescription,
            category: category,
            price: price,
            published: true,
        })
            .then(result => {
                alert("published")
            })
            .catch(error => {
                alert(error)
                console.error("error in axios " + error);
            });
    }

    form = () => {
        return (
            <SectionContainer>
                <MDBContainer>
                    <MDBRow>
                        <MDBCol sm="4">Course Code: </MDBCol>
                        <MDBCol sm="8">
                            <input
                                defaultValue={this.state.courseCode}
                                name="courseCode"
                                type="text"
                                className="form-control"
                                placeholder="Course Code"
                                onChange={this.handleOnChange}
                                disabled={this.state.disabled}
                            />
                        </MDBCol>
                    </MDBRow>

                    <MDBRow style={{ paddingTop: "20px" }}>
                        <MDBCol sm="4">Course Title: </MDBCol>
                        <MDBCol sm="8">
                            <input
                                defaultValue={this.state.courseTitle}
                                name="courseTitle"
                                type="text"
                                className="form-control"
                                placeholder="Course Title"
                                onChange={this.handleOnChange}
                                disabled={this.state.disabled}
                            />
                        </MDBCol>
                    </MDBRow>

                    <MDBRow style={{ paddingTop: "20px" }}>
                        <MDBCol sm="4">Course Description: </MDBCol>
                        <MDBCol sm="8">
                            <textarea
                                defaultValue={this.state.courseDescription}
                                name="courseDescription"
                                type="text"
                                className="form-control"
                                placeholder="Course Description"
                                onChange={this.handleOnChange}
                                rows={8}
                                disabled={this.state.disabled}
                            />
                        </MDBCol>
                    </MDBRow>

                    {/**TODO: dropdown of available categories that they can create  */}
                    <MDBRow style={{ paddingTop: "20px" }}>
                        <MDBCol sm="4">Category: </MDBCol>
                        <MDBCol sm="8">
                            <select defaultValue={this.state.category} onChange={this.handleSelectCategory} className="browser-default custom-select" disabled={this.state.disabled}>
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
                                defaultValue={this.state.price}
                                name="price"
                                type="number"
                                pattern="[0-9]*"
                                inputMode="numeric"
                                className="form-control"
                                placeholder="Price"
                                onChange={this.handleOnChange}
                                disabled={this.state.disabled}
                            />
                        </MDBCol>
                    </MDBRow>

                    {/* this.outline() */}
                </MDBContainer>
            </SectionContainer>
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
            <div className="module-content">
                <CoursepackSideNavigation /* coursepackId={this.props.coursepackId} */ />

                <MDBContainer className="mt-5" >
                    <h3><b>Edit Coursepack</b></h3>
                    <hr />
                    <br />
                    {this.form()}

                    <MDBCol align="right">
                        <MDBBtn onClick={this.publish} color="primary" variant="contained" >Publish</MDBBtn>
                        <MDBBtn onClick={this.editSave} color="primary" variant="contained" >{this.state.editSave}</MDBBtn>
                        <MDBBtn color="danger" onClick={this.handleClickOpen}>Delete Course</MDBBtn>
                        <Dialog open={this.state.open} onClose={this.handleClickOpen}>
                            <DialogTitle>Delete Course</DialogTitle>
                            <DialogContent>
                                Are you sure to delete <b>{/* this.state.courseDetails.courseTitle */}</b> ? <br />
                                <p style={{ color: "red" }}>This action CANNOT be reverted.</p>
                            </DialogContent>
                            <DialogActions>
                                <MDBBtn onClick={this.handleClose} color="primary">Cancel</MDBBtn>
                                <MDBBtn color="danger" onClick={this.deleteCourse}>Delete</MDBBtn>
                            </DialogActions>
                        </Dialog>
                    </MDBCol>
                </MDBContainer>
            </div >
        );
    }
}
export default CoursePackEdit
import React, { Component } from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon } from "mdbreact";
import SectionContainer from "../../components/sectionContainer";
import axios from "axios";
import { NavLink } from 'react-router-dom'
import Dropzone from 'react-dropzone';
import CoursepackSideNavigation from '../CoursepackSideNavigation';

const API = "http://localhost:3001"

class CoursePackEdit extends Component {

    state = {
        coursepackId: "",
        courseCode: "",
        courseTitle: "",
        courseDescription: "",
        category: "",
        startDate: "",
        price: "",
        categories: "",
        outline: [],
        disabled: true,
        editSave: "Edit",
    }

    componentDidMount() {
        /* let userId = localStorage.getItem("userId") */
        /*         this.setState({ userId: userId })
         */
        /*         let coursepackId = this.props.match.params.coursepackId;
         */
        /*         this.setState({ coursepackId: coursepackId })
         */
        axios.get(`${API}/category`)
            .then(result => {
                this.setState({ categories: result.data })
                console.log(this.state.categories)
            })
            .catch(error => {
                console.error("error in axios " + error);
            });


        axios.get(`${API}/coursepack/1`) //FIXME:change id
            .then(result => {
                this.setState({
                    courseCode: result.data.courseCode,
                    courseTitle: result.data.courseTitle,
                    courseDescription: result.data.courseDescription,
                    category: result.data.category,
                    startDate: result.data.startDate,
                    price: result.data.price,
                    outline: result.data.outline
                })
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
    //TODO: Delete
    delete = event => {
        var index = this.state.index
        /*         axios.delete(`${API}ModuleMounting/deleteModule?moduleId=${index}`)
                    .then(result => {
                        this.props.history.go(-1)
                        alert("Deleted");
                    })
                    .catch(error => {
                        console.error("error in axios " + error);
                    }) */
    }

    editSave = event => {
        this.setState({ disabled: false, editSave: "Save" })
        const { index } = this.state
        if (this.state.editSave === "Save") {
            this.setState({ disabled: true })
            const { code, title, semesterOffered, yearOffered, creditUnit, hasExam, examFullDateTime, examVenue, faculty, department, maxEnrollment, assignedTeacher, lectureDay } = this.state
            /* axios.post(`${API}ModuleMounting/updateModule?moduleId=${index}&userId=2`, {
                code: code,
                title: title,
                semesterOffered: semesterOffered,
                yearOffered: yearOffered,
                creditUnit: creditUnit,
                hasExam: hasExam,
                examFullDateTime: examFullDateTime,
                examVenue: examVenue,
                faculty: faculty,
                department: department,
                maxEnrollment: maxEnrollment,
                assignedTeacher: assignedTeacher,
                lectureDay: lectureDay
            })
                .then(result => {
                    window.location.reload()
                    this.props.history.go(-1)
                })
                .catch(error => {
                    alert(error)
                    console.error("error in axios " + error);
                }); */
        }
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
                                value={this.state.courseCode}
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
                                value={this.state.courseTitle}
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
                                value={this.state.courseDescription}
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
                            <select value={this.state.category} onChange={this.handleSelectCategory} className="browser-default custom-select" disabled={this.state.disabled}>
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
                                value={this.state.price}
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

                    <MDBRow style={{ paddingTop: "20px" }}>
                        <MDBCol sm="4">Start Date: </MDBCol>
                        <MDBCol sm="8">
                            <input
                                defaultValue={this.state.startDate}
                                name="startDate"
                                type="date"
                                className="form-control"
                                placeholder="Start Date"
                                onChange={this.handleOnChange}
                                disabled={this.state.disabled}
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
                                    defaultValue={outline}
                                    name="outline"
                                    type="text"
                                    className="form-control"
                                    placeholder="Eg. Introduction"
                                    onChange={this.handleChange.bind(this, index)}
                                    disabled={this.state.disabled}
                                />
                                <input type='button' disabled={this.state.disabled} value='remove' onClick={() => this.removeSection(index)} />
                            </MDBCol>
                        </MDBRow>
                    )
                })}
                <MDBBtn onClick={this.addSection}>Add Section</MDBBtn>
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
            <div className="module-content">
                <CoursepackSideNavigation /* coursepackId={this.props.coursepackId} */ />

                <MDBContainer className="mt-5" >
                    <h3><b>Edit Coursepack</b></h3>
                    <hr />
                    <br />
                    {this.form()}

                    <MDBCol align="right">
                        <MDBBtn onClick={this.editSave} color="primary" variant="contained" >{this.state.editSave}</MDBBtn>
                        <MDBBtn onClick={this.delete} color="danger" variant="contained">Delete</MDBBtn>
                    </MDBCol>
                </MDBContainer>
            </div >
        );
    }
}
export default CoursePackEdit
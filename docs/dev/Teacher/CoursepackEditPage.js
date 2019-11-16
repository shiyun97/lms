import React, { Component } from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon } from "mdbreact";
import SectionContainer from "../../components/sectionContainer";
import axios from "axios";
import styled from 'styled-components';
import CoursepackSideNavigation from '../CoursepackSideNavigation';
import CoursepackSideNavigationDropdown from '../CoursepackSideNavigationDropdown';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, ExpansionPanel, ExpansionPanelSummary, Typography, ExpansionPanelDetails } from "@material-ui/core";
import { Snackbar } from '@material-ui/core';
import { observer, inject } from 'mobx-react';
import { NavLink } from 'react-router-dom';


const API = "http://localhost:8080/LMS-war/webresources/"
@inject('dataStore')
@observer
class CoursePackEditPage extends Component {

    state = {
        coursepackId: "",
        courseCode: "",
        courseTitle: "",
        courseDescription: "",
        imageLocation: "",
        retrievedCategories: [],
        categories: ["Computer Science", "Information System", "Information Security", "Business Management", "Engineering"],
        category: "",
        categoryId: "",
        price: "",
        disabled: true,
        editSave: "Edit",
        open: false,
        message: "",
        openSnackbar: false,
    }

    componentDidMount() {
        /* let userId = sessionStorage.getItem("userId") */
        /*         this.setState({ userId: userId })
         */
        let coursepackId = this.props.match.params.coursepackId;


        // axios.get(`${API}Coursepack/getCoursepack/${coursepackId}`)
        axios.get(`${API}Coursepack/getCoursepack/${coursepackId}`)
            .then(result => {
                this.setState({
                    courseCode: result.data.code,
                    courseTitle: result.data.title,
                    courseDescription: result.data.description,
                    categoryId: result.data.category.categoryId,
                    imageLocation: result.data.imageLocation,
                    price: result.data.price,
                })
            })
            .catch(error => {
                console.error("error in axios " + error);
            });

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

    handleClickOpen = event => {
        this.setState({ open: true })
    }

    handleClose = event => {
        this.setState({ open: false })
    }

    deleteCourse = event => {
        this.setState({ open: false })
        var pathname = location.pathname;
        pathname = pathname.split('/');
        let coursepackId = pathname[2];
        console.log(coursepackId)
        axios.delete(`${API}Coursepack/deleteCoursepack?coursepackId=${coursepackId}`)
            .then(result => {
                this.setState({ message: "Coursepack deleted.", openSnackbar: true })
                window.history.go(-2)
                console.log(this.state.categories)
            })
            .catch(error => {
                this.setState({ message: error.response, openSnackbar: true })
                console.error("error in axios " + error);
            });
    }

    handleOnChange = event => {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleSelectCategory = event => {
        this.setState({ categoryId: event.target.value }, () => event);
    }

    editSave = event => {
        this.setState({ open: false })
        var pathname = location.pathname;
        pathname = pathname.split('/');
        let coursepackId = pathname[2];
        console.log(coursepackId)
        this.setState({ disabled: false, editSave: "Save" })
        if (this.state.editSave === "Save") {
            this.setState({ disabled: true })
            const { courseCode, courseTitle, courseDescription, categoryId, imageLocation, price } = this.state
            axios.post(`${API}Coursepack/updateCoursepack?coursepackId=${coursepackId}`, {
                code: courseCode,
                title: courseTitle,
                description: courseDescription,
                categoryId: categoryId,
                imageLocation: imageLocation,
                price: price
            })
                .then(result => {
                    this.setState({ message: "Coursepack updated.", openSnackbar: true })
                    window.location.reload()
                })
                .catch(error => {
                    this.setState({ message: error.response, openSnackbar: true })
                    console.error("error in axios " + error);
                });
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
                        {console.log(this.state.courseDescription)}
                        <MDBCol sm="8">
                            <textarea
                                value={this.state.courseDescription}
                                name="courseDescription"
                                type="text"
                                className="form-control"
                                placeholder="Course Description"
                                onChange={this.handleOnChange}
                                row={8}
                                disabled={this.state.disabled}
                            >
                                {this.state.courseDescription}
                            </textarea>
                        </MDBCol>
                    </MDBRow>

                    <MDBRow style={{ paddingTop: "20px" }}>
                        <MDBCol sm="4">Category: </MDBCol>
                        <MDBCol sm="8">
                            <select value={this.state.categoryId}
                                onChange={this.handleSelectCategory}
                                className="browser-default custom-select"
                                disabled={this.state.disabled}
                            >
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
                this.setState({ message: "Coursepack created.", openSnackbar: true })
                this.props.history.go(-1)
                window.location.reload()
                console.log(this.state.categories)
            })
            .catch(error => {
                this.setState({ message: error.response, openSnackbar: true })
                console.error("error in axios " + error);
            });
    }

    render() {
        return (
            <div className={this.props.className}>
                {sessionStorage.getItem('accessRight') === 'Teacher' ?
                    <div>
                        <div className="module-sidebar-large"><CoursepackSideNavigation /></div>
                        <div className="module-navbar-small">
                            <CoursepackSideNavigationDropdown />
                        </div>
                    </div>
                : null}
            <div className="module-content">

                <MDBContainer className="mt-5" >
                    <h3><b>Edit Coursepack</b></h3>
                    <hr />
                    <br />
                    {this.form()}

                    <MDBCol align="right">
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
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.openSnackbar}
                    autoHideDuration={6000}
                    onClose={this.handleClose}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">{this.state.message}</span>}
                    action={[
                        <MDBIcon icon="times" color="white" onClick={this.handleClose} style={{ cursor: "pointer" }} />,
                    ]}
                />
            </div >
            </div>
        );
    }
}
export default styled(CoursePackEditPage)`
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
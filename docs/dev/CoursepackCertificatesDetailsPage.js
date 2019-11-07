import React, { Component } from "react";
import { MDBContainer, MDBIcon, MDBRow, MDBCol, MDBDataTable, MDBBtn, MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter } from "mdbreact";
import axios from "axios";
import { observer, inject } from 'mobx-react'
import CoursepackCertificatePdf from './CoursepackCertificatePdf'
const API = "http://localhost:8080/LMS-war/webresources/";

@inject('dataStore')
@observer
class CoursepackCertificatesDetailsPage extends Component {

    state = {
        listOfCoursepacks: [],
        message: "",
        openSnackbar: false, //TODO:
        modal: false,
        modalDelete: false,
        heading: "HTML Certificate Coursepacks"
    }

    componentDidMount() {
        this.initPage()
    }

    initPage() {
        /* let certId = this.props.params.match.certId */ //FIXME:

        //get created coursepack  
/*         axios.get(`${API}Coursepack/getAllCoursepack`) //FIXME:
            .then(result => {
                this.setState({ listOfCoursepacks: result.data.coursepack })
            })
            .catch(error => {
                this.setState({ message: error.response, openSnackbar: true })
                console.error("error in axios " + error);
            }); */
    }

    toggleModal = event => {
        this.setState({ modal: !this.state.modal })
    }

    toggleDelete = event => {
        this.setState({ modalDelete: !this.state.modal })
    }

    cancel = event => {
        this.setState({modalDelete: false})
    }

    showTable = () => {
        const data = {
            columns: [
                {
                    label: 'Coursepack Title',
                    field: 'coursepackTitle',
                    sort: 'asc',
                    width: 600
                },
                {
                    label: 'Code',
                    field: 'code',
                    width: 100
                },
                {
                    label: 'Category',
                    field: 'cateogry',
                    width: 100
                },
                {
                    label: 'Price',
                    field: 'price',
                    width: 100
                },
                {
                    label: 'Remove',
                    field: 'remove',
                    width: 100
                },
            ],
            rows:
                this.tableRows()
        }
        return (
            <div>
                <MDBDataTable
                    style={{ textAlign: "center", verticalAlign: "center" }}
                    striped
                    bordered
                    hover
                    data={data}
                    responsive
                    small
                />
            </div>
        )
    }

    tableRows = () => {
        let coursepacks = []
        let allCoursepacks = this.props.dataStore.getListOfCoursepacks
         console.log(allCoursepacks)
         allCoursepacks && allCoursepacks.map((coursepack, index) => {
            coursepacks.push({
                coursepackTitle: coursepack.title,
                code: coursepack.code,
                category: coursepack.category,
                price: coursepack.price,
                remove: this.showDeleteButton(),
                clickEvent: () => this.handleDeleteCoursepack(index) //TODO:

            })
        })
        return coursepacks
    }

    showDeleteButton = () => {
        return (
            <MDBIcon icon="trash-alt" />
        )
    }

    handleDeleteCoursepack = coursepackId => {
        /*         axios.delete(`${API}Coursepack/deleteLessonOrder?lessonOrderId=${lessonOrderId}`)
                .then(result => {
                    this.setState({
                        message: "Coursepack removed",
                        openSnackbar: true
                    })
                    this.initPage()
                })
                .catch(error => {
                    this.setState({
                        message: error.response,
                        openSnackbar: true
                    })
                    console.error("error in axios " + error);
                }); */
    }

    addCoursepack = event => {
        this.setState({ modal: false })

        /*         axios.put(`${API}Coursepack/createOutline?coursepackId=${this.state.coursepackId}&name=${this.state.outlineName}`)
                    .then(result => {
                        this.setState({ message: "New coursepack added", openSnackbar: true, modal: false })
                        this.initPage()
                    })
                    .catch(error => {
                        this.setState({ message: error.response, openSnackbar: true })
                        console.error("error in axios " + error);
                    }); */
    }

    removeCert = event => {

    }

    render() {
        return (
            <div style={{ paddingLeft: 150, paddingTop: 50, paddingRight: 50 }}>
                <MDBRow size="12" >
                    <MDBCol size="8">
                        <h2 className="font-weight-bold" style={{ paddingTop: 50 }}>
                            {this.state.heading}
                        </h2>
                    </MDBCol>
                    <MDBCol size="4" align="right" style={{ paddingTop: 40, paddingRight: 30 }}>
                        <MDBBtn color="primary" onClick={this.toggleModal}>Add Coursepack</MDBBtn>
                        <MDBModal isOpen={this.state.modal} toggle={this.toggleModal}>
                            <MDBModalHeader toggle={this.toggleModal}>Add Coursepack</MDBModalHeader>
                            <MDBModalBody>
                                <MDBRow>
                                    <MDBCol sm="4">Select Coursepack: </MDBCol>
                                    <MDBCol sm="8">
                                        <select onChange={this.handleSelectedCoursepack} className="browser-default custom-select">
                                            <option>Choose a coursepack</option>
                                            {this.state.listOfCoursepacks && this.state.listOfCoursepacks.map(
                                                (coursepack, index) => <option key={index} value={coursepack.coursepackId}>{coursepack.title}</option>)
                                            }
                                        </select>
                                    </MDBCol>
                                </MDBRow>
                            </MDBModalBody>
                            <MDBModalFooter>
                                <MDBBtn color="secondary" onClick={this.addCoursepack}>Add</MDBBtn>
                            </MDBModalFooter>
                        </MDBModal>
                    </MDBCol>
                </MDBRow>
                <hr />
                {this.showTable()}
                <MDBCol align="right">
                    <MDBBtn color="danger" onClick={this.toggleDelete}>Delete Certificate</MDBBtn>
                    <MDBModal isOpen={this.state.modalDelete} toggle={this.toggleDelete}>
                        <MDBModalHeader toggle={this.toggleDelete}>Add Coursepack</MDBModalHeader>
                        <MDBModalBody>
                            <MDBCol align="center">
                                <b>Confirm deletion? This action cannot be reverted.</b>
                            </MDBCol>
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn color="primary" onClick={this.cancel}>Cancel</MDBBtn>
                            <MDBBtn color="danger" onClick={this.removeCert}>Remove</MDBBtn>
                        </MDBModalFooter>
                    </MDBModal>
                </MDBCol>
                <CoursepackCertificatePdf 
                heading={this.state.heading} 
                firstName={sessionStorage.getItem("firstName")}
                lastName = {sessionStorage.getItem("lastName")}
                />

            </div>
        )
    }
}

export default CoursepackCertificatesDetailsPage
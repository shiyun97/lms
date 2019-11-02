import React, { Component } from "react";
import { MDBContainer, MDBIcon, MDBRow, MDBCol, MDBDataTable, MDBBtn, MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter } from "mdbreact";
import axios from "axios";

const API = "http://localhost:8080/LMS-war/webresources/";

class CoursepackCertificatesDetailsPage extends Component {

    state = {
        listOfCoursepacks: [],
        message: "",
        openSnackbar: false, //TODO:
        modal: false,

    }

    componentDidMount() {
        this.initPage()
    }

    initPage() {
        /* let certId = this.props.params.match.certId */ //FIXME:
        let certId = 1

        //get created coursepack quiz 
        axios.get(`${API}Coursepack/getAllCoursepack`) //FIXME:
            .then(result => {
                this.setState({ listOfCoursepacks: result.data.coursepack })
            })
            .catch(error => {
                this.setState({ message: error.response, openSnackbar: true })
                console.error("error in axios " + error);
            });
    }

    toggleModal = event => {
        console.log("open")
        this.setState({ modal: !this.state.modal })
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
        this.state.listOfCoursepacks && this.state.listOfCoursepacks.map((coursepack, index) => {
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

    render() {
        return (
            <div style={{ paddingLeft: 150, paddingTop: 50, paddingRight: 50 }}>
                <MDBRow size="12" >
                    <MDBCol size="8">
                        <h2 className="font-weight-bold" style={{ paddingTop: 50 }}>
                            HTML Certificate Coursepacks
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

            </div>
        )
    }
}

export default CoursepackCertificatesDetailsPage
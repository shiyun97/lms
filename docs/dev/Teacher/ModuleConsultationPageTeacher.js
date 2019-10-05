import React, { Component } from "react";
import styled from 'styled-components';
import { MDBRow, MDBCol, MDBDataTable, MDBBtn, MDBCard, MDBCardBody, MDBModal, MDBModalBody, MDBModalFooter, MDBModalHeader, MDBIcon } from "mdbreact";
import axios from 'axios';
import { TextField, Snackbar } from '@material-ui/core';
import { observer, inject } from 'mobx-react';
import moment from 'moment';

@inject('dataStore')
@observer
class ModuleConsultationPageTeacher extends Component {

    state = {
        modal1: false,
        date: "",
        status: "retrieving",
        startTime: "",
        endTime: "",
        booker: false,
        columns: [
            {
                label: "Consultation Id",
                field: "consultationId",
                width: 150,
            },
            {
                label: "Date",
                field: "date",
                width: 150,
                attributes: {
                    "aria-controls": "DataTable",
                    "aria-label": "Name"
                }
            },
            {
                label: "Start Time",
                field: "startTime",
                width: 270
            },
            {
                label: "End Time",
                field: "endTime",
                width: 270
            },
            {
                label: "Booker",
                field: "booker",
                width: 200
            },
            {
                label: "",
                field: "button",
                width: 200
            }
        ],
        rows: [],
        openSnackbar: false,
        message: ""
    }

    getAllConsultations = () => {
        const moduleId = this.props.dataStore.getCurrModId;
        const userId = this.props.dataStore.getUserId;
        // console.log(moduleId);
        axios
            // .get("http://localhost:3001/allConsultations")
            .get(`http://localhost:8080/LMS-war/webresources/Consultation/viewAllConsultationslot?moduleId=${moduleId}&userId=${userId}`)
            .then(result => {
                // console.log(result.data.consultationTimeslots)
                this.setState({ status: "done", rows: result.data.consultationTimeslots })
            })
            .catch(error => {
                this.setState({ status: "error" })
                console.error("error in axios " + error);
            });
    }

    handleOpenSnackbar = () => {
        this.setState({ openSnackbar: true });
    };

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ openSnackbar: false });
    };

    componentDidMount() {
        this.getAllConsultations();
    }

    componentDidUpdate() {
        if (this.state.status === "recallConsultations")
            this.getAllConsultations();
    }

    toggle = (nr) => {
        let modalNumber = "modal" + nr;
        this.setState({
            [modalNumber]: !this.state[modalNumber]
        });
    };

    createConsultationSlot = () => {
        const moduleId = this.props.dataStore.getCurrModId;
        const userId = this.props.dataStore.getUserId;
        const newDate = moment(this.state.date).format('DD-MM-YYYY')
        this.toggle(1);
        axios
            // .post(`http://localhost:3001/allConsultations`, {
            .put(`http://localhost:8080/LMS-war/webresources/Consultation/createConsultation?userId=${userId}&moduleId=${moduleId}`, {
                "startDate": newDate,
                "startTime": this.state.startTime + ":00",
                "endTime": this.state.endTime + ":00"
            })
            .then(result => {
                // console.log(result.data)
                this.setState({ status: "recallConsultations", message: "Successfully created consultation!", openSnackbar: true })
                // console.log("creation successful")
            })
            .catch(error => {
                this.setState({ status: "error" })
                console.error("error in axios " + error);
            });
    }

    deleteConsultationSlot = (consultationId) => {
        const moduleId = this.props.dataStore.getCurrModId;
        const userId = this.props.dataStore.getUserId;
        axios
            .delete(`http://localhost:8080/LMS-war/webresources/Consultation/deleteConsultation?consultationId=${consultationId}&userId=${userId}&moduleId=${moduleId}`)
            // .delete(`http://localhost:3001/allConsultations/${consultationId}`)
            .then(result => {
                // console.log(result.data)
                this.setState({ status: "recallConsultations", message: "Successfully deleted consultation!", openSnackbar: true })
                // console.log("deletion successful")
            })
            .catch(error => {
                this.setState({ status: "error" })
                console.error("error in axios " + error);
            });
    }

    handleChange = event => {
        event.preventDefault();
        this.setState({ [event.target.name]: event.target.value });
        // console.log(event.target.value)
    }

    renderCreateConsultationModalBox = () => {
        return (
            <MDBModal isOpen={this.state.modal1} toggle={() => this.toggle(1)}>
                <MDBModalHeader
                    className="text-center"
                    titleClass="w-100 font-weight-bold"
                    toggle={() => this.toggle(1)}
                >
                    Create Consultation
                        </MDBModalHeader>
                <MDBModalBody>
                    <form className="mx-3 grey-text">
                        <MDBRow>
                            <MDBCol md="12" className="mt-4">
                                <TextField
                                    id="date"
                                    label="Date"
                                    type="date"
                                    name="date"
                                    value={this.state.date}
                                    onChange={this.handleChange}
                                    fullWidth
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </MDBCol>
                            <MDBCol md="6" className="mt-4">
                                <TextField
                                    id="time"
                                    label="Start Time"
                                    type="time"
                                    name="startTime"
                                    value={this.state.startTime}
                                    onChange={this.handleChange}
                                    fullWidth
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </MDBCol>
                            <MDBCol md="6" className="mt-4">
                                <TextField
                                    id="time"
                                    label="End Time"
                                    type="time"
                                    name="endTime"
                                    value={this.state.endTime}
                                    onChange={this.handleChange}
                                    fullWidth
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </MDBCol>
                            <br />
                        </MDBRow>
                    </form>
                </MDBModalBody>
                <MDBModalFooter className="justify-content-center">
                    <MDBRow>
                        <MDBCol md="6">
                            <MDBBtn onClick={() => this.toggle(1)} color="grey">Cancel</MDBBtn>
                        </MDBCol>
                        <MDBCol md="6">
                            <MDBBtn onClick={() => this.createConsultationSlot()} color="primary">Create</MDBBtn>
                        </MDBCol>
                    </MDBRow>
                </MDBModalFooter>
            </MDBModal>
        )
    }

    render() {
        var newRows = []
        const row = this.state.rows
        // console.log(row[0])
        for (let i = 0; i < row.length; i++) {
            newRows.push({
                consultationId: row[i].consultationTsId,
                date: row[i].startD,
                startTime: row[i].startTs,
                endTime: row[i].endTs,
                // date: "",
                // startTime: "",
                // endTime: "",
                booker: row[i].booker === undefined ? "-" : row[i].booker,
                button: <MDBBtn size="small" onClick={() => this.deleteConsultationSlot(row[i].consultationTsId)} color="primary">Delete</MDBBtn>
            })
        }
        const data = { columns: this.state.columns, rows: newRows }
        const widerData = {
            columns: [...data.columns.map(col => {
                col.width = 200;
                return col;
            })], rows: [...data.rows]
        }
        return (
            <>
                <MDBRow style={{ paddingTop: 60 }}>
                    <MDBCol md="8">
                        <h2 className="font-weight-bold">
                            Consultation Slots
  </h2>
                    </MDBCol>
                    <MDBCol md="4" align="right">
                        <MDBBtn onClick={() => this.toggle(1)} color="primary">Create Consultation Slot</MDBBtn>
                    </MDBCol>
                    {this.renderCreateConsultationModalBox()}
                </MDBRow>
                <MDBRow className="py-3">
                    <MDBCol md="12">
                        <MDBCard>
                            <MDBCardBody>
                                <MDBDataTable striped bordered hover scrollX scrollY maxHeight="400px" data={widerData} pagesAmount={4} />
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
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
            </>
        );
    }
}

export default styled(ModuleConsultationPageTeacher)`
.module-content{
    margin-left: 270px;
    margin-top: 40px;
}
`;

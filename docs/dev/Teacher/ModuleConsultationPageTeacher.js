import React, { Component } from "react";
import styled from 'styled-components';
import { MDBRow, MDBCol, MDBDataTable, MDBBtn, MDBCard, MDBCardBody, MDBModal, MDBModalBody, MDBModalFooter, MDBModalHeader } from "mdbreact";
import axios from 'axios';
import { TextField } from '@material-ui/core';

class ModuleConsultationPageTeacher extends Component {

    state = {
        modal1: false,
        date: "",
        startTime: "",
        endTime: "",
        studentId: "",
        booked: false,
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
                label: "Student Id",
                field: "studentId",
                width: 200
            },
            {
                label: "",
                field: "button",
                width: 200
            }
        ],
        rows: [],
        message: ""
    }

    componentDidMount() {
        axios
            .get("http://localhost:3001/allConsultations")
            .then(result => {
                // console.log(result.data)
                this.setState({ message: "done", rows: result.data })
            })
            .catch(error => {
                this.setState({ message: "error" })
                console.error("error in axios " + error);
            });
    }

    toggle = (nr, row) => {
        let modalNumber = "modal" + nr;
        this.setState({
            [modalNumber]: !this.state[modalNumber]
        });

        if (row !== undefined) {
            this.updateUserState(row);
        }
    };

    createConsultationSlot = () => {
        axios
            .post(`http://localhost:3001/allConsultations`, {
                "date": this.state.date,
                "startTime": this.state.startTime,
                "endTime": this.state.endTime,
                "studentId": 0
            })
            .then(result => {
                // console.log(result.data)
                this.setState({ message: "done" })
                console.log("creation successful")
            })
            .catch(error => {
                this.setState({ message: "error" })
                console.error("error in axios " + error);
            });
    }

    deleteConsultationSlot = (consultationId) => {
        axios
            .delete(`http://localhost:3001/allConsultations/${consultationId}`)
            .then(result => {
                // console.log(result.data)
                this.setState({ message: "done" })
                console.log("deletion successful")
            })
            .catch(error => {
                this.setState({ message: "error" })
                console.error("error in axios " + error);
            });
    }

    handleChange = event => {
        event.preventDefault();
        this.setState({ [event.target.name]: event.target.value });
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
        for (let i = 0; i < row.length; i++) {
            newRows.push({
                consultationId: row[i].id,
                date: row[i].date,
                startTime: row[i].startTime,
                endTime: row[i].endTime,
                studentId: row[i].studentId === 0 ? "-" : row[i].studentId,
                button: <MDBBtn size="small" onClick={() => this.deleteConsultationSlot(row[i].id)} color="primary">Delete</MDBBtn>
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

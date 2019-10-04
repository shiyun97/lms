import React, { Component } from "react";
import styled from 'styled-components';
import { MDBRow, MDBCol, MDBDataTable, MDBBtn, MDBCard, MDBCardBody } from "mdbreact";
import axios from 'axios';
import { observer, inject } from 'mobx-react'

@inject('dataStore')
@observer
class ModuleConsultationPageStudent extends Component {

    state = {
        date: "",
        startTime: "",
        endTime: "",
        studentId: "",
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

    bookConsultationSlot = (row) => {
        axios
            .put(`http://localhost:3001/allConsultations/${row.id}`, {
                studentId: this.props.dataStore.getUserId,
                date: row.date,
                startTime: row.startTime,
                endTime: row.endTime
            })
            .then(result => {
                // console.log(result.data)
                this.setState({ message: "done" })
                console.log("update successful")
            })
            .catch(error => {
                this.setState({ message: "error" })
                console.error("error in axios " + error);
            });
    }

    removeConsultationSlot = (row) => {
        axios
            .put(`http://localhost:3001/allConsultations/${row.id}`, {
                studentId: 0,
                date: row.date,
                startTime: row.startTime,
                endTime: row.endTime
            })
            .then(result => {
                // console.log(result.data)
                this.setState({ message: "done" })
                console.log("remove successful")
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

    render() {
        var newRows = []
        const row = this.state.rows
        for (let i = 0; i < row.length; i++) {
            if (row[i].studentId === 0 || row[i].studentId == this.props.dataStore.getUserId) {
                newRows.push({
                    consultationId: row[i].id,
                    date: row[i].date,
                    startTime: row[i].startTime,
                    endTime: row[i].endTime,
                    button: row[i].studentId === 0 ?
                        <MDBBtn size="small" onClick={() => this.bookConsultationSlot(row[i])} color="primary">Book Slot</MDBBtn>
                        : <MDBBtn size="small" onClick={() => this.removeConsultationSlot(row[i])} color="primary">Remove Slot</MDBBtn>
                })
            }
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
                    <MDBCol md="12">
                        <h2 className="font-weight-bold">
                            Consultation Slots
  </h2>
                    </MDBCol>
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

export default styled(ModuleConsultationPageStudent)`
.module-content{
    margin-left: 270px;
    margin-top: 40px;
}
`;

import React, { Component } from "react";
import { MDBContainer, MDBModal, MDBModalHeader, MDBRow, MDBModalBody, MDBModalFooter, MDBCol, MDBBtn } from "mdbreact";
import axios from "axios";
import { observer, inject } from 'mobx-react'

@inject('dataStore')
@observer
class MarkAttendanceStudent extends Component {

    state = {
        count: 0
    }

    test = event => {
        alert("form submitted")
        this.props.dataStore.setTest(1)
        event.preventDefault()

    }

    markAttendance = () => {
        return (
            <MDBContainer align="center">
                <form onSubmit={this.test}>
                    <button type='submit'>test</button>
                </form>
                {this.showCount()}
            </MDBContainer>
        )
    }

    showCount = () => {
        return this.props.dataStore.getTest
    }

    render() {
        return (
            <div>
                login
                {this.markAttendance()}
            </div>
        )
    }
}

export default MarkAttendanceStudent
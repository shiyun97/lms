import React, { Component } from 'react';
import CoursepackSideNavigation from '../CoursepackSideNavigation';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon, MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter } from "mdbreact";
import axios from "axios";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, ExpansionPanel, ExpansionPanelSummary, Typography, ExpansionPanelDetails } from "@material-ui/core";


const API = "http://localhost:3001"

class CoursepackArrangements extends Component {

    state = {
        modal: false,
        outlineName: "",
        outline: ["Introduction", "OOP", "Summary"]
    }

    componentDidMount() {

        axios.get(`${API}/coursepack/1`) //FIXME:change id
            .then(result => {
                this.setState({
                    courseCode: result.data.courseCode,
                    courseTitle: result.data.courseTitle,
                    courseDescription: result.data.courseDescription,
                    category: result.data.category,
                    startDate: result.data.startDate,
                    price: result.data.price,
                })
            })
            .catch(error => {
                console.error("error in axios " + error);
            });
    }


    toggle = event => {
        this.setState({ modal: !this.state.modal })
    }

    addOutline = event => {
        //TODO: add outline
        this.setState({ modal: false })
        this.setState(prevState => ({
            outline: [...prevState.outline, this.state.outlineName]
        }))
    }

    handleOnChange = event => {
        this.setState({ [event.target.name]: event.target.value })
    }

    moveUp = event => {
        console.log("move section up")
    }

    moveDown = event => {
        console.log("move section down")
    }

    editOutlineName = event => {
        console.log("edit outline name")
    }

    showOutline = () => {
        console.log(this.state.outline)
        return (
            <MDBContainer>
                {this.state.outline && this.state.outline.map((outline, index) => {
                    return (
                        <ExpansionPanel key={index}>
                            <ExpansionPanelSummary
                                expandIcon={<MDBIcon icon="angle-down" />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography >{outline} <MDBIcon icon="edit" onClick={this.editOutlineName} /></Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <MDBRow>
                                    <MDBCol size="6">
                                        <MDBBtn>Add Video</MDBBtn><MDBBtn>Add Quiz</MDBBtn>
                                    </MDBCol>
                                    <MDBCol size="6" align="right">
                                        <MDBIcon icon="angle-double-up" size="2x" onClick={this.moveUp} />
                                        <MDBIcon icon="angle-double-down" size="2x" onClick={this.moveDown} />
                                    </MDBCol>
                                </MDBRow>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    )
                })
                }
            </MDBContainer >
        )
    }



    render() {
        console.log(this.props.match.params.coursepackId)

        return (
            <div className="module-content">
                <CoursepackSideNavigation /* coursepackId={this.props.match.params.coursepackId} */ />
                <MDBContainer className="mt-5" >
                    <h4>Outlines</h4> <hr />
                    <MDBCol align="right">
                        <MDBBtn onClick={this.toggle}>
                            Add Outline
                        </MDBBtn>
                    </MDBCol>
                    <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
                        <MDBModalHeader toggle={this.toggle}>Add Outline</MDBModalHeader>
                        <MDBModalBody>
                            <MDBRow>
                                <MDBCol sm="4">Outline Name: </MDBCol>
                                <MDBCol sm="8">
                                    <input
                                        value={this.state.outlineName}
                                        name="outlineName"
                                        type="text"
                                        className="form-control"
                                        placeholder="Eg. Introduction"
                                        onChange={this.handleOnChange}
                                    />
                                </MDBCol>
                            </MDBRow>
                        </MDBModalBody>

                        <MDBModalFooter>
                            <MDBBtn color="secondary" onClick={this.addOutline}>Add</MDBBtn>
                        </MDBModalFooter>
                    </MDBModal>

                    {this.showOutline()}



                </MDBContainer>
            </div>
        )
    }
}

export default CoursepackArrangements;
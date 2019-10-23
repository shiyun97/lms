import React, { Component } from 'react';
import CoursepackSideNavigation from '../CoursepackSideNavigation';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon, MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter } from "mdbreact";
import axios from "axios";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, ExpansionPanel, ExpansionPanelSummary, Typography, ExpansionPanelDetails } from "@material-ui/core";

const API_MOCK = "http://localhost:3001"
const API = "http://localhost:8080/LMS-war/webresources/"

class CoursepackArrangements extends Component {

    state = {
        modalAddOutline: false,
        modalEditOutline: false,
        outlineName: "",
        edittedOutlineName: "",
        modalAddVideo: "",
        lessonOrder: ['video1', 'video2', 'quiz1'],
        coursepackId: "",
        courseOutline: ""
    }

    componentDidMount() {

/*         let coursepackId = this.props.params.coursepackId
 */        let coursepackId = 18
        this.setState({ coursepackId: coursepackId })

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

        axios.get(`${API}Coursepack/getCoursepack/${coursepackId}`) //TODO: remove
            .then(result => {
                this.setState({ courseOutline: result.data.outlineList })
            })
            .catch(error => {
                console.error("error in axios " + error);
            });
    }

    toggleAddOutline = event => {
        this.setState({ modalAddOutline: !this.state.modalAddOutline })
    }

    toggleEditOutlineName = name => {
        this.setState({ modalEditOutline: !this.state.modalEditOutline })
    }

    toggleAddVideo = event => {
        this.setState({ modalAddVideo: !this.state.modalAddVideo })
    }

    addOutline = event => {
        this.setState({ modalAddOutline: false })

        axios.put(`${API}Coursepack/createOutline?coursepackId=${this.state.coursepackId}&name=${this.state.outlineName}`) //FIXME:change id
            .then(result => {
                window.location.reload()
            })
            .catch(error => {
                console.error("error in axios " + error);
            });
    }

    handleOnChangeEditted = event => {

        this.setState({ edittedOutlineName: event.target.value })
    }

    handleOnChange = event => {
        this.setState({ [event.target.name]: event.target.value })
    }

    /*  swap = (prevPos, newPos) => {
         this.setState({outline[prevPos]: })
         this.state.outline[prevPos] = this.state.outline.splice(newPos, 1, this.state.outline[prevPos])[0]
     } */

    moveUp = event => {
        console.log("move section up")
    }

    moveDown = event => {
        console.log("move section down")
    }

    editOutlineName = event => {
        console.log("edit outline name")
    }

    saveEditOutlineName = event => {
        this.setState({ modalAddOutline: false })
        //*TODO: post to backend
    }

    displayUploaded = () => {
        //map function of the lesson order
        //     <MDBCol align="right" size="4"> {/**can only move up if its not the first. can only move down if it is not the last*/}
        //     <MDBIcon icon="arrow-up" size="2x" onClick={this.moveUp} style={{ paddingRight: 8 }} />
        //     <MDBIcon icon="arrow-down" size="2x" onClick={this.moveDown} />
        // </MDBCol>
        return (
            this.state.lessonOrder && this.state.lessonOrder.map((order, index) => {
                return (
                    <div>
                        <MDBCol align="center" key={index}>
                            {order}
                            <MDBIcon icon="arrow-up" onClick={this.moveUp} style={{ paddingRight: 8 }} />
                            <MDBIcon icon="arrow-down" onClick={this.moveDown} />
                        </MDBCol>
                    </div>
                )
            }))
    }

    modelEdit = (index) => {
        return (
            <MDBModal isOpen={this.state.modalEditOutline} toggle={this.toggleEditOutlineName}>
                <MDBModalHeader toggle={this.toggleEditOutlineName}>Edit</MDBModalHeader>
                <MDBModalBody>
                    <MDBRow>
                        <MDBCol sm="4">Outline Name: </MDBCol>
                        <MDBCol sm="8">
                            <input
                                defaultValue={index}
                                name="edittedOutlineName"
                                type="text"
                                className="form-control"
                                placeholder="Eg. Introduction"
                                onChange={this.handleOnChangeEditted}
                            />
                        </MDBCol>
                    </MDBRow>
                </MDBModalBody>

                <MDBModalFooter>
                    <MDBBtn color="secondary" onClick={this.saveEditOutlineName}>Save</MDBBtn>
                </MDBModalFooter>
            </MDBModal>
        )
    }

    deleteOutline = outlineId => {
        axios.delete(`${API}Coursepack/deleteOutline?outlineId=${outlineId}`)
            .then(result => {
                alert("deleted")
                window.location.reload()
            })
            .catch(error => {
                console.error("error in axios " + error);
            });
    }


    showOutline = () => {
        console.log(this.state.outline)
        return (
            <MDBContainer>
                {this.state.courseOutline && this.state.courseOutline.map((outline, index) => {
                    return (
                        <ExpansionPanel key={index}>
                            <ExpansionPanelSummary
                                expandIcon={<MDBIcon icon="angle-down" />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                key={index}
                            >
                                <Typography key={index}>
                                    {outline.name}
                                    <MDBIcon icon="edit" onClick={() => this.toggleEditOutlineName(outline.name)} />
                                </Typography>
                                {this.modelEdit(index)}
                            </ExpansionPanelSummary>

                            <ExpansionPanelDetails>
                                <MDBContainer>
                                    <MDBRow>
                                        <h6>show uploaded videos and quiz</h6><hr />
                                        {/* this.displayUploaded() */}
                                    </MDBRow>
                                    <MDBRow>
                                        <MDBCol align="left" size="4">
                                            <MDBIcon icon="arrow-up" onClick={this.moveUp} style={{ paddingRight: 8 }} />
                                            <MDBIcon icon="arrow-down" onClick={this.moveDown} />
                                        </MDBCol>
                                        <MDBCol align="right" size="4">
                                            <MDBBtn onClick={this.toggleAddVideo} >Add Video</MDBBtn>
                                            <MDBModal isOpen={this.state.modalAddVideo} toggle={this.toggleAddVideo}>
                                                <MDBModalHeader toggle={this.toggleAddVideo}>
                                                    Add Video
                                                </MDBModalHeader>
                                                <MDBModalBody>
                                                    <MDBRow>
                                                        insert multimedia upload code
                                                    </MDBRow>
                                                </MDBModalBody>

                                                <MDBModalFooter>
                                                    <MDBBtn>save</MDBBtn>
                                                </MDBModalFooter>
                                            </MDBModal>
                                            <MDBBtn>Add Quiz</MDBBtn>
                                        </MDBCol>
                                        <MDBCol align="right" size="4">
                                            <MDBBtn color="danger" onClick={() => this.deleteOutline(outline.outlineId)}>Delete</MDBBtn>
                                        </MDBCol>
                                    </MDBRow>
                                </MDBContainer>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    )
                })
                }
            </MDBContainer >
        )
    }

    editOutlineName = event => {

    }



    render() {
        console.log(this.props.match.params.coursepackId)

        return (
            <div className="module-content">
                <CoursepackSideNavigation /* coursepackId={this.props.match.params.coursepackId} */ />
                <MDBContainer className="mt-5" >
                    <h4>Outlines</h4> <hr />
                    <MDBCol align="right">
                        <MDBBtn onClick={this.toggleAddOutline}>
                            Add Outline
                        </MDBBtn>
                    </MDBCol>
                    <MDBModal isOpen={this.state.modalAddOutline} toggle={this.toggleAddOutline}>
                        <MDBModalHeader toggle={this.toggleAddOutline}>Add Outline</MDBModalHeader>
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
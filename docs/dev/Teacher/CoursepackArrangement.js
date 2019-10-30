import React, { Component } from 'react';
import CoursepackSideNavigation from '../CoursepackSideNavigation';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon, MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter } from "mdbreact";
import axios from "axios";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, ExpansionPanel, ExpansionPanelSummary, Typography, ExpansionPanelDetails } from "@material-ui/core";
import SectionContainer from '../../components/sectionContainer';
import { Snackbar } from '@material-ui/core';

const API_MOCK = "http://localhost:3001"
const API = "http://localhost:8080/LMS-war/webresources/"

class CoursepackArrangements extends Component {

    state = {
        modalAddOutline: false,
        modalEditOutline: false,
        outlineName: "",
        edittedOutlineName: "",
        modalAddVideo: "",
        coursepackId: "",
        courseOutline: "",
        selectedVideo: "",
        selectedQuiz: "",
        selectedType: "",
        listOfOutlineId: "",
        listOfLessonOrderId: "",
        courseDetails: "",
        lessonOrder: "",
        changeExpand: "",
        currentName: "",
        currentId: "",
        message: "",
        openSnackbar: false,
        quizzes: "",
        videos: ""
    }

    componentDidMount() {
        let coursepackId = this.props.match.params.coursepackId;
        this.setState({ coursepackId: coursepackId })

        axios.get(`${API}Coursepack/getCoursepack/${coursepackId}`)
            .then(result => {
                this.setState({
                    courseOutline: result.data.outlineList.sort((a, b) => (a.number - b.number)),
                    listOfOutlineId: this.getListOfOutlineId(result.data.outlineList),
                })
            })
            .catch(error => {
                this.setState({ message: error.response, openSnackbar: true })
                console.error("error in axios " + error);
            });

        //get uploaded coursepack multimedia
        axios.get(`${API}file/retrieveAllMultimediaForCoursepack?coursepackId=${coursepackId}`)
            .then(result => {
                this.setState({ videos: result.data.files })
            })
            .catch(error => {
                this.setState({ message: error.response, openSnackbar: true })
                console.error("error in axios " + error);
            });

        //get created coursepack quiz 
        axios.get(`${API}Assessment/retrieveAllCoursepackQuiz/${coursepackId}?userId=${sessionStorage.getItem('userId')}`)
        .then(result => {
            this.setState({ quizzes: result.data.quizzes })
            console.log(result.data.quizzes)
        })
        .catch(error => {
            this.setState({ message: error.response, openSnackbar: true })
            console.error("error in axios " + error);
        });

    }

    getListOfOutlineId = (outlines) => {
        var list = []
        if (outlines.length !== 0) {
            for (var i = 0; i < outlines.length; i++) {
                list.push(outlines[i].outlineId)
            }
            return list
        }
    }

    getListOfLessonOrderId = (lessonOrder) => {
        var list = []
        if (lessonOrder.length !== 0) {
            for (var i = 0; i < lessonOrder.length; i++) {
                list.push(lessonOrder[i].lessonOrderId)
            }
            return list
        }
    }

    getLessonOrder = outlineId => {
        axios.get(`${API}Coursepack/getLessonOrderByOutlineId/${outlineId}`)
            .then(result => {
                this.setState({
                    lessonOrder: result.data.lessonOrder.sort((a, b) => (a.number - b.number)),
                    listOfLessonOrderId: this.getListOfLessonOrderId(result.data.lessonOrder),
                })
            })
            .catch(error => {
                this.setState({ message: error.response, openSnackbar: true })
                console.error("error in axios " + error);
            });
    }

    toggleAddOutline = event => {
        this.setState({ modalAddOutline: !this.state.modalAddOutline })
    }

    toggleEditOutlineName = (name, outlineId) => {
        this.setState({
            modalEditOutline: !this.state.modalEditOutline,
            currentName: name,
            currentId: outlineId
        })
    }

    toggleAddVideo = event => {
        this.setState({ modalAddVideo: !this.state.modalAddVideo })
    }

    addOutline = event => {
        this.setState({ modalAddOutline: false })

        axios.put(`${API}Coursepack/createOutline?coursepackId=${this.state.coursepackId}&name=${this.state.outlineName}`)
            .then(result => {
                this.setState({ message: "New outline added", openSnackbar: true })
                window.location.reload()
            })
            .catch(error => {
                this.setState({ message: error.response, openSnackbar: true })
                console.error("error in axios " + error);
            });
    }

    handleOnChangeEditted = event => {
        this.setState({ edittedOutlineName: event.target.value })
    }

    handleOnChange = event => {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleSelectType = event => {
        event.preventDefault();
        this.setState({ selectedType: event.target.value }, () => event);
    }

    handleSelectedVideos = event => {
        this.setState({ selectedVideo: event.target.value }, () => event);
    }

    handleSelectedQuiz = event => {
        this.setState({ selectedQuiz: event.target.value }, () => event)
        console.log(event.target.value)
    }

    handleSaveSelected = outlineId => {
        if (this.state.selectedType === "Video") {
            axios.put(`${API}Coursepack/createLessonOrder?outlineId=${outlineId}&type=file&id=${this.state.selectedVideo}`)
                .then(result => {
                    this.setState({
                        message: `Lesson created in ${outlineId} with video id ${this.state.selectedVideo} added`,
                        openSnackbar: true
                    })
                    window.location.reload()
                })
                .catch(error => {
                    this.setState({ message: error.response, openSnackbar: true })
                    console.error("error in axios " + error);
                });
        } else if (this.state.selectedType === "Quiz") {

            axios.put(`${API}Coursepack/createLessonOrder?outlineId=${outlineId}&type=quiz&id=${this.state.selectedQuiz}`)
                .then(result => {
                    this.setState({
                        message: `Lesson created in ${outlineId} with quiz id ${this.state.selectedQuiz} added`,
                        openSnackbar: true
                    })
                    window.location.reload()
                })
                .catch(error => {
                    this.setState({ message: error.response, openSnackbar: true })
                    console.error("error in axios " + error);
                });
        } else {
            return "Please select an option"
        }
    }

    moveUpOutline = currentOutlineId => { //TODO: check if first/last
        var currentIndex = this.state.listOfOutlineId.indexOf(currentOutlineId)
        var previousOutlineId = this.state.listOfOutlineId[currentIndex - 1]

        axios.post(`${API}Coursepack/swapOutline?outlineId1=${currentOutlineId}&outlineId2=${previousOutlineId}`)
            .then(result => {
                this.setState({
                    message: "Outline swapped with previous",
                    openSnackbar: true
                })
                window.location.reload()
            })
            .catch(error => {
                console.error("error in axios " + error);
            });
    }


    moveDownOutline = currentOutlineId => {
        var currentIndex = this.state.listOfOutlineId.indexOf(currentOutlineId)
        var nextOutlineId = this.state.listOfOutlineId[currentIndex + 1]

        axios.post(`${API}Coursepack/swapOutline?outlineId1=${currentOutlineId}&outlineId2=${nextOutlineId}`)
            .then(result => {
                window.location.reload()
                this.setState({
                    message: "Outline swapped with next",
                    openSnackbar: true
                })
            })
            .catch(error => {
                console.error("error in axios " + error);
            });
    }


    moveUpLessonOrder = currentOutlineId => { //TODO: check if first/last
        var currentIndex = this.state.listOfLessonOrderId.indexOf(currentOutlineId)
        var previousOutlineId = this.state.listOfLessonOrderId[currentIndex - 1]

        axios.post(`${API}Coursepack/swapLessonOrder?lessonOrderId1=${currentOutlineId}&lessonOrderId2=${previousOutlineId}`)
            .then(result => {
                window.location.reload()
                this.setState({
                    message: "Lesson swapped with previous",
                    openSnackbar: true
                })
            })
            .catch(error => {
                console.error("error in axios " + error);
                console.log(error.response)
            });
    }

    moveDownLessonOrder = currentOutlineId => {
        var currentIndex = this.state.listOfLessonOrderId.indexOf(currentOutlineId)
        var nextOutlineId = this.state.listOfLessonOrderId[currentIndex + 1]

        axios.post(`${API}Coursepack/swapLessonOrder?lessonOrderId1=${currentOutlineId}&lessonOrderId2=${nextOutlineId}`)
            .then(result => {
                window.location.reload()
                this.setState({
                    message: "Lesson swapped with next",
                    openSnackbar: true
                })
            })
            .catch(error => {
                console.error("error in axios " + error);
            });
    }

    displayUploaded = () => {
        var order = []
        this.state.lessonOrder && this.state.lessonOrder.map((lessons, index) => {
            order.push(lessons.file || lessons.quiz)
        })
        order = order.filter(Boolean)
        if (order.length !== 0) {

            return (
                this.state.lessonOrder && this.state.lessonOrder.map((lessons, index) => {
                    return (
                        <MDBCol key={index} size="12">
                            <SectionContainer>
                                <MDBCol size="8" >
                                    {order[index].title}
                                    {order[index].name}
                                </MDBCol>
                                <MDBCol align="right">
                                    <MDBIcon onClick={() => this.deleteLessonOrder(lessons.lessonOrderId)} icon="trash-alt" sty={{ paddingLeft: 10, paddingRight: 10 }} />
                                    <MDBIcon icon="arrow-up" onClick={() => this.moveUpLessonOrder(lessons.lessonOrderId)} style={{ paddingLeft: 10, paddingRight: 10 }} />
                                    <MDBIcon icon="arrow-down" onClick={() => this.moveDownLessonOrder(lessons.lessonOrderId)} />
                                </MDBCol>
                            </SectionContainer>
                        </MDBCol>
                    )
                })

            )
        } else {
            return "No lesson uploaded"
        }
    }

    deleteLessonOrder = lessonOrderId => {
        axios.delete(`${API}Coursepack/deleteLessonOrder?lessonOrderId=${lessonOrderId}`)
            .then(result => {
                this.setState({
                    message: "Lesson deleted",
                    openSnackbar: true
                })
                window.location.reload()
            })
            .catch(error => {
                this.setState({
                    message: error.response,
                    openSnackbar: true
                })
                console.error("error in axios " + error);
            });
    }

    displayOptionsFromSelected = (outlineId) => {
        if (this.state.selectedType === "Video") {
            return (
                <div>
                    <MDBRow style={{ paddingTop: "20px" }}>
                        <MDBCol sm="4">Video: </MDBCol>
                        <MDBCol sm="8">
                            <select onChange={this.handleSelectedVideos} className="browser-default custom-select">
                                <option>Choose your option</option>
                                {this.state.videos && this.state.videos.map(
                                    (video, index) => <option key={index} value={video.fileId}>{video.name}</option>)
                                }
                            </select>
                        </MDBCol>
                    </MDBRow>

                    <MDBRow style={{ paddingTop: "20px" }}>
                        <MDBCol align="center">
                            <MDBBtn color="primary" onClick={() => this.handleSaveSelected(outlineId)}>
                                Save
                  </MDBBtn>
                        </MDBCol>
                    </MDBRow>
                </div>
            )
        } else if (this.state.selectedType === "Quiz") {
            return (
                <div>
                    <MDBRow style={{ paddingTop: "20px" }}>
                        <MDBCol sm="4">Quiz: </MDBCol>
                        <MDBCol sm="8">
                            <select onChange={this.handleSelectedQuiz} className="browser-default custom-select">
                                <option>Choose an option</option>
                                {this.state.quizzes && this.state.quizzes.map(
                                    (quiz, index) => <option key={index} value={quiz.quizId}>{quiz.title}</option>)
                                }
                            </select>
                        </MDBCol>
                    </MDBRow>

                    <MDBRow style={{ paddingTop: "20px" }}>
                        <MDBCol align="center">
                            <MDBBtn color="primary" onClick={() => this.handleSaveSelected(outlineId)}>
                                Save
                    </MDBBtn>
                        </MDBCol>
                    </MDBRow>
                </div>
            );
        } else {
            return null;
        }
    }

    updateOutline = event => {
        event.preventDefault()
        console.log(this.state.currentId)
        console.log(this.state.edittedOutlineName)
        axios.post(`${API}Coursepack/updateOutline?outlineId=${this.state.currentId}&name=${this.state.edittedOutlineName}`)
            .then(result => {
                this.setState({
                    message: "Outline updated",
                    openSnackbar: true
                })
                window.location.reload()
            })
            .catch(error => {
                this.setState({
                    message: error.response,
                    openSnackbar: true
                })
                console.error("error in axios " + error);
            });
    }

    modelEdit = () => {
        return (
            <MDBModal isOpen={this.state.modalEditOutline} toggle={this.toggleEditOutlineName}>
                <MDBModalHeader toggle={this.toggleEditOutlineName}>Edit</MDBModalHeader>
                <MDBModalBody>
                    <MDBRow>
                        <MDBCol sm="4">Outline Name: </MDBCol>
                        <MDBCol sm="8">
                            <input
                                defaultValue={this.state.currentName}
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
                    <MDBBtn color="secondary" onClick={this.updateOutline}>Save</MDBBtn>
                </MDBModalFooter>
            </MDBModal>
        )
    }

    deleteOutline = outlineId => {
        axios.delete(`${API}Coursepack/deleteOutline?outlineId=${outlineId}`)
            .then(result => {
                this.setState({
                    message: "Outline deleted",
                    openSnackbar: true
                })
                window.location.reload()
            })
            .catch(error => {
                this.setState({
                    message: error.response,
                    openSnackbar: true
                })
                console.error("error in axios " + error);
            });
    }

    handleExpandChange = index => {
        this.setState({ changeExpand: index })
    }

    checkExpanded = (index) => {
        if (index === this.state.changeExpand) {
            return true
        }
        return false
    }

    showOutline = () => {
        return (
            <MDBContainer>
                {this.state.courseOutline && this.state.courseOutline.map((outline, index) => {

                    return (
                        <ExpansionPanel
                            key={index}
                            expanded={this.checkExpanded(index)}
                            onChange={() => this.handleExpandChange(index)}
                        >
                            <ExpansionPanelSummary
                                expandIcon={<MDBIcon icon="angle-down" />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                key={index}
                                onClick={() => this.getLessonOrder(outline.outlineId)}
                            >
                                <Typography key={index}>
                                    {outline.name}
                                    <MDBIcon icon="edit" onClick={() => this.toggleEditOutlineName(outline.name, outline.outlineId)} />
                                </Typography>
                                {this.modelEdit()}
                            </ExpansionPanelSummary>

                            <ExpansionPanelDetails>
                                <MDBContainer>
                                    <MDBRow>
                                        {this.displayUploaded()}
                                    </MDBRow>
                                    <MDBRow>
                                        <MDBCol align="right" size="12">
                                            <MDBIcon icon="arrow-up" onClick={() => this.moveUpOutline(outline.outlineId)} style={{ paddingRight: 8 }} />
                                            <MDBIcon icon="arrow-down" onClick={() => this.moveDownOutline(outline.outlineId)} />
                                            <MDBBtn onClick={this.toggleAddVideo} >Add Video/ Quiz</MDBBtn>
                                            <MDBModal isOpen={this.state.modalAddVideo} toggle={this.toggleAddVideo}>
                                                <MDBModalHeader toggle={this.toggleAddVideo}>
                                                    Add Video/ Quiz
                                                </MDBModalHeader>
                                                <MDBModalBody>
                                                    <MDBRow>
                                                        <MDBCol sm="4">Select Type: </MDBCol>
                                                        <MDBCol sm="8">
                                                            <select onChange={this.handleSelectType} className="browser-default custom-select">
                                                                <option>Choose video option</option>
                                                                <option value="Video">Video</option>
                                                                <option value="Quiz">Quiz</option>
                                                            </select>
                                                        </MDBCol>
                                                        <MDBCol>{this.displayOptionsFromSelected(outline.outlineId)}</MDBCol>
                                                    </MDBRow>
                                                </MDBModalBody>
                                            </MDBModal>
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
            </div>
        )
    }
}

export default CoursepackArrangements;
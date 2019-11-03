import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from "mdbreact";
import SectionContainer from "../components/sectionContainer";
import axios from "axios";
import { List, ListItem, ListItemText, ListSubheader } from '@material-ui/core/';
import ReactPlayer from 'react-player'
import CoursepackQuizPageAnswerQuiz from './Public/CoursepackQuizPageAnswerQuiz'
import Fullscreen from "react-full-screen";

const API = "http://localhost:8080/LMS-war/webresources/"
const FILE_SERVER = "http://127.0.0.1:8887/";

class CoursepackAssessmentPage extends Component {

    state = {
        coursepackDetails: "",
        outlineList: "",
        listOfLessonOrder: [],
        allMultimedia: [],
        currentLessonOrder: [],
        isFull: false,
    }

    componentDidMount() {
        let coursepackId = this.props.match.params.coursepackId
        this.setState({ coursepackId: coursepackId })
        console.log(coursepackId)

        axios.get(`${API}Coursepack/getCoursepack/${coursepackId}`)
            .then(result => {
                this.setState({
                    coursepackDetails: result.data,
                    outlineList: result.data.outlineList.sort((a, b) => (a.number - b.number)),
                    listOfLessonOrder: this.getLessonIds(result.data.outlineList.sort((a, b) => (a.number - b.number))),
                    currentLessonOrder: this.getLessonIds(result.data.outlineList.sort((a, b) => (a.number - b.number)))[0]
                })
            })
            .catch(error => {
                console.error("error in axios " + error);
            });

        //get all multimedia in this coursepack
        axios.get(`${API}file/retrieveAllMultimediaForCoursepack?coursepackId=${coursepackId}`)
            .then(result => {
                this.setState({
                    allMultimedia: result.data.files
                })
            })
            .catch(error => {
                console.error("error in axios " + error);
            });
    }

    getLessonIds = outlineList => {
        var list = []
        outlineList && outlineList.map((outline, index) => {
            outline.lessonOrder.sort((a, b) => (a.number - b.number)) && outline.lessonOrder.sort((a, b) => (a.number - b.number)).map((eachLessonOrder) => {
                list.push(eachLessonOrder)
            })
        })
        return list;
    }

    showVideoQuiz = () => {
        var location = ""
        var current = this.state.currentLessonOrder && this.state.currentLessonOrder.file ? this.state.currentLessonOrder.file.fileId : null
        if (current) { //video 
            return (
                this.state.allMultimedia && this.state.allMultimedia.map((eachMultimedia, index) => {
                    if (eachMultimedia.fileId === current) {
                        location = eachMultimedia.location
                        let savedFileName = location.split('/')[5]; //FIXME:
                        let fullPath = FILE_SERVER + savedFileName;
                        console.log(fullPath)
                        return (
                            <ReactPlayer url={fullPath} playing onEnded={this.ended} controls controlsList="nodownload" style={{ maxWidth: 550, maxHeight: 450 }} />
                        )
                    }
                }))
        } else { //quiz
            return (
                <div>
                    <Fullscreen
                        enabled={this.state.isFull}
                        onChange={isFull => this.setState({ isFull })}
                        style={{ backgroundColor: 'white' }}
                    >
                        <CoursepackQuizPageAnswerQuiz />
                    </Fullscreen>
                    <MDBCol align="right">
                        <MDBBtn onClick={this.goFull}>Full Screen</MDBBtn>
                    </MDBCol>
                </div>
            )

        }
    }

    goFull = event => {
        this.setState({ isFull: true });
    }

    ended = event => {
        var index = this.state.listOfLessonOrder.findIndex(x => x.lessonOrderId === this.state.currentLessonOrder.lessonOrderId);
        console.log(index)
        if (this.state.listOfLessonOrder.length !== index + 1) {
            this.setState({ currentLessonOrder: this.state.listOfLessonOrder[index + 1] })
        }
    }

    clickLessonOrder = lessonOrderId => {
        this.setState({ currentLessonOrder: lessonOrderId })
    }

    showOutline = () => {
        return (
            <SectionContainer style={{ height: 370 }}>
                <List style={{ width: "100%", maxWidth: 360, position: "relative", overflow: "auto", maxHeight: 400 }} subheader={<li />}>
                    {this.state.outlineList && this.state.outlineList.map((outline) => (
                        <li key={outline.outlineId} style={{ backgroundColor: 'inherit' }}>
                            <ul style={{ backgroundColor: 'inherit' }}>
                                <ListSubheader align="center">{outline.name}</ListSubheader>
                                {outline.lessonOrder.sort((a, b) => (a.number - b.number)) && outline.lessonOrder.sort((a, b) => (a.number - b.number)).map((lesson) => {
                                    if (lesson.file) {
                                        return (
                                            <ListItem selected={this.state.currentLessonOrder.lessonOrderId === lesson.lessonOrderId} onClick={() => this.clickLessonOrder(lesson)} key={lesson.lessonOrderId}>{lesson.file.name.slice(0, -4)}</ListItem>
                                        )
                                    } else {
                                        return (
                                            <ListItem selected={this.state.currentLessonOrder.lessonOrderId === lesson.lessonOrderId} onClick={() => this.clickLessonOrder(lesson)} key={lesson.lessonOrderId}>{lesson.quiz.title}</ListItem>
                                        )
                                    }
                                })}
                            </ul>
                        </li>
                    ))}
                </List>
            </SectionContainer>
        )
    }

    render() {
        return (
            <div >
                <div style={{ paddingLeft: 100, paddingTop: 30 }}>
                    <h3><b>{this.state.coursepackDetails.title}</b></h3>
                    <hr />
                </div>
                <div style={{ paddingLeft: 100, paddingRight: 50 }}>
                    <SectionContainer style={{ height: 400, }}>
                        <MDBRow>
                            <MDBCol size="8" align="center">
                                {this.showVideoQuiz()}
                            </MDBCol>
                            <MDBCol size="4">
                                {this.showOutline()}
                            </MDBCol>
                        </MDBRow>
                        <MDBRow>
                            <MDBCol size="12">
                                <h5><b>About this course</b></h5>
                                <hr />
                            </MDBCol>
                            <MDBCol>
                                {this.state.coursepackDetails.description}

                            </MDBCol>
                        </MDBRow>
                    </SectionContainer>
                </div>
            </div>
        )
    }
}

export default CoursepackAssessmentPage;
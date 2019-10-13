import React, { Component } from "react";
import styled from 'styled-components';
import { MDBContainer, MDBModal, MDBModalHeader, MDBRow, MDBModalBody, MDBModalFooter, MDBCol, MDBBtn } from "mdbreact";
import { Dialog, DialogTitle, DialogContent, DialogActions, AppBar, Tabs, Tab, Typography, Paper, InputLabel, Select } from '@material-ui/core';
import axios from "axios";
import SwipeableViews from 'react-swipeable-views';
import { Table } from 'semantic-ui-react'

const API = "http://localhost:8080/LMS-war/webresources/"

class ModuleAttendancePageStudent extends Component {

    state = {
        value: 0,
        lectureList: "",
        tutorialList: ""
    }

    componentDidMount() {
        this.initPage()
    }

    initPage() {
        let moduleId = this.props.moduleId;
        this.setState({ moduleId: moduleId })
        console.log(moduleId)

        //get all lectures
        axios.get(`${API}ModuleMounting/getModule/${moduleId}`)
            .then(result => {
                this.setState({ lectureList: result.data.lectureDetails })
            })
            .catch(error => {
                console.error("error in axios " + error);
            });

        //get all tutorials
        axios.get(`${API}ModuleMounting/getAllTutorialByModule?moduleId=${moduleId}`)
            .then(result => {
                this.setState({ tutorialList: result.data.tutorials })
            })
            .catch(error => {
                console.error("error in axios " + error);
            });

    }

    handleChange = (event, value) => {
        this.setState({ value });
    };

    handleChangeIndex = index => {
        this.setState({ value: index });
    };

    showAttendance = () => {
        return (
            <div>
                <AppBar position="static" color="default">
                    <Tabs
                        value={this.state.value}
                        onChange={this.handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="fullWidth"
                        aria-label="full width tabs example"
                    >
                        <Tab label="Lecture" />
                        <Tab label="Tutorial" />
                    </Tabs>
                </AppBar>
                <Paper>
                    <SwipeableViews
                        axis={"x-reverse"}
                        index={this.state.value}
                        onChangeIndex={this.handleChangeIndex}
                    >
                        <Typography component="div">{/* this.displayLectureSlots() */}</Typography>
                        <Typography component="div">{/* this.displayTutorialSlots() */}</Typography>
                    </SwipeableViews>
                </Paper>
            </div>
        )
    }

    render() {
        return (
            <MDBContainer>
                <MDBRow>
                    <MDBCol >
                        <h2 className="font-weight-bold"> Attendance </h2>
                    </MDBCol>
                </MDBRow>
                {this.showAttendance()}
            </MDBContainer>
        )
    }
}

export default styled(ModuleAttendancePageStudent)`
.module-content{
    margin - left: 270px;
    margin-top: 40px;
}
`;
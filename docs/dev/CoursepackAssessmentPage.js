import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon, MDBMedia } from "mdbreact";
import SectionContainer from "../components/sectionContainer";
import axios from "axios";
import { List, ListItem, ListItemText, ListSubheader } from '@material-ui/core/';
import { relative } from 'path';
import VideoThumbnail from 'react-video-thumbnail'; // use npm published version

const API = "http://localhost:3001";

class CoursepackAssessmentPage extends Component {

    state = {
        arrangment: "video1"
    }

    componentDidMount() {
        /* let coursepackId = this.props.coursepackId;
        this.setState({ coursepackId: coursepackId }) */
        axios.get(`${API}/coursepack/1`)
            .then(result => {
                this.setState({ outline: result.data.outline })
            })
            .catch(error => {
                console.error("error in axios " + error);
            });
    }

    handleClick = event => {
        console.log("event")
    }

    showOutline = () => {
        return (
            <SectionContainer>
                <List style={{ width: "100%", maxWidth: 360, position: "relative", overflow: "auto", maxHeight: 400 }} subheader={<li />}>
                    {this.state.outline && this.state.outline.map((outline, index) => (
                        <li key={index} style={{ backgroundColor: 'inherit' }}>
                            <ul style={{ backgroundColor: 'inherit' }}>
                                <ListSubheader>{outline}</ListSubheader>
                                {[0, 1, 2].map(item => (
                                    <ListItem onClick={this.handleClick} selected={false}>
                                        <ListItemText primary="test" />
                                    </ListItem>
                                ))}
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

                <MDBContainer className="mt-5" align="center">
                    coursepack title
                    <SectionContainer>
                        <MDBRow>
                            <MDBCol size="8" align="center">
                                 {/*    <video controls autostart autoPlay src={Night} type="video/mp4" style={{ maxHeight: 700, maxWidth: 700 }} /> */}

                            </MDBCol>
                            <MDBCol size="4">
                                {this.showOutline()}
                            </MDBCol>
                        </MDBRow>
                    </SectionContainer>

                </MDBContainer>
            </div>
        )
    }
}

export default CoursepackAssessmentPage;
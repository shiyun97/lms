import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon, MDBMedia } from "mdbreact";
import SectionContainer from "../components/sectionContainer";
import axios from "axios";
import { List, ListItem, ListItemText, ListSubheader } from '@material-ui/core/';
import { relative } from 'path';

const API = "http://localhost:3001";

class CoursepackView extends Component {

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
                            <MDBCol size="8">
                            <MDBMedia object src="https://mdbootstrap.com/img/Photos/Others/placeholder1.jpg" alt="" style={{width: "70%"}}/>
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

export default CoursepackView;
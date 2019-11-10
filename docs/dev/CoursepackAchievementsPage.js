import React, { Component } from "react";
import { NavLink, MDBListGroup, MDBListGroupItem, MDBContainer, MDBIcon, MDBDataTable, MDBRow, MDBBtn, MDBCol, MDBTabContent, MDBTabPane, MDBNav, MDBNavItem, MDBNavLink, MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter } from "mdbreact";
import { observer, inject } from 'mobx-react'
import Dropzone from 'react-dropzone';
import { Slide, Card, Dialog, DialogTitle, DialogContent, DialogContentText, ListItem, ListItemText, DialogActions, Button, List } from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import axios from "axios";

const API = "http://localhost:8080/LMS-war/webresources/";

@inject('dataStore')
@observer
class CoursepackAchievementsPage extends Component {

    state = {
        activeItem: "1",
        modalUploadMultimedia: false,
        showMultimediaDialog: false,
        uploadedMultimedia: [],
        badgeName: "",
        toggleCertModal: false,
        toggleEditBadgeModal: false,
        certificates: ["HTML", "CSS", "JAVA"], //TODO:
        badges: [{ title: 'Complete 5 courses', achieved: true }, { title: 'Complete 10 courses', achieved: false }, { title: 'Complete first course', achieved: false }]
    }

    componentDidMount() {
        this.initPage()
    }

    initPage() {

    }

    toggle = tab => e => {
        if (this.state.activeItem !== tab) {
            this.setState({
                activeItem: tab
            });
        }
    };


    disabled = (achieved) => {
        if (!achieved) {
            return "grey"
        }
    }



    showBadges = () => {
        return (

            <MDBRow style={{ paddingTop: 30 }}>
                {this.state.badges && this.state.badges.map((badge, index) => {
                    return (
                        <MDBCol size="3">
                            <MDBCol align="center" size="12">
                                <Card style={{ height: 120, color: this.disabled(badge.achieved) }} >
                                    {badge.title}
                                </Card>
                            </MDBCol>
                        </MDBCol>
                    )
                })}
            </MDBRow>
        )
    }

    showCertTable = () => {
        const data = {
            columns: [
                {
                    label: 'Certificate',
                    field: 'certificate',
                    sort: 'asc',
                    width: 600
                },
                {
                    label: 'View',
                    field: 'view',
                    width: 100
                },
            ],
            rows:
                this.tableRows()
        }
        return (
            <div>
                <MDBDataTable
                    style={{ textAlign: "center", verticalAlign: "center" }}
                    striped
                    bordered
                    hover
                    data={data}
                    responsive
                    small
                />
            </div>
        )
    }

    tableRows = () => {
        let certs = []
        this.state.certificates && this.state.certificates.map((cert, index) => {
            certs.push({
                certificates: cert,
                view: this.showViewButton(index),
            })
        })
        return certs
    }

    getCoursepacks = index => {
        axios.get(`${API}Coursepack/getAllCoursepack`) //FIXME:
            .then(result => {
                console.log(result.data.coursepack)
                this.props.dataStore.setListOfCoursepacks(result.data.coursepack) //TODO: coursepack name?
            })
            .catch(error => {
                this.setState({ message: error.response, openSnackbar: true })
                console.error("error in axios " + error);
            });
    }

    showViewButton = (index) => {
        return (
            <NavLink to={`/coursepack/achievements/certificates/${index}`}>
                <MDBBtn color="primary" onClick={() => this.getCoursepacks(index)} >View</MDBBtn>
            </NavLink>
        )
    }

    showTabs = () => {
        return (
            <div>
                <MDBNav className="nav-tabs mt-5">
                    <MDBNavItem>
                        <MDBNavLink to="#" active={this.state.activeItem === "1"} onClick={this.toggle("1")} role="tab" >Badges</MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                        <MDBNavLink to="#" active={this.state.activeItem === "2"} onClick={this.toggle("2")} role="tab" >Certificates</MDBNavLink>
                    </MDBNavItem>
                </MDBNav>
                <MDBTabContent activeItem={this.state.activeItem} >
                    <MDBTabPane tabId="1" role="tabpanel">
                        {this.showBadges()}
                    </MDBTabPane>
                    <MDBTabPane tabId="2" role="tabpanel">
                        {this.showCertTable()}
                    </MDBTabPane>
                </MDBTabContent>
            </div >
        )
    }

    render() {
        return (
            <div style={{ paddingLeft: 150, paddingTop: 50, paddingRight: 50 }} >
                <MDBCol>
                    <h3><b>Coursepack Achievements</b></h3>
                    <hr />
                </MDBCol>
                {this.showTabs()}
                {/*                 <CoursepackCertificatePdf />
 */}            </div >
        )
    }
}

export default CoursepackAchievementsPage;
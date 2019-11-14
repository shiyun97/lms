import React, { Component } from "react";
import { NavLink, MDBDataTable, MDBRow, MDBBtn, MDBCol, MDBTabContent, MDBTabPane, MDBNav, MDBNavItem, MDBNavLink } from "mdbreact";
import { observer, inject } from 'mobx-react'
import axios from "axios";
import CoursepackAchievementsCertificate from './CoursepackAchievementsCertificate'
import SwipeableViews from 'react-swipeable-views';
import { AppBar, Tabs, Tab, Paper, Card, Typography } from '@material-ui/core';
import CoursepackAchievementsTranscript from "./CoursepackAchievementsTranscript";

const API = "http://localhost:8080/LMS-war/webresources/";
const FILE_SERVER = "http://127.0.0.1:8887/";

@inject('dataStore')
@observer
class CoursepackAchievementsPage extends Component {

    state = {
        value: 0,
        activeItem: "1",
        modalUploadMultimedia: false,
        showMultimediaDialog: false,
        uploadedMultimedia: [],
        badgeName: "",
        toggleCertModal: false,
        toggleEditBadgeModal: false,
        allCertificates: [],
        allBadges: "",
        achievedBadges: [],
        attainedCerts: ""
    }

    componentDidMount() {
        this.initPage()
    }

    initPage() {
        //show all certs
        axios.get(`${API}Gamification/getAllCertifications`)
            .then(result => {
                this.setState({ allCertificates: result.data.certificationList })
            })
            .catch(error => {
                console.error("error in axios " + error);
            });

        // get all badges
        axios.get(`${API}Gamification/getAllBadges`)
            .then(result => {
                this.setState({ allBadges: result.data.badgeList })
            })
            .catch(error => {
                console.error("error in axios " + error);
            });

        // get all badges of user
        axios.get(`${API}Gamification/getAllUserBadges?userId=${sessionStorage.getItem("userId")}`)
            .then(result => {
                this.setState({ achievedBadges: result.data.badgeList })
            })
            .catch(error => {
                console.error("error in axios " + error);
            });

        // get user's certs
        axios.get(`${API}Gamification/getAllUserCertifications?userId=${sessionStorage.getItem("userId")}`)
            .then(result => {
                this.setState({ attainedCerts: result.data.certificationList })
            })
            .catch(error => {
                console.error("error in axios " + error);
            });
    }

    toggle = tab => e => {
        if (this.state.activeItem !== tab) {
            this.setState({
                activeItem: tab
            });
        }
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    handleChangeIndex = index => {
        this.setState({ value: index });
    };

    disabled = (achieved) => {
        if (!achieved) {
            return "grey"
        }
    }

    checkAchieved = badgeId => {
        if (this.state.achievedBadges.find(x => x.id === badgeId)) {
            return 1
        }
        return 0.4
    }

    showBadges = () => {
        var location = ""
        return (

            <MDBRow >
                {this.state.allBadges && this.state.allBadges.map((badge, index) => {
                    location = badge.location
                    let savedFileName = location.split('/')[5]; //FIXME:
                    /* let savedFileName = location.split('\\')[1]; */
                    let fullPath = FILE_SERVER + savedFileName;
                    console.log(fullPath)

                    return (
                        <MDBCol size="3">
                            <MDBCol align="center" size="12" style={{ paddingBottom: 30 }}>
                                <Card style={{ height: 180, color: this.disabled(badge.achieved) }} >
                                    <img src={fullPath} style={{ opacity: this.checkAchieved(badge.id), maxWidth: 180 }} alt={badge.title} />
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
        this.state.allCertificates && this.state.allCertificates.map((cert) => {
            certs.push({
                certificates: cert.title,
                view: this.showViewButton(cert.id),
            })
        })
        return certs
    }

    showViewButton = (index) => {
        return (
            <NavLink to={`/coursepack/achievements/certificates/view/${index}`}>
                <MDBBtn size="sm" color="primary" >View</MDBBtn>
            </NavLink>
        )
    }

    showTabs = () => {
        return (
            <div>
                <MDBNav className="nav-tabs mt-5" >
                    <MDBNavItem>
                        <MDBNavLink to="/coursepack/achievements/view/badges" active={this.state.activeItem === "1"} onClick={this.toggle("1")} role="tab" >Badges</MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                        <MDBNavLink to="/coursepack/achievements/view/certificates" active={this.state.activeItem === "2"} onClick={this.toggle("2")} role="tab" >Certificates</MDBNavLink>
                    </MDBNavItem>
                    <MDBCol align="right">
                            <CoursepackAchievementsTranscript /> 
                    </MDBCol>


                </MDBNav>
                <MDBTabContent style={{ paddingTop: 30 }} activeItem={this.state.activeItem} >
                    <MDBTabPane tabId="1" role="tabpanel">
                        {this.showBadges()}
                    </MDBTabPane>
                    <MDBTabPane tabId="2" role="tabpanel" >
                        <AppBar position="static" color="default">
                            <Tabs
                                value={this.state.value}
                                onChange={this.handleChange}
                                indicatorColor="primary"
                                textColor="primary"
                                variant="fullWidth"
                                aria-label="full width tabs example"
                            >
                                <Tab label="My Certificates" />
                                <Tab label="All Certificates" />
                            </Tabs>
                        </AppBar>
                        <Paper>
                            <SwipeableViews
                                axis={"x-reverse"}
                                index={this.state.value}
                                onChangeIndex={this.handleChangeIndex}
                            >
                                <Typography component="div">
                                    <CoursepackAchievementsCertificate attainedCerts={this.state.attainedCerts} />
                                </Typography>
                                <Typography component="div">{this.showCertTable()}</Typography>
                            </SwipeableViews>
                        </Paper>
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
            </div >
        )
    }
}

export default CoursepackAchievementsPage;
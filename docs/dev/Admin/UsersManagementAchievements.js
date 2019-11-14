import React, { Component } from "react";
import { MDBContainer, MDBDataTable, MDBRow, MDBCol, MDBTabContent, MDBTabPane, MDBNav, MDBNavItem, MDBNavLink } from "mdbreact";
import MainSideNavDropdown from "../MainSideNavDropdown";
import axios from "axios";
import styled from 'styled-components';
import { Card } from '@material-ui/core';

const API = "http://localhost:8080/LMS-war/webresources";
const FILE_SERVER = "http://127.0.0.1:8887/";

class UsersManagementAchievements extends Component {

    state = {
        userId: "",
        activeItem: "1",
        achievedBadges: [],
        completedCoursepacks: [],
        certsAchieved: []
    }

    componentDidMount() {
        this.initPage()
    }

    initPage() {
        this.setState({ userId: this.props.match.params.userId })
        console.log(this.state.userId)

        // get user badges
        axios.get(`${API}/Gamification/getAllUserBadges?userId=${this.props.match.params.userId}`)
            .then(result => {
                this.setState({ achievedBadges: result.data.badgeList })
            })
            .catch(error => {
                console.error("error in axios " + error);
            });

        // get user coursepacks
        axios.get(`${API}/Gamification/getCompletedCoursepacks?userId=${this.props.match.params.userId}`)
            .then(result => {
                this.setState({ completedCoursepacks: result.data.coursepack })
            })
            .catch(error => {
                console.error("error in axios " + error);
            });

        // get user certificates
        axios.get(`${API}/Gamification/getAllUserCertifications?userId=${this.props.match.params.userId}`)
            .then(result => {
                this.setState({ certsAchieved: result.data.certificationList })
                console.log(this.state.certsAchieved)
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

    showBadges = () => {
        if (this.state.achievedBadges.length === 0) {
            return <div>No badges achieved</div>
        } else {
            var location = ""
            return (
                <MDBRow >
                    {this.state.achievedBadges && this.state.achievedBadges.map((badge, index) => {
                        location = badge.location
                        let savedFileName = location.split('/')[5]; //FIXME:
                        /* let savedFileName = location.split('\\')[1]; */
                        let fullPath = FILE_SERVER + savedFileName;
                        console.log(fullPath)
                        return (
                            <MDBCol size="3">
                                <MDBCol align="center" size="12" style={{ paddingBottom: 30 }}>
                                    <Card style={{ height: 180 }} >
                                        <img src={fullPath} style={{ maxWidth: 180 }} alt={badge.title} />
                                    </Card>
                                </MDBCol>
                            </MDBCol>
                        )
                    })}
                </MDBRow>
            )
        }
    }

    showCertificates = () => {
        if (this.state.certsAchieved.length === 0) {
            return <div>No certificates</div>
        } else {
            const data = {
                columns: [
                    {
                        label: 'Id',
                        field: 'id',
                        sort: 'asc',
                        width: 100
                    },
                    {
                        label: 'Certificate',
                        field: 'certificate',
                        width: 100
                    },
                    {
                        label: 'Achieved Date',
                        field: 'data',
                        width: 100
                    },
                ],
                rows:
                    this.tableRowsCerts()
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
                    />
                </div>
            )
        }
    }

    tableRowsCerts = () => {
        let certs = []
        this.state.certsAchieved && this.state.certsAchieved.map((cert) => {
            certs.push({
                id: cert.id,
                certificate: cert.title,
                date: cert.dateAchieved.substring(0,10)
            })
        })
        return certs
    }

    showCoursepacks = () => {
        if (this.state.completedCoursepacks.length === 0) {
            return <div>No coursepack completed</div>
        } else {
            const data = {
                columns: [
                    {
                        label: 'Id',
                        field: 'id',
                        sort: 'asc',
                        width: 600
                    },
                    {
                        label: 'Code',
                        field: 'code',
                        width: 100
                    },
                    {
                        label: 'Coursepack',
                        field: 'coursepack',
                        width: 100
                    },
                ],
                rows:
                    this.tableRowsCoursepack()
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
                    />
                </div>
            )
        }
    }

    tableRowsCoursepack = () => {
        let coursepacks = []
        this.state.completedCoursepacks && this.state.completedCoursepacks.map((coursepack) => {
            coursepacks.push({
                id: coursepack.coursepackId,
                code: coursepack.code,
                coursepack: coursepack.title
            })
        })
        return coursepacks
    }

    showAchievements = () => {
        return (
            <div>
                <MDBNav className="nav-tabs" >
                    <MDBNavItem>
                        <MDBNavLink to='#' active={this.state.activeItem === "1"} onClick={this.toggle("1")} role="tab" >Badges</MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                        <MDBNavLink to='#' active={this.state.activeItem === "2"} onClick={this.toggle("2")} role="tab" >Coursepacks</MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                        <MDBNavLink to='#' active={this.state.activeItem === "3"} onClick={this.toggle("3")} role="tab" >Certificates</MDBNavLink>
                    </MDBNavItem>
                </MDBNav>
                <MDBTabContent style={{ paddingTop: 30 }} activeItem={this.state.activeItem} >
                    <MDBTabPane tabId="1" role="tabpanel">
                        {this.showBadges()}
                    </MDBTabPane>
                    <MDBTabPane tabId="2" role="tabpanel" >
                        {this.showCoursepacks()}
                    </MDBTabPane>
                    <MDBTabPane tabId="3" role="tabpanel">
                        {this.showCertificates()}
                    </MDBTabPane>
                </MDBTabContent>
            </div >
        )
    }

    render() {
        return (
            <div className={this.props.className}>
                <div className="module-navbar-small">
                    <MainSideNavDropdown moduleId={this.props.moduleId} activeTab={'Public Users'}></MainSideNavDropdown>
                </div>
                <div className="module-content">
                    <MDBContainer className="mt-3">
                        <MDBRow style={{ paddingTop: 60 }}>
                            <MDBCol md="12">
                                <h2 className="font-weight-bold">Achievements</h2>
                                <hr />
                            </MDBCol>
                        </MDBRow>
                        {this.showAchievements()}
                    </MDBContainer>
                </div>
            </div>
        )
    }
}
export default styled(UsersManagementAchievements)`
.module-content{
    margin-top: 10px;
}
@media screen and (min-width: 800px) {
    .module-content{
        margin-left: 0px;
    }
    .module-navbar-small{
        display: none;
    }
    .module-sidebar-large{
        display: block;
    }
}
@media screen and (max-width: 800px) {
    .module-sidebar-large{
        display: none;
    }
    .module-navbar-small{
        display: block;
    }
}

.new-paragraph{
    margin-top: 0;
    margin-bottom: 1rem;
}
.align-right{
    float: right;
}
`;

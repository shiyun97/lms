import React, { Component } from "react";
import styled from 'styled-components';
import {
    MDBContainer, MDBRow, MDBCol, MDBIcon 
} from "mdbreact";
import ModuleSideNavigation from "../ModuleSideNavigation";
import ModuleSideNavigationDropdown from "../ModuleSideNavigationDropdown";
import axios from "axios";
import { observer, inject } from 'mobx-react';
import moment from 'moment';

@inject('dataStore')
@observer
class ModuleAnnouncementsPageStudent extends Component {

    state = {
        moduleId: 0,
        activeAnnouncements: [],
        upcomingAnnouncements: [],
        expiredAnnouncements: [],
        announcementToEdit: {},
        modal1: false, // add modal
        modal2: false, // edit modal
        modal3: false, // delete modal
        openSnackbar: false,
        message: "",

        //announcement fields
        content: "",
        emailNotification: false,
        publish: false,
        createdDate: "",
        lastUpdateDate: "",
        startDate: "",
        endDate: "",
        title: "",
        moduleId: ""
    }

    componentDidMount() {
        this.initPage();
        this.getActiveAnnouncements();
    }

    initPage() {
        var pathname = location.pathname;
        let active = pathname.split("/").pop();
        if (active == "announcements") active = "active";
        pathname = pathname.split("/");
        var moduleId = pathname[2]
        this.props.dataStore.setCurrModId(pathname[2]);
        this.setState({
            activeItem: active,
            moduleId: moduleId
        })
    }

    getActiveAnnouncements = () => {
        var moduleId = this.props.dataStore.getCurrModId;
        axios
            .get(`http://localhost:8080/LMS-war/webresources/Annoucement/getAllActiveAnnoucements?moduleId=${moduleId}`)
            .then(result => {
                // console.log(result.data.annoucementList)
                this.setState({ activeAnnouncements: result.data.annoucementList })
            })
            .catch(error => {
                console.error("error in axios " + error);
            });
    }

    render() {
        let activeAnnouncements = this.state.activeAnnouncements;
        let moduleId = this.props.dataStore.getCurrModId;
        return (
            <div className={this.props.className}>
                <div className="module-sidebar-large">
                    <ModuleSideNavigation moduleId={moduleId}></ModuleSideNavigation></div>
                <div className="module-navbar-small">
                    <ModuleSideNavigationDropdown moduleId={moduleId}></ModuleSideNavigationDropdown>
                </div>
                <div className="module-content">
                    <MDBContainer>
                        <MDBRow>
                            <MDBCol>
                                <h4>Announcements</h4>
                                <hr className="my-3" />
                            </MDBCol>
                        </MDBRow>
                                <div className="mb-2"></div>
                                <div className="align-right">

                                </div>
                                {
                                    activeAnnouncements.length == 0 && <h6 style={{ paddingTop: 20 }}>No announcements found.</h6>
                                }
                                {
                                    activeAnnouncements.length > 0 && activeAnnouncements.map((announcement) => (
                                        <AnnouncementListItem key={announcement.announcementId}
                                            announcement={announcement}
                                            expired={false}
                                            edit={() => this.openEditAnnouncementModalBox(announcement.announcementId)}
                                            delete={() => this.openDeleteAnnouncementModalBox(announcement.announcementId)}>
                                        </AnnouncementListItem>
                                    ))
                                }
                    </MDBContainer>
                </div>
            </div>
        );
    }
}

class AnnouncementListItem extends Component {

    render() {
        let announcement = this.props.announcement;
        return <div className="container-fluid section border p-3 justify-content d-flex mb-2">
            <div className="new-paragraph">
                {
                    !this.props.expired &&
                    <div className="h6">{announcement.title}
                        {localStorage.getItem("accessRight") === "Teacher" &&
                            <>
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                            <MDBIcon icon="edit" className="mr-1" onClick={this.props.edit} style={{ cursor: "pointer", textShadow: "1px 0px 1px #777777" }} />
                                &nbsp;&nbsp;
                                            <MDBIcon icon="trash-alt" className="mr-1" onClick={this.props.delete} style={{ cursor: "pointer", textShadow: "1px 0px 1px #777777" }} />
                            </>
                        }
                    </div>
                }
                {
                    this.props.expired &&
                    <div className="h6">{announcement.title}
                        {localStorage.getItem("accessRight") === "Teacher" &&
                            <>
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                        <MDBIcon icon="trash-alt" className="mr-1" onClick={this.props.delete} style={{ cursor: "pointer", textShadow: "1px 0px 1px #777777" }} />
                            </>
                        }
                    </div>
                }

                {/* <MDBIcon icon="user" className="mr-2 fa-fw" /> */}
                {/* by {announcement.createdBy}<br /> */}
                <MDBIcon icon="calendar-alt" className="mr-2 fa-fw" />
                on {moment(announcement.startDate).format('DD-MM-YYYY HH:mm:ss')}
                <div className="mb-2"></div>
                {announcement.content}
            </div>
        </div>
    }
}

export default styled(ModuleAnnouncementsPageStudent)`
.module-content{
    margin-top: 40px;
}
@media screen and (min-width: 800px) {
    .module-content{
        margin-left: 270px;
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
.edit-button{
    border: none;
    background-color: transparent;
}
.align-right{
    float: right;
}
.new-paragraph{
    margin-top: 0;
    margin-bottom: 1rem;
}
`;
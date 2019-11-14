import React, { Component } from "react";
import styled from 'styled-components';
import {
    MDBContainer, MDBRow, MDBCol, MDBIcon, MDBBtn, MDBModal, MDBModalHeader, MDBModalBody,
    MDBModalFooter, MDBNav, MDBNavItem, MDBNavLink, MDBTabContent, MDBTabPane, MDBEdgeHeader, MDBJumbotron
} from "mdbreact";
import ModuleSideNavigation from "../ModuleSideNavigation";
import ModuleSideNavigationDropdown from "../ModuleSideNavigationDropdown";
import { TextField, Snackbar, Checkbox } from '@material-ui/core';
import axios from "axios";
import { observer, inject } from 'mobx-react';
import moment from 'moment';

@inject('dataStore')
@observer
class ModuleAnnouncementsPageTeacher extends Component {

    state = {
        activeItem: "active",
        moduleId: 0,
        activeAnnouncements: [],
        upcomingAnnouncements: [],
        expiredAnnouncements: [],
        modal1: false, // add modal
        modal2: false, // edit modal
        openSnackbar: false,
        message: "",
        recall: "",

        //announcement fields
        content: "",
        emailNotification: false,
        publish: false,
        createdDate: "",
        lastUpdateDate: "",
        startDate: "",
        endDate: "",
        title: "",
        moduleId: "",
        currAnnouncementId: 0
    }

    componentDidMount() {
        this.initPage();
        this.getActiveAnnouncements();
        this.getExpiredAnnouncements();
        this.getUpcomingAnnouncements();
    }

    componentDidUpdate() {
        if (this.state.recall === "recallAnn") {
            this.getActiveAnnouncements();
            this.getExpiredAnnouncements();
            this.getUpcomingAnnouncements();
        }
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
                this.setState({ activeAnnouncements: result.data.annoucementList, recall: "" })
            })
            .catch(error => {
                console.error("error in axios " + error);
            });
    }

    getUpcomingAnnouncements = () => {
        var moduleId = this.props.dataStore.getCurrModId;
        axios
            .get(`http://localhost:8080/LMS-war/webresources/Annoucement/getAllUpcomingAnnoucements?moduleId=${moduleId}`)
            .then(result => {
                // console.log(result.data.annoucementList)
                this.setState({ upcomingAnnouncements: result.data.annoucementList, recall: "" })
            })
            .catch(error => {
                console.error("error in axios " + error);
            });
    }

    getExpiredAnnouncements = () => {
        var moduleId = this.props.dataStore.getCurrModId;
        axios
            .get(`http://localhost:8080/LMS-war/webresources/Annoucement/getAllExpiredAnnoucements?moduleId=${moduleId}`)
            .then(result => {
                // console.log(result.data.annoucementList)
                this.setState({ expiredAnnouncements: result.data.annoucementList, recall: "" })
            })
            .catch(error => {
                console.error("error in axios " + error);
            });
    }

    handleOpenSnackbar = () => {
        this.setState({ openSnackbar: true });
    };

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ openSnackbar: false });
    };

    handleChange = event => {
        event.preventDefault();
        this.setState({ [event.target.name]: event.target.value });
        // console.log(event.target.value)
    }

    toggleTab = tab => e => {
        if (this.state.activeItem !== tab) {
            this.setState({
                activeItem: tab
            });
        }
    };

    toggle = (nr) => {
        let modalNumber = "modal" + nr;
        this.setState({
            [modalNumber]: !this.state[modalNumber]
        });
    };

    createAnnouncement = () => {
        // console.log(this.state)
        var createdDate = new Date;
        createdDate = moment(createdDate).format("DD-MM-YYYY HH:mm:ss")
        var lastUpdateDate = createdDate
        var startDate = this.state.startDate;
        startDate = moment(startDate).format("DD-MM-YYYY HH:mm:ss")
        var endDate = this.state.endDate;
        endDate = moment(endDate).format("DD-MM-YYYY HH:mm:ss")
        axios
            .post(`http://localhost:8080/LMS-war/webresources/Annoucement/createModuleAnnoucement/${this.state.moduleId}?userId=${sessionStorage.getItem('userId')}`, {
                content: this.state.content,
                emailNotification: this.state.emailNotification,
                // publish: this.state.publish,
                createdDate: createdDate,
                lastUpdatedDate: lastUpdateDate,
                startDate: startDate + ":00",
                endDate: endDate + ":00",
                title: this.state.title
            })
            .then(result => {
                // console.log(result.data.annoucementList)
                this.setState({ openSnackbar: true, message: "Announcement successfully created", recall: "recallAnn", modal1: false })
            })
            .catch(error => {
                this.setState({ message: error.response.data.errorMessage, openSnackbar: true })
                console.error("error in axios " + error);
            });
        this.toggle(1);
    }

    openEditAnnouncementModalBox = (id, announcement) => {
        // console.log(announcement)
        this.setState({
            content: announcement.content,
            emailNotification: announcement.emailNotification,
            // publish: announcement.publish,
            createdDate: announcement.createdDate,
            lastUpdatedDate: announcement.lastUpdatedDate,
            startDate: announcement.startDate,
            endDate: announcement.endDate,
            title: announcement.title,
            currAnnouncementId: id
        });
        this.toggle(2);
    }

    updateAnnouncement = () => {
        // console.log(this.state)
        var lastUpdateDate = new Date;
        lastUpdateDate = moment(lastUpdateDate).format("DD-MM-YYYY HH:mm:ss")
        var startDate = this.state.startDate;
        startDate = moment(startDate).format("DD-MM-YYYY HH:mm:ss")
        var endDate = this.state.endDate;
        endDate = moment(endDate).format("DD-MM-YYYY HH:mm:ss")
        axios
            .put(`http://localhost:8080/LMS-war/webresources/Annoucement/updateModuleAnnoucement?moduleId=${this.state.moduleId}&annoucementId=${this.state.currAnnouncementId}&userId=${sessionStorage.getItem('userId')}`, {
                content: this.state.content,
                emailNotification: this.state.emailNotification,
                // publish: this.state.publish,
                createdDate: this.state.createdDate,
                lastUpdatedDate: lastUpdateDate,
                startDate: startDate + ":00",
                endDate: endDate + ":00",
                title: this.state.title
            })
            .then(result => {
                // console.log(result.data.annoucementList)
                this.setState({ openSnackbar: true, message: "Announcement successfully updated", recall: "recallAnn" })
            })
            .catch(error => {
                this.setState({ message: error.response.data.errorMessage, openSnackbar: true })
                console.error("error in axios " + error);
            });
        this.toggle(2);
    }

    deleteAnnouncement = (id) => {
        axios
            .delete(`http://localhost:8080/LMS-war/webresources/Annoucement/deleteAnnoucement?annoucementId=${id}`)
            .then(result => {
                // console.log(result.data.annoucementList)
                this.setState({ openSnackbar: true, message: "Announcement successfully deleted", recall: "recallAnn" })
            })
            .catch(error => {
                this.setState({ message: error.response.data.errorMessage, openSnackbar: true })
                console.error("error in axios " + error);
            });
    }

    handleCheckBoxChange = name => event => {
        this.setState({ [name]: event.target.checked });
        // console.log(this.state.emailNotification, this.state.publish)
    };

    renderCreateAnnouncementModalBox = () => {
        return (
            <MDBModal isOpen={this.state.modal1} toggle={() => this.toggle(1)}>
                <MDBModalHeader
                    className="text-center"
                    titleClass="w-100 font-weight-bold"
                    toggle={() => this.toggle(1)}
                >
                    Create Announcement
      </MDBModalHeader>
                <MDBModalBody>
                    <form className="mx-3 grey-text">
                        <MDBRow>
                            <MDBCol md="12">
                                <label className="grey-text mt-4">
                                    Announcement Title
                  </label>
                                <input type="text" name="title" onChange={this.handleChange} className="form-control" />
                            </MDBCol>
                            <MDBCol md="12">
                                <label className="grey-text mt-4">
                                    Announcement Content
                  </label>
                                <textarea rows="3" type="text" name="content" onChange={this.handleChange} className="form-control" />
                                <br />
                            </MDBCol>
                            <MDBCol md="6" className="mt-4">
                                <TextField
                                    id="startDate"
                                    label="Start Date"
                                    type="datetime-local"
                                    name="startDate"
                                    value={this.state.startDate}
                                    onChange={this.handleChange}
                                    fullWidth
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </MDBCol>
                            <MDBCol md="6" className="mt-4">
                                <TextField
                                    id="endDate"
                                    label="End Date"
                                    type="datetime-local"
                                    name="endDate"
                                    value={this.state.endDate}
                                    onChange={this.handleChange}
                                    fullWidth
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </MDBCol>
                            <MDBCol md="12" className="mt-4">
                                {/* Publish
                  <Checkbox
                                    checked={this.state.publish}
                                    onChange={this.handleCheckBoxChange('publish')}
                                    value="publish"
                                    name="publish"
                                    color="primary"
                                    inputProps={{
                                        'aria-label': 'secondary checkbox',
                                    }}
                                /> */}
                                Email Notification
                  <Checkbox
                                    checked={this.state.emailNotification}
                                    onChange={this.handleCheckBoxChange('emailNotification')}
                                    value="emailNotification"
                                    name="emailNotification"
                                    color="primary"
                                    inputProps={{
                                        'aria-label': 'secondary checkbox',
                                    }}
                                />
                            </MDBCol>
                        </MDBRow>
                    </form>
                </MDBModalBody>
                <MDBModalFooter className="justify-content-center">
                    <MDBRow>
                        <MDBCol md="6">
                            <MDBBtn onClick={() => this.toggle(1)} color="grey">Cancel</MDBBtn>
                        </MDBCol>
                        <MDBCol md="6">
                            <MDBBtn onClick={() => this.createAnnouncement()} color="primary">Create</MDBBtn>
                        </MDBCol>
                    </MDBRow>
                </MDBModalFooter>
            </MDBModal>
        )
    }

    renderEditAnnouncementModalBox = () => {
        return (
            <MDBModal isOpen={this.state.modal2} toggle={() => this.toggle(2)} >
                <MDBModalHeader
                    className="text-center"
                    titleClass="w-100 font-weight-bold"
                    toggle={() => this.toggle(2)}
                >
                    Update Announcement
      </MDBModalHeader>
                <MDBModalBody>
                    <form className="mx-3 grey-text">
                        <MDBRow>
                            <MDBCol md="12">
                                <label className="grey-text mt-4">
                                    Announcement Title
                  </label>
                                <input type="text" name="title" onChange={this.handleChange} defaultValue={this.state.title} className="form-control" />
                            </MDBCol>
                            <MDBCol md="12">
                                <label className="grey-text mt-4">
                                    Announcement Content
                  </label>
                                <textarea rows="3" type="text" name="content" onChange={this.handleChange} defaultValue={this.state.content} className="form-control" />
                                <br />
                            </MDBCol>
                            <MDBCol md="6" className="mt-4">
                                <TextField
                                    id="startDate"
                                    label="Start Date"
                                    type="datetime-local"
                                    name="startDate"
                                    value={this.state.startDate}
                                    onChange={this.handleChange}
                                    fullWidth
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </MDBCol>
                            <MDBCol md="6" className="mt-4">
                                <TextField
                                    id="endDate"
                                    label="End Date"
                                    type="datetime-local"
                                    name="endDate"
                                    value={this.state.endDate}
                                    onChange={this.handleChange}
                                    fullWidth
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </MDBCol>
                            <MDBCol md="12" className="mt-4">
                                {/* Publish
                  <Checkbox
                                    checked={this.state.publish}
                                    onChange={this.handleCheckBoxChange('publish')}
                                    value="publish"
                                    name="publish"
                                    color="primary"
                                    inputProps={{
                                        'aria-label': 'secondary checkbox',
                                    }}
                                /> */}
                                Email Notification
                  <Checkbox
                                    checked={this.state.emailNotification}
                                    onChange={this.handleCheckBoxChange('emailNotification')}
                                    value="emailNotification"
                                    name="emailNotification"
                                    color="primary"
                                    inputProps={{
                                        'aria-label': 'secondary checkbox',
                                    }}
                                />
                            </MDBCol>
                        </MDBRow>
                    </form>
                </MDBModalBody>
                <MDBModalFooter className="justify-content-center">
                    <MDBRow>
                        <MDBCol md="6">
                            <MDBBtn onClick={() => this.toggle(2)} color="grey">Cancel</MDBBtn>
                        </MDBCol>
                        <MDBCol md="6">
                            <MDBBtn onClick={() => this.updateAnnouncement()} color="primary">Update</MDBBtn>
                        </MDBCol>
                    </MDBRow>
                </MDBModalFooter>
            </MDBModal>
        )
    }

    render() {
        let activeAnnouncements = this.state.activeAnnouncements;
        let upcomingAnnouncements = this.state.upcomingAnnouncements;
        let expiredAnnouncements = this.state.expiredAnnouncements;
        let moduleId = this.props.dataStore.getCurrModId;
        return (
            <div className={this.props.className}>
                <div className="module-sidebar-large"><ModuleSideNavigation moduleId={moduleId}></ModuleSideNavigation></div>
                <div className="module-navbar-small">
                    <ModuleSideNavigationDropdown moduleId={moduleId} activeTab={'Announcements'}></ModuleSideNavigationDropdown>
                </div>
                <div className="module-content">
                    <MDBEdgeHeader color="indigo darken-3" className="discussionPage" />
                    <MDBContainer>
                        <MDBRow>
                            <MDBCol md="12" className="mt-3 mx-auto">
                                <MDBJumbotron>
                                    <MDBRow>
                                        <MDBCol>
                                            {
                                                this.state.activeItem == "active" &&
                                                <h2 className="font-weight-bold">Announcements
                                        <MDBIcon icon="angle-right" className="ml-4 mr-4" /> Active
                                    </h2>
                                            }
                                            {
                                                this.state.activeItem == "upcoming" &&
                                                <h2 className="font-weight-bold mb-4">Announcements
                                        <MDBIcon icon="angle-right" className="ml-4 mr-4" /> Upcoming
                                    </h2>
                                            }
                                            {
                                                this.state.activeItem == "expired" &&
                                                <h2 className="font-weight-bold mb-4">Announcements
                                        <MDBIcon icon="angle-right" className="ml-4 mr-4" /> Expired
                                    </h2>
                                            }
                                            <hr className="my-3" />
                                        </MDBCol>
                                    </MDBRow>
                                    <MDBNav className="nav-tabs">
                                        <MDBNavItem>
                                            <MDBNavLink
                                                to={`/modules/${this.state.moduleId}/announcements/active`}
                                                active={this.state.activeItem === "active"}
                                                onClick={this.toggleTab("active")}
                                                role="tab"
                                            >
                                                Active
                                </MDBNavLink>
                                        </MDBNavItem>
                                        <MDBNavItem>
                                            <MDBNavLink
                                                to={`/modules/${this.state.moduleId}/announcements/upcoming`}
                                                active={this.state.activeItem === "upcoming"}
                                                onClick={this.toggleTab("upcoming")}
                                                role="tab"
                                            >
                                                Upcoming
                                </MDBNavLink>
                                        </MDBNavItem>
                                        <MDBNavItem>
                                            <MDBNavLink
                                                to={`/modules/${this.state.moduleId}/announcements/expired`}
                                                active={this.state.activeItem === "expired"}
                                                onClick={this.toggleTab("expired")}
                                                role="tab"
                                            >
                                                Expired
                                </MDBNavLink>
                                        </MDBNavItem>
                                    </MDBNav>
                                    <MDBTabContent activeItem={this.state.activeItem}>
                                        <MDBTabPane tabId="active" role="tabpanel">
                                            <div className="mb-2"></div>
                                            <div className="align-right">

                                                {sessionStorage.getItem("accessRight") === "Teacher" &&
                                                    <MDBBtn color="indigo" outline className="mr-0 mb-3" size="md" onClick={() => this.toggle(1)}>
                                                        <MDBIcon icon="plus" className="mr-1" /> Add
                                    </MDBBtn>
                                                }
                                            </div>
                                            {
                                                activeAnnouncements.length == 0 && <h6 style={{ paddingTop: 20 }}>No announcements found.</h6>
                                            }
                                            {
                                                activeAnnouncements.length > 0 && activeAnnouncements.map((announcement) => (
                                                    <AnnouncementListItem key={announcement.annoucementId}
                                                        announcement={announcement}
                                                        expired={false}
                                                        edit={() => this.openEditAnnouncementModalBox(announcement.annoucementId, announcement)}
                                                        delete={() => this.deleteAnnouncement(announcement.annoucementId)}>
                                                    </AnnouncementListItem>
                                                ))
                                            }
                                        </MDBTabPane>
                                        <MDBTabPane tabId="upcoming" role="tabpanel">
                                            <div className="mb-2"></div>
                                            <div className="align-right">
                                                {sessionStorage.getItem("accessRight") === "Teacher" &&
                                                    <MDBBtn color="indigo" outline className="mr-0 mb-3" size="md" onClick={() => this.toggle(1)}>
                                                        <MDBIcon icon="plus" className="mr-1" /> Add
                                    </MDBBtn>
                                                }
                                            </div>
                                            {
                                                upcomingAnnouncements.length == 0 && <h6 style={{ paddingTop: 20 }}>No announcements found.</h6>
                                            }
                                            {
                                                upcomingAnnouncements.length > 0 && upcomingAnnouncements.map((announcement) => (
                                                    <AnnouncementListItem key={announcement.annoucementId}
                                                        announcement={announcement}
                                                        expired={false}
                                                        edit={() => this.openEditAnnouncementModalBox(announcement.annoucementId, announcement)}
                                                        delete={() => this.deleteAnnouncement(announcement.annoucementId)}>
                                                    </AnnouncementListItem>
                                                ))
                                            }
                                        </MDBTabPane>
                                        <MDBTabPane tabId="expired" role="tabpanel">
                                            <div className="mb-2"></div>
                                            {
                                                expiredAnnouncements.length == 0 && <h6 style={{ paddingTop: 20 }}>No announcements found.</h6>
                                            }
                                            {
                                                expiredAnnouncements.length > 0 && expiredAnnouncements.map((announcement) => (
                                                    <AnnouncementListItem key={announcement.annoucementId}
                                                        announcement={announcement}
                                                        expired={true}
                                                        delete={() => this.deleteAnnouncement(announcement.annoucementId)}>
                                                    </AnnouncementListItem>
                                                ))
                                            }
                                        </MDBTabPane>
                                    </MDBTabContent>
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
                                    {this.renderCreateAnnouncementModalBox()}
                                    {this.renderEditAnnouncementModalBox()}
                                </MDBJumbotron>
                            </MDBCol>
                        </MDBRow>
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
                        {sessionStorage.getItem("accessRight") === "Teacher" &&
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
                        {sessionStorage.getItem("accessRight") === "Teacher" &&
                            <>
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                        <MDBIcon icon="trash-alt" className="mr-1" onClick={this.props.delete} style={{ cursor: "pointer", textShadow: "1px 0px 1px #777777" }} />
                            </>
                        }
                    </div>
                }
                <MDBIcon icon="calendar-alt" className="mr-2 fa-fw" />
                on {moment(announcement.startDate).format('DD-MM-YYYY HH:mm:ss')}
                <div className="mb-2"></div>
                {announcement.content}
            </div>
        </div>
    }
}

export default styled(ModuleAnnouncementsPageTeacher)`
.module-content{
    margin-top: 0px;
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
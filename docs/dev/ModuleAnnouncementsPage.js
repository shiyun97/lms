import React, { Component } from "react";
import styled from 'styled-components';
import { MDBContainer, MDBRow, MDBCol, MDBIcon, MDBBtn, MDBModal, MDBModalHeader, MDBModalBody, 
    MDBModalFooter, MDBInput, MDBNav, MDBNavItem, MDBNavLink, MDBTabContent, MDBTabPane } from "mdbreact";
import ModuleSideNavigation from "./ModuleSideNavigation";
import SectionContainer from "../components/sectionContainer";
import SideNav from "./SideNav";

class ModuleAnnouncementsPage extends Component {

    state = {
        activeItem: "active",
        activeAnnouncements: [
            {
                id: '1',
                title: 'Active Announcement Title 1',
                content: 'Announcement Content',
                createdBy: 'Dr. Tan Wee Kek',
                createdDt: '28 Aug 2019'
            },
            {
                id: '2',
                title: 'Active Announcement Title 2',
                content: 'Announcement Content',
                createdBy: 'Dr. Tan Wee Kek',
                createdDt: '28 Aug 2019'
            },
            {
                id: '3',
                title: 'Active Announcement Title 3',
                content: 'Announcement Content',
                createdBy: 'Dr. Tan Wee Kek',
                createdDt: '28 Aug 2019'
            }
        ],
        upcomingAnnouncements: [
            {
                id: '1',
                title: 'Upcoming Announcement Title 1',
                content: 'Announcement Content',
                createdBy: 'Dr. Tan Wee Kek',
                createdDt: '28 Aug 2019'
            },
            {
                id: '2',
                title: 'Upcoming Announcement Title 2',
                content: 'Announcement Content',
                createdBy: 'Dr. Tan Wee Kek',
                createdDt: '28 Aug 2019'
            },
            {
                id: '3',
                title: 'Upcoming Announcement Title 3',
                content: 'Announcement Content',
                createdBy: 'Dr. Tan Wee Kek',
                createdDt: '28 Aug 2019'
            }
        ],
        expiredAnnouncements: [
            {
                id: '1',
                title: 'Expired Announcement Title 1',
                content: 'Announcement Content',
                createdBy: 'Dr. Tan Wee Kek',
                createdDt: '28 Aug 2019'
            },
            {
                id: '2',
                title: 'Expired Announcement Title 2',
                content: 'Announcement Content',
                createdBy: 'Dr. Tan Wee Kek',
                createdDt: '28 Aug 2019'
            },
            {
                id: '3',
                title: 'Expired Announcement Title 3',
                content: 'Announcement Content',
                createdBy: 'Dr. Tan Wee Kek',
                createdDt: '28 Aug 2019'
            }
        ],
        announcementToEdit: {
        },
        modalAdd: false,
        modalEdit: false,
        modalDelete: false
    }

    constructor(props) {
        super(props);
        this.edit = this.edit.bind(this);
    }

    componentDidMount() {
        this.initPage();
    }

    initPage() {
        let moduleId = this.props.match.params.moduleId;
        if (moduleId) {
            console.log(moduleId);
            // retrieve module & set state

            let url = this.props.match.url;
            let active = url.split("/").pop();
            if(active == "announcements") active = "active";
            this.setState({
                activeItem: active,
                moduleId: moduleId
            })
        }
    }

    toggleTab = tab => e => {
        if (this.state.activeItem !== tab) {
            this.setState({
                activeItem: tab
            });
        }
    };

    toggleAnnouncementModal = nr => () => {
        let modalNumber = "modal" + nr;
        this.setState({
            [modalNumber]: !this.state[modalNumber]
        });
    };

    submitAdd = () => {
        this.toggleAnnouncementModal("Add");
    }

    edit = (id) => {
        // retrieve announcement, set state
        this.setState({
            modalEdit: true,
            announcementToEdit: {
                id: id,
                title: 'Editing Announcement Title',
                content: 'Announcement Content',
                openDate: '',
                closeDate: ''
            }
        });
    }

    submitEdit = () => {
        console.log("confirmEdit")
        this.toggleAnnouncementModal("Edit");
    }

    delete = (id) => {
        this.setState({
            modalDelete: true,
            announcementIdToDelete: id
        })
    }

    confirmDelete = () => {
        // delete announcementIdToDelete
        this.toggleAnnouncementModal("Delete");
    }

    render() {
        let activeAnnouncements = this.state.activeAnnouncements;
        let upcomingAnnouncements = this.state.upcomingAnnouncements;
        let expiredAnnouncements = this.state.expiredAnnouncements;
        let announcementToEdit = this.state.announcementToEdit;
        return (
            <div className={this.props.className}>
                <ModuleSideNavigation moduleId={this.props.match.params.moduleId}></ModuleSideNavigation>
                <div className="module-content">
                <MDBContainer>
                        <MDBRow>
                            <MDBCol>
                                {
                                    this.state.activeItem == "active" && 
                                    <h4 className="font-weight-bold">Announcements
                                        <MDBIcon icon="angle-right" className="ml-4 mr-4" /> Active
                                    </h4>
                                }
                                {
                                    this.state.activeItem == "upcoming" && 
                                    <h4 className="mb-4">Announcements
                                        <MDBIcon icon="angle-right" className="ml-4 mr-4" /> Upcoming
                                    </h4>
                                }
                                {
                                    this.state.activeItem == "expired" && 
                                    <h4 className="mb-4">Announcements
                                        <MDBIcon icon="angle-right" className="ml-4 mr-4" /> Expired
                                    </h4>
                                }
                                <hr className="my-3" />
                            </MDBCol>
                        </MDBRow>
                        <MDBRow>
                            <MDBCol>
                                <MDBModal isOpen={this.state.modalAdd} toggle={this.toggleAnnouncementModal("Add")}>
                                    <MDBModalHeader
                                        className="text-center"
                                        titleClass="w-100 font-weight-bold"
                                        toggle={this.toggleAnnouncementModal("Add")}
                                    >
                                        New Announcement
                                    </MDBModalHeader>
                                    <MDBModalBody>
                                        <form className="mx-3 grey-text">
                                            <div className="form-group">
                                                <label htmlFor="announcementTitle">Title</label>
                                                <input type="text" className="form-control" id="announcementTitle" />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="announcementContent">Content</label>
                                                <textarea className="form-control" id="announcementContent" rows="3" />
                                            </div>
                                        </form>
                                    </MDBModalBody>
                                    <MDBModalFooter className="justify-content-center">
                                        <MDBBtn onClick={this.submitAdd()}>Submit</MDBBtn>
                                    </MDBModalFooter>
                                </MDBModal>
                            </MDBCol>
                        </MDBRow>
                        <MDBRow>
                            <MDBCol>
                                <MDBModal isOpen={this.state.modalEdit} toggle={this.toggleAnnouncementModal("Edit")}>
                                    <MDBModalHeader
                                        className="text-center"
                                        titleClass="w-100 font-weight-bold"
                                        toggle={this.toggleAnnouncementModal("Edit")}
                                    >
                                        Edit Announcement
                                    </MDBModalHeader>
                                    <MDBModalBody>
                                        <form className="mx-3 grey-text">
                                            <div className="form-group">
                                                <label htmlFor="announcementTitle">Title</label>
                                                <input type="text" className="form-control" id="announcementTitle" value={this.state.announcementToEdit.title} />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="announcementContent">Content</label>
                                                <textarea className="form-control" id="announcementContent" rows="3" value={this.state.announcementToEdit.content} onChange={e => {}} />
                                            </div>
                                        </form>
                                    </MDBModalBody>
                                    <MDBModalFooter className="justify-content-center">
                                        <MDBBtn onClick={this.submitEdit()}>Submit</MDBBtn>
                                    </MDBModalFooter>
                                </MDBModal>
                            </MDBCol>
                        </MDBRow>
                        <MDBRow>
                            <MDBCol>
                                <MDBModal
                                    modalStyle="danger"
                                    className="text-white"
                                    size="sm"
                                    backdrop={true}
                                    isOpen={this.state.modalDelete}
                                    toggle={this.toggleAnnouncementModal("Delete")}
                                >
                                    <MDBModalHeader
                                        className="text-center"
                                        titleClass="w-100"
                                        tag="p"
                                        toggle={this.toggleAnnouncementModal("Delete")}
                                    >
                                        Are you sure?
                                    </MDBModalHeader>
                                    <MDBModalBody className="text-center">
                                        <MDBIcon icon="trash" size="4x" />
                                    </MDBModalBody>
                                    <MDBModalFooter className="justify-content-center">
                                        <MDBBtn color="danger" onClick={this.confirmDelete()}>
                                            Yes
                                        </MDBBtn>
                                        <MDBBtn color="danger" outline onClick={this.toggleAnnouncementModal("Delete")}>
                                            No
                                        </MDBBtn>
                                    </MDBModalFooter>
                                </MDBModal>
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
                                    <MDBBtn color="indigo" outline className="mr-0 mb-3" size="md" onClick={this.toggleAnnouncementModal("Add")}>
                                        <MDBIcon icon="plus" className="mr-1" /> Add
                                    </MDBBtn>
                                </div>
                                {
                                    activeAnnouncements.length == 0 && <h6>No Announcements to show</h6>
                                }
                                {
                                    activeAnnouncements.length > 0 && activeAnnouncements.map((announcement) => (
                                        <AnnouncementListItem key={announcement.id} 
                                            announcement={announcement} 
                                            expired={false} 
                                            edit={e => {this.edit(announcement.id)}}
                                            delete={e => {this.delete(announcement.id)}}>
                                        </AnnouncementListItem>
                                    ))
                                }
                            </MDBTabPane>
                            <MDBTabPane tabId="upcoming" role="tabpanel">
                                <div className="mb-2"></div>
                                <div className="align-right">
                                    <MDBBtn color="indigo" outline className="mr-0 mb-3" size="md" onClick={this.toggleAnnouncementModal("Add")}>
                                        <MDBIcon icon="plus" className="mr-1" /> Add
                                    </MDBBtn>
                                </div>
                                {
                                    upcomingAnnouncements.length == 0 && <h6>No Announcements to show</h6>
                                }
                                {
                                    upcomingAnnouncements.length > 0 && upcomingAnnouncements.map((announcement) => (
                                        <AnnouncementListItem key={announcement.id} 
                                            announcement={announcement} 
                                            expired={false} 
                                            edit={e => {this.edit(announcement.id)}}
                                            delete={e => {this.delete(announcement.id)}}>
                                        </AnnouncementListItem>
                                    ))
                                }
                            </MDBTabPane>
                            <MDBTabPane tabId="expired" role="tabpanel">
                                <div className="mb-4"></div>
                                {
                                    expiredAnnouncements.length == 0 && <h6>No Announcements to show</h6>
                                }
                                {
                                    expiredAnnouncements.length > 0 && expiredAnnouncements.map((announcement) => (
                                        <AnnouncementListItem key={announcement.id} 
                                            announcement={announcement} 
                                            expired={true} 
                                            delete={e => {this.delete(announcement.id)}}>
                                        </AnnouncementListItem>
                                    ))
                                }
                            </MDBTabPane>
                        </MDBTabContent>
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
                        <MDBIcon icon="edit" className="indigo-text ml-2" onClick={this.props.edit} />
                        <MDBIcon icon="trash-alt" className="indigo-text ml-2" onClick={this.props.delete} />
                    </div>
                }
                {
                    this.props.expired &&
                    <div className="h6">{announcement.title} 
                        <MDBIcon icon="edit" className="blue-grey-text ml-2" />
                        <MDBIcon icon="trash-alt" className="indigo-text ml-2" onClick={this.props.delete} />
                    </div>
                }
                
                <MDBIcon icon="user" className="mr-2 fa-fw" />
                by {announcement.createdBy}<br />
                <MDBIcon icon="calendar-alt" className="mr-2 fa-fw" />
                on {announcement.createdDt}
                <div className="mb-2"></div>
                {announcement.content}
            </div>
        </div>
    }
}

export default styled(ModuleAnnouncementsPage)`
.module-content{
    margin-left: 270px;
    margin-top: 40px;
    z-index: 1031;
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


import React, { Component } from 'react';
import { MDBListGroup, MDBListGroupItem, MDBIcon } from 'mdbreact';
import { NavLink } from 'react-router-dom';
import { observer, inject } from 'mobx-react'

@inject('dataStore')
@observer
class ModuleSideNavigation extends Component {

    clickLink = () => {
        var a = document.createElement('a');
        a.href = `/modules/${this.props.moduleId}/files`;
        a.click();
        return;
    }

    updatePath = (path) => {
        this.props.dataStore.setPath(path);
    }

    render() {
        let moduleId = this.props.moduleId;
        let activeTab = this.props.activeTab;
        return (
            <div className="sidebar-module-fixed position-fixed" style={{ backgroundColor: "#F5F5F5" }}>

                <MDBListGroup className="list-group-flush">
                    <NavLink exact={true} to={`/modules/${moduleId}/`} activeClassName="activeClass" onClick={() => this.updatePath(`/modules/${moduleId}/`)}>
                        <MDBListGroupItem style={{ backgroundColor: "#F5F5F5" }}>
                            <MDBIcon icon="align-left" className="mr-3 fa-fw" />
                            Module Overview
                        </MDBListGroupItem>
                    </NavLink>
                    <NavLink to={`/modules/${moduleId}/moduleDetails`} activeClassName="activeClass" onClick={() => this.updatePath(`/modules/${moduleId}/moduleDetails`)}>
                        <MDBListGroupItem style={{ backgroundColor: "#F5F5F5" }}>
                            <MDBIcon icon="book-open" className="mr-3 fa-fw" />
                            Module Details
                        </MDBListGroupItem>
                    </NavLink>
                    <NavLink to={`/modules/${moduleId}/students`} activeClassName="activeClass" onClick={() => this.updatePath(`/modules/${moduleId}/students`)}>
                        <MDBListGroupItem style={{ backgroundColor: "#F5F5F5" }}>
                            <MDBIcon icon="users" className="mr-3 fa-fw" />
                            Class & Groups
                        </MDBListGroupItem>
                    </NavLink>
                    <NavLink to={`/modules/${moduleId}/announcements`} activeClassName="activeClass" onClick={() => this.updatePath(`/modules/${moduleId}/announcements`)}>
                        <MDBListGroupItem style={{ backgroundColor: "#F5F5F5" }}>
                            <MDBIcon icon="bell" className="mr-3 fa-fw" />
                            Announcements
                        </MDBListGroupItem>
                    </NavLink>
                    <NavLink to={`/modules/${moduleId}/files`} activeClassName="activeClass" onClick={() => this.updatePath(`/modules/${moduleId}/files`)}>
                        <MDBListGroupItem onClick={e => this.clickLink()} style={{ backgroundColor: "#F5F5F5" }}>
                            <MDBIcon icon="file" className="mr-3 fa-fw" />
                            Files
                        </MDBListGroupItem>
                    </NavLink>
                    <NavLink to={`/modules/${moduleId}/forum/topics`} activeClassName="activeClass" onClick={() => this.updatePath(`/modules/${moduleId}/forum/topics`)}>
                        <MDBListGroupItem style={{ backgroundColor: "#F5F5F5" }}>
                            <MDBIcon icon="comments" className="mr-3 fa-fw" />
                            Forum
                        </MDBListGroupItem>
                    </NavLink>
                    <NavLink to={`/modules/${moduleId}/gradebook`} activeClassName="activeClass" onClick={() => this.updatePath(`/modules/${moduleId}/gradebook`)}>
                        <MDBListGroupItem style={{ backgroundColor: "#F5F5F5" }}>
                            <MDBIcon icon="map" className="mr-3 fa-fw" />
                            Gradebook
                        </MDBListGroupItem>
                    </NavLink>
                    <NavLink to={`/modules/${moduleId}/quiz`} activeClassName="activeClass" onClick={() => this.updatePath(`/modules/${moduleId}/quiz`)}>
                        <MDBListGroupItem style={{ backgroundColor: "#F5F5F5" }}>
                            <MDBIcon icon="star" className="mr-3 fa-fw" />
                            Quiz
                        </MDBListGroupItem>
                    </NavLink>
                    <NavLink to={`/modules/${moduleId}/multimedia`} activeClassName="activeClass" onClick={() => this.updatePath(`/modules/${moduleId}/multimedia`)}>
                        <MDBListGroupItem style={{ backgroundColor: "#F5F5F5" }}>
                            <MDBIcon icon="video" className="mr-3 fa-fw" />
                            Multimedia
                        </MDBListGroupItem>
                    </NavLink>
                    <NavLink to={`/modules/${moduleId}/consultation`} activeClassName="activeClass" onClick={() => this.updatePath(`/modules/${moduleId}/consultation`)}>
                        <MDBListGroupItem style={{ backgroundColor: "#F5F5F5" }}>
                            <MDBIcon icon="calendar-alt" className="mr-3 fa-fw" />
                            Consultation
                        </MDBListGroupItem>
                    </NavLink>
                    <NavLink to={`/modules/${moduleId}/attendance`} activeClassName="activeClass" onClick={() => this.updatePath(`/modules/${moduleId}/attendance`)}>
                        <MDBListGroupItem style={{ backgroundColor: "#F5F5F5" }}>
                            <MDBIcon icon="calendar-check" className="mr-3 fa-fw" />
                            Attendance
                        </MDBListGroupItem>
                    </NavLink>
                    <NavLink to={`/modules/${moduleId}/feedback`} activeClassName="activeClass" onClick={() => this.updatePath(`/modules/${moduleId}/feedback`)}>
                        <MDBListGroupItem style={{ backgroundColor: "#F5F5F5" }}>
                            <MDBIcon icon="comment-alt" className="mr-3 fa-fw" />
                            Feedback
                        </MDBListGroupItem>
                    </NavLink>
                    <NavLink to={`/modules/${moduleId}/analytics`} activeClassName="activeClass" onClick={() => this.updatePath(`/modules/${moduleId}/analytics`)}>
                        <MDBListGroupItem style={{ backgroundColor: "#F5F5F5" }}>
                            <MDBIcon icon="chart-line" className="mr-3 fa-fw" />
                            Analytics
                        </MDBListGroupItem>
                    </NavLink>
                </MDBListGroup>

            </div>
        );
    }

}

export default ModuleSideNavigation;
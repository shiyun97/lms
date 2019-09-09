import React, {Component} from 'react';
import { MDBListGroup, MDBListGroupItem, MDBIcon } from 'mdbreact';
import { NavLink } from 'react-router-dom';

class ModuleSideNavigation extends Component {

    render() {
        let moduleId = this.props.moduleId;
        let currentTab = this.props.currentTab;
        return (
            <div className="sidebar-module-fixed position-fixed">
                
                <MDBListGroup className="list-group-flush">
                    <NavLink exact={true} to={`/modules/${moduleId}/`} activeClassName="activeClass">
                        <MDBListGroupItem>
                            <MDBIcon icon="align-left" className="mr-3 fa-fw"/>
                            Module Overview
                        </MDBListGroupItem>
                    </NavLink>
                    <NavLink to={`/modules/${moduleId}/moduleDetails`} activeClassName="activeClass">
                        <MDBListGroupItem>
                            <MDBIcon icon="book-open" className="mr-3 fa-fw"/>
                            Module Details
                        </MDBListGroupItem>
                    </NavLink>
                    <NavLink to={`/modules/${moduleId}/student-roster`} activeClassName="activeClass">
                        <MDBListGroupItem>
                            <MDBIcon icon="users" className="mr-3 fa-fw"/>
                            Class & Groups
                        </MDBListGroupItem>
                    </NavLink>
                    <NavLink to={`/modules/${moduleId}/announcements`} activeClassName="activeClass">
                        <MDBListGroupItem>
                            <MDBIcon icon="bell" className="mr-3 fa-fw"/>
                            Announcements
                        </MDBListGroupItem>
                    </NavLink>
                    <NavLink to={`/modules/${moduleId}/files`} activeClassName="activeClass">
                        <MDBListGroupItem>
                            <MDBIcon icon="file" className="mr-3 fa-fw"/>
                            Files
                        </MDBListGroupItem>
                    </NavLink>
                    <NavLink to={`/modules/${moduleId}/forum`} activeClassName="activeClass">
                        <MDBListGroupItem>
                            <MDBIcon icon="comments" className="mr-3 fa-fw"/>
                            Forum
                        </MDBListGroupItem>
                    </NavLink>
                    <NavLink to={`/modules/${moduleId}/gradebook`} activeClassName="activeClass">
                        <MDBListGroupItem>
                            <MDBIcon icon="map" className="mr-3 fa-fw"/>
                            Gradebook
                        </MDBListGroupItem>
                    </NavLink>
                    <NavLink to={`/modules/${moduleId}/quiz`} activeClassName="activeClass">
                        <MDBListGroupItem>
                            <MDBIcon icon="star" className="mr-3 fa-fw"/>
                            Quiz
                        </MDBListGroupItem>
                    </NavLink>
                    <NavLink to={`/modules/${moduleId}/multimedia`} activeClassName="activeClass">
                        <MDBListGroupItem>
                            <MDBIcon icon="video" className="mr-3 fa-fw"/>
                            Multimedia
                        </MDBListGroupItem>
                    </NavLink>
                    <NavLink to={`/modules/${moduleId}/consultation`} activeClassName="activeClass">
                        <MDBListGroupItem>
                            <MDBIcon icon="calendar-alt" className="mr-3 fa-fw"/>
                            Consultation
                        </MDBListGroupItem>
                    </NavLink>
                </MDBListGroup>
                
            </div>
        );
    }
    
}

export default ModuleSideNavigation;
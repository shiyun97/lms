import React, {Component} from 'react';
import { MDBListGroup, MDBListGroupItem, MDBIcon } from 'mdbreact';
import { NavLink } from 'react-router-dom';

class ModuleSideNavigation extends Component {

    render() {
        return (
            <div className="sidebar-module-fixed position-fixed">
                
                <MDBListGroup className="list-group-flush">
                    <NavLink exact={true} to="/" activeClassName="activeClass">
                        <MDBListGroupItem>
                            <MDBIcon icon="align-left" className="mr-3 fa-fw"/>
                            Module Overview
                        </MDBListGroupItem>
                    </NavLink>
                    <NavLink to="#!" activeClassName="activeClass">
                        <MDBListGroupItem>
                            <MDBIcon icon="book-open" className="mr-3 fa-fw"/>
                            Module Details
                        </MDBListGroupItem>
                    </NavLink>
                    <NavLink to="/tables" activeClassName="activeClass">
                        <MDBListGroupItem>
                            <MDBIcon icon="users" className="mr-3 fa-fw"/>
                            Class & Groups
                        </MDBListGroupItem>
                    </NavLink>
                    <NavLink to="/announcement" activeClassName="activeClass">
                        <MDBListGroupItem>
                            <MDBIcon icon="bell" className="mr-3 fa-fw"/>
                            Announcements
                        </MDBListGroupItem>
                    </NavLink>
                    <NavLink to="/maps" activeClassName="activeClass">
                        <MDBListGroupItem>
                            <MDBIcon icon="file" className="mr-3 fa-fw"/>
                            Files
                        </MDBListGroupItem>
                    </NavLink>
                    <NavLink to="/maps" activeClassName="activeClass">
                        <MDBListGroupItem>
                            <MDBIcon icon="comments" className="mr-3 fa-fw"/>
                            Forum
                        </MDBListGroupItem>
                    </NavLink>
                    <NavLink to="/maps" activeClassName="activeClass">
                        <MDBListGroupItem>
                            <MDBIcon icon="map" className="mr-3 fa-fw"/>
                            Gradebook
                        </MDBListGroupItem>
                    </NavLink>
                    <NavLink to="/maps" activeClassName="activeClass">
                        <MDBListGroupItem>
                            <MDBIcon icon="star" className="mr-3 fa-fw"/>
                            Quiz
                        </MDBListGroupItem>
                    </NavLink>
                    <NavLink to="/maps" activeClassName="activeClass">
                        <MDBListGroupItem>
                            <MDBIcon icon="video" className="mr-3 fa-fw"/>
                            Web Lectures
                        </MDBListGroupItem>
                    </NavLink>
                    <NavLink to="/maps" activeClassName="activeClass">
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
import React from 'react';
import { MDBListGroup, MDBListGroupItem, MDBIcon } from 'mdbreact';
import { NavLink } from 'react-router-dom';

const SideNav = () => {
    return (
        <div className="sidebar-fixed position-fixed">
            <MDBListGroup className="list-group-flush">
                <NavLink exact={true} to="/" activeClassName="activeClass">
                    <MDBListGroupItem style={{backgroundColor: "#000"}}>
                        <MDBIcon icon="chart-pie" className="mr-3"/>
                        <br/>Dashboard
                    </MDBListGroupItem>
                </NavLink>
                <NavLink to="/profile" activeClassName="activeClass">
                    <MDBListGroupItem style={{backgroundColor: "#000"}}>
                        <MDBIcon icon="user" className="mr-3"/>
                        <br/>Profile
                    </MDBListGroupItem>
                </NavLink>
                <NavLink to="/tables" activeClassName="activeClass">
                    <MDBListGroupItem style={{backgroundColor: "#000"}}>
                        <MDBIcon icon="table" className="mr-3"/>
                        <br/>Tables
                    </MDBListGroupItem>
                </NavLink>
                <NavLink to="/maps" activeClassName="activeClass">
                    <MDBListGroupItem style={{backgroundColor: "#000"}}>
                        <MDBIcon icon="map" className="mr-3"/>
                        <br/>Maps
                    </MDBListGroupItem>
                </NavLink>
                <NavLink to="/404" activeClassName="activeClass">
                    <MDBListGroupItem style={{backgroundColor: "#000"}}>
                        <MDBIcon icon="exclamation" className="mr-3"/>
                        <br/>404
                    </MDBListGroupItem>
                </NavLink>
            </MDBListGroup>
        </div>
    );
}

export default SideNav;
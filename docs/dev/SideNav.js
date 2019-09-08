import React from 'react';
import { MDBListGroup, MDBListGroupItem, MDBIcon } from 'mdbreact';
import { NavLink } from 'react-router-dom';

const SideNav = () => {
    return (
        <div className="sidebar-fixed position-fixed">
            <div style={{ backgroundColor: "#000", padding: "0px", paddingTop: "10px", paddingBottom: "70px", textAlign: "center", color: "#fff" }}>
                <MDBIcon icon="graduation-cap" />
                <br /> <p style={{ fontSize: "10px" }}>LUMINUS</p>
            </div>
            <MDBListGroup className="list-group-flush">
                <NavLink exact={true} to="/" activeClassName="activeClass">
                    <MDBListGroupItem style={{ backgroundColor: "#000", padding: "0px", paddingTop: "10px", paddingBottom: "2px", textAlign: "center" }}>
                        <MDBIcon icon="chart-pie" />
                        <br /> <p style={{ fontSize: "10px" }}>Dashboard</p>
                    </MDBListGroupItem>
                </NavLink>
                <NavLink to="/tables" activeClassName="activeClass">
                    <MDBListGroupItem style={{ backgroundColor: "#000", padding: "0px", paddingTop: "10px", paddingBottom: "2px", textAlign: "center" }}>
                        <MDBIcon icon="table" />
                        <br /> <p style={{ fontSize: "10px" }}>Modules</p>
                    </MDBListGroupItem>
                </NavLink>
                <NavLink to="/maps" activeClassName="activeClass">
                    <MDBListGroupItem style={{ backgroundColor: "#000", padding: "0px", paddingTop: "10px", paddingBottom: "2px", textAlign: "center" }}>
                        <MDBIcon icon="envelope" />
                        <br /> <p style={{ fontSize: "10px" }}>Inbox</p>
                    </MDBListGroupItem>
                </NavLink>
                <NavLink to="/profile" activeClassName="activeClass">
                    <MDBListGroupItem style={{ backgroundColor: "#000", padding: "0px", paddingTop: "10px", paddingBottom: "2px", textAlign: "center" }}>
                        <MDBIcon icon="user" />
                        <br /> <p style={{ fontSize: "10px" }}>Account</p>
                    </MDBListGroupItem>
                </NavLink>
                <NavLink to="/404" activeClassName="activeClass">
                    <MDBListGroupItem style={{ backgroundColor: "#000", position: "absolute", bottom: "0px", paddingLeft: "22px", paddingBottom: "2px", textAlign: "center" }}>
                        <MDBIcon icon="question-circle" />
                        <br /> <p style={{ fontSize: "10px" }}>Help</p>
                    </MDBListGroupItem>
                </NavLink>
            </MDBListGroup>
        </div>
    );
}

export default SideNav;
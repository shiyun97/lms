import React, { Component } from 'react';
import { MDBListGroup, MDBListGroupItem, MDBIcon } from 'mdbreact';
import { NavLink } from 'react-router-dom';
import { observer, inject } from 'mobx-react'

@inject('dataStore')
@observer
class SideNav extends Component {

    logOutUser = () => {
        this.props.dataStore.setSignOutStatus();
    }
    render() {
        return (
            <div className="sidebar-fixed position-fixed">
                <div style={{ backgroundColor: "#000", padding: "0px", paddingTop: "10px", paddingBottom: "70px", textAlign: "center", color: "#fff" }}>
                    <MDBIcon icon="graduation-cap" />
                    <br /> <p style={{ fontSize: "10px" }}>LUMINUS</p>
                </div>
                <MDBListGroup className="list-group-flush">
                    <NavLink to="/dashboard" activeClassName="activeClass">
                        <MDBListGroupItem style={{ backgroundColor: "#000", padding: "0px", paddingTop: "10px", paddingBottom: "2px", textAlign: "center" }}>
                            <MDBIcon icon="chart-pie" />
                            <br /> <p style={{ fontSize: "10px" }}>Dashboard</p>
                        </MDBListGroupItem>
                    </NavLink>
                    <NavLink to="/modules" activeClassName="activeClass">
                        <MDBListGroupItem style={{ backgroundColor: "#000", padding: "0px", paddingTop: "10px", paddingBottom: "2px", textAlign: "center" }}>
                            <MDBIcon icon="table" />
                            <br /> <p style={{ fontSize: "10px" }}>Modules</p>
                        </MDBListGroupItem>
                    </NavLink>
                    <NavLink to="/coursesDashboard" activeClassName="activeClass">
                        <MDBListGroupItem style={{ backgroundColor: "#000", padding: "0px", paddingTop: "10px", paddingBottom: "2px", textAlign: "center" }}>
                            <MDBIcon icon="book" />
                            <br /> <p style={{ fontSize: "10px" }}>Courses</p>
                        </MDBListGroupItem>
                    </NavLink>
                    {/* UsersPage Link For Admin */}
                    <NavLink to="/users" activeClassName="activeClass">
                        <MDBListGroupItem style={{ backgroundColor: "#000", padding: "0px", paddingTop: "10px", paddingBottom: "2px", textAlign: "center" }}>
                            <MDBIcon icon="users-cog" />
                            <br /> <p style={{ fontSize: "10px" }}>Users</p>
                        </MDBListGroupItem>
                    </NavLink>
                    <NavLink to="/account/:accountid" activeClassName="activeClass">
                        <MDBListGroupItem style={{ backgroundColor: "#000", padding: "0px", paddingTop: "10px", paddingBottom: "2px", textAlign: "center" }}>
                            <MDBIcon icon="user" />
                            <br /> <p style={{ fontSize: "10px" }}>Account</p>
                        </MDBListGroupItem>
                    </NavLink>
                    <NavLink onClick={() => this.logOutUser()} to="/login" activeClassName="activeClass">
                        <MDBListGroupItem style={{ backgroundColor: "#000", position: "absolute", bottom: "0px", paddingBottom: "2px", textAlign: "center" }}>
                            <MDBIcon icon="sign-out-alt" />
                            <br /> <p style={{ fontSize: "10px" }}>Logout</p>
                        </MDBListGroupItem>
                    </NavLink>
                </MDBListGroup>
            </div>
        )
    };
}

export default SideNav;
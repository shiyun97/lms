import React, { Component } from "react";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavItem,
  MDBFooter,
  MDBNavLink
} from "mdbreact";
import { BrowserRouter as Router } from "react-router-dom";
import SideNav from './dev/SideNav';
import Routes from "./Routes";
import { observer, inject } from 'mobx-react'

@inject('dataStore')
@observer
class App extends Component {
  state = {
    collapseID: ""
  };

  componentDidMount() {
    if (sessionStorage.getItem("email") !== null) {
      let email = sessionStorage.getItem("email")
      let password = sessionStorage.getItem("password")
      let accessRight = sessionStorage.getItem("accessRight")
      let userId = sessionStorage.getItem("userId")
      let gender = sessionStorage.getItem("gender")
      let firstName = sessionStorage.getItem("firstName")
      let lastName = sessionStorage.getItem("lastName")
      let username = sessionStorage.getItem("username")
      let path = sessionStorage.getItem("path")
      path !== null && this.props.dataStore.setPath(path)
      this.props.dataStore.setSignInStatus(true, email, password, accessRight)
      this.props.dataStore.setUserDetails(userId, gender, firstName, lastName, username)
    }
  }

  toggleCollapse = collapseID => () =>
    this.setState(prevState => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : ""
    }));

  closeCollapse = collapseID => () => {
    window.scrollTo(0, 0);
    this.state.collapseID === collapseID && this.setState({ collapseID: "" });
  };

  render() {
    const overlay = (
      <div
        id="sidenav-overlay"
        style={{ backgroundColor: "transparent" }}
        onClick={this.toggleCollapse("mainNavbarCollapse")}
      />
    );

    const { collapseID } = this.state;
    return (
      <Router>
        <SideNav />
        <div className="flyout">
          {/* <MDBNavbar color="indigo" dark expand="md" scrolling fixed="top">
            <MDBNavbarBrand href="/" className="py-0 font-weight-bold" style={{ paddingLeft: "80px" }}>
              <img src="https://img.icons8.com/ios-filled/50/ffffff/graduation-cap.png" style={{ height: "1.5rem", width: "2rem", paddingRight: "10px" }} />
              <strong className="align-middle">FLIPIT</strong>
            </MDBNavbarBrand>
            <MDBNavbarToggler
              onClick={this.toggleCollapse("mainNavbarCollapse")}
            />
            <MDBCollapse
              id="mainNavbarCollapse"
              isOpen={this.state.collapseID}
              navbar
            >
              <MDBNavbarNav right>
                <MDBNavItem>
                  <MDBNavLink
                    exact
                    to="/home"
                    onClick={this.closeCollapse("mainNavbarCollapse")}
                  >
                    <strong>Home</strong>
                  </MDBNavLink>
                </MDBNavItem>
              </MDBNavbarNav>
            </MDBCollapse>
          </MDBNavbar> */}
          {collapseID && overlay}
          {/* <main style={{ marginTop: "3rem" }}> */}
          <main>
            <Routes />
          </main>
          <MDBFooter color="indigo">
            <p className="footer-copyright mb-0 py-3 text-center">
              &copy; {new Date().getFullYear()} Copyright FlipIt Learning Management Platform
            </p>
          </MDBFooter>
        </div>
      </Router>
    );
  }
}

export default App;

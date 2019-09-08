import React, { Component } from "react";
import {
  MDBContainer,
  MDBTabPane,
  MDBNavItem,
  MDBNavLink,
  MDBTabContent,
  MDBRow,
  MDBCol,
  MDBNav
} from "mdbreact";

class CourseManagementMyCourses extends Component {
  state = {
    activeItem: "1"
  };

  heading = () => {
    return (
      <div>
        <h3>
          <b>My Courses</b>
        </h3>
        <hr />
      </div>
    );
  };

  toggle = tab => e => {
    if (this.state.activeItem !== tab) {
      this.setState({
        activeItem: tab
      });
    }
  };

  getAllEnrolledCourses = () => {
      return (
          <h1>All enrolled courses</h1>
      )
  }

  getWishList = () => {
      return (
          <h1> wishlist</h1>
      )
  }

  tab = () => {
    return (
      <MDBContainer>
        <MDBRow>
          <MDBCol md="12">
            <MDBNav className="nav-tabs">
              <MDBNavItem>
                <MDBNavLink
                  active={this.state.activeItem === "1"}
                  onClick={this.toggle("1")}
                  role="tab"
                >
                  All Courses
                </MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBNavLink
                  to="#"
                  active={this.state.activeItem === "2"}
                  onClick={this.toggle("2")}
                  role="tab"
                >
                  Wish List
                </MDBNavLink>
              </MDBNavItem>
            </MDBNav>
            <MDBTabContent activeItem={this.state.activeItem}>
              <MDBTabPane tabId="1" role="tabpanel">
                {this.getAllEnrolledCourses()}
              </MDBTabPane>
              <MDBTabPane tabId="2" role="tabpanel">
                {this.getWishList()}
              </MDBTabPane>
            </MDBTabContent>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  };

  render() {
    return (
      <MDBContainer className="mt-5">
        {this.heading()}
        {this.tab()}

        <br />
      </MDBContainer>
    );
  }
}

export default CourseManagementMyCourses;

import React, { Component } from "react";
import {
  MDBContainer, MDBTabPane, MDBNavItem, MDBNavLink, MDBTabContent, MDBRow, MDBCol, MDBNav, MDBFormInline, MDBIcon,
  MDBDropdown, MDBDropdownItem, MDBDropdownMenu, MDBDropdownToggle, MDBCardBody, MDBCardText, MDBCardImage, MDBCard, MDBCardTitle, MDBCardGroup
} from "mdbreact";
import axios from "axios";
import CoursepackCoursesTeacher from "./Teacher/CoursepackCoursesTeacher";

const API = "http://localhost:3001"

class CoursepackEnrolledCourses extends Component {
  state = {
    activeItem: "1",
    searchItem: "",
    enrolled: "",
  };

  componentDidMount() {
    axios.get(`${API}/coursepack`)
      .then(result => {
        this.setState({ userList: result.data.userList })
      })
      .catch(error => {
        console.error("error in axios " + error);
      });
  }

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

  handleChange = (event) => {
    this.setState({ searchItem: event.target.value })
  }

  getAllEnrolledCourses = () => {
    return (
      <MDBContainer>
        <MDBFormInline className="md-form">
          <MDBIcon icon="search" />
          <input
            className="form-control form-control-sm ml-3 w-75"
            type="text"
            placeholder="Search"
            aria-label="Search"
            onChange={this.handleChange}
          />

          <MDBDropdown>
            <MDBDropdownToggle caret color="ins">
              Recently Accessed
          </MDBDropdownToggle>
            <MDBDropdownMenu>
              <MDBDropdownItem>Recently Enrolled</MDBDropdownItem>
              <MDBDropdownItem>Alphebatical (A-Z)</MDBDropdownItem>
            </MDBDropdownMenu>
          </MDBDropdown>
        </MDBFormInline>

        {this.displayEnrolledCourses()}

      </MDBContainer>
    );
  };

  displayEnrolledCourses = () => {
    return (

      <MDBCardGroup deck className="mt-3">
        <MDBCard>
          <MDBCardImage
            src="https://mdbootstrap.com/img/Photos/Others/images/16.jpg"
            alt="MDBCard image cap"
            top
            hover
            overlay="white-slight"
          />
          <MDBCardBody>
            <MDBCardTitle tag="h5">Course Title</MDBCardTitle>
            <MDBCardText>Prof Name</MDBCardText>
            <MDBCardText>Rating</MDBCardText>
            <MDBCardText>Price</MDBCardText>
          </MDBCardBody>
        </MDBCard>

        <MDBCard>
          <MDBCardImage
            src="https://mdbootstrap.com/img/Photos/Others/images/14.jpg"
            alt="MDBCard image cap"
            top
            hover
            overlay="white-slight"
          />

          <MDBCardBody>
            <MDBCardTitle tag="h5">Course Title</MDBCardTitle>
            <MDBCardText>Prof Name</MDBCardText>
            <MDBCardText>Rating</MDBCardText>
            <MDBCardText>Price</MDBCardText>
          </MDBCardBody>
        </MDBCard>

        <MDBCard>
          <MDBCardImage
            src="https://mdbootstrap.com/img/Photos/Others/images/15.jpg"
            alt="MDBCard image cap"
            top
            hover
            overlay="white-slight"
          />

          <MDBCardBody>
            <MDBCardTitle tag="h5">Course Title</MDBCardTitle>
            <MDBCardText>Prof Name</MDBCardText>
            <MDBCardText>Rating</MDBCardText>
            <MDBCardText>Price</MDBCardText>
          </MDBCardBody>
        </MDBCard>

        <MDBCard>
          <MDBCardImage
            src="https://mdbootstrap.com/img/Photos/Others/images/15.jpg"
            alt="MDBCard image cap"
            top
            hover
            overlay="white-slight"
          />

          <MDBCardBody>
            <MDBCardTitle tag="h5">Course Title</MDBCardTitle>
            <MDBCardText>Prof Name</MDBCardText>
            <MDBCardText>Rating</MDBCardText>
            <MDBCardText>Price</MDBCardText>
          </MDBCardBody>
        </MDBCard>
      </MDBCardGroup>

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
                  to='#'
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
                  In progress
                </MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBNavLink
                  to="#"
                  active={this.state.activeItem === "3"}
                  onClick={this.toggle("3")}
                  role="tab"
                >
                  Completed
                </MDBNavLink>
              </MDBNavItem>
            </MDBNav>
            <MDBTabContent activeItem={this.state.activeItem}>
              <MDBTabPane tabId="1" role="tabpanel">
                {this.getAllEnrolledCourses()}
              </MDBTabPane>
              <MDBTabPane tabId="2" role="tabpanel">
                {/* {this.getWishList()} */}
              </MDBTabPane>
              <MDBTabPane tabId="2" role="tabpanel">
                {/* {this.getWishList()} */}
              </MDBTabPane>
            </MDBTabContent>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  };

  render() {
    if (sessionStorage.getItem("accessRight") === "Teacher") {
      return (
        <MDBContainer style={{ paddingBottom: 240 }}>
          <CoursepackCoursesTeacher />
        </MDBContainer>
      )
    } else {
      return (
        <MDBContainer className="mt-5">
          {this.heading()}
          {this.tab()}
          <br />
        </MDBContainer>
      )
    };
  }
}

export default CoursepackEnrolledCourses;

import React, { Component } from "react";
import {
  MDBContainer, MDBCarouselInner, MDBView, MDBCarouselItem, MDBCarousel, MDBCol, MDBBtn, MDBRow,
  MDBCard, MDBCardImage, MDBCardGroup, MDBCardBody, MDBCardText, MDBCardTitle
} from "mdbreact";
import axios from "axios";
import { NavLink, Redirect, Route } from 'react-router-dom'
import { CardActionArea, CardMedia, CardContent, Typography, CardActions, Button, Card } from "@material-ui/core";
import ModuleSideNavigation from "./ModuleSideNavigation";
import ModuleSideNavigationDropdown from "./ModuleSideNavigationDropdown";
import CoursepackDashboardPageTeacher from "./Teacher/CoursepackDashboardPageTeacher";
import CoursepackDashboardPageStudent from "./Student/CoursepackDashbaordPageStudent";

const API = "http://localhost:3001"

class CoursepackDashboard extends Component {

  render() {
    let accessRight = localStorage.getItem("accessRight")
    return (
      <MDBContainer style={{ paddingBottom: 240 }}>
        <MDBRow>
          <MDBCol md="8" className="mt-4">
            <h2 className="font-weight-bold" style={{ paddingTop: 50 }}>
              Coursepack
          </h2>
          </MDBCol>
          {accessRight === "Student" && <CoursepackDashboardPageStudent />}
          {/*  {accessRight === "Public" && <CoursepackDashboardPageStudent />} TODO: */}
          {accessRight === "Teacher" && <CoursepackDashboardPageTeacher />}

        </MDBRow>
      </MDBContainer>
    )
  }
}

export default CoursepackDashboard;

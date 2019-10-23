import React, { Component } from "react";
import { MDBContainer, MDBCol, MDBRow } from "mdbreact";
import CoursepackDashboardPageTeacher from "./Teacher/CoursepackDashboardPageTeacher";
import CoursepackDashboardPageStudent from "./Student/CoursepackDashbaordPageStudent";


class CoursepackDashboard extends Component {

  render() {
    let accessRight = localStorage.getItem("accessRight")
    return (
      <MDBContainer style={{ paddingBottom: 240 }}>
       <CoursepackDashboardPageTeacher />
          {accessRight === "Student" && <CoursepackDashboardPageStudent />}
          {/*  {accessRight === "Public" && <CoursepackDashboardPageStudent />} TODO: */}
          {accessRight === "Teacher" && <CoursepackDashboardPageTeacher />}

      </MDBContainer>
    )
  }
}

export default CoursepackDashboard;

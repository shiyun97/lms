import React, { Component } from "react";
import { MDBContainer, MDBCol, MDBRow } from "mdbreact";
import CoursepackDashboardPageTeacher from "./Teacher/CoursepackDashboardPageTeacher";
import CoursepackDashboardPageStudent from "./Student/CoursepackDashbaordPageStudent";


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

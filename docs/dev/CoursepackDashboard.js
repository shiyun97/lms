import React, { Component } from "react";
import { MDBContainer, MDBCol, MDBRow } from "mdbreact";
import CoursepackDashboardPageTeacher from "./Teacher/CoursepackDashboardPageTeacher";
import CoursepackDashboardPageStudent from "./Student/CoursepackDashbaordPageStudent";


class CoursepackDashboard extends Component {

  render() {
    let accessRight = localStorage.getItem("accessRight")
    return (
      <MDBContainer style={{ paddingBottom: 240 }}>
        <CoursepackDashboardPageStudent />
       {/*    {accessRight === "Student" && <CoursepackDashboardPageStudent />}
          {accessRight === "Public" && <CoursepackDashboardPageStudent />}
          {accessRight === "Teacher" && <CoursepackDashboardPageTeacher />}
 */}
      </MDBContainer>
    )
  }
}

export default CoursepackDashboard;

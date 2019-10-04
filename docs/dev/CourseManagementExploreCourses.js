import React, { Component } from "react";
import {MDBContainer} from "mdbreact";

class CourseManagementExploreCourses extends Component {

heading = () => {
    return (
      <div>
        <h3><b>Explore Courses</b></h3>
        <hr />
      </div>
    )
}

  render() {
    return (
      <MDBContainer className="mt-5">
        {this.heading()}

        <br />
      </MDBContainer>
    );
  }
}

export default CourseManagementExploreCourses;

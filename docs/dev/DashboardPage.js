import React, { Component } from "react";
import { MDBEdgeHeader, MDBContainer, MDBRow, MDBCol, MDBJumbotron } from "mdbreact";
import axios from "axios";
import { observer, inject } from 'mobx-react';
import DashboardPageTeacher from './Teacher/DashboardPageTeacher';
import DashboardPageStudent from './Student/DashboardPageStudent';
// import UnderMaintenancePage from "./UnderMaintenancePage";
import AccessDeniedPage from "./AccessDeniedPage";
import DashboardPageAdmin from "./Admin/DashboardPageAdmin";

@inject('dataStore')
@observer
class DashboardPage extends Component {

  state = {
    status: "retrieving"
  };

  componentDidMount() {
    axios
      .get(`http://localhost:8080/LMS-war/webresources/studentEnrollment/getCurrentScheduleDetails`)
      .then(result => {
        // console.log(result)
        this.props.dataStore.updateYearSem(result.data.year, result.data.semester);
        this.setState({
          status: "done"
        });
      })
      .catch(error => {
        this.setState({
          status: "error"
        });
        console.error("error in axios " + error);
      });
      window.scrollTo(0, 0)
  }

  render() {
    if (this.props.dataStore.accessRight === "Admin")
      return <DashboardPageAdmin />
    else
      return (
        <>
          <MDBEdgeHeader color="indigo darken-3" className="dashboardPage" />
          <MDBContainer style={{ paddingBottom: 240 }}>
            {this.props.dataStore.accessRight === "Student" && <DashboardPageStudent />}
            {this.props.dataStore.accessRight === "Teacher" && <DashboardPageTeacher />}
            {this.props.dataStore.accessRight === "Public" && <AccessDeniedPage />}
          </MDBContainer>
        </>
      );
  }
}

export default DashboardPage;

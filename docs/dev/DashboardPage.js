import React, { Component } from "react";
import { MDBEdgeHeader, MDBContainer } from "mdbreact";
import axios from "axios";
import { observer, inject } from 'mobx-react';
import DashboardPageTeacher from './Teacher/DashboardPageTeacher';
import DashboardPageStudent from './Student/DashboardPageStudent';

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
  }

  render() {
    return (
      <>
        <MDBEdgeHeader color="indigo darken-3" className="loginPage" />
        <MDBContainer style={{ paddingBottom: 240 }}>
          {this.props.dataStore.accessRight === "Student" ?
            <DashboardPageStudent />
            :
            <DashboardPageTeacher />
          }
        </MDBContainer>
      </>
    );
  }
}

export default DashboardPage;

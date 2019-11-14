import React, { Component } from "react";
import { MDBEdgeHeader, MDBContainer } from "mdbreact";
import axios from "axios";
import { observer, inject } from 'mobx-react';
import DashboardPageTeacher from './Teacher/DashboardPageTeacher';
import DashboardPageStudent from './Student/DashboardPageStudent';
import AccessDeniedPage from "./AccessDeniedPage";
import DashboardPageAdmin from "./Admin/DashboardPageAdmin";
import styled from 'styled-components';
import MainSideNavDropdown from "./MainSideNavDropdown";

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
          <div className={this.props.className}>
            <div className="module-navbar-small">
              <MainSideNavDropdown moduleId={this.props.moduleId} activeTab={'Dashboard'}></MainSideNavDropdown>
            </div>
            <div className="module-content">
              <MDBEdgeHeader color="indigo darken-3" className="dashboardPage" />
              <MDBContainer style={{ paddingBottom: 240 }}>
                {this.props.dataStore.accessRight === "Student" && <DashboardPageStudent />}
                {this.props.dataStore.accessRight === "Teacher" && <DashboardPageTeacher />}
                {this.props.dataStore.accessRight === "Public" && <AccessDeniedPage />}
              </MDBContainer>
            </div>
          </div>
        </>
      );
  }
}

export default styled(DashboardPage)`
.module-content{
    margin-top: 10px;
}
@media screen and (min-width: 800px) {
    .module-content{
        margin: 0px;
    }
    .module-navbar-small{
        display: none;
    }
    .module-sidebar-large{
        display: block;
    }
}
@media screen and (max-width: 800px) {
    .module-sidebar-large{
        display: none;
    }
    .module-navbar-small{
        display: block;
    }
}

.new-paragraph{
    margin-top: 0;
    margin-bottom: 1rem;
}
.align-right{
    float: right;
}
`;

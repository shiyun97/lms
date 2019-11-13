import React, { Component } from "react";
import styled from 'styled-components';
import { MDBContainer } from "mdbreact";
import ModuleSideNavigation from "./ModuleSideNavigation";
import ModuleSideNavigationDropdown from "./ModuleSideNavigationDropdown";
import ModuleAttendancePageTeacher from "./Teacher/ModuleAttendancePageTeacher";
import ModuleAttendancePageStudent from "./Student/ModuleAttendancePageStudent";
import { observer, inject } from 'mobx-react'


const API = "http://localhost:8080/LMS-war/webresources/"

@inject('dataStore')
@observer
class ModuleAttendancePage extends Component {

  state = {
  }

  componentDidMount() {
    this.initPage()
  }

  initPage() {
    let moduleId = this.props.match.params.moduleId;
    if (moduleId) {
      // console.log(moduleId);
      // retrieve module & set state
    }
  }

  render() {
    return (
      <div className={this.props.className}>
        <div className="module-sidebar-large"><ModuleSideNavigation moduleId={this.props.match.params.moduleId}></ModuleSideNavigation></div>
        <div className="module-navbar-small">

{/*           <ModuleSideNavigationDropdown moduleId={this.props.match.params.moduleId} activeTab={'Attendance'}></ModuleSideNavigationDropdown>
 */}        </div>
        <div className="module-content">
          <MDBContainer className="mt-3">
            {this.props.dataStore.accessRight === "Teacher" && <ModuleAttendancePageTeacher moduleId={this.props.match.params.moduleId} />}
            {this.props.dataStore.accessRight === "Student" && <ModuleAttendancePageStudent moduleId={this.props.match.params.moduleId} />}

          </MDBContainer>
        </div>
      </div>
    );
  }
}

export default styled(ModuleAttendancePage)`
.module-content{
        margin - left: 270px;
        margin-top: 40px;
    }
`;
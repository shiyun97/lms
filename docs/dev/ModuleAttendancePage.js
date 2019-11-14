import React, { Component } from "react";
import styled from 'styled-components';
import { MDBContainer } from "mdbreact";
import ModuleSideNavigation from "./ModuleSideNavigation";
import ModuleSideNavigationDropdown from "./ModuleSideNavigationDropdown";
import ModuleAttendancePageTeacher from "./Teacher/ModuleAttendancePageTeacher";
import ModuleAttendancePageStudent from "./Student/ModuleAttendancePageStudent";
import { observer, inject } from 'mobx-react'

@inject('dataStore')
@observer
class ModuleAttendancePage extends Component {

  render() {
    let moduleId = this.props.match.params.moduleId;

    return (
      <div className={this.props.className}>
        <div className="module-sidebar-large">
          <ModuleSideNavigation moduleId={moduleId}></ModuleSideNavigation></div>
        <div className="module-navbar-small">
          <ModuleSideNavigationDropdown moduleId={moduleId}></ModuleSideNavigationDropdown>
        </div>
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
    margin-top: 0px;
}
@media screen and (min-width: 800px) {
    .module-content{
        margin-left: 270px;
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

import React, { Component } from "react";
import styled from 'styled-components';
import { MDBContainer } from "mdbreact";
import ModuleSideNavigation from "./ModuleSideNavigation";
import ModuleSideNavigationDropdown from "./ModuleSideNavigationDropdown";
import ModuleConsultationPageTeacher from "./Teacher/ModuleConsultationPageTeacher";
import { observer, inject } from 'mobx-react'
import ModuleConsultationPageStudent from "./Student/ModuleConsultationPageStudent";

@inject('dataStore')
@observer
class ModuleConsultationPage extends Component {

    state = {
    }

    componentDidMount() {
        this.initPage();
    }

    initPage() {
        let moduleId = this.props.match.params.moduleId;
    }

    render() {
        return (
            <div className={this.props.className}>
                <div className="module-sidebar-large"><ModuleSideNavigation moduleId={this.props.match.params.moduleId}></ModuleSideNavigation></div>
                <div className="module-navbar-small">
                    <ModuleSideNavigationDropdown moduleId={this.props.match.params.moduleId} activeTab={'Consultation'}></ModuleSideNavigationDropdown>
                </div>
                <div className="module-content">
                    <MDBContainer className="mt-3">
                        {this.props.dataStore.accessRight === "Teacher" && <ModuleConsultationPageTeacher />}
                        {this.props.dataStore.accessRight === "Student" && <ModuleConsultationPageStudent />}
                    </MDBContainer>
                </div>
            </div>
        );
    }
}

export default styled(ModuleConsultationPage)`
.module-content{
    margin-top: 40px;
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
`;

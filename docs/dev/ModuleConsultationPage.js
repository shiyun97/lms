import React, { Component } from "react";
import styled from 'styled-components';
import { MDBContainer } from "mdbreact";
import ModuleSideNavigation from "./ModuleSideNavigation";
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
        if (moduleId) {
            console.log(moduleId);
            // retrieve module & set state
        }
    }

    render() {
        return (
            <div className={this.props.className}>
                <ModuleSideNavigation moduleId={this.props.match.params.moduleId}></ModuleSideNavigation>
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
    margin-left: 270px;
    margin-top: 40px;
}
`;

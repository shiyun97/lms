import React, { Component } from "react";
import styled from 'styled-components';
import { MDBContainer, MDBRow, MDBCol, MDBIcon } from "mdbreact";
import ModuleSideNavigation from "./ModuleSideNavigation";
import SectionContainer from "../components/sectionContainer";

class ModuleOverviewPage extends Component {

    state = {
        module:{
            moduleCode: 'IS4103',
            moduleTitle: 'Information Systems Capstone Project',
            moduleSemester: '2019/2020 Semester 1',
            moduleFaculty: 'School of Computing',
            moduleDepartment: 'Information Systems & Analytics',
            openDate: '6 Jun 2019 08:20 am',
            closeDate: '21 Dec 2019 11:59 pm',
            credits: 8
        }
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
        let module = this.state.module;
        return (
            <div className={this.props.className}>
                <ModuleSideNavigation moduleId={this.props.match.params.moduleId}></ModuleSideNavigation>
                <div className="module-content">
                    <MDBContainer>
                        <MDBRow>
                            <MDBCol>
                                <h4 className="mb-4">Module Overview</h4>
                                <SectionContainer className="justify-content d-flex">
                                    <p><div className="h5">{module.moduleCode}</div>
                                    <h6>{module.moduleTitle}</h6>
                                    <MDBIcon icon="graduation-cap" className="mr-2 fa-fw"/>{module.moduleSemester}
                                    <br/>
                                    <MDBIcon icon="building" className="mr-2 fa-fw"/>{module.moduleFaculty} (Dept of {module.moduleDepartment})
                                    <br/>
                                    <MDBIcon icon="calendar-alt" className="mr-2 fa-fw"/>{module.openDate} - {module.closeDate}
                                    <br/>
                                    <MDBIcon icon="cog" className="mr-2 fa-fw"/>{module.credits} MCs
                                    </p>
                                </SectionContainer>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </div>
            </div>
          );
    }
}

export default styled(ModuleOverviewPage)`
.module-content{
    margin-left: 270px;
    margin-top: 40px;
}
`;

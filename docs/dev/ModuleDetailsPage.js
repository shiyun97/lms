import React, { Component } from "react";
import styled from 'styled-components';
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import ModuleSideNavigation from "./ModuleSideNavigation";
import SectionContainer from "../components/sectionContainer";

class ModuleDetailsPage extends Component {

    state = {
        module:{
            moduleDescription: 'Students are required to work (in groups) through a complete Systems Development Life Cycle to develop a business information system based on techniques and tools taught in IS2102, IS2103 and IS3106. They will also sharpen their communication skills through closer team interactions, consultations, and formal presentations. Emphasis will be placed on architecture design and implementation, requirement analysis, system design, user interface design, database design and implementation efficiency. Students will be assessed based on their understanding and ability to apply software engineering knowledge on a real-life application system, as well as their communication skill.',
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
                <ModuleSideNavigation></ModuleSideNavigation>
                <div className="module-content">
                    <MDBContainer>
                        <MDBRow>
                            <MDBCol>
                                <SectionContainer header="Module Details" className="justify-content d-flex">
                                    <p><div className="h5">Description</div>
                                    {module.moduleDescription}
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

export default styled(ModuleDetailsPage)`
.module-content{
    margin-left: 200px;
    margin-top: 40px;
}
`;

import React, { Component } from "react";
import styled from 'styled-components';
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import ModuleSideNavigation from "./ModuleSideNavigation";
import SectionContainer from "../components/sectionContainer";
import SideNav from "./SideNav";

class ModuleFilesPage extends Component {

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
                <ModuleSideNavigation></ModuleSideNavigation>
                <div className="module-content">
                    <MDBContainer>
                        <MDBRow>
                            <MDBCol>
                                <h4 className="mb-4">Files</h4>
                                
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </div>
            </div>
          );
    }
}


export default styled(ModuleFilesPage)`
.module-content{
    margin-left: 200px;
    margin-top: 40px;
}
`;

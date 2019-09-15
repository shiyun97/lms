import React, { Component } from "react";
import styled from 'styled-components';
import { MDBContainer, MDBRow, MDBCol, MDBIcon, MDBBtn, MDBModal, MDBModalBody, MDBModalFooter, MDBModalHeader } from "mdbreact";
import ModuleSideNavigation from "./ModuleSideNavigation";
import SectionContainer from "../components/sectionContainer";

class ModuleDetailsPage extends Component {

    state = {
        module:{
            moduleDescription: 'Students are required to work (in groups) through a complete Systems Development Life Cycle to develop a business information system based on techniques and tools taught in IS2102, IS2103 and IS3106. They will also sharpen their communication skills through closer team interactions, consultations, and formal presentations. Emphasis will be placed on architecture design and implementation, requirement analysis, system design, user interface design, database design and implementation efficiency. Students will be assessed based on their understanding and ability to apply software engineering knowledge on a real-life application system, as well as their communication skill.',
            credits: 8
        },
        toggleEdit: false
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

    toggleModal = nr => () => {
        let modalNumber = "modal" + nr;
        this.setState({
            [modalNumber]: !this.state[modalNumber]
        });
    };

    submitEdit = () => {
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
                                <h4 className="mb-2">Module Details</h4>
                            </MDBCol>
                        </MDBRow>
                        <MDBRow>
                            <MDBCol>
                                <div className="align-right">
                                    <MDBBtn color="blue lighten-2" outline className="mr-0 mb-2" size="md" onClick={this.toggleModal("Edit")}>
                                        <MDBIcon icon="edit" className="mr-1" /> Edit
                                    </MDBBtn>
                                </div>
                            </MDBCol>
                        </MDBRow>
                        <MDBRow>
                            <MDBCol>
                                <MDBModal isOpen={this.state.modalEdit} toggle={this.toggleModal("Edit")}>
                                    <MDBModalHeader
                                        className="text-center"
                                        titleClass="w-100 font-weight-bold"
                                        toggle={this.toggleModal("Edit")}
                                    >
                                        Edit Description
                                    </MDBModalHeader>
                                    <MDBModalBody>
                                        <form className="mx-3 grey-text">
                                            <div className="form-group">
                                                <label htmlFor="description">Description</label>
                                                <textarea className="form-control" id="description" value={this.state.module.moduleDescription} onChange={e => { }} rows={5} />
                                            </div>
                                            <label htmlFor="semester">Semester</label>
                                            <div className="input-group mt-1">
                                                <input
                                                    type="number"
                                                    className="form-control py-0"
                                                    id="semester"
                                                    value={module.moduleSemester} 
                                                    onChange={e => { }}
                                                />
                                                <div className="input-group-prepend" style={{"marginRight":"0px"}}>
                                                    <div className="input-group-text">
                                                        MC
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </MDBModalBody>
                                    <MDBModalFooter className="justify-content-center">
                                        <MDBBtn color="info" onClick={this.submitEdit()}>Submit</MDBBtn>
                                    </MDBModalFooter>
                                </MDBModal>
                            </MDBCol>
                        </MDBRow>
                        <MDBRow>
                            <MDBCol>
                                <SectionContainer className="justify-content d-flex">
                                    <div className="new-paragraph"><div className="h5">Description</div>
                                        {module.moduleDescription}
                                    </div>
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
    margin-left: 270px;
    margin-top: 40px;
}
.new-paragraph{
    margin-top: 0;
    margin-bottom: 1rem;
}
.align-right{
    float: right;
}
`;

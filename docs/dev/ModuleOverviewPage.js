import React, { Component } from "react";
import styled from 'styled-components';
import { MDBContainer, MDBRow, MDBCol, MDBIcon, MDBBtn, MDBModal, MDBModalBody, MDBModalFooter, MDBModalHeader } from "mdbreact";
import ModuleSideNavigation from "./ModuleSideNavigation";
import SectionContainer from "../components/sectionContainer";
import axios from "axios";

class ModuleOverviewPage extends Component {

    state = {
        module:{
        },
        modalEdit: false
    }

    componentDidMount() {
        this.initPage();
    }

    initPage() {
        let moduleId = this.props.match.params.moduleId;
        if (moduleId) {
            console.log(moduleId);
            // retrieve module & set state
            axios
            .get("http://localhost:3001/moduleOverview")
            .then(result => {
                let data = result.data;
                this.setState({
                    module: data
                });
            })
            .catch(error => {
                console.error("error in axios " + error);
            });
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
                                <h4 className="mb-4">Module Overview</h4>
                            </MDBCol>
                        </MDBRow>
                        {/*
                        <MDBRow>
                            <MDBCol>
                                <div className="align-right">
                                    <MDBBtn color="blue lighten-2" outline className="mr-0 mb-2" size="md" onClick={this.toggleModal("Edit")}>
                                        <MDBIcon icon="edit" className="mr-1" /> Edit
                                    </MDBBtn>
                                </div>
                            </MDBCol>
                        </MDBRow>*/}
                        <MDBRow>
                            <MDBCol>
                                <MDBModal isOpen={this.state.modalEdit} toggle={this.toggleModal("Edit")}>
                                    <MDBModalHeader
                                        className="text-center"
                                        titleClass="w-100 font-weight-bold"
                                        toggle={this.toggleModal("Edit")}
                                    >
                                        Edit Overview
                                    </MDBModalHeader>
                                    <MDBModalBody>
                                        <form className="mx-3 grey-text">
                                            <div className="form-group">
                                                <label htmlFor="title">Module Name</label>
                                                <input type="text" className="form-control" id="title" value={module.moduleTitle} onChange={e => {}} />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="semester">Semester</label>
                                                <input type="text" className="form-control" id="semester" value={module.moduleSemester} onChange={e => {}} />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="department">Department</label>
                                                <select className="form-control" value={module.moduleDepartment} onChange={e => {}}>
                                                    <option value="dep1">Information Systems</option>
                                                    <option value="dep2">Information Systems</option>
                                                    <option value="dep3">Information Systems</option>
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="openDate">Open Date</label>
                                                <input type="date" className="form-control" id="openDate" value={module.openDate} onChange={e => {}} />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="closeDate">Close Date</label>
                                                <input type="date" className="form-control" id="closeDate" value={module.closeDate} onChange={e => {}} />
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
                                    <div className="new-paragraph">
                                        <div className="h5">{module.moduleCode}</div>
                                        <h6>{module.moduleTitle}</h6>
                                        <MDBIcon icon="graduation-cap" className="mr-2 fa-fw" />{module.moduleSemester}
                                        <br />
                                        <MDBIcon icon="building" className="mr-2 fa-fw" />{module.moduleFaculty} (Dept of {module.moduleDepartment})
                                        <br />
                                        <MDBIcon icon="calendar-alt" className="mr-2 fa-fw" />{module.openDate} - {module.closeDate}
                                        <br />
                                        <MDBIcon icon="cog" className="mr-2 fa-fw" />{module.credits} MCs
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

export default styled(ModuleOverviewPage)`
.module-content{
    margin-top: 40px;
}
@media (min-width: 1199.98px) {
    .module-content{
        margin-left: 270px;
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

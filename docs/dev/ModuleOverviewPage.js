import React, { Component } from "react";
import styled from 'styled-components';
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBIcon,
    MDBBtn,
    MDBModal,
    MDBModalBody,
    MDBModalFooter,
    MDBModalHeader,
    MDBEdgeHeader,
    MDBJumbotron
} from "mdbreact";
import ModuleSideNavigation from "./ModuleSideNavigation";
import ModuleSideNavigationDropdown from "./ModuleSideNavigationDropdown";
import SectionContainer from "../components/sectionContainer";
import axios from "axios";
import Snackbar from '@material-ui/core/Snackbar';

const API_URL = "http://localhost:8080/LMS-war/webresources";

class ModuleOverviewPage extends Component {

    state = {
        module: {
            moduleId: "",
            code: "",
            title: "",
            semesterOffered: "",
            yearOffered: "",
            creditUnit: "",
            description: "",
            department: "",
            faculty: ""
        },
        modalEdit: false,
        message: "",
        openSnackbar: ""
    }

    handleOpenSnackbar = () => {
        this.setState({ openSnackbar: true });
    };

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ openSnackbar: false });
    };

    componentDidMount() {
        this.initPage();
    }

    initPage() {
        let moduleId = this.props.match.params.moduleId;
        if (moduleId) {
            console.log(moduleId);
            // retrieve module & set state
            axios
                .get(API_URL + "/ModuleMounting/getModule/" + moduleId)
                .then(result => {
                    if (result.data) {
                        let data = result.data;
                        this.setState({
                            module: {
                                moduleId: moduleId,
                                code: data.code,
                                title: data.title,
                                semesterOffered: data.semesterOffered,
                                yearOffered: data.yearOffered,
                                creditUnit: data.creditUnit,
                                description: data.description,
                                department: data.department,
                                faculty: data.faculty
                            }
                        });
                    }
                })
                .catch(error => {
                    this.setState({
                        message: error.response.data.errorMessage,
                        openSnackbar: true
                    });
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
                <div className="module-sidebar-large"><ModuleSideNavigation moduleId={this.props.match.params.moduleId}></ModuleSideNavigation></div>
                <div className="module-navbar-small">
                    <ModuleSideNavigationDropdown moduleId={this.props.match.params.moduleId} activeTab={'Module Overview'}></ModuleSideNavigationDropdown>
                </div>
                <div className="module-content">
                    <MDBEdgeHeader color="indigo darken-3" className="multimediaPage" />
                    <MDBContainer>
                        <MDBRow>
                            <MDBCol md="12" className="mt-3 mx-auto">
                                <MDBJumbotron>
                                    <MDBRow>
                                        <MDBCol>
                                            <h2 className="font-weight-bold">Module Overview</h2>
                                            <br />
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
                                                            <input type="text" className="form-control" id="title" value={module.title} onChange={e => { }} />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="semester">Semester</label>
                                                            <input type="text" className="form-control" id="semester" value={module.semesterOffered} onChange={e => { }} />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="department">Department</label>
                                                            <select className="form-control" value={module.department} onChange={e => { }}>
                                                                <option value="dep1">Information Systems</option>
                                                                <option value="dep2">Information Systems</option>
                                                                <option value="dep3">Information Systems</option>
                                                            </select>
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="openDate">Open Date</label>
                                                            <input type="date" className="form-control" id="openDate" value={module.openDate} onChange={e => { }} />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="closeDate">Close Date</label>
                                                            <input type="date" className="form-control" id="closeDate" value={module.closeDate} onChange={e => { }} />
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
                                                    <div className="h5">{module.code}</div>
                                                    <h6>{module.title}</h6>
                                                    <MDBIcon icon="graduation-cap" className="mr-2 fa-fw" />Semester {module.semesterOffered}
                                                    <br />
                                                    <MDBIcon icon="building" className="mr-2 fa-fw" />{module.faculty} (Department of {module.department})
                                        <br />
                                                    <MDBIcon icon="calendar-alt" className="mr-2 fa-fw" />{module.yearOffered}
                                                    <br />
                                                    <MDBIcon icon="cog" className="mr-2 fa-fw" />{module.creditUnit} MCs
                                    </div>
                                            </SectionContainer>
                                        </MDBCol>
                                    </MDBRow>
                                    <Snackbar
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'left',
                                        }}
                                        open={this.state.openSnackbar}
                                        autoHideDuration={6000}
                                        onClose={this.handleClose}
                                        ContentProps={{
                                            'aria-describedby': 'message-id',
                                        }}
                                        message={<span id="message-id">{this.state.message}</span>}
                                        action={[
                                            <MDBIcon icon="times" color="white" onClick={this.handleClose} style={{ cursor: "pointer" }} />,
                                        ]}
                                    />
                                </MDBJumbotron>
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

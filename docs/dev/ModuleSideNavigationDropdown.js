import React, {Component} from "react";
import { 
    MDBContainer,
    MDBNavbar, 
    MDBNavbarBrand, 
    NavbarNav, 
    MDBNavItem, 
    MDBNavLink, 
    MDBNavbarToggler, 
    MDBCollapse 
} from "mdbreact";

class ModuleSideNavigationDropdown extends Component {

    state = {
        collapseID: ''
      }
      
      toggleCollapse = collapseID => () => {
        this.setState(prevState => ({ collapseID: (prevState.collapseID !== collapseID ? collapseID : '') }));
      }

    render() {
        let moduleId = this.props.moduleId;
        let activeTab = this.props.activeTab;
        return <MDBNavbar color="indigo" dark>
                    <MDBContainer>
                        <MDBNavbarBrand className="white-text">
                        </MDBNavbarBrand>
                        <MDBNavbarToggler className="white-text" onClick={this.toggleCollapse('navbarCollapse1')} />
                        <MDBCollapse id="navbarCollapse1" isOpen={this.state.collapseID} navbar>
                            <NavbarNav left>
                                <MDBNavItem>
                                    <MDBNavLink exact={true} to={`/modules`}>Back to My Modules</MDBNavLink>
                                </MDBNavItem>
                                <MDBNavItem active={activeTab == "Module Overview"}>
                                    <MDBNavLink exact={true} to={`/modules/${moduleId}/`}>Module Overview</MDBNavLink>
                                </MDBNavItem>
                                <MDBNavItem active={activeTab == "Module Details"}>
                                    <MDBNavLink exact={true} to={`/modules/${moduleId}/moduleDetails`}>Module Details</MDBNavLink>
                                </MDBNavItem>
                                <MDBNavItem active={activeTab == "Class & Groups"}>
                                    <MDBNavLink exact={true} to={`/modules/${moduleId}/students`}>Class & Groups</MDBNavLink>
                                </MDBNavItem>
                                <MDBNavItem active={activeTab == "Announcements"}>
                                    <MDBNavLink exact={true} to={`/modules/${moduleId}/announcements`}>Announcements</MDBNavLink>
                                </MDBNavItem>
                                <MDBNavItem active={activeTab == "Files"}>
                                    <MDBNavLink exact={true} to={`/modules/${moduleId}/files`}>Files</MDBNavLink>
                                </MDBNavItem>
                                <MDBNavItem active={activeTab == "Forum"}>
                                    <MDBNavLink exact={true} to={`/modules/${moduleId}/forum`}>Forum</MDBNavLink>
                                </MDBNavItem>
                                <MDBNavItem active={activeTab == "Gradebook"}>
                                    <MDBNavLink exact={true} to={`/modules/${moduleId}/gradebook`}>Gradebook</MDBNavLink>
                                </MDBNavItem>
                                <MDBNavItem active={activeTab == "Quiz"}>
                                    <MDBNavLink exact={true} to={`/modules/${moduleId}/quiz`}>Quiz</MDBNavLink>
                                </MDBNavItem>
                                <MDBNavItem active={activeTab == "Multimedia"}>
                                    <MDBNavLink exact={true} to={`/modules/${moduleId}/multimedia`}>Multimedia</MDBNavLink>
                                </MDBNavItem>
                                <MDBNavItem active={activeTab == "Consultation"}>
                                    <MDBNavLink exact={true} to={`/modules/${moduleId}/consultation`}>Consultation</MDBNavLink>
                                </MDBNavItem>
                                <MDBNavItem active={activeTab == "Attendance"}>
                                    <MDBNavLink exact={true} to={`/modules/${moduleId}/attendance`}>Attendance</MDBNavLink>
                                </MDBNavItem>
                                <MDBNavItem active={activeTab == "Feedback"}>
                                    <MDBNavLink exact={true} to={`/modules/${moduleId}/feedback`}>Feedback</MDBNavLink>
                                </MDBNavItem>
                            </NavbarNav>
                        </MDBCollapse>
                    </MDBContainer>
                </MDBNavbar>
    }
}

export default ModuleSideNavigationDropdown;
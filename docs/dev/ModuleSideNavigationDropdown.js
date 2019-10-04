import React, {Component} from "react";
import { MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBContainer } from "mdbreact";
import { NavLink } from 'react-router-dom';

class ModuleSideNavigationDropdown extends Component {

    render() {
        let moduleId = this.props.moduleId;
        let activeTab = this.props.activeTab;
        return (
            <MDBDropdown>
                <MDBDropdownToggle caret color="primary" outline block>
                    Module Menu
                </MDBDropdownToggle>
                <MDBDropdownMenu style={{width: "100%"}}>
                    <NavLink exact={true} to={`/modules/${moduleId}/`}>
                        <MDBDropdownItem active={activeTab == "overview"}>Module Overview</MDBDropdownItem>
                    </NavLink>
                    <NavLink exact={true} to={`/modules/${moduleId}/moduleDetails`}>
                        <MDBDropdownItem active={activeTab == "details"}>Module Details</MDBDropdownItem>
                    </NavLink>
                    <NavLink exact={true} to={`/modules/${moduleId}/students`}>
                        <MDBDropdownItem active={activeTab == "groups"}>Class & Groups</MDBDropdownItem>
                    </NavLink>
                    <NavLink exact={true} to={`/modules/${moduleId}/announcements`}>
                        <MDBDropdownItem active={activeTab == "announcements"}>Announcements</MDBDropdownItem>
                    </NavLink>
                    <NavLink exact={true} to={`/modules/${moduleId}/files`}>
                        <MDBDropdownItem active={activeTab == "files"}>Files</MDBDropdownItem>
                    </NavLink>
                    <NavLink exact={true} to={`/modules/${moduleId}/forum`}>
                        <MDBDropdownItem active={activeTab == "forum"}>Forum</MDBDropdownItem>
                    </NavLink>
                    <NavLink exact={true} to={`/modules/${moduleId}/gradebook`}>
                        <MDBDropdownItem active={activeTab == "gradebook"}>Gradebook</MDBDropdownItem>
                    </NavLink>
                    <NavLink exact={true} to={`/modules/${moduleId}/quiz`}>
                        <MDBDropdownItem active={activeTab == "quiz"}>Quiz</MDBDropdownItem>
                    </NavLink>
                    <NavLink exact={true} to={`/modules/${moduleId}/multimedia`}>
                        <MDBDropdownItem active={activeTab == "multimedia"}>Multimedia</MDBDropdownItem>
                    </NavLink>
                    <NavLink exact={true} to={`/modules/${moduleId}/consultation`}>
                        <MDBDropdownItem active={activeTab == "consultation"}>Consultation</MDBDropdownItem>
                    </NavLink>
                    <NavLink exact={true} to={`/modules/${moduleId}/attendance`}>
                        <MDBDropdownItem active={activeTab == "attendance"}>Attendance</MDBDropdownItem>
                    </NavLink>
                    <NavLink exact={true} to={`/modules/${moduleId}/feedback`}>
                        <MDBDropdownItem active={activeTab == "feedback"}>Feedback</MDBDropdownItem>
                    </NavLink>
                </MDBDropdownMenu>
            </MDBDropdown>
        );
    }
}

export default ModuleSideNavigationDropdown;
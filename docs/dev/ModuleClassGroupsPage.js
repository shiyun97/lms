import React, { Component } from "react";
import styled from 'styled-components';
import { MDBContainer, MDBRow, MDBCol, MDBIcon, MDBTabPane, MDBTabContent, MDBNav, MDBNavItem, MDBNavLink, MDBDataTable } from "mdbreact";
import ModuleSideNavigation from "./ModuleSideNavigation";

class ModuleClassGroupsPage extends Component {

    state = {
        moduleId: "123",
        activeItem: "Student Roster",
        students: {
            columns: [
                {
                    label: "Name",
                    field: "name",
                    width: 150,
                    attributes: {
                        "aria-controls": "DataTable",
                        "aria-label": "Name"
                    }
                }
            ],
            rows: [
                {
                    name: "Student 1",
                    clickEvent: () => this.testClickEvent(1)
                },
                {
                    name: "Student 2",
                    clickEvent: () => this.testClickEvent(2)
                },
                {
                    name: "Student 3",
                    clickEvent: () => this.testClickEvent(3)
                },
            ]
        },
        classGroups: {
            columns: [
                {
                    label: "Group Name",
                    field: "name",
                    width: 150,
                    attributes: {
                        "aria-controls": "DataTable",
                        "aria-label": "Name"
                    }
                },
                {
                    label: "Description",
                    field: "description",
                    width: 150
                },
                {
                    label: "Current Enrollment",
                    field: "curentEnrollment",
                    width: 150
                },
                {
                    label: "Max Enrollment",
                    field: "maxEnrollment",
                    width: 150
                }
            ],
            rows: [
                {
                    name: "Group 1",
                    currentEnrollment: 5,
                    maxEnrollment: 6,
                    description: "This is Group 1",
                    clickEvent: () => this.testClickEvent(1)
                },
                {
                    name: "Group 2",
                    currentEnrollment: 5,
                    maxEnrollment: 7,
                    description: "This is Group 2",
                    clickEvent: () => this.testClickEvent(2)
                },
                {
                    name: "Group 3",
                    currentEnrollment: 4,
                    maxEnrollment: 6,
                    description: "This is Group 3",
                    clickEvent: () => this.testClickEvent(3)
                },
                {
                    name: "Group 4",
                    currentEnrollment: 3,
                    maxEnrollment: 8,
                    description: "This is Group 4",
                    clickEvent: () => this.testClickEvent(4)
                },
                {
                    name: "Group 5",
                    currentEnrollment: 7,
                    maxEnrollment: 10,
                    description: "This is Group 5",
                    clickEvent: () => this.testClickEvent(5)
                },
            ]
        },
        lectureGroups: {
            columns: [
                {
                    label: "Group Name",
                    field: "name",
                    width: 150,
                    attributes: {
                        "aria-controls": "DataTable",
                        "aria-label": "Name"
                    }
                },
                {
                    label: "Members",
                    field: "count",
                    width: 150
                }
            ],
            rows: [
                {
                    name: "Group 1",
                    count: 16,
                    clickEvent: () => this.testClickEvent(1)
                },
                {
                    name: "Group 2",
                    count: 15,
                    clickEvent: () => this.testClickEvent(2)
                },
                {
                    name: "Group 3",
                    count: 14,
                    clickEvent: () => this.testClickEvent(3)
                },
                {
                    name: "Group 4",
                    count: 13,
                    clickEvent: () => this.testClickEvent(4)
                },
                {
                    name: "Group 5",
                    count: 17,
                    clickEvent: () => this.testClickEvent(5)
                },
            ]
        },
        tutorialGroups: {
            columns: [
                {
                    label: "Group Name",
                    field: "name",
                    width: 150,
                    attributes: {
                        "aria-controls": "DataTable",
                        "aria-label": "Name"
                    }
                },
                {
                    label: "Members",
                    field: "count",
                    width: 150
                }
            ],
            rows: [
                {
                    name: "Group 1",
                    count: 16,
                    clickEvent: () => this.testClickEvent(1)
                },
                {
                    name: "Group 2",
                    count: 15,
                    clickEvent: () => this.testClickEvent(2)
                },
                {
                    name: "Group 3",
                    count: 14,
                    clickEvent: () => this.testClickEvent(3)
                },
                {
                    name: "Group 4",
                    count: 13,
                    clickEvent: () => this.testClickEvent(4)
                },
                {
                    name: "Group 5",
                    count: 17,
                    clickEvent: () => this.testClickEvent(5)
                },
            ]
        }
    }

    toggle = tab => e => {
        if (this.state.activeItem !== tab) {
            this.setState({
                activeItem: tab
            });
        }
    };

    testClickEvent = (param) => {
        console.log(param);
    }


    componentDidMount() {
        this.initPage();
    }

    initPage() {
        let moduleId = this.props.match.params.moduleId;
        let url = this.props.match.url;
        let current = url.split("/").pop();
        let activeTab;
        if (current == "class-groups") {
            activeTab = "Class Groups"
        }
        else if (current == "lecture-groups") {
            activeTab = "Lecture Groups"
        }
        else if (current == "tutorial-groups") {
            activeTab = "Tutorial Groups"
        }
        else {
            activeTab = "Student Roster"
        }
        this.setState({
            activeItem: activeTab
        })
        
        if (moduleId) {
            console.log(moduleId);
            // retrieve module & set state
        }
    }

    render() {
        let students = this.state.students;
        let classGroups = this.state.classGroups;
        let lectureGroups = this.state.lectureGroups;
        let tutorialGroups = this.state.tutorialGroups;
        return (
            <div className={this.props.className}>
                <ModuleSideNavigation moduleId={this.props.match.params.moduleId}></ModuleSideNavigation>
                <div className="module-content">
                    <MDBContainer>
                        <MDBRow>
                            <MDBCol>
                                <h4 className="mb-4">{this.state.activeItem}
                                <MDBIcon icon="angle-right" className="ml-4" />
                                </h4>
                                <hr className="my-4" />
                            </MDBCol>
                        </MDBRow>
                        <MDBNav className="nav-tabs">
                            <MDBNavItem>
                                <MDBNavLink
                                    to={`/modules/${this.state.moduleId}/student-roster`}
                                    active={this.state.activeItem === "Student Roster"}
                                    onClick={this.toggle("Student Roster")}
                                    role="tab"
                                >
                                    Student Roster
                                </MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem>
                                <MDBNavLink
                                    to={`/modules/${this.state.moduleId}/class-groups`}
                                    active={this.state.activeItem === "Class Groups"}
                                    onClick={this.toggle("Class Groups")}
                                    role="tab"
                                >
                                    Class Groups
                                </MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem>
                                <MDBNavLink
                                    to={`/modules/${this.state.moduleId}/lecture-groups`}
                                    active={this.state.activeItem === "Lecture Groups"}
                                    onClick={this.toggle("Lecture Groups")}
                                    role="tab"
                                >
                                    Lecture Groups
                                </MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem>
                                <MDBNavLink
                                    to={`/modules/${this.state.moduleId}/tutorial-groups`}
                                    active={this.state.activeItem === "Tutorial Groups"}
                                    onClick={this.toggle("Tutorial Groups")}
                                    role="tab"
                                >
                                    Tutorial Groups
                                </MDBNavLink>
                            </MDBNavItem>
                        </MDBNav>
                        <MDBTabContent activeItem={this.state.activeItem}>
                            <MDBTabPane tabId="Student Roster" role="tabpanel">
                                <div className="mb-4"></div>
                                <StudentRoster students={students}></StudentRoster>
                            </MDBTabPane>
                            <MDBTabPane tabId="Class Groups" role="tabpanel">
                                <div className="mb-4"></div>
                                <ClassGroups classGroups={classGroups}></ClassGroups>
                            </MDBTabPane>
                            <MDBTabPane tabId="Lecture Groups" role="tabpanel">
                                <div className="mb-4"></div>
                                <LectureGroups lectureGroups={lectureGroups}></LectureGroups>
                            </MDBTabPane>
                            <MDBTabPane tabId="Tutorial Groups" role="tabpanel">
                                <div className="mb-4"></div>
                                <TutorialGroups tutorialGroups={tutorialGroups}></TutorialGroups>
                            </MDBTabPane>
                        </MDBTabContent>
                    </MDBContainer>
                </div>
            </div>
          );
    }
}

class StudentRoster extends Component {

    render() {
        return <MDBDataTable striped bordered hover searching={true} data={this.props.students} />
    }
}

class ClassGroups extends Component {

    render() {
        return <MDBDataTable striped bordered hover searching={true} data={this.props.classGroups} />
    }
}

class LectureGroups extends Component {

    render() {
        return <MDBDataTable striped bordered hover searching={true} data={this.props.lectureGroups} />
    }
}

class TutorialGroups extends Component {

    render() {
        return <MDBDataTable striped bordered hover searching={true} data={this.props.tutorialGroups} />
    }
}

export default styled(ModuleClassGroupsPage)`
.module-content{
    margin-left: 270px;
    margin-top: 40px;
}
`;

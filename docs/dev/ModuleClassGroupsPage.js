import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import styled from 'styled-components';
import { MDBContainer, MDBRow, MDBCol, MDBIcon, MDBTabPane, MDBTabContent, 
    MDBNav, MDBNavItem, MDBNavLink, MDBDataTable, MDBModal, MDBModalHeader, 
    MDBModalFooter, MDBModalBody, MDBBtn } from "mdbreact";
import SectionContainer from "../components/sectionContainer";
import ModuleSideNavigation from "./ModuleSideNavigation";

class ModuleClassGroupsPage extends Component {

    state = {
        moduleId: "123",
        activeItem: "Student Roster",
        modalStudent: false,
        student: {
            studentId: ""
        },
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
                    clickEvent: () => this.goToStudent(1)
                },
                {
                    name: "Student 2",
                    clickEvent: () => this.goToStudent(2)
                },
                {
                    name: "Student 3",
                    clickEvent: () => this.goToStudent(3)
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
                    clickEvent: () => this.goToClassGroup(1)
                },
                {
                    name: "Group 2",
                    currentEnrollment: 5,
                    maxEnrollment: 7,
                    description: "This is Group 2",
                    clickEvent: () => this.goToClassGroup(2)
                },
                {
                    name: "Group 3",
                    currentEnrollment: 4,
                    maxEnrollment: 6,
                    description: "This is Group 3",
                    clickEvent: () => this.goToClassGroup(3)
                },
                {
                    name: "Group 4",
                    currentEnrollment: 3,
                    maxEnrollment: 8,
                    description: "This is Group 4",
                    clickEvent: () => this.goToClassGroup(4)
                },
                {
                    name: "Group 5",
                    currentEnrollment: 7,
                    maxEnrollment: 10,
                    description: "This is Group 5",
                    clickEvent: () => this.goToClassGroup(5)
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
                    clickEvent: () => this.goToLectureGroup(1)
                },
                {
                    name: "Group 2",
                    count: 15,
                    clickEvent: () => this.goToLectureGroup(2)
                },
                {
                    name: "Group 3",
                    count: 14,
                    clickEvent: () => this.goToLectureGroup(3)
                },
                {
                    name: "Group 4",
                    count: 13,
                    clickEvent: () => this.goToLectureGroup(4)
                },
                {
                    name: "Group 5",
                    count: 17,
                    clickEvent: () => this.goToLectureGroup(5)
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
                    clickEvent: () => this.goToTutorialGroup(1)
                },
                {
                    name: "Group 2",
                    count: 15,
                    clickEvent: () => this.goToTutorialGroup(2)
                },
                {
                    name: "Group 3",
                    count: 14,
                    clickEvent: () => this.goToTutorialGroup(3)
                },
                {
                    name: "Group 4",
                    count: 13,
                    clickEvent: () => this.goToTutorialGroup(4)
                },
                {
                    name: "Group 5",
                    count: 17,
                    clickEvent: () => this.goToTutorialGroup(5)
                },
            ]
        }
    }

    componentDidMount() {
        this.initPage();
    }

    initPage() {
        let moduleId = this.props.match.params.moduleId;
        if (moduleId) {
            console.log(moduleId);
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
                activeItem: activeTab,
                moduleId: moduleId
            })
            // retrieve module students, groups & set state
        }
    }

    toggle = tab => e => {
        if (this.state.activeItem !== tab) {
            this.setState({
                activeItem: tab
            });
        }
    };

    toggleModal = nr => () => {
        console.log(nr)
        let modalNumber = "modal" + nr;
        this.setState({
            [modalNumber]: !this.state[modalNumber]
        });
    };

    submitAddStudent = () => {

    }

    goToStudent = (studentId) => {
        console.log(studentId);
        this.props.history.push(`/modules/${this.state.moduleId}/students/student-roster/${studentId}`);
    }

    goToClassGroup = (classGroupId) => {
        console.log(classGroupId);
        this.props.history.push(`/modules/${this.state.moduleId}/students/class-groups/${classGroupId}`);
    }

    goToLectureGroup = (lectureGroupId) => {
        console.log(lectureGroupId);
        this.props.history.push(`/modules/${this.state.moduleId}/students/lecture-groups/${lectureGroupId}`);
    }

    goToTutorialGroup = (tutorialGroupId) => {
        console.log(tutorialGroupId);
        this.props.history.push(`/modules/${this.state.moduleId}/students/tutorial-groups/${tutorialGroupId}`);
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
                                <h4 className="mb-4">{this.state.activeItem}</h4>
                                <hr className="my-4" />
                            </MDBCol>
                        </MDBRow>
                        <MDBNav className="nav-tabs">
                            <MDBNavItem>
                                <MDBNavLink
                                    to={`/modules/${this.state.moduleId}/students/student-roster`}
                                    active={this.state.activeItem === "Student Roster"}
                                    onClick={this.toggle("Student Roster")}
                                    role="tab"
                                >
                                    Student Roster
                                </MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem>
                                <MDBNavLink
                                    to={`/modules/${this.state.moduleId}/students/class-groups`}
                                    active={this.state.activeItem === "Class Groups"}
                                    onClick={this.toggle("Class Groups")}
                                    role="tab"
                                >
                                    Class Groups
                                </MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem>
                                <MDBNavLink
                                    to={`/modules/${this.state.moduleId}/students/lecture-groups`}
                                    active={this.state.activeItem === "Lecture Groups"}
                                    onClick={this.toggle("Lecture Groups")}
                                    role="tab"
                                >
                                    Lecture Groups
                                </MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem>
                                <MDBNavLink
                                    to={`/modules/${this.state.moduleId}/students/tutorial-groups`}
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
                                <div className="mb-2"></div>
                                <MDBRow>
                                    <MDBCol>
                                        <div style={{ "float": "right" }}>
                                            <MDBBtn color="primary" outline className="mr-0 mb-2" size="md" onClick={this.toggleModal("Student")}>
                                                <MDBIcon icon="plus" className="mr-1" /> Add
                                            </MDBBtn>
                                        </div>
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow>
                                    <MDBCol>
                                        <MDBDataTable striped bordered hover searching={true} data={students} />
                                    </MDBCol>
                                </MDBRow>
                                <MDBModal isOpen={this.state.modalStudent} toggle={this.toggleModal("Student")}>
                                    <MDBModalHeader
                                        className="text-center"
                                        titleClass="w-100 font-weight-bold"
                                        toggle={this.toggleModal("Student")}
                                    >
                                        Add Student
                                    </MDBModalHeader>
                                    <MDBModalBody>
                                        <form className="mx-3 grey-text">
                                            <div className="form-group">
                                                <label htmlFor="matriculationNo">Student Matric No.</label>
                                                <select className="form-control" onChange={e => {}} placeholder="Matricultaion No.">
                                                    <option value=""></option>
                                                    <option value="A0000000B">A0000000B</option>
                                                    <option value="A0430800B">A0430800B</option>
                                                    <option value="A1502800B">A1502800B</option>
                                                    <option value="A0229800B">A0229800B</option>
                                                    <option value="A1007500B">A1007500B</option>
                                                </select>
                                            </div>
                                        </form>
                                    </MDBModalBody>
                                    <MDBModalFooter className="justify-content-center">
                                        <MDBBtn color="info" onClick={this.submitAddStudent()}>Submit</MDBBtn>
                                    </MDBModalFooter>
                                </MDBModal>
                            </MDBTabPane>
                            <MDBTabPane tabId="Class Groups" role="tabpanel">
                                <div className="mb-2"></div>
                                <MDBRow>
                                    <MDBCol>
                                        <div style={{ "float": "right" }}>
                                            <MDBBtn color="primary" outline className="mr-0 mb-3" size="md" onClick={this.toggleModal("ClassGroup")}>
                                                <MDBIcon icon="plus" className="mr-1" /> Add
                                            </MDBBtn>
                                        </div>
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow>
                                    <MDBCol>
                                        <MDBDataTable striped bordered hover searching={false} paging={false} data={classGroups} />
                                    </MDBCol>
                                </MDBRow>
                            </MDBTabPane>
                            <MDBTabPane tabId="Lecture Groups" role="tabpanel">
                                <div className="mb-2"></div>
                                <MDBRow>
                                    <MDBCol>
                                        <div style={{ "float": "right" }}>
                                            <MDBBtn color="primary" outline className="mr-0 mb-3" size="md" onClick={this.toggleModal("LectureGroup")}>
                                                <MDBIcon icon="plus" className="mr-1" /> Add
                                            </MDBBtn>
                                        </div>
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow>
                                    <MDBCol>
                                        <MDBDataTable striped bordered hover searching={false} paging={false} data={lectureGroups} />
                                    </MDBCol>
                                </MDBRow>
                            </MDBTabPane>
                            <MDBTabPane tabId="Tutorial Groups" role="tabpanel">
                            <div className="mb-2"></div>
                                <MDBRow>
                                    <MDBCol>
                                        <div style={{ "float": "right" }}>
                                            <MDBBtn color="primary" outline className="mr-0 mb-3" size="md" onClick={this.toggleModal("TutorialGroup")}>
                                                <MDBIcon icon="plus" className="mr-1" /> Add
                                            </MDBBtn>
                                        </div>
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow>
                                    <MDBCol>
                                        <MDBDataTable striped bordered hover searching={false} paging={false} data={tutorialGroups} />
                                    </MDBCol>
                                </MDBRow>
                            </MDBTabPane>
                        </MDBTabContent>
                    </MDBContainer>
                </div>
            </div>
          );
    }
}

export class StudentRosterDetails extends Component {

    state = {
        moduleId: "123",
        activeItem: "Student Roster",
        student: {
            studentId: "",
            firstName: "",
            lastName: "",
            email: "",
            gender: "",
            photo: "",
            major: "",
            minor1: "",
            minor2: "",
            matriculationNo: "",
            faculty: ""
        },
        disabledStatus: {
            saveButton: false
        },
        modalRemove: false
    }

    componentDidMount() {
        this.initPage();
    }

    initPage() {
        let studentId = this.props.match.params.studentId;
        let moduleId = this.props.match.params.moduleId;
        if (studentId) {
            // retrieve student by id & set state
            console.log(studentId);
            this.setState({
                activeItem: "Student Roster",
                moduleId: moduleId,
                student: {
                    studentId: studentId,
                    firstName: "Student",
                    lastName: "A",
                    email: "studentX@u.nus.edu",
                    gender: "M",
                    photo: "",
                    major: "Information Systems",
                    minor1: "Minor 1",
                    minor2: "Minor 2",
                    matriculationNo: "A1111111X",
                    faculty: "School of Computing"
                }
            });
        }
    }

    toggle = tab => e => {
        if (this.state.activeItem !== tab) {
            this.setState({
                activeItem: tab
            });
        }
    };

    submit = () => {
        console.log("hi")
    }

    toggleModal = nr => () => {
        console.log(nr)
        let modalNumber = "modal" + nr;
        this.setState({
            [modalNumber]: !this.state[modalNumber]
        });
    };

    render() {
        let student = this.state.student;
        return (
            <div className={this.props.className}>
                <ModuleSideNavigation moduleId={this.props.match.params.moduleId}></ModuleSideNavigation>
                <div className="module-content">
                    <MDBContainer>
                        <MDBRow>
                            <MDBCol>
                                <h4 className="mb-4">{this.state.activeItem}
                                    <MDBIcon icon="angle-right" className="ml-4 mr-4" />
                                    {student.firstName + " " + student.lastName}
                                </h4>
                                <hr className="my-4" />
                            </MDBCol>
                        </MDBRow>
                        <MDBNav className="nav-tabs">
                            <MDBNavItem>
                                <MDBNavLink
                                    to={`/modules/${this.state.moduleId}/students/student-roster`}
                                    active={this.state.activeItem === "Student Roster"}
                                    onClick={this.toggle("Student Roster")}
                                    role="tab"
                                >
                                    Student Roster
                                </MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem>
                                <MDBNavLink
                                    to={`/modules/${this.state.moduleId}/students/class-groups`}
                                    active={this.state.activeItem === "Class Groups"}
                                    onClick={this.toggle("Class Groups")}
                                    role="tab"
                                >
                                    Class Groups
                                </MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem>
                                <MDBNavLink
                                    to={`/modules/${this.state.moduleId}/students/lecture-groups`}
                                    active={this.state.activeItem === "Lecture Groups"}
                                    onClick={this.toggle("Lecture Groups")}
                                    role="tab"
                                >
                                    Lecture Groups
                                </MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem>
                                <MDBNavLink
                                    to={`/modules/${this.state.moduleId}/students/tutorial-groups`}
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
                                <SectionContainer header="" noBorder>
                                    <div className="mb-4"></div>
                                    <form>
                                        <div className="form-row">
                                            <div className="form-group col-md-6">
                                                <label htmlFor="firstName">First Name</label>
                                                <input type="text" className="form-control" id="firstName" placeholder="First Name" value={student.firstName} onChange={e => {}} />
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label htmlFor="lastName">Last Name</label>
                                                <input type="text" className="form-control" id="lastName" placeholder="Last Name" value={student.lastName} onChange={e => {}}/>
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group col-md-2">
                                                <label htmlFor="gender">Gender</label>
                                                <input type="text" className="form-control" id="gender" placeholder="Gender" value={student.gender} onChange={e => {}}/>
                                            </div>
                                            <div className="form-group col-md-5">
                                                <label htmlFor="email">Email</label>
                                                <input type="email" className="form-control" id="email" placeholder="Email" value={student.email} onChange={e => {}}/>
                                            </div>
                                            <div className="form-group col-md-5">
                                                <label htmlFor="matricNumber">Matric Number</label>
                                                <input type="text" className="form-control" id="matricNumber" placeholder="Matric Number" value={student.matriculationNo} onChange={e => {}}/>
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group col-md-6">
                                                <label htmlFor="password">Change Password</label>
                                                <input type="password" className="form-control" id="password" placeholder="Password" />
                                            </div>
                                        </div>
                                        <div style={{ "textAlign": "center" }}>
                                            <button type="submit" className="btn btn-primary btn-md" onClick={this.submit()} disabled={this.state.disabledStatus && this.state.disabledStatus.saveButton}>
                                                Save
                                            </button>
                                        </div>
                                    </form>
                                </SectionContainer>
                                <div style={{ "float": "right" }}>
                                    <button className="btn btn-danger btn-md" onClick={this.toggleModal("Remove")}>
                                        <MDBIcon icon="trash" className="mr-1" /> Remove
                                    </button>
                                </div>
                                <MDBModal
                                    modalStyle="danger"
                                    size="md"
                                    className="text-white"
                                    backdrop={true}
                                    isOpen={this.state.modalRemove}
                                    toggle={this.toggleModal("Remove")}
                                >
                                    <MDBModalHeader className="text-center" titleClass="w-100" tag="p"
                                        toggle={this.toggleModal("Remove")}>
                                        CONFIRM
                                    </MDBModalHeader>
                                    <MDBModalBody className="text-center">
                                        <MDBIcon
                                            icon="trash"
                                            size="4x"
                                            className="mb-4"
                                        />
                                        <p>
                                            Confirm Remove {student.firstName + " " + student.lastName}?
                                        </p>
                                    </MDBModalBody>
                                    <MDBModalFooter className="justify-content-center">
                                        <MDBBtn color="danger" onClick={e => {}}>
                                            Yes
                                        </MDBBtn>
                                        <MDBBtn color="danger" outline onClick={e => {}}>
                                            No
                                        </MDBBtn>
                                    </MDBModalFooter>
                                </MDBModal>
                            </MDBTabPane>
                        </MDBTabContent>
                    </MDBContainer>
                </div>
            </div>
        );
    }
}

export class ClassGroupDetails extends Component {

    state = {
        moduleId: "123",
        activeItem: "Class Group",
        classGroup: {
            classGroupId: ""
        },
    }

    componentDidMount() {
        this.initPage();
    }

    initPage() {
        let classGroupId = this.props.match.params.classGroupId;
        let moduleId = this.props.match.params.moduleId;
        if (classGroupId) {
            // retrieve class group by id & set state
            console.log(classGroupId);
            this.setState({
                activeItem: "Class Group",
                moduleId: moduleId,
                classGroup: {
                    classGroupId: classGroupId,
                    name: "Class Group A",
                    students: []
                }
            });
        }
    }

    toggle = tab => e => {
        if (this.state.activeItem !== tab) {
            this.setState({
                activeItem: tab
            });
        }
    };

    render() {
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
                                    to={`/modules/${this.state.moduleId}/students/student-roster`}
                                    active={this.state.activeItem === "Student Roster"}
                                    onClick={this.toggle("Student Roster")}
                                    role="tab"
                                >
                                    Student Roster
                                </MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem>
                                <MDBNavLink
                                    to={`/modules/${this.state.moduleId}/students/class-groups`}
                                    active={this.state.activeItem === "Class Groups"}
                                    onClick={this.toggle("Class Groups")}
                                    role="tab"
                                >
                                    Class Groups
                                </MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem>
                                <MDBNavLink
                                    to={`/modules/${this.state.moduleId}/students/lecture-groups`}
                                    active={this.state.activeItem === "Lecture Groups"}
                                    onClick={this.toggle("Lecture Groups")}
                                    role="tab"
                                >
                                    Lecture Groups
                                </MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem>
                                <MDBNavLink
                                    to={`/modules/${this.state.moduleId}/students/tutorial-groups`}
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

                            </MDBTabPane>
                        </MDBTabContent>
                    </MDBContainer>
                </div>
            </div>
        );
    }
}

export class LectureGroupDetails extends Component {

    state = {
        moduleId: "123",
        activeItem: "Lecture Groups",
        lectureGroup: {
            lectureGroupId: ""
        },
    }

    componentDidMount() {
        this.initPage();
    }

    initPage() {
        let lectureGroupId = this.props.match.params.lectureGroupId;
        let moduleId = this.props.match.params.moduleId;
        if (lectureGroupId) {
            // retrieve class group by id & set state
            console.log(lectureGroupId);
            this.setState({
                activeItem: "Lecture Groups",
                moduleId: moduleId,
                lectureGroup: {
                    lectureGroupId: lectureGroupId,
                    name: "Lecture Group A"
                }
            });
        }
    }

    toggle = tab => e => {
        if (this.state.activeItem !== tab) {
            this.setState({
                activeItem: tab
            });
        }
    };

    render() {
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
                                    to={`/modules/${this.state.moduleId}/students/student-roster`}
                                    active={this.state.activeItem === "Student Roster"}
                                    onClick={this.toggle("Student Roster")}
                                    role="tab"
                                >
                                    Student Roster
                                </MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem>
                                <MDBNavLink
                                    to={`/modules/${this.state.moduleId}/students/class-groups`}
                                    active={this.state.activeItem === "Class Groups"}
                                    onClick={this.toggle("Class Groups")}
                                    role="tab"
                                >
                                    Class Groups
                                </MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem>
                                <MDBNavLink
                                    to={`/modules/${this.state.moduleId}/students/lecture-groups`}
                                    active={this.state.activeItem === "Lecture Groups"}
                                    onClick={this.toggle("Lecture Groups")}
                                    role="tab"
                                >
                                    Lecture Groups
                                </MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem>
                                <MDBNavLink
                                    to={`/modules/${this.state.moduleId}/students/tutorial-groups`}
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

                            </MDBTabPane>
                        </MDBTabContent>
                    </MDBContainer>
                </div>
            </div>
        );
    }
}

export class TutorialGroupDetails extends Component {

    state = {
        moduleId: "123",
        activeItem: "Tutorial Groups",
        tutorialGroup: {
            tutorialGroupId: ""
        },
    }

    componentDidMount() {
        this.initPage();
    }

    initPage() {
        let tutorialGroupId = this.props.match.params.tutorialGroupId;
        let moduleId = this.props.match.params.moduleId;
        if (tutorialGroupId) {
            // retrieve class group by id & set state
            console.log(tutorialGroupId);
            this.setState({
                activeItem: "Tutorial Groups",
                moduleId: moduleId,
                tutorialGroup: {
                    tutorialGroupId: tutorialGroupId,
                    name: "Tutorial Group A"
                }
            });
        }
    }

    toggle = tab => e => {
        if (this.state.activeItem !== tab) {
            this.setState({
                activeItem: tab
            });
        }
    };

    render() {
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
                                    to={`/modules/${this.state.moduleId}/students/student-roster`}
                                    active={this.state.activeItem === "Student Roster"}
                                    onClick={this.toggle("Student Roster")}
                                    role="tab"
                                >
                                    Student Roster
                                </MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem>
                                <MDBNavLink
                                    to={`/modules/${this.state.moduleId}/students/class-groups`}
                                    active={this.state.activeItem === "Class Groups"}
                                    onClick={this.toggle("Class Groups")}
                                    role="tab"
                                >
                                    Class Groups
                                </MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem>
                                <MDBNavLink
                                    to={`/modules/${this.state.moduleId}/students/lecture-groups`}
                                    active={this.state.activeItem === "Lecture Groups"}
                                    onClick={this.toggle("Lecture Groups")}
                                    role="tab"
                                >
                                    Lecture Groups
                                </MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem>
                                <MDBNavLink
                                    to={`/modules/${this.state.moduleId}/students/tutorial-groups`}
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

                            </MDBTabPane>
                        </MDBTabContent>
                    </MDBContainer>
                </div>
            </div>
        );
    }
}

export default styled(withRouter(ModuleClassGroupsPage))`
.module-content{
    margin-left: 270px;
    margin-top: 40px;
}
`;

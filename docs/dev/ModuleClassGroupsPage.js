import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import styled from 'styled-components';
import {
    MDBContainer, 
    MDBRow, 
    MDBCol, 
    MDBIcon, 
    MDBTabPane, 
    MDBTabContent, 
    MDBNav, 
    MDBNavItem, 
    MDBNavLink, 
    MDBDataTable,
    MDBTable,
    MDBTableHead,
    MDBTableBody, 
    MDBModal, 
    MDBModalHeader, 
    MDBModalFooter, 
    MDBModalBody, 
    MDBBtn 
} from "mdbreact";
import SectionContainer from "../components/sectionContainer";
import ModuleSideNavigation from "./ModuleSideNavigation";
import axios from "axios";

class ModuleClassGroupsPage extends Component {

    state = {
        moduleId: "123",
        activeItem: "Student Roster",
        modalStudent: false,
        student: {
            studentId: ""
        },
        studentRoster: {
            columns: [
                {
                    label: "Name",
                    field: "name",
                    width: 150
                }
            ],
            rows: []
        },
        classGroups: {
            columns: [
                {
                    label: "Group",
                    field: "name",
                    sort: "asc"
                },
                {
                    label: "Description",
                    field: "description",
                    sort: "asc"
                },
                {
                    label: "Current Enrollment",
                    field: "curentEnrollment",
                    sort: "asc"
                },
                {
                    label: "Max Enrollment",
                    field: "maxEnrollment",
                    sort: "asc"
                },
                {
                    label: "Enrollment Status",
                    field: "enrollmentStatus",
                    sort: "asc"
                },
                {
                    label: "",
                    field: "viewButton",
                    sort: "asc"
                }
            ],
            rows: []
        },
        lectureGroups: {
            columns: [
                {
                    label: "Group Name",
                    field: "name",
                    sort: "asc"
                },
                {
                    label: "Members",
                    field: "currentEnrollment",
                    sort: "asc"
                },
                {
                    label: "",
                    field: "viewButton",
                    sort: "asc"
                }
            ],
            rows: []
        },
        tutorialGroups: {
            columns: [
                {
                    label: "Group Name",
                    field: "name",
                    sort: "asc"
                },
                {
                    label: "Members",
                    field: "currentEnrollment",
                    sort: "asc"
                },
                {
                    label: "",
                    field: "viewButton",
                    sort: "asc"
                }
            ],
            rows: []
        },
        modalAddClassGroup: false,
        classGroupNameInput: "",
        classGroupDescriptionInput: "",
        classGroupMaxEnrollmentInput: "",
        classGroupSelfEnrollInput: "",
        classGroupSelfEnrollmentOpenDateInput: "",
        classGroupSelfEnrollmentCloseDateInput: "",
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
            // retrieve student roster
            axios
                .get("http://localhost:3001/studentRoster")
                .then(result => {
                    let data = result.data;
                    let arr = [];
                    Object.keys(data).forEach(function (key) {
                        let temp = {
                            name: data[key].studentName,
                        }
                        arr.push(temp);
                    });
                    this.setState({
                        ...this.state,
                        studentRoster: {
                            ...this.state.studentRoster,
                            rows: arr
                        }
                    });
                })
                .catch(error => {
                    console.error("error in axios " + error);
                });

            // retrieve class groups
            axios
                .get("http://localhost:3001/classGroups")
                .then(result => {
                    let data = result.data;
                    let arr = [];
                    const method = this.goToClassGroup;
                    Object.keys(data).forEach(function (key) {
                        let temp = {
                            name: data[key].name,
                            description: data[key].description,
                            currentEnrollment: data[key].currentEnrollment,
                            maxEnrollment: data[key].maxEnrollment,
                            enrollmentStatus: data[key].enrollmentStatus,
                            viewButton: (<MDBBtn size="sm" onClick={e => method(data[key].classGroupId)}>View</MDBBtn>)
                        }
                        arr.push(temp);
                    });
                    this.setState({
                        ...this.state,
                        classGroups: {
                            ...this.state.classGroups,
                            rows: arr
                        }
                    });
                })
                .catch(error => {
                    console.error("error in axios " + error);
                });
            
            //retrieve lecture groups
            axios
                .get("http://localhost:3001/lectureGroups")
                .then(result => {
                    let data = result.data;
                    let arr = [];
                    const method = this.goToLectureGroup;
                    Object.keys(data).forEach(function (key) {
                        let temp = {
                            name: data[key].name,
                            currentEnrollment: data[key].currentEnrollment,
                            viewButton: (<MDBBtn size="sm" onClick={e => method(data[key].lectureGroupId)}>View</MDBBtn>)
                        }
                        arr.push(temp);
                    });
                    this.setState({
                        ...this.state,
                        lectureGroups: {
                            ...this.state.lectureGroups,
                            rows: arr
                        }
                    });
                })
                .catch(error => {
                    console.error("error in axios " + error);
                });
            
            //retrieve tutorial groups
            axios
                .get("http://localhost:3001/tutorialGroups")
                .then(result => {
                    let data = result.data;
                    let arr = [];
                    const method = this.goToTutorialGroup;
                    Object.keys(data).forEach(function (key) {
                        let temp = {
                            name: data[key].name,
                            currentEnrollment: data[key].currentEnrollment,
                            viewButton: (<MDBBtn size="sm" onClick={e => method(data[key].tutorialGroupId)}>View</MDBBtn>)
                        }
                        arr.push(temp);
                    });
                    this.setState({
                        ...this.state,
                        tutorialGroups: {
                            ...this.state.tutorialGroups,
                            rows: arr
                        }
                    });
                })
                .catch(error => {
                    console.error("error in axios " + error);
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

    toggleModal = nr => () => {
        let modalNumber = "modal" + nr;
        this.setState({
            [modalNumber]: !this.state[modalNumber]
        });
    };

    submitAddStudent = () => {

    }

    addClassGroup = () => {
        this.setState({
            modalAddClassGroup: true
        })
    }

    inputChangeHandler = (e) => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        });
        console.log(e.target.name + " " + e.target.value)
    }

    submitAddClassGroupHandler = event => {
        event.preventDefault();
        event.target.className += " was-validated";
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
        let students = this.state.studentRoster;
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
                                {/*
                                <MDBRow>
                                    <MDBCol>
                                        <div style={{ "float": "right" }}>
                                            <MDBBtn color="primary" outline className="mr-0 mb-2" size="md" onClick={this.toggleModal("Student")}>
                                                <MDBIcon icon="plus" className="mr-1" /> Add
                                            </MDBBtn>
                                        </div>
                                    </MDBCol>
                                </MDBRow>*/}
                                <MDBRow>
                                    <MDBCol>
                                        {
                                            students.rows.length > 0 &&
                                            <MDBDataTable striped bordered hover searching={true} data={students} />
                                        }
                                        {
                                            students.rows.length == 0 &&
                                            <div className="mt-5">No students enrolled in this module yet</div>
                                        }
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
                                <MDBRow className="mt-4">
                                    <MDBCol>
                                        <div style={{ "float": "right" }}>
                                            <MDBBtn color="primary" className="mr-0 mb-3" size="md" onClick={this.toggleModal("AddClassGroup")}>
                                                Add
                                            </MDBBtn>
                                        </div>
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow>
                                    <MDBCol>
                                        {
                                            classGroups.rows.length > 0 &&
                                            <MDBTable bordered={false} btn fixed>
                                                <MDBTableHead columns={classGroups.columns} />
                                                <MDBTableBody rows={classGroups.rows} />
                                            </MDBTable>
                                        }
                                        {
                                            classGroups.rows.length == 0 &&
                                            <div>No class groups created yet</div>
                                        }
                                    </MDBCol>
                                </MDBRow>

                                <MDBModal
                                    isOpen={this.state.modalAddClassGroup}
                                    toggle={this.toggleModal("AddClassGroup")}
                                    centered
                                >
                                    <MDBModalHeader className="text-center"
                                        titleClass="w-100" 
                                        toggle={this.toggleModal("AddClassGroup")}>
                                        Add Class Group
                                    </MDBModalHeader>
                                    <form className="needs-validation" noValidate onSubmit={this.submitAddClassGroupHandler}>
                                        <MDBModalBody>
                                            <div className="form-row align-items-center mb-2">
                                                <div className="col-12">
                                                    <label className="mb-1">Name</label>
                                                </div>
                                                <div className="col-12">
                                                    <input type="text" className="form-control" name="classGroupNameInput"
                                                        value={this.state.classGroupNameInput}
                                                        onChange={this.inputChangeHandler}
                                                        required />
                                                </div>
                                            </div>
                                            <div className="form-row align-items-center mb-2">
                                                <div className="col-12">
                                                    <label className="mb-1">Description</label>
                                                </div>
                                                <div className="col-12">
                                                    <input type="text" className="form-control" name="classGroupDescriptionInput"
                                                        value={this.state.classGroupDescriptionInput}
                                                        onChange={this.inputChangeHandler}
                                                        required />
                                                </div>
                                            </div>
                                            <div className="form-row align-items-center mb-2">
                                                <div className="col-12">
                                                    <label className="mb-1">Max Enrollment</label>
                                                </div>
                                                <div className="col-12">
                                                    <input type="number" className="form-control" name="classGroupMaxEnrollmentInput"
                                                        value={this.state.classGroupMaxEnrollmentInput}
                                                        onChange={this.inputChangeHandler}
                                                        required />
                                                </div>
                                            </div>
                                            <div className="form-row align-items-center mb-2">
                                                <div className="col-12">
                                                    <label className="mb-1">Self-Enroll</label>
                                                </div>
                                                <div className="col-12">
                                                    <select className="form-control" onChange={this.inputChangeHandler} 
                                                        name="classGroupSelfEnrollInput"
                                                        value={this.state.classGroupSelfEnrollInput} 
                                                        required >
                                                        <option value="">--</option>
                                                        <option value={true}>Yes</option>
                                                        <option value={false}>No</option>
                                                    </select>
                                                </div>
                                            </div>
                                            
                                            <div className="form-row align-items-center mb-2">
                                                <div className="col-12">
                                                    <label className="mb-1">Self-Enroll Opening Date</label>
                                                </div>
                                                <div className="col-12">
                                                    <input type="datetime-local" className="form-control" name="classGroupSelfEnrollmentOpenDateInput"
                                                        value={this.state.classGroupSelfEnrollmentOpenDateInput}
                                                        onChange={this.inputChangeHandler}
                                                        disabled={this.state.classGroupSelfEnrollInput !== "true"}
                                                        required />
                                                </div>
                                            </div>
                                            <div className="form-row align-items-center mb-2">
                                                <div className="col-12">
                                                    <label className="mb-1">Self-Enroll Closing Date</label>
                                                </div>
                                                <div className="col-12">
                                                    <input type="datetime-local" className="form-control" name="classGroupSelfEnrollmentCloseDateInput"
                                                        value={this.state.classGroupSelfEnrollmentCloseDateInput}
                                                        onChange={this.inputChangeHandler}
                                                        disabled={this.state.classGroupSelfEnrollInput !== "true"}
                                                        required />
                                                </div>
                                            </div>
                                            
                                        </MDBModalBody>
                                        <MDBModalFooter>
                                            <MDBBtn color="secondary" onClick={this.toggleModal("AddClassGroup")}>
                                                Cancel
                                        </MDBBtn>
                                            <MDBBtn color="primary" type="submit">Save</MDBBtn>
                                        </MDBModalFooter>
                                    </form>
                                </MDBModal>
                            </MDBTabPane>

                            <MDBTabPane tabId="Lecture Groups" role="tabpanel">
                                <MDBRow><MDBCol><div className="mb-4"></div></MDBCol></MDBRow>
                                <MDBRow className="mt-2">
                                    <MDBCol>
                                        {
                                            lectureGroups.rows.length > 0 &&
                                            <MDBTable bordered={false} btn fixed>
                                                <MDBTableHead columns={lectureGroups.columns} />
                                                <MDBTableBody rows={lectureGroups.rows} />
                                            </MDBTable>
                                        }
                                        {
                                            lectureGroups.rows.length == 0 &&
                                            <div>No lecture groups created yet</div>
                                        }
                                    </MDBCol>
                                </MDBRow>
                            </MDBTabPane>

                            <MDBTabPane tabId="Tutorial Groups" role="tabpanel">
                                <MDBRow><MDBCol><div className="mb-4"></div></MDBCol></MDBRow>
                                <MDBRow className="mt-2">
                                    <MDBCol>
                                        {
                                            tutorialGroups.rows.length > 0 &&
                                            <MDBTable bordered={false} btn fixed>
                                                <MDBTableHead columns={tutorialGroups.columns} />
                                                <MDBTableBody rows={tutorialGroups.rows} />
                                            </MDBTable>
                                        }
                                        {
                                            tutorialGroups.rows.length == 0 &&
                                            <div>No tutorial groups created yet</div>
                                        }
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
    }

    toggleModal = nr => () => {
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
        classGroupId: "",
        classGroupName: "",
        students: {
            columns: [
                {
                    label: "Name",
                    field: "studentName",
                    sort: "asc"
                },
                {
                    label: "",
                    field: "removeButton",
                    sort: "asc"
                }
            ],
            rows: []
        },
        allModuleStudents:{
            columns: [
                {
                    label: "",
                    field: "check",
                    sort: "asc"
                },
                {
                    label: "ID",
                    field: "studentId",
                    sort: "asc"
                },
                {
                    label: "Name",
                    field: "studentName",
                    sort: "asc"
                }
            ],
            rows: []
        },
        modalRemoveConfirm: false,
        modalAddStudent: false,
        studentToRemove: {
            studentIdToRemove: "",
            studentNameToRemove: ""
        }
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
            axios
                .get("http://localhost:3001/classGroup")
                .then(result => {
                    let data = result.data;
                    let students = data.students;
                    let arr = [];
                    const method = this.removeStudent;
                    Object.keys(students).forEach(function (key) {
                        let temp = {
                            studentName: students[key].studentName,
                            removeButton: (<MDBBtn size="sm" color="danger" onClick={e => {method(students[key].studentId, students[key].studentName)}}>Remove</MDBBtn>)
                        }
                        arr.push(temp);
                    });
                    this.setState({
                        ...this.state,
                        classGroupId: classGroupId,
                        classGroupName: data.name,
                        students: {
                            ...this.state.students,
                            rows: arr
                        }
                    });
                })
                .catch(error => {
                    console.error("error in axios " + error);
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

    toggleModal = nr => () => {
        let modalNumber = "modal" + nr;
        this.setState({
          ...this.state,
          [modalNumber]: !this.state[modalNumber]
        });
      };

    removeStudent = (studentId, studentName) => {
        console.log(studentId);
        this.setState({
            modalRemoveConfirm: true,
            studentToRemove: {
                studentIdToRemove: studentId,
                studentNameToRemove: studentName
            }
        });
    }

    confirmRemove = () => {
        this.setState({
            modalRemoveConfirm: false
        })
    }

    addStudent = () => {
        axios
            .get("http://localhost:3001/studentRoster")
            .then(result => {
                let data = result.data;
                let arr = [];
                Object.keys(data).forEach(function (key) {
                    let temp = {
                        check: <input type="checkbox" style={{ 'height': '20px', 'width': '20px' }} id={data[key].studentId} />,
                        studentId: data[key].studentId,
                        studentName: data[key].studentName
                    }
                    arr.push(temp);
                });
                this.setState({
                    ...this.state,
                    allModuleStudents: {
                        ...this.state.allModuleStudents,
                        rows: arr
                    },
                    modalAddStudent: true
                });
            })
            .catch(error => {
                console.error("error in axios " + error);
            });
    }

    confirmAddStudents = () => {
        let arr = []
        let selectedStudents = this.state.allModuleStudents.rows;
        for (var i=0; i < selectedStudents.length; i++) {
            if (document.getElementById(selectedStudents[i].studentId).checked == true) {
                arr.push(selectedStudents[i].studentId);
            }
        }
        this.setState({
            modalAddStudent: false
        })
    }

    render() {
        let students = this.state.students;
        let allModuleStudents = this.state.allModuleStudents;
        return (
            <div className={this.props.className}>
                <ModuleSideNavigation moduleId={this.props.match.params.moduleId}></ModuleSideNavigation>
                <div className="module-content">
                    <MDBContainer>
                        <MDBRow>
                            <MDBCol>
                                <h4 className="mb-4">{this.state.activeItem}
                                    <MDBIcon icon="angle-right" className="ml-4 mr-4" />{this.state.classGroupName}
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
                            <MDBTabPane tabId="Class Group" role="tabpanel">
                                <MDBRow className="mt-4">
                                    <MDBCol>
                                        <div style={{ "float": "right" }}>
                                            <MDBBtn color="primary" className="mr-0 mb-3" size="md" onClick={e => {this.addStudent()}}>
                                                Add
                                            </MDBBtn>
                                        </div>
                                    </MDBCol>
                                </MDBRow>

                                <MDBModal centered size="lg" isOpen={this.state.modalAddStudent} toggle={this.toggleModal("AddStudent")}>
                                    <MDBModalHeader
                                        className="text-center"
                                        titleClass="w-100 font-weight-bold"
                                        toggle={this.toggleModal("AddStudent")}
                                    >
                                        Add Students
                                    </MDBModalHeader>
                                    <MDBModalBody>
                                        <form className="mx-3 grey-text">
                                            <MDBTable bordered striped btn scrollY maxHeight="300px">
                                                <MDBTableHead columns={allModuleStudents.columns} />
                                                <MDBTableBody rows={allModuleStudents.rows} />
                                            </MDBTable>
                                        </form>
                                    </MDBModalBody>
                                    <MDBModalFooter className="justify-content-center">
                                        <MDBBtn onClick={e => { this.confirmAddStudents() }}>Confirm</MDBBtn>
                                    </MDBModalFooter>
                                </MDBModal>

                                <MDBRow>
                                    <MDBCol>
                                        <MDBTable bordered={false} btn fixed>
                                            <MDBTableHead columns={students.columns} />
                                            <MDBTableBody rows={students.rows} />
                                        </MDBTable>
                                    </MDBCol>
                                </MDBRow>
                                <MDBModal centered isOpen={this.state.modalRemoveConfirm} toggle={this.toggleModal("RemoveConfirm")}>
                                    <MDBModalHeader toggle={this.toggleModal("RemoveConfirm")} className="text-center" titleClass="w-100">
                                        Remove {this.state.studentToRemove.studentNameToRemove}?
                                    </MDBModalHeader>
                                    <MDBModalFooter className="justify-content-center">
                                        <MDBBtn onClick={this.toggleModal("RemoveConfirm")}>
                                            Cancel
                                        </MDBBtn>
                                        <MDBBtn color="danger" onClick={e => {this.confirmRemove()}}>Confirm</MDBBtn>
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

export class LectureGroupDetails extends Component {

    state = {
        moduleId: "123",
        activeItem: "Lecture Groups",
        lectureGroupId: "",
        lectureGroupName: "",
        students: {
            columns: [
                {
                    label: "Name",
                    field: "studentName",
                    sort: "asc"
                }
            ],
            rows: []
        }
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
            axios
                .get("http://localhost:3001/lectureGroup")
                .then(result => {
                    let data = result.data;
                    let students = data.students;
                    let arr = [];
                    Object.keys(students).forEach(function (key) {
                        let temp = {
                            studentName: students[key].studentName,
                        }
                        arr.push(temp);
                    });
                    this.setState({
                        ...this.state,
                        activeItem: "Lecture Groups",
                        moduleId: moduleId,
                        lectureGroupId: lectureGroupId,
                        lectureGroupName: data.name,
                        students: {
                            ...this.state.students,
                            rows: arr
                        }
                    });
                })
                .catch(error => {
                    console.error("error in axios " + error);
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
        let students = this.state.students;
        return (
            <div className={this.props.className}>
                <ModuleSideNavigation moduleId={this.props.match.params.moduleId}></ModuleSideNavigation>
                <div className="module-content">
                    <MDBContainer>
                        <MDBRow>
                            <MDBCol>
                                <h4 className="mb-4">{this.state.activeItem}
                                    <MDBIcon icon="angle-right" className="ml-4 mr-4" />{this.state.lectureGroupName}
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
                            <MDBTabPane tabId="Lecture Groups" role="tabpanel">
                                <MDBRow className="mt-4">
                                    <MDBCol>
                                        <MDBTable bordered={false} btn fixed>
                                            <MDBTableHead columns={students.columns} />
                                            <MDBTableBody rows={students.rows} />
                                        </MDBTable>
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

export class TutorialGroupDetails extends Component {

    state = {
        moduleId: "123",
        activeItem: "Tutorial Groups",
        tutorialGroupId: "",
        tutorialGroupName: "",
        students: {
            columns: [
                {
                    label: "Name",
                    field: "studentName",
                    sort: "asc"
                }
            ],
            rows: []
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
            axios
                .get("http://localhost:3001/tutorialGroup")
                .then(result => {
                    let data = result.data;
                    let students = data.students;
                    let arr = [];
                    Object.keys(students).forEach(function (key) {
                        let temp = {
                            studentName: students[key].studentName,
                        }
                        arr.push(temp);
                    });
                    this.setState({
                        ...this.state,
                        activeItem: "Tutorial Groups",
                        moduleId: moduleId,
                        tutorialGroupId: tutorialGroupId,
                        tutorialGroupName: data.name,
                        students: {
                            ...this.state.students,
                            rows: arr
                        }
                    });
                })
                .catch(error => {
                    console.error("error in axios " + error);
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
        let students = this.state.students;
        return (
            <div className={this.props.className}>
                <ModuleSideNavigation moduleId={this.props.match.params.moduleId}></ModuleSideNavigation>
                <div className="module-content">
                    <MDBContainer>
                        <MDBRow>
                            <MDBCol>
                                <h4 className="mb-4">{this.state.activeItem}
                                    <MDBIcon icon="angle-right" className="ml-4 mr-4" />{this.state.tutorialGroupName}
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
                            <MDBTabPane tabId="Tutorial Groups" role="tabpanel">
                                <MDBRow className="mt-4">
                                    <MDBCol>
                                        <MDBTable bordered={false} btn fixed>
                                            <MDBTableHead columns={students.columns} />
                                            <MDBTableBody rows={students.rows} />
                                        </MDBTable>
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

export default styled(withRouter(ModuleClassGroupsPage))`
.module-content{
    margin-top: 40px;
}
@media (min-width: 1199.98px) {
    .module-content{
        margin-left: 270px;
    }
}
tbody + thead{
    display: none;
}
`;

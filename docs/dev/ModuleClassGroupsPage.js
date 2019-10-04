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
import 'babel-polyfill';

const API_URL = "http://localhost:8080/LMS-war/webresources";

class ModuleClassGroupsPage extends Component {

    state = {
        accessRight: "",
        moduleId: "",
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
                    label: "Open Dt",
                    field: "startTs",
                    sort: "asc"
                },
                {
                    label: "Close Dt",
                    field: "closeTs",
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
        classGroupMaxEnrollmentInput: "",
        classGroupSelfEnrollmentOpenDateInput: "",
        classGroupSelfEnrollmentCloseDateInput: "",
    }

    componentDidMount() {
        this.initPage();
    }

    async initPage() {
        let moduleId = this.props.match.params.moduleId;
        let accessRight = localStorage.getItem("accessRight");
        if (moduleId) {
            console.log(moduleId);
            let url = this.props.match.url;
            let current = url.split("/").pop();
            console.log(current)
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
                moduleId: moduleId,
                accessRight: accessRight
            })
            let moduleEnrollment;
            // retrieve student roster
            await axios
                .get(API_URL + "/ModuleMounting/getAllStudentByModule?moduleId=" + moduleId)
                .then(result => {
                    let data = result.data.userList;
                    moduleEnrollment = data.length;
                    let arr = [];
                    Object.keys(data).forEach(function (key) {
                        let temp = {
                            name: data[key].firstName + " " + data[key].lastName,
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
            await axios
                .get(API_URL + "/ManageGroup/getAllClassGroupByModule?moduleId=" + moduleId)
                .then(result => {
                    console.log(result)
                    let currentEnrollmentArr = result.data.currentEnrollment;
                    let classGroupsArr = result.data.classGroupList;
                    let arr = [];
                    const method = this.goToClassGroup;
                    for (var i=0; i<classGroupsArr.length; i++) {
                        let classGroupId = classGroupsArr[i].classGroupId;
                        let dateStart = classGroupsArr[i].startTs.substring(0,10);
                        let timeStart = classGroupsArr[i].startTs.substring(11,16);
                        let dateClose = classGroupsArr[i].closeTs.substring(0,10);
                        let timeClose = classGroupsArr[i].closeTs.substring(11,16);
                        let temp = {
                            name: classGroupsArr[i].name,
                            currentEnrollment: currentEnrollmentArr[i],
                            maxEnrollment: classGroupsArr[i].maxMember,
                            startTs: dateStart + " " + timeStart,
                            closeTs: dateClose + " " + timeClose,
                            viewButton: (<MDBBtn size="sm" onClick={e => method(classGroupId)}>View</MDBBtn>)
                        }
                        arr.push(temp);
                    }

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
            
            //set lecture group
            console.log(moduleEnrollment)
            this.setState({
                ...this.state,
                lectureGroups: {
                    ...this.state.lectureGroups,
                    rows: [{
                        name: "Lecture 1",
                        currentEnrollment: moduleEnrollment,
                        viewButton: (<MDBBtn size="sm" onClick={e => this.goToLectureGroup()} disabled={!moduleEnrollment}>View</MDBBtn>)
                    }]
                }
            });
            
            //retrieve tutorial groups
            await axios
                .get(API_URL + "/ModuleMounting/getAllTutorialByModule?moduleId=" + moduleId)
                .then(result => {
                    console.log(result)
                    let currentEnrollmentArr = result.data.currentEnrollment;
                    let tutorialsArr = result.data.tutorials;
                    let arr = [];
                    const method = this.goToTutorialGroup;
                    for (var i=0; i<tutorialsArr.length; i++) {
                        let tutorialId = tutorialsArr[i].tutorialId;
                        let temp = {
                            name: "Tutorial " + tutorialsArr[i].tutorialId,
                            currentEnrollment: currentEnrollmentArr[i],
                            viewButton: (<MDBBtn size="sm" onClick={e => method(tutorialId)}>View</MDBBtn>)
                        }
                        arr.push(temp);
                    }
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

    async retrieveClassGroups(moduleId) {
        await axios
            .get(API_URL + "/ManageGroup/getAllClassGroupByModule?moduleId=" + moduleId)
            .then(result => {
                let currentEnrollmentArr = result.data.currentEnrollment;
                let classGroupsArr = result.data.classGroupList;
                let arr = [];
                const method = this.goToClassGroup;
                for (var i = 0; i < classGroupsArr.length; i++) {
                    let classGroupId = classGroupsArr[i].classGroupId;
                    let temp = {
                        name: classGroupsArr[i].name,
                        currentEnrollment: currentEnrollmentArr[i],
                        maxEnrollment: classGroupsArr[i].maxMember,
                        startTs: classGroupsArr[i].openTs,
                        closeTs: classGroupsArr[i].closeTs,
                        viewButton: (<MDBBtn size="sm" onClick={e => method(classGroupId)}>View</MDBBtn>)
                    }
                    arr.push(temp);
                }

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
        
        let moduleId = this.state.moduleId;
        if (!moduleId || !this.state.classGroupSelfEnrollmentOpenDateInput || !this.state.classGroupSelfEnrollmentCloseDateInput) {
            return;
        }
        let classGroupNameInput = this.state.classGroupNameInput;
        let classGroupMaxEnrollmentInput = this.state.classGroupMaxEnrollmentInput;
        let classGroupSelfEnrollmentOpenDateInput = this.state.classGroupSelfEnrollmentOpenDateInput + ":00+08:00";
        let classGroupSelfEnrollmentCloseDateInput = this.state.classGroupSelfEnrollmentCloseDateInput + ":00+08:00";

        let body = {
            name: classGroupNameInput,
            startTs: classGroupSelfEnrollmentOpenDateInput,
            closeTs: classGroupSelfEnrollmentCloseDateInput,
            moduleId: moduleId,
            maxMember: classGroupMaxEnrollmentInput
        }
        if (moduleId && classGroupNameInput && classGroupSelfEnrollmentOpenDateInput && classGroupSelfEnrollmentCloseDateInput
            && moduleId && classGroupMaxEnrollmentInput) {
            axios({
                method: 'post',
                url: API_URL + "/ManageGroup/createClassGroup",
                data: JSON.stringify(body),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then((result) => {
                    this.setState({
                        ...this.state,
                        modalAddClassGroup: false,
                        classGroupNameInput: "",
                        classGroupMaxEnrollmentInput: "",
                        classGroupSelfEnrollmentOpenDateInput: "",
                        classGroupSelfEnrollmentCloseDateInput: "",
                    });
                    alert("Class group created successfully!")
                    return this.initPage()
                })
                .catch(error => {
                    console.error("error in axios " + error);
                    return this.initPage()
                });
        }
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
        console.log(this.state.moduleId);
        this.props.history.push(`/modules/${this.state.moduleId}/students/lecture-groups/${1}`);
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
        const moduleId = this.props.match.params.moduleId;
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
                                    to={`/modules/${moduleId}/students/student-roster`}
                                    active={this.state.activeItem === "Student Roster"}
                                    onClick={this.toggle("Student Roster")}
                                    role="tab"
                                >
                                    Student Roster
                                </MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem>
                                <MDBNavLink
                                    to={`/modules/${moduleId}/students/class-groups`}
                                    active={this.state.activeItem === "Class Groups"}
                                    onClick={this.toggle("Class Groups")}
                                    role="tab"
                                >
                                    Class Groups
                                </MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem>
                                <MDBNavLink
                                    to={`/modules/${moduleId}/students/lecture-groups`}
                                    active={this.state.activeItem === "Lecture Groups"}
                                    onClick={this.toggle("Lecture Groups")}
                                    role="tab"
                                >
                                    Lecture Groups
                                </MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem>
                                <MDBNavLink
                                    to={`/modules/${moduleId}/students/tutorial-groups`}
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
                            </MDBTabPane>

                            <MDBTabPane tabId="Class Groups" role="tabpanel">
                                <MDBRow className="mt-4">
                                    {
                                        this.state.accessRight == "Teacher" &&
                                        <MDBCol>
                                            <div style={{ "float": "right" }}>
                                                <MDBBtn color="primary" className="mr-0" size="md" onClick={this.toggleModal("AddClassGroup")}>
                                                    Add
                                            </MDBBtn>
                                            </div>
                                        </MDBCol>
                                    }
                                </MDBRow>
                                <MDBRow>
                                    <MDBCol>
                                        {
                                            classGroups.rows.length > 0 &&
                                            <MDBDataTable striped bordered hover searching={false} sortable={true} paging={false} data={classGroups} className="mt-3" />
                                        }
                                        {
                                            classGroups.rows.length == 0 &&
                                            <div className="mt-3">No class groups created yet</div>
                                        }
                                    </MDBCol>
                                </MDBRow>

                                <MDBModal
                                    isOpen={this.state.modalAddClassGroup}
                                    toggle={this.toggleModal("AddClassGroup")}
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
                                                    <label className="mb-1">Max Enrollment</label>
                                                </div>
                                                <div className="col-12">
                                                    <input type="number" className="form-control" name="classGroupMaxEnrollmentInput"
                                                        value={this.state.classGroupMaxEnrollmentInput}
                                                        onChange={this.inputChangeHandler}
                                                        required />
                                                </div>
                                            </div>
                                            {/*
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
                                            </div>*/}
                                            
                                            <div className="form-row align-items-center mb-2">
                                                <div className="col-12">
                                                    <label className="mb-1">Self-Enroll Opening Date</label>
                                                </div>
                                                <div className="col-12">
                                                    <input type="datetime-local" className="form-control" name="classGroupSelfEnrollmentOpenDateInput"
                                                        value={this.state.classGroupSelfEnrollmentOpenDateInput}
                                                        onChange={this.inputChangeHandler}
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
                                            <MDBDataTable striped bordered hover searching={false} sortable={true} paging={false} data={lectureGroups} />
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
                                            <MDBDataTable striped bordered hover searching={false} sortable={true} paging={false} data={tutorialGroups} />
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
        moduleId: "",
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
        accessRight: "",
        moduleId: "",
        activeItem: "Class Group",
        classGroupId: "",
        classGroupName: "",
        maxMember: "",
        startTs: "",
        closeTs: "",
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
        studentsStudentView: {
            columns: [
                {
                    label: "Name",
                    field: "studentName",
                    sort: "asc"
                }
            ],
            rows: []
        },
        allModuleStudents:{
            columns: [
                {
                    label: "ID",
                    field: "studentId",
                    sort: "asc"
                },
                {
                    label: "Name",
                    field: "studentName",
                    sort: "asc"
                },
                {
                    label: "",
                    field: "addButton",
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
        },
        allowSignUp: false
    }

    componentDidMount() {
        this.initPage();
    }

    async initPage() {
        let classGroupId = this.props.match.params.classGroupId;
        let moduleId = this.props.match.params.moduleId;
        let accessRight = localStorage.getItem("accessRight");

        if (moduleId && classGroupId) {
            // retrieve class group by id & set state
            console.log(classGroupId);
            await axios
                .get(API_URL + "/ManageGroup/getClassGroup/" + classGroupId)
                .then(result => {
                    let data = result.data;
                    let students = data.members;
                    let arrTeacher = []; // teacher view
                    let arrStudent = []; // student view
                    const method = this.removeStudent;
                    Object.keys(students).forEach(function (key) {
                        let temp = {
                            studentName: students[key].firstName + " " + students[key].lastName,
                            removeButton: (<MDBBtn size="sm" color="danger" onClick={e => {method(students[key].userId, students[key].firstName + " " + students[key].lastName)}}>Remove</MDBBtn>)
                        }
                        arrTeacher.push(temp);
                        arrStudent.push({
                            studentName: students[key].firstName + " " + students[key].lastName,
                        })
                    });

                    let today = new Date();
                    let timezoneTemp = today.toString().match(/([-\+][0-9]+)\s/)[1];
                    let timezone = timezoneTemp.substring(0, 3) + ":" + timezoneTemp.substring(3);
                    let currentDate = today.getUTCFullYear() + "-" + this.twoDigits(1 + today.getUTCMonth()) + "-"
                        + this.twoDigits(today.getUTCDate()) + "T" + this.twoDigits(today.getHours())
                        + ":" + this.twoDigits(today.getMinutes()) + ":"
                        + this.twoDigits(today.getSeconds()) + timezone;
                    
                        let allowSignUp = false;
                    if (currentDate >= data.startTs && currentDate <= data.closeTs) {
                        allowSignUp = true;
                    }

                    this.setState({
                        ...this.state,
                        accessRight: accessRight,
                        moduleId: moduleId,
                        classGroupId: classGroupId,
                        classGroupName: data.name,
                        maxMember: data.maxMember,
                        startTs: data.startTs,
                        closeTs: data.closeTs,
                        students: {
                            ...this.state.students,
                            rows: arrTeacher
                        },
                        studentsStudentView: {
                            ...this.state.studentsStudentView,
                            rows: arrStudent
                        },
                        allowSignUp: allowSignUp
                    });
                })
                .catch(error => {
                    console.error("error in axios " + error);
                });
        }
    }

    twoDigits(d) {
        if(0 <= d && d < 10) return "0" + d.toString();
        if(-10 < d && d < 0) return "-0" + (-1*d).toString();
        return d.toString();
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
        let classGroupId = this.state.classGroupId;
        axios
            .post(API_URL + "/ManageGroup/quitClassGroup?classGroupId=" + classGroupId + "&userId=" + studentId)
            .then((result) => {
                return this.initPage();
            })
            .catch(error => {
                alert(JSON.stringify(error.response.data.errorMessage));
                return this.initPage();
            })
        /*this.setState({
            modalRemoveConfirm: true,
            studentToRemove: {
                studentIdToRemove: studentId,
                studentNameToRemove: studentName
            }
        });*/
    }

    confirmRemove = () => {
        this.setState({
            modalRemoveConfirm: false
        })
    }

    addStudentRetrieve = () => {
        axios
            .get(API_URL + "/ModuleMounting/getAllStudentByModule?moduleId=" + this.state.moduleId)
            .then(result => {
                let data = result.data && result.data.userList;
                let arr = [];
                const method = this.addStudent;
                Object.keys(data).forEach(function (key) {
                    let temp = {
                        studentId: data[key].userId,
                        studentName: data[key].firstName + data[key].lastName,
                        addButton: (<MDBBtn size="sm" color="primary" onClick={e => {method(data[key].userId, data[key].firstName + " " + data[key].lastName)}}>Add</MDBBtn>)
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

    addStudent = (studentId) => {
        let classGroupId = this.state.classGroupId;
        axios
            .post(API_URL + "/ManageGroup/joinClassGroup?classGroupId=" + classGroupId + "&userId=" + studentId)
            .then((result) => {
                this.setState({
                    ...this.state,
                    modalAddStudent: false
                })
                return this.initPage();
            })
            .catch(error => {
                alert(JSON.stringify(error.response.data.errorMessage));
                this.setState({
                    ...this.state,
                    modalAddStudent: false
                })
                return this.initPage();
            })
    }

    signUp = () => {
        let classGroupId = this.state.classGroupId;
        // get student info from store
        let studentId = localStorage.getItem("userId");
        axios
            .post(API_URL + "/ManageGroup/joinClassGroup?classGroupId=" + classGroupId + "&userId=" + studentId)
            .then((result) => {
                this.setState({
                    ...this.state,
                    modalAddStudent: false
                })
                return this.initPage();
            })
            .catch(error => {
                alert(JSON.stringify(error.response.data.errorMessage));
                this.setState({
                    ...this.state,
                    modalAddStudent: false
                })
                return this.initPage();
            })
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
        if (this.state.accessRight == "Student") {
            students = this.state.studentsStudentView;
        } 
        else if (this.state.accessRight == "Teacher" || this.state.accessRight == "Admin") {
            students = this.state.students;
        }
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
                                            {
                                                this.state.accessRight == "Teacher" &&
                                                <MDBBtn color="primary" className="mr-0 mb-3" size="md" onClick={e => { this.addStudentRetrieve() }}>
                                                    Add
                                                </MDBBtn>
                                            }
                                            {
                                                this.state.accessRight == "Student" &&
                                                <MDBBtn color="primary" className="mr-0 mb-3" size="md" onClick={e => { this.signUp() }} disabled={!this.state.allowSignUp}>
                                                    Sign Up
                                                </MDBBtn>
                                            }
                                        </div>
                                    </MDBCol>
                                </MDBRow>

                                <MDBModal centered isOpen={this.state.modalAddStudent} toggle={this.toggleModal("AddStudent")}>
                                    <MDBModalHeader
                                        className="text-center"
                                        titleClass="w-100 font-weight-bold"
                                        toggle={this.toggleModal("AddStudent")}
                                    >
                                        Add Students
                                    </MDBModalHeader>
                                    <MDBModalBody>
                                        <form className="mx-3 grey-text">
                                            {
                                                allModuleStudents.rows.length > 0 &&
                                                <MDBTable bordered striped btn scrollY maxHeight="300px">
                                                    <MDBTableHead columns={allModuleStudents.columns} />
                                                    <MDBTableBody rows={allModuleStudents.rows} />
                                                </MDBTable>
                                            }
                                            {
                                                allModuleStudents.rows.length == 0 &&
                                                <div className="mt-2 mb-2">No students enrolled in module yet</div>
                                            }
                                        </form>
                                    </MDBModalBody>
                                    
                                </MDBModal>

                                <MDBRow>
                                    <MDBCol>
                                        {
                                            students.rows.length > 0 &&
                                            <MDBDataTable striped bordered hover searching={true} sortable={true} data={students} />
                                        }
                                        {
                                            students.rows.length == 0 &&
                                            <div>No students signed up yet</div>
                                        }
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

export const ClassGroupDetailsStyled = styled(ClassGroupDetails)`
tbody + thead{
    display: none;
}
`

class LectureGroupDetails extends Component {

    state = {
        moduleId: "",
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
            axios
                .get(API_URL + "/ModuleMounting/getAllStudentByModule?moduleId=" + moduleId)
                .then(result => {
                    let data = result.data.userList;
                    let arr = [];
                    Object.keys(data).forEach(function (key) {
                        let temp = {
                            name: data[key].firstName + " " + data[key].lastName,
                        }
                        arr.push(temp);
                    });
                    this.setState({
                        ...this.state,
                        activeItem: "Lecture Groups",
                        moduleId: moduleId,
                        lectureGroupId: lectureGroupId,
                        lectureGroupName: "Lecture 1",
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
                                        <MDBDataTable striped bordered hover searching={false} sortable={true} paging={false} data={students} />
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

export const LectureGroupDetailsStyled = styled(LectureGroupDetails)`
tbody + thead{
    display: none;
}
`

export class TutorialGroupDetails extends Component {

    state = {
        moduleId: "",
        activeItem: "Tutorial Groups",
        tutorialId: "",
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
        let tutorialId = this.props.match.params.tutorialGroupId;
        let moduleId = this.props.match.params.moduleId;
        if (tutorialId) {
            // retrieve class group by id & set state
            console.log(tutorialId);
            axios
                .get(API_URL + "/ManageGroup/getAllStudentByTutorial?tutorialId=" + tutorialId)
                .then(result => {
                    let data = result.data;
                    let students = data.userList;
                    let arr = [];
                    Object.keys(students).forEach(function (key) {
                        let temp = {
                            studentName: students[key].firstName + " " + students[key].lastName,
                        }
                        arr.push(temp);
                    });
                    this.setState({
                        ...this.state,
                        activeItem: "Tutorial Groups",
                        moduleId: moduleId,
                        tutorialId: tutorialId,
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
                                    <MDBIcon icon="angle-right" className="ml-4 mr-4" />{"Tutorial " + this.state.tutorialId}
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
                                        {
                                            students.rows.length > 0 &&
                                            <MDBDataTable striped bordered hover searching={true} sortable={true} data={students} />
                                        }
                                        {
                                            students.rows.length == 0 &&
                                            <div>No student enrolled in this tutorial</div>
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

export const TutorialGroupDetailsStyled = styled(TutorialGroupDetails)`
tbody + thead{
    display: none;
}
`

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

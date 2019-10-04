import React, { Component } from "react";
import styled from 'styled-components';
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBModal,
    MDBModalBody,
    MDBModalFooter,
    MDBModalHeader,
    MDBBtn,
    MDBTable,
    MDBTableHead,
    MDBTableBody,
    MDBDataTable
} from "mdbreact";
import ModuleSideNavigation from "./ModuleSideNavigation";
import SectionContainer from "../components/sectionContainer";
import axios from "axios";

class ModuleFeedbackPage extends Component {

    state = {
        accessRight: "",
        moduleId: "",
        modalViewFeedback: false,
        viewingFeedback: {
            title: "",
            content: ""
        },
        modalAddFeedback: false,
        addingFeedback: {
            title: "",
            content: ""
        },
        allFeedbacksTable: {
            columns: [
                {
                    label: "",
                    field: "index",
                    sort: "asc"
                },
                {
                    label: "Submitted Dt",
                    field: "createTs",
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
        submittedFeedbacksTable: {
            columns: [
                {
                    label: "",
                    field: "index",
                    sort: "asc"
                },
                {
                    label: "Submitted Date",
                    field: "submittedDt",
                    sort: "asc"
                },
                {
                    label: "Title",
                    field: "title",
                    sort: "asc"
                },
                {
                    label: "",
                    field: "viewButton",
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
        let accessRight = localStorage.getItem("accessRight");
        let moduleId = this.props.match.params.moduleId;
        if (moduleId && accessRight) {
            console.log(moduleId);
            this.setState({
                accessRight: accessRight,
                moduleId: moduleId
            })
            // if admin or prof
            axios
                .get("http://localhost:8080/LMS-war/webresources/feedback/retrieveAllFeedbackForModule/" + moduleId)
                .then((result) => {
                    console.log(result);
                    let data = result.data.feedbacks;
                    let arr = [];
                    let idx = 1;
                    const method = this.viewFeedback;
                    Object.keys(data).forEach(function (key) {
                        let date = data[key].createTs.substring(0, 10);
                        let time = data[key].createTs.substring(11, 16);
                        let temp = {
                            index: idx,
                            createTs: date + " " + time,
                            viewButton: (<MDBBtn size="sm" color="primary" onClick={e => method(data[key].feedback)}>View</MDBBtn>)
                        }
                        arr.push(temp);
                        idx++;
                    });
                    this.setState({
                        allFeedbacksTable: {
                            ...this.state.allFeedbacksTable,
                            rows: arr
                        }
                    })
                })
                .catch(error => {
                    console.error("error in axios " + error);
                });

            /*axios
                .get("http://localhost:3001/moduleAdhocFeedback")
                .then(result => {
                    let data = result.data;
                    let arr = [];
                    let idx = 1;
                    const method = this.viewFeedback;
                    Object.keys(data).forEach(function (key) {
                        let temp = {
                            index: idx,
                            submittedDt: data[key].submittedDt,
                            title: data[key].title,
                            viewButton: (<MDBBtn color="primary" size="sm" onClick={e => method(data[key].title, data[key].content)}>View</MDBBtn>)
                        }
                        arr.push(temp);
                        idx++;
                    });
                    this.setState({
                        ...this.state,
                        submittedFeedbacksTable: {
                            ...this.state.submittedFeedbacksTable,
                            rows: arr
                        }
                    });
                })
                .catch(error => {
                    console.error("error in axios " + error);
                });*/
        }
    }

    toggle = nr => () => {
        let modalNumber = "modal" + nr;
        this.setState({
            [modalNumber]: !this.state[modalNumber]
        });
    };

    viewFeedback = (content) => {
        this.setState({
            ...this.state,
            modalViewFeedback: true,
            viewingFeedback: {
                content: content
            }
        });
    }

    newAdhocFeedback = () => {
        this.setState({
            ...this.state,
            modalAddFeedback: true
        })
    }

    inputChangeHandler = (e) => {
        e.preventDefault();
        if (e.target.name == "titleInput") {
            this.setState({
                ...this.state,
                addingFeedback: {
                    ...this.state.addingFeedback,
                    title: e.target.value
                }
            })
        }
        if (e.target.name == "contentInput") {
            this.setState({
                ...this.state,
                addingFeedback: {
                    ...this.state.addingFeedback,
                    content: e.target.value
                }
            });
        }
    }

    submitHandler = event => {
        event.preventDefault();
        event.target.className += " was-validated";
        let addingFeedback = this.state.addingFeedback;
        let newData = {
            moduleId: this.state.moduleId,
            userId: 2,
            feedback: addingFeedback.content
        }
        if (addingFeedback.content) {
            axios({
                method: 'post',
                url: "http://localhost:8080/LMS-war/webresources/feedback",
                data: JSON.stringify(newData),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(() => {
                this.setState({
                    ...this.state,
                    modalAddFeedback: false,
                    addingFeedback: {
                        title: "",
                        content: ""
                    }
                });
                alert("Feedback submitted successfully");
                return this.initPage();
            })
                .catch((error) => {
                    console.log(error)
                })
        }
    }

    render() {
        let feedbacks = this.state.allFeedbacksTable;
        return (
            <div className={this.props.className}>
                <ModuleSideNavigation moduleId={this.props.match.params.moduleId}></ModuleSideNavigation>
                <div className="module-content">
                    <MDBContainer>
                        <MDBRow>
                            <MDBCol>
                                <MDBRow>
                                    <MDBCol>
                                        <h2 className="font-weight-bold"> Feedback </h2>
                                        <hr className="my-3" />
                                        {
                                            this.state.accessRight == "Student" &&
                                            <MDBBtn className="ml-0 mb-5" size="md" color="primary" onClick={e => { this.newAdhocFeedback() }}>New Adhoc Feedback</MDBBtn>
                                        }
                                    </MDBCol>
                                </MDBRow>
                                {
                                    this.state.accessRight == "Teacher" &&
                                    <MDBRow>
                                        <MDBCol>
                                            <h5>All Submitted Feedback</h5>
                                            <div className="mb-3"></div>
                                        </MDBCol>
                                    </MDBRow>
                                }
                                {
                                    this.state.accessRight == "Teacher" && feedbacks.rows.length > 0 &&
                                    <MDBDataTable striped bordered hover searching={false} paging={true} data={feedbacks} />
                                }
                                {
                                    this.state.accessRight == "Teacher" && feedbacks.rows.length == 0 &&
                                    <div>No feedback submitted</div>
                                }
                                <MDBModal
                                    backdrop={true}
                                    isOpen={this.state.modalViewFeedback}
                                    toggle={this.toggle("ViewFeedback")}
                                >
                                    <MDBModalHeader toggle={this.toggle("ViewFeedback")}>{this.state.viewingFeedback.title}</MDBModalHeader>
                                    <MDBModalBody>
                                        {this.state.viewingFeedback.content}
                                    </MDBModalBody>
                                    <MDBModalFooter>
                                        <MDBBtn color="secondary" onClick={this.toggle("ViewFeedback")}>
                                            Close
                                                </MDBBtn>
                                    </MDBModalFooter>
                                </MDBModal>

                                <MDBModal
                                    backdrop={true}
                                    isOpen={this.state.modalAddFeedback}
                                    toggle={this.toggle("AddFeedback")}
                                >
                                    <MDBModalHeader toggle={this.toggle("AddFeedback")}>Create New Feedback</MDBModalHeader>
                                    <form className="needs-validation" noValidate onSubmit={this.submitHandler}>
                                        <MDBModalBody>
                                            {/*<div className="form-row align-items-center">
                                                        <div className="col-12">
                                                            <label>Title</label>
                                                        </div>

                                                        <div className="col-12">
                                                            <input type="text" className="form-control mb-2" 
                                                                name="titleInput"
                                                                onChange={this.inputChangeHandler}
                                                                value={this.state.addingFeedback.title}
                                                                required />
                                                        </div>
                                                    </div>*/}
                                            <div className="form-row align-items-center">
                                                <div className="col-12">
                                                    <label>Feedback</label>
                                                </div>
                                                <div className="col-12">
                                                    <textarea type="text" className="form-control mb-2"
                                                        name="contentInput"
                                                        onChange={this.inputChangeHandler}
                                                        value={this.state.addingFeedback.content}
                                                        rows={5}
                                                        required />
                                                </div>
                                            </div>
                                        </MDBModalBody>
                                        <MDBModalFooter>
                                            <MDBBtn color="secondary" onClick={this.toggle("AddFeedback")}>
                                                Cancel
                                                </MDBBtn>
                                            <MDBBtn color="primary" type="submit">Submit</MDBBtn>
                                        </MDBModalFooter>
                                    </form>
                                </MDBModal>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </div>
            </div>
        );
    }
}

export default styled(ModuleFeedbackPage)`
.module-content{
    margin-top: 40px;
}
@media (min-width: 1199.98px) {
    .module-content{
        margin-left: 270px;
    }
}
.align-right{
    float: right;
}
tbody + thead{
    display: none;
}
`;

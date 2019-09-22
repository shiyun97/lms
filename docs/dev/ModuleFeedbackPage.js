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
    MDBTableBody 
} from "mdbreact";
import ModuleSideNavigation from "./ModuleSideNavigation";
import SectionContainer from "../components/sectionContainer";
import axios from "axios";

class ModuleFeedbackPage extends Component {

    state = {
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
        submittedFeedbacksTable: {
            columns: [
                {
                    label: "",
                    field: "index",
                    sort: "asc"
                },
                {
                    label: "Submitted Dt",
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
        let moduleId = this.props.match.params.moduleId;
        if (moduleId) {
            console.log(moduleId);
            this.setState({
                moduleId: moduleId
            })
            // retrieve module & set state
            axios
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
                            viewButton: (<MDBBtn size="sm" onClick={e => method(data[key].title, data[key].content)}>View</MDBBtn>)
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
                });
        }
    }

    toggle = nr => () => {
        let modalNumber = "modal" + nr;
        this.setState({
            [modalNumber]: !this.state[modalNumber]
        });
    };

    viewFeedback = (title, content) => {
        this.setState({
            ...this.state,
            modalViewFeedback: true,
            viewingFeedback: {
                title: title,
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
        console.log(this.state.addingFeedback);
        let addingFeedback = this.state.addingFeedback;
        if (addingFeedback.title && addingFeedback.content) {
            this.setState({
                ...this.state,
                modalAddFeedback: false
            });
        }
    }

    render() {
        let feedbacks = this.state.submittedFeedbacksTable;
        return (
            <div className={this.props.className}>
                <ModuleSideNavigation moduleId={this.props.match.params.moduleId}></ModuleSideNavigation>
                <div className="module-content">
                    <MDBContainer>
                        <MDBRow>
                            <MDBCol>
                                <MDBRow>
                                    <MDBCol>
                                        <h4 className="mb-2">Feedback</h4>
                                        <hr className="my-3" />
                                        <MDBBtn className="ml-0" onClick={e => { this.newAdhocFeedback()}}>New Adhoc Feedback</MDBBtn>
                                        {/*<MDBDataTable striped bordered hover searching={false} paging={false} data={this.state.feedbacks} />*/}
                                        <MDBRow>
                                            <MDBCol>
                                                <MDBTable bordered={false} btn fixed>
                                                    <MDBTableHead columns={feedbacks.columns} />
                                                    <MDBTableBody rows={feedbacks.rows} />
                                                </MDBTable>
                                            </MDBCol>
                                        </MDBRow>

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
                                            <MDBModalHeader toggle={this.toggle("AddFeedback")}>New</MDBModalHeader>
                                            <form className="needs-validation" noValidate onSubmit={this.submitHandler}>
                                                <MDBModalBody>
                                                    <div className="form-row align-items-center">
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
                                                    </div>
                                                    <div className="form-row align-items-center">
                                                        <div className="col-12">
                                                            <label>Content</label>
                                                        </div>
                                                        <div className="col-12">
                                                            <textarea type="text" className="form-control mb-2" 
                                                                name="contentInput"
                                                                onChange={this.inputChangeHandler}
                                                                value={this.state.addingFeedback.content}
                                                                required />
                                                        </div>
                                                    </div>
                                                </MDBModalBody>
                                                <MDBModalFooter>
                                                    <MDBBtn color="secondary" onClick={this.toggle("AddFeedback")}>
                                                        Cancel
                                                </MDBBtn>
                                                    <MDBBtn color="primary" type="submit">Save</MDBBtn>
                                                </MDBModalFooter>
                                            </form>
                                        </MDBModal>
                                    </MDBCol>
                                </MDBRow>
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
`;

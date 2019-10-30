import React, { Component } from "react";
import { observer, inject } from 'mobx-react'
import styled from 'styled-components';
import { 
    MDBContainer, 
    MDBRow, 
    MDBCol, 
    MDBDataTable,
    MDBIcon,
    MDBBtn,
    MDBModal,
    MDBModalHeader,
    MDBModalBody,
    MDBModalFooter,
    MDBCard,
    MDBCardBody,
    MDBNavLink 
} from "mdbreact";
import axios from "axios";
import 'babel-polyfill';
import ModuleSideNavigation from "./ModuleSideNavigation";
import ModuleSideNavigationDropdown from "./ModuleSideNavigationDropdown";
import SectionContainer from "../components/sectionContainer";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import ReactHtmlParser from 'react-html-parser';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@material-ui/core";

const API_URL = "http://localhost:8080/LMS-war/webresources";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

@inject('dataStore')
@observer
class ModuleForumTopicsPage extends Component {

    state = {
        moduleId: "",
        topics: [],
        titleInput: "",
        contentInput: "",
        message: "",
        openSnackbar: false,
        modalAdd: false,
        modalEdit: false,
        editTitleInput: "",
        editContentInput: "",
        forumTopicIdToEdit: "",
        modalDelete: "",
        forumTopicToDelete: ""
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

    async initPage() {
        let moduleId = this.props.match.params.moduleId;
        if (moduleId) {
            this.setState({
                moduleId: moduleId
            })
            // retrieve forum topics by moduleID
            await axios
                .get(API_URL + "/Forum/viewAllForumTopics?moduleId=" + moduleId)
                .then((result) => {
                    if (result) {
                        console.log(result)
                        let data = result.data.forumTopics;
                        this.setState({
                            ...this.state,
                            moduleId: moduleId,
                            topics: data,
                            ownerId: result.data.owner.userId
                        });
                    }

                })
                .catch(error => {
                    this.setState({
                        //message: error.response.data.errorMessage ? error.response.data.errorMessage : "An error occurred!",
                        //openSnackbar: true
                    })
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

    newTopic = () => {
        this.setState({
            modalAdd: true
        })
    }

    renderAddModal = () => {
        return (
            <MDBModal
                isOpen={this.state.modalAdd}
                toggle={this.toggleModal("Add")}
                size="lg"
            >
                <MDBModalHeader className="text-center"
                    titleClass="w-100"
                    toggle={this.toggleModal("Add")}>
                    Add Discussion Topic
                </MDBModalHeader>
                <form className="needs-validation" noValidate onSubmit={this.submitAddHandler}>
                    <MDBModalBody>
                        <div className="form-row align-items-center mb-2">
                            <div className="col-12">
                                <label className="mb-1">Title</label>
                            </div>
                            <div className="col-12">
                                <input type="text" className="form-control" name="titleInput"
                                    value={this.state.titleInput}
                                    onChange={this.inputChangeHandler}
                                    required />
                            </div>
                        </div>
                        <div className="form-row align-items-center mb-2">
                            <div className="col-12">
                                <label className="mb-1">Content</label>
                            </div>
                            <div className="col-12">
                                <textarea type="text" className="form-control" name="contentInput"
                                    value={this.state.contentInput}
                                    onChange={this.inputChangeHandler}
                                    required />
                            </div>
                        </div>
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="grey" onClick={this.toggleModal("Add")}>
                            Cancel
                        </MDBBtn>
                        <MDBBtn color="primary" type="submit" disabled={!this.state.titleInput || !this.state.contentInput} >Create</MDBBtn>
                    </MDBModalFooter>
                </form>
            </MDBModal>
        )
    }

    inputChangeHandler = (e) => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    textEditorInputChange = (content) => {
        this.setState({
            contentInput: content
        })
    }

    submitAddHandler = event => {
        event.preventDefault();
        event.target.className += " was-validated";
        console.log(this.state.titleInput)
        console.log(this.state.contentInput)
        let request = {
            title: this.state.titleInput,
            message: this.state.contentInput
        }

        // api to create new topic
        axios
            .post(`${API_URL}/Forum/createTopic?moduleId=${this.state.moduleId}&userId=${sessionStorage.getItem('userId')}`,
            request)
            .then((result) => {
                console.log(result);
                if (result) {
                    return this.initPage();
                }
            })
            .catch(error => {
                this.setState({
                    message: error.response.data.errorMessage ? error.response.data.errorMessage : "An error occurred!",
                    openSnackbar: true
                })
                console.error("error in axios " + error);
            });

        this.setState({
            ...this.state,
            titleInput: "",
            contentInput: "",
            modalAdd: false
        })
        return this.initPage()
    }

    enterTopic = (id) => {
        this.props.dataStore.setPath(`/modules/${this.state.moduleId}/forum/topics/${id}`);
        this.props.history.push(`/modules/${this.state.moduleId}/forum/topics/${id}`);
    }

    deleteTopic = (id) => {
        console.log(id)
        // call api to delete
        this.setState({
            modalDelete: true,
            forumTopicToDelete: id
        })
    }

    confirmDelete = () => {
        console.log(this.state.forumTopicToDelete)
        // call api to delete
        axios
            .delete(`${API_URL}/Forum/deleteTopic?forumTopicId=${this.state.forumTopicToDelete}&userId=${sessionStorage.getItem('userId')}`)
            .then((result) => {
                console.log(result);
                if (result) {
                    this.setState({
                        message: "Topic deleted successfully",
                        openSnackbar: true
                    })
                    return this.initPage();
                }
            })
            .catch(error => {
                this.setState({
                    message: error.response.data.errorMessage ? error.response.data.errorMessage : "An error occurred!",
                    openSnackbar: true
                })
                console.error("error in axios " + error);
            });

        this.setState({
            ...this.state,
            modalDelete: false,
            forumTopicToDelete: ""
        })
        return this.initPage()
    }

    editTopic = (topic) => {
        console.log(topic)
        this.setState({
            editTitleInput: topic.title,
            editContentInput: topic.description,
            modalEdit: true,
            forumTopicIdToEdit: topic.forumTopicId
        })
    }

    submitEditHandler = event => {
        event.preventDefault();
        event.target.className += " was-validated";
        console.log(this.state.editTitleInput)
        console.log(this.state.editContentInput)
        if (!this.state.editTitleInput || !this.state.editContentInput || !this.state.forumTopicIdToEdit) {
            return;
        }
        let request = {
            title: this.state.editTitleInput,
            message: this.state.editContentInput
        }

        // api to edit topic
        axios
            .put(`${API_URL}/Forum/editTopic?forumTopicId=${this.state.forumTopicIdToEdit}&userId=${sessionStorage.getItem('userId')}`,
            request)
            .then((result) => {
                console.log(result);
                if (result) {
                    this.setState({
                        message: "Topic edited successfully",
                        openSnackbar: true
                    })
                    return this.initPage();
                }
            })
            .catch(error => {
                this.setState({
                    message: error.response.data.errorMessage ? error.response.data.errorMessage : "An error occurred!",
                    openSnackbar: true
                })
                console.error("error in axios " + error);
            });

        this.setState({
            ...this.state,
            editTitleInput: "",
            editContentInput: "",
            modalEdit: false,
            forumTopicIdToEdit: ""
        })
        return this.initPage()
    }

    renderEditModal = () => {
        return (
            <MDBModal
                isOpen={this.state.modalEdit}
                toggle={this.toggleModal("Edit")}
                size="lg"
            >
                <MDBModalHeader className="text-center"
                    titleClass="w-100"
                    toggle={this.toggleModal("Edit")}>
                    Edit Discussion Topic
                </MDBModalHeader>
                <form className="needs-validation" noValidate onSubmit={this.submitEditHandler}>
                    <MDBModalBody>
                        <div className="form-row align-items-center mb-2">
                            <div className="col-12">
                                <label className="mb-1">Title</label>
                            </div>
                            <div className="col-12">
                                <input type="text" className="form-control" name="editTitleInput"
                                    value={this.state.editTitleInput}
                                    onChange={this.inputChangeHandler}
                                    required />
                            </div>
                        </div>
                        <div className="form-row align-items-center mb-2">
                            <div className="col-12">
                                <label className="mb-1">Content</label>
                            </div>
                            <div className="col-12">
                                <textarea type="text" className="form-control" name="editContentInput"
                                    value={this.state.editContentInput}
                                    onChange={this.inputChangeHandler}
                                    required />
                            </div>
                        </div>
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="grey" onClick={this.toggleModal("Edit")}>
                            Cancel
                        </MDBBtn>
                        <MDBBtn color="primary" type="submit" disabled={!this.state.editTitleInput || !this.state.editContentInput} >Edit</MDBBtn>
                    </MDBModalFooter>
                </form>
            </MDBModal>
        )
    }

    renderDeleteDialog = () => {
        return (
            <div>
                <Dialog
                    open={this.state.modalDelete}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={e => this.toggleModal("Delete")}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title">{"Confirm Delete?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            This action is reversible.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={e => this.toggleModal("Delete")} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={e => this.confirmDelete()} color="warning">
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }

    render() {
        let topics = this.state.topics;
        return (
            <div className={this.props.className}>
                <div className="module-sidebar-large"><ModuleSideNavigation moduleId={this.props.match.params.moduleId}></ModuleSideNavigation></div>
                <div className="module-navbar-small">
                    <ModuleSideNavigationDropdown moduleId={this.props.match.params.moduleId} activeTab={'Forum'}></ModuleSideNavigationDropdown>
                </div>
                <div className="module-content">
                    <MDBContainer>
                        <MDBRow>
                            <MDBCol>
                                <h4 className="font-weight-bold mb-4">Forum</h4>
                                <hr className="my-4" />
                            </MDBCol>
                        </MDBRow>
                        <MDBRow>
                            <MDBCol>
                                {
                                    sessionStorage.getItem('accessRight') == 'Teacher' &&
                                    <MDBBtn className="ml-0 mb-4" color="primary" block onClick={e => {this.newTopic()}}>Add New Discussion Category</MDBBtn>
                                }
                                
                                {
                                    topics.length > 0 && topics.map((topic) => (
                                        <TopicListItem key={topic.forumTopicId} 
                                        ownerId={this.state.ownerId}
                                        topic={topic}
                                        moduleId={this.props.moduleId}
                                        delete={e => {this.deleteTopic(topic.forumTopicId)}}
                                        edit={e => {this.editTopic(topic)}}
                                        enterTopic={e => {this.enterTopic(topic.forumTopicId)}}>
                                        </TopicListItem>
                                    ))
                                }
                                {
                                    topics.length == 0 &&
                                    <div>No forum threads available</div>
                                }
                            </MDBCol>
                        </MDBRow>
                        {this.renderAddModal()}
                        {this.renderEditModal()}
                        {this.renderDeleteDialog()}
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
                    </MDBContainer>
                </div>
            </div>
          );
    }
}

export default styled(ModuleForumTopicsPage)`
.module-content{
    margin-top: 40px;
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
`;

class TopicListItem extends Component {
    render() {
        let topic = this.props.topic;
        return <div className="container-fluid section border p-3 justify-content d-flex mb-2">
            <MDBCol sm="12">
                <MDBRow>
                        <div className="mb-2 mt-0 ml-0" 
                            style={{ color: "#2F79B9", fontWeight: "600", fontSize: "16px", lineHeight: "1.2", cursor: "pointer", 
                            textDecoration: "underline", overflow: "hidden" }}>
                            <span onClick={this.props.enterTopic}>{topic.title}</span>
                            {
                                this.props.ownerId == sessionStorage.getItem('userId') &&
                                <span>
                                    <MDBIcon icon="edit" className="indigo-text mt-2 ml-3" size="md" onClick={this.props.edit} />
                                    <MDBIcon icon="trash-alt" className="indigo-text mt-2 ml-2" size="md" onClick={this.props.delete} />
                                </span>
                            }
                        </div>
                </MDBRow>
                <MDBRow>
                    <MDBCol>
                        <MDBRow>
                            <div style={{ fontSize: "0.9rem", color: "#909090" }} className="mb-2">
                                {topic.description}
                            </div>
                        </MDBRow>
                        <MDBRow>
                            <MDBIcon far icon="comment-alt" className="mr-2 mt-1" /><div style={{ fontSize: "0.9rem"}}>{topic.threads && topic.threads.length + " Discussion Thread"}</div>
                        </MDBRow>
                    </MDBCol>
                </MDBRow>
            </MDBCol>
        </div>
    }
}

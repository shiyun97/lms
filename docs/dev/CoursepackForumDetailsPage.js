import React, { Component } from "react";
import styled from 'styled-components';
import { 
    MDBContainer, 
    MDBRow, 
    MDBCol, 
    MDBDataTable,
    MDBIcon,
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBNavLink 
} from "mdbreact";
import axios from "axios";
import 'babel-polyfill';
import CoursepackSideNavigation from "./CoursepackSideNavigation";
import {RichTextEditorStyled} from "./ModuleForumPage";
import SectionContainer from "../components/sectionContainer";
import Snackbar from '@material-ui/core/Snackbar';
import ReactHtmlParser from 'react-html-parser';
import Slide from '@material-ui/core/Slide';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@material-ui/core";

const API_URL = "http://localhost:8080/LMS-war/webresources";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

class CoursepackForumDetailsPage extends Component {

    state = {
        coursepackId: "",
        replies: [],
        forumThread: {
            forumId: "",
            title: "",
            message: "",
            createTs: "",
            updateTs: "",
            numberOfReply: "",
            owner: {
                userId: "",
                firstName: "",
                lastName: ""
            }
        },
        message: "",
        openSnackbar: false,
        commentToDelete: "",
        modalDeleteComment: false,
        modalDeletePost: false,
        postToDelete: ""
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
        let coursepackId = this.props.match.params.coursepackId;
        let forumId = this.props.match.params.forumId;
        console.log(forumId);
        if (coursepackId && forumId) {
            // retrieve forum thread posts by forumId
            this.setState({
                coursepackId: coursepackId,
                forumId: forumId
            })
            await axios
                .get(API_URL + "/Forum/viewThreadDetails?forumThreadId=" + forumId)
                //.get("http://localhost:3001/forumDetails")
                .then((result) => {
                    console.log(result);
                    if (result) {
                        let data = result.data;
                        this.setState({
                            ...this.state,
                            forumThread: data,
                            replies: data.replies,
                            
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

    submitAddReply = (e, title, content, forumPostId) => {
        e.preventDefault()
        console.log(title)
        console.log(content)
        let request = {
            title: title,
            message: content,
            type: "reply"
        }
        axios
            .put(`${API_URL}/Forum/createPost?parentPostId=${forumPostId}&userId=${sessionStorage.getItem('userId')}`, request)
            .then((result) => {
                this.setState({
                    message: "New reply added successfully",
                    openSnackbar: true
                })
                return this.initPage();
            })
            .catch(error => {
                this.setState({
                    message: error.response.data.errorMessage,
                    openSnackbar: true
                })
                console.error("error in axios " + error);
            });
    }

    submitAddComment = (e, content, forumPostId) => {
        e.preventDefault()
        console.log(forumPostId)
        let request = {
            title: "",
            message: content,
            type: "comment"
        }
        axios
            .put(`${API_URL}/Forum/createPost?parentPostId=${forumPostId}&userId=${sessionStorage.getItem('userId')}`, request)
            .then((result) => {
                this.setState({
                    message: "New comment added successfully",
                    openSnackbar: true
                })
                return this.initPage();
            })
            .catch(error => {
                this.setState({
                    message: error.response.data.errorMessage,
                    openSnackbar: true
                })
                console.error("error in axios " + error);
            });
    }

    toggleModal = (nr)=> {
        let modalNumber = "modal" + nr;
        this.setState({
            [modalNumber]: !this.state[modalNumber]
        });
    };

    deleteForumPost = (e, forumId) => {
        e.preventDefault()
        console.log(forumId)
        this.setState({
            modalDeletePost: true,
            postToDelete: forumId
        })
    }

    confirmDeletePost = () => {
        console.log("hi")
        console.log(this.state.postToDelete)
        //e.preventDefault()
        if (this.state.postToDelete) {
            axios
            .delete(`${API_URL}/Forum/deletePost?postId=${this.state.postToDelete}&userId=${sessionStorage.getItem('userId')}`)
            .then((result) => {
                console.log(result);
                if (result) {
                    if (this.state.postToDelete == this.state.forumThread.forumPostId) {
                        this.setState({
                            message: "Forum post deleted successfully",
                            openSnackbar: true,
                            modalDeletePost: false,
                            postToDelete: ""
                        })
                        this.props.history.goBack();
                        return;
                    }
                    this.setState({
                        message: "Forum post deleted successfully",
                        openSnackbar: true,
                        modalDeletePost: false,
                        postToDelete: ""
                    })
                    return this.initPage();
                }
            })
            .catch(error => {
                this.setState({
                    message: error.response.data.errorMessage ? error.response.data.errorMessage : "An error occurred!",
                    openSnackbar: true,
                    modalDeletePost: false,
                    postToDelete: ""
                })
                console.error("error in axios " + error);
            });
        }
    }

    deleteComment = (e, commentId) => {
        e.preventDefault();
        console.log(commentId)
        this.setState({
            ...this.state,
            modalDeleteComment: true,
            commentToDelete: commentId
        })
    }

    confirmDeleteComment = () => {
        //e.preventDefault()
        console.log(this.state.commentToDelete)
        if (this.state.commentToDelete != "") {
            console.log(this.state.commentToDelete)
            axios
            .delete(`${API_URL}/Forum/deletePost?postId=${this.state.commentToDelete}&userId=${sessionStorage.getItem('userId')}`)
            .then((result) => {
                console.log(result);
                if (result) {
                    this.setState({
                        message: "Forum comment deleted successfully",
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
        }
        this.setState({
            ...this.state,
            modalDeleteComment: false,
            commentToDelete: ""
        })
    }

    renderDeleteCommentDialog = () => {
        return (
            <div>
                <Dialog
                    open={this.state.modalDeleteComment}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={e => this.toggleModal("DeleteComment")}
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
                        <Button onClick={e => this.toggleModal("DeleteComment")} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={e => this.confirmDeleteComment()} color="warning">
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }

    renderDeletePostDialog = () => {
        return (
            <div>
                <Dialog
                    open={this.state.modalDeletePost}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={e => this.toggleModal("DeletePost")}
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
                        <Button onClick={e => this.toggleModal("DeletePost")} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={e => this.confirmDeletePost()} color="warning">
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }

    editComment = (e, content, id) => {
        e.preventDefault()
        let request = {
            message: content
        }

        axios
            .put(`${API_URL}/Forum/editPost?forumPostId=${id}&userId=${sessionStorage.getItem('userId')}`,
            request)
            .then((result) => {
                console.log(result);
                if (result) {
                    this.setState({
                        message: "Comment edited successfully",
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

        return this.initPage()
    }

    submitEditForumPost = (e, title, content, id) => {
        e.preventDefault()
        console.log(title)
        console.log(content)
        console.log(id)

        let request = {
            title: title,
            message: content
        }

        axios
            .put(`${API_URL}/Forum/editPost?forumPostId=${id}&userId=${sessionStorage.getItem('userId')}`,
            request)
            .then((result) => {
                console.log(result);
                if (result) {
                    this.setState({
                        message: "Post edited successfully",
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
            forumTopicIdToEdit: ""
        })
        return this.initPage()
    }

    render() {
        let replies = this.state.replies;
        let forumThread = this.state.forumThread;
        return (
            <div className={this.props.className}>
                <div className="module-content">
                    <CoursepackSideNavigation courseId={this.props.match.params.coursepackId} />
                    <MDBContainer>
                        <MDBRow>
                            <MDBCol>
                                <h4 className="font-weight-bold mb-4">Forum</h4>
                                <hr className="my-4" />
                            </MDBCol>
                        </MDBRow>
                        <MDBRow>
                            <MDBCol>
                                <ForumThreadListItemStyled key={forumThread.forumId}
                                    forumThread={forumThread}
                                    coursepackId={this.state.coursepackId}
                                    deleteForumPost={this.deleteForumPost}
                                    submitEditForumPost={this.submitEditForumPost}
                                    submitAddReply={this.submitAddReply}
                                    submitAddComment={this.submitAddComment}
                                    deleteComment={this.deleteComment}
                                    editComment={this.editComment}>
                                </ForumThreadListItemStyled>
                                <div style={{color: "#909090", letterSpacing:"1px"}} className="mt-4 mb-2">Replies</div>
                                {
                                    replies.length > 0 && replies.map((forumThread) => (
                                        <ForumThreadListItemStyled key={forumThread.forumId} 
                                        forumThread={forumThread}
                                        coursepackId={this.state.coursepackId}
                                        deleteForumPost={this.deleteForumPost}
                                        submitEditForumPost={this.submitEditForumPost}
                                        submitAddReply={this.submitAddReply}
                                        submitAddComment={this.submitAddComment}
                                        deleteComment={this.deleteComment}
                                        editComment={this.editComment}>
                                        </ForumThreadListItemStyled>
                                    ))
                                }
                                {
                                    replies.length == 0 &&
                                    <div>No replies</div>
                                }
                            </MDBCol>
                        </MDBRow>
                        {this.renderDeleteCommentDialog()}
                        {this.renderDeletePostDialog()}
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

export default styled(CoursepackForumDetailsPage)`
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
.ql-size-huge {
    content: 'Huge';
    font-size: 2.5em !important;
}

.ql-size-large {
    content: 'Huge';
    font-size: 1.5em !important;
}

.ql-size-small {
    content: 'Huge';
    font-size: 0.75em !important;
}
.ql-align-center {
    text-align: center;
    float: center;
}
`;

class ForumThreadListItem extends Component {

    state={
        editForumPostMode: false,
        editForumTitleInput: "",
        editForumContentInput: "",
        showAddReply: false,
        addReplyTitleInput: "",
        addReplyContentInput: "",
        showAddComment: false,
        addCommentContentInput: "",
        showComments: false,
        editCommentMode: false
    }

    setEditForumPostMode = () => {
        let forumThread = this.props.forumThread
        this.setState({
            editForumPostMode: !this.state.editForumPostMode,
            editForumTitleInput: forumThread.title
        })
    }

    showAddReply = () => {
        this.setState({
            editForumPostMode: false,
            showComments: false,
            showAddComment: false,
            showAddReply: true,
            addReplyTitleInput: "RE: " + this.props.forumThread.title 
        })
    }

    cancelAddReply = () => {
        this.setState({
            showAddReply: false
        })
    }

    showAddComment = () => {
        this.setState({
            editForumPostMode: false,
            showComments: false,
            showAddReply: false,
            showAddComment: true
        })
    }

    cancelAddComment = () => {
        this.setState({
            showAddComment: false
        })
    }

    inputChangeHandler = (e) => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    textEditorInputChange = (content) => {
        if (this.state.editForumPostMode) {
            this.setState({
                editForumContentInput: content
            })
        }
        else if (this.state.showAddReply) {
            this.setState({
                addReplyContentInput: content
            })
        }
        else if (this.state.editCommentMode) {
            this.setState({
                editCommentContentInput: content
            })
        }
        else {
            this.setState({
                addCommentContentInput: content
            })
        }
    }

    showComments = () => {
        this.setState({
            showComments: !this.state.showComments
        })
    }

    submitAddReply = (e, title, content) => {
        this.setState({
            showAddReply: false
        })
        return this.props.submitAddReply(e, title, content, this.props.forumThread.forumPostId);
    }

    submitAddComment = (e, content) => {
        this.setState({
            showAddComment: false
        })
        return this.props.submitAddComment(e, content, this.props.forumThread.forumPostId);
    }

    submitEditForumPost = (e, title, content) => {
        this.setState({
            editForumPostMode: false
        })
        return this.props.submitEditForumPost(e, title, content, this.props.forumThread.forumPostId);
    }

    setEditCommentMode = () => {
        this.setState({
            editCommentMode: !this.state.editCommentMode
        })
    }

    submitEditComment = (e, input, id) => {
        this.setState({
            editCommentMode: false
        })
        this.props.editComment(e, this.state.editCommentContentInput, id);
    }

    render() {
        let forumThread = this.props.forumThread;
        let comments = this.props.forumThread.comments;
        let userId = sessionStorage.getItem("userId");
        return <div className={this.props.className}>
            <div className="container-fluid section border p-4 justify-content d-flex mt-2">
                <MDBCol sm="12">
                    <MDBRow>
                        <div className="mb-2 mt-0 ml-0"
                            style={{
                                color: "#2F79B9", fontWeight: "600", fontSize: "16px", lineHeight: "1.2", cursor: "pointer",
                                textDecoration: "underline", overflow: "hidden"
                            }}>
                            <span onClick={this.props.enterForumThread}>{forumThread.title}</span>
                            {
                                userId == forumThread.owner.userId && <span>
                                    <MDBIcon icon="edit" className="indigo-text mt-2 mr-2 ml-4" size="md" onClick={e => this.setEditForumPostMode()} />
                                    <MDBIcon icon="trash-alt" className="indigo-text mt-2 mr-0" size="md" onClick={e => this.props.deleteForumPost(e, forumThread.forumPostId)} />
                                </span>
                            }
                        </div>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol>
                            <MDBRow>
                                <MDBIcon icon="user" className="mr-2 fa-fw mt-1" />
                                <div style={{ fontSize: "0.9rem" }}>
                                    by {forumThread.owner.firstName + " " + forumThread.owner.lastName + " on " + new Date(forumThread.createTs).toLocaleString() + " (Updated on " + new Date(forumThread.updateTs).toLocaleString() + ")"}
                                </div>
                            </MDBRow>
                            <MDBRow><hr className="mr-0 ml-0" style={{ height: "3px" }} /></MDBRow>
                            <MDBRow>
                                {
                                    !this.state.editForumPostMode && <span>{ReactHtmlParser(forumThread.message)}</span>
                                }
                                {
                                    this.state.editForumPostMode && <div>
                                        <div className="form-row align-items-center mb-2 mt-1">
                                            <div className="col-12">
                                                <label className="mb-1" style={{ color: "#2F79B9", fontWeight: "600", fontSize: "16px", lineHeight: "1.2" }}>Title</label>
                                            </div>
                                            <div className="col-12">
                                                <input type="text" className="form-control" name="editForumTitleInput"
                                                    value={this.state.editForumTitleInput}
                                                    onChange={this.inputChangeHandler}
                                                    required />
                                            </div>
                                        </div>
                                        <div className="form-row align-items-center mb-2">
                                            <div className="col-12">
                                                <label className="mb-1" style={{ color: "#2F79B9", fontWeight: "600", fontSize: "16px", lineHeight: "1.2" }}>Content</label>
                                            </div>
                                            <div className="col-12">
                                                <RichTextEditorStyled textEditorInputChange={this.textEditorInputChange} initial={forumThread.message}></RichTextEditorStyled>
                                            </div>
                                        </div>
                                        <div className="form-row align-items-right mb-2" style={{ float: "right" }}>
                                            <MDBBtn size="sm" color="grey" onClick={e => this.setEditForumPostMode()}>Cancel</MDBBtn>
                                            <MDBBtn size="sm" color="primary"
                                                disabled={!this.state.editForumTitleInput || !this.state.editForumContentInput}
                                                onClick={e => this.submitEditForumPost(e, this.state.editForumTitleInput, this.state.editForumContentInput)}>Save</MDBBtn>
                                        </div>
                                    </div>
                                }
                            </MDBRow>
                            <MDBRow><hr className="mr-0 ml-0 mb-0" /></MDBRow>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        {
                            forumThread.threadStarter == true &&
                            <div className="mt-3 mr-3" style={{ fontSize: "0.88rem", cursor: "pointer"}} onClick={e => this.showAddReply()}><MDBIcon icon="comment" className="mr-2" />Reply</div>
                        }
                        <div className="mt-3" style={{ fontSize: "0.88rem", cursor: "pointer"}} onClick={e => this.showAddComment()}><MDBIcon icon="comments" className="mr-2" />Comment</div>
                        <div className="mt-3 ml-5" style={{float: "right", textDecoration: "underline", cursor:"pointer", fontSize: "0.88rem"}} onClick={e => this.showComments()}>show comments ({forumThread.comments ? forumThread.comments.length : 0})</div>
                    </MDBRow>
                </MDBCol>
            </div>
            {
                this.state.showComments && comments && comments.length > 0 && comments.map((comment) => (
                    <div className="container-fluid section border p-4 justify-content d-flex" style={{ backgroundColor: "#f6f7f9" }}>
                        <MDBCol sm="12">
                            <MDBRow>
                                <MDBCol>
                                    <MDBRow>
                                        <MDBIcon icon="user" className="mr-2 fa-fw mt-1" />
                                        <div style={{ fontSize: "0.9rem" }}>
                                            by {comment.owner.firstName + " " + comment.owner.lastName + " on " + new Date(comment.createTs).toLocaleString() + " (Updated on " + new Date(comment.updateTs).toLocaleString() + ")"}
                                        </div>
                                    </MDBRow>
                                    <MDBRow><hr className="mr-0 ml-0" style={{ height: "3px" }} /></MDBRow>
                                    <MDBRow>
                                        {
                                            !this.state.editCommentMode && <span>{ReactHtmlParser(comment.message)}</span>
                                        }
                                        {
                                            this.state.editCommentMode && <div>
                                                <div className="form-row align-items-center mb-2 mt-1">
                                                    <div className="col-12">
                                                        <label className="mb-1" style={{ color: "#2F79B9", fontWeight: "600", fontSize: "16px", lineHeight: "1.2" }}>Content</label>
                                                    </div>
                                                    <div className="col-12">
                                                        <RichTextEditorStyled textEditorInputChange={this.textEditorInputChange} initial={comment.message}></RichTextEditorStyled>
                                                    </div>
                                                </div>
                                                <div className="form-row align-items-right mb-2" style={{ float: "right" }}>
                                                    <MDBBtn size="sm" color="grey" onClick={e => this.setEditCommentMode()}>Cancel</MDBBtn>
                                                    <MDBBtn size="sm" color="primary"
                                                        disabled={!this.state.editCommentContentInput}
                                                        onClick={e => this.submitEditComment(e, this.state.editCommentContentInput, comment.forumPostId)}>Save</MDBBtn>
                                                </div>  
                                            </div>
                                        }
                                    </MDBRow>
                                    <MDBRow><hr className="mr-0 ml-0 mb-0" /></MDBRow>
                                </MDBCol>
                            </MDBRow>
                            {
                                comment.owner.userId == userId &&
                                <MDBRow>
                                    <MDBCol>
                                        <div className="mt-3 ml-0" style={{ fontSize: "0.88rem", cursor: "pointer", float: "right" }}>
                                            <span onClick={e => this.setEditCommentMode(e, comment)}><MDBIcon icon="edit" className=" ml-3 mr-2" />Edit</span>
                                            <span onClick={e => this.props.deleteComment(e, comment.forumPostId)}><MDBIcon icon="trash-alt" className=" ml-3 mr-2" />Delete</span>
                                        </div>
                                    </MDBCol>
                                </MDBRow>
                            }
                        </MDBCol>
                    </div>
                ))
            }
           
            {
                this.state.showAddReply &&
                <div className="container-fluid section border p-4 justify-content d-flex mb-2"  style={{ backgroundColor: "#f6f7f9" }}>
                    <div className="mt-3">
                        Posting as {sessionStorage.getItem('firstName') + sessionStorage.getItem('lastName')}
                        <div className="form-row align-items-center mb-2 mt-1">
                            <div className="col-12">
                                <label className="mb-1" style={{color: "#2F79B9", fontWeight: "600", fontSize: "16px", lineHeight: "1.2",}}>Title</label>
                            </div>
                            <div className="col-12">
                                <input type="text" className="form-control" name="addReplyTitleInput"
                                    value={this.state.addReplyTitleInput}
                                    onChange={this.inputChangeHandler}
                                    required />
                            </div>
                        </div>
                        <div className="form-row align-items-center mb-2">
                            <div className="col-12">
                                <label className="mb-1" style={{color: "#2F79B9", fontWeight: "600", fontSize: "16px", lineHeight: "1.2",}}>Content</label>
                            </div>
                            <div className="col-12">
                                <RichTextEditorStyled textEditorInputChange={this.textEditorInputChange} initial={""}></RichTextEditorStyled>
                            </div>
                        </div>
                        <div className="form-row align-items-right mb-2" style={{float: "right"}}>
                            <MDBBtn size="sm" color="grey" onClick={e => this.cancelAddReply()}>Cancel</MDBBtn>
                            <MDBBtn size="sm" color="primary" 
                                disabled={!this.state.addReplyTitleInput || !this.state.addReplyContentInput}
                                onClick={e => this.submitAddReply(e, this.state.addReplyTitleInput, this.state.addReplyContentInput)}>Post</MDBBtn>
                        </div>
                    </div>
                </div>
            }

            {
                this.state.showAddComment &&
                <div className="container-fluid section border p-4 justify-content d-flex mb-2"  style={{ backgroundColor: "#f6f7f9" }}>
                    <div className="mt-3">
                        Posting as {sessionStorage.getItem('firstName') + sessionStorage.getItem('lastName')}
                        <div className="form-row align-items-center mb-2">
                            <div className="col-12">
                                <label className="mb-1" style={{color: "#2F79B9", fontWeight: "600", fontSize: "16px", lineHeight: "1.2",}}>Comment</label>
                            </div>
                            <div className="col-12">
                                <RichTextEditorStyled textEditorInputChange={this.textEditorInputChange} initial={""}></RichTextEditorStyled>
                            </div>
                        </div>
                        <div className="form-row align-items-right mb-2 mt-1" style={{float: "right"}}>
                            <MDBBtn size="sm" color="grey" onClick={e => this.cancelAddComment()}>Cancel</MDBBtn>
                            <MDBBtn size="sm" color="primary" 
                                disabled={!this.state.addCommentContentInput}
                                onClick={e => this.submitAddComment(e, this.state.addCommentContentInput)}>Post</MDBBtn>
                        </div>
                    </div>
                </div>
            }
            <div className="mb-4" />
        </div> 
    }
}

const ForumThreadListItemStyled = styled(ForumThreadListItem)`
hr {
    border: 0;
    clear:both;
    display:block;
    width: 100%;               
    background-color:#EFEFEF;
    height: 2px;
}
.ql-size-huge {
    content: 'Huge';
    font-size: 2.5em !important;
}

.ql-size-large {
    content: 'Huge';
    font-size: 1.5em !important;
}

.ql-size-small {
    content: 'Huge';
    font-size: 0.75em !important;
}
.ql-align-center {
    text-align: center;
    float: center;
}
`
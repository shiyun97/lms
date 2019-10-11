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
import ModuleSideNavigation from "./ModuleSideNavigation";
import ModuleSideNavigationDropdown from "./ModuleSideNavigationDropdown";
import {RichTextEditorStyled} from "./ModuleForumPage";
import SectionContainer from "../components/sectionContainer";
import Snackbar from '@material-ui/core/Snackbar';
import ReactHtmlParser from 'react-html-parser';

const API_URL = "http://localhost:8080/LMS-war/webresources";

class ModuleForumDetailsPage extends Component {

    state = {
        moduleId: "",
        replies: [],
        forumThread: {
            forumId: "",
            title: "",
            description: "",
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
        openSnackbar: false
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
        let forumId = this.props.match.params.forumId;
        if (moduleId && forumId) {
            // retrieve forum thread posts by forumId
            await axios
                //.get(API_URL + "/forum/retrieveForumThreads?moduleId=" + moduleId)
                .get("http://localhost:3001/forumDetails")
                .then((result) => {
                    if (result) {
                        let replies = result.data.replies;
                        let data = result.data;
                        this.setState({
                            ...this.state,
                            moduleId: moduleId,
                            forumThread: {
                                forumId: data.forumId,
                                title: data.title,
                                description: data.description,
                                createTs: data.createTs,
                                updateTs: data.updateTs,
                                owner: {
                                    userId: data.owner.userId,
                                    firstName: data.owner.firstName,
                                    lastName: data.owner.lastName
                                },
                                comments: data.comments
                            },
                            replies: result.data.replies,
                            
                        });
                    }


                })
                .catch(error => {
                    this.setState({
                        //message: error.response.data.errorMessage ? error.response.data.errorMessage : "An error occurred!",
                        openSnackbar: true
                    })
                    console.error("error in axios " + error);
                });

        }
    }

    deleteForumPost = (e, forumId) => {
        e.preventDefault()
        console.log(forumId)
    }

    submitAddReply = (e, title, content) => {
        e.preventDefault()
        console.log(title)
        console.log(content)
    }

    submitAddComment = (e, content) => {
        e.preventDefault()
        console.log(content)
    }

    deleteComment = (e, commentId) => {
        e.preventDefault()
        console.log(commentId)
    }

    submitEditForumPost = (e, title, content) => {
        e.preventDefault()
        console.log(title)
        console.log(content)
    }

    render() {
        let replies = this.state.replies;
        let forumThread = this.state.forumThread;
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
                                <ForumThreadListItemStyled key={forumThread.forumId}
                                    forumThread={forumThread}
                                    moduleId={this.state.moduleId}
                                    deleteForumPost={this.deleteForumPost}
                                    submitEditForumPost={this.submitEditForumPost}
                                    submitAddReply={this.submitAddReply}
                                    submitAddComment={this.submitAddComment}
                                    deleteComment={this.deleteComment}>
                                </ForumThreadListItemStyled>
                                <div style={{color: "#909090", letterSpacing:"1px"}} className="mt-4 mb-2">Replies</div>
                                {
                                    replies.length > 0 && replies.map((forumThread) => (
                                        <ForumThreadListItemStyled key={forumThread.forumId} 
                                        forumThread={forumThread}
                                        moduleId={this.state.moduleId}
                                        deleteForumPost={this.deleteForumPost}
                                        submitEditForumPost={this.submitEditForumPost}
                                        submitAddReply={this.submitAddReply}
                                        submitAddComment={this.submitAddComment}
                                        deleteComment={this.deleteComment}>
                                        </ForumThreadListItemStyled>
                                    ))
                                }
                                {
                                    replies.length == 0 &&
                                    <div>No replies</div>
                                }
                            </MDBCol>
                        </MDBRow>
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

export default styled(ModuleForumDetailsPage)`
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
        showComments: false
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
        return this.props.submitAddReply(e, title, content)
    }

    submitAddComment = (e, content) => {
        this.setState({
            showAddComment: false
        })
        return this.props.submitAddComment(e, content)
    }

    submitEditForumPost = (e, title, content) => {
        this.setState({
            editForumPostMode: false
        })
        return this.props.submitEditForumPost(e, title, content)
    }

    render() {
        let forumThread = this.props.forumThread;
        let comments = this.props.forumThread.comments;
        let userId = localStorage.getItem("userId");
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
                            <MDBIcon icon="edit" className="indigo-text mt-2 mr-2 ml-4" size="md" onClick={e => this.setEditForumPostMode()} />
                            <MDBIcon icon="trash-alt" className="indigo-text mt-2 mr-0" size="md" onClick={e => this.props.deleteForumPost(e, forumThread.forumId)} />
                        </div>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol>
                            <MDBRow>
                                <MDBIcon icon="user" className="mr-2 fa-fw mt-1" />
                                <div style={{ fontSize: "0.9rem" }}>
                                    by {forumThread.owner.firstName + " " + forumThread.owner.lastName + " on " + new Date(forumThread.createTs).toLocaleString()}
                                </div>
                            </MDBRow>
                            <MDBRow><hr className="mr-0 ml-0" style={{ height: "3px" }} /></MDBRow>
                            <MDBRow>
                                {
                                    !this.state.editForumPostMode && <span>{ReactHtmlParser(forumThread.description)}</span>
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
                                                <RichTextEditorStyled textEditorInputChange={this.textEditorInputChange} initial={forumThread.description}></RichTextEditorStyled>
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
                        <div className="mt-3" style={{ fontSize: "0.88rem", cursor: "pointer"}} onClick={e => this.showAddReply()}><MDBIcon icon="comment" className="mr-2" />Reply</div>
                        <div className="mt-3 ml-3" style={{ fontSize: "0.88rem", cursor: "pointer"}} onClick={e => this.showAddComment()}><MDBIcon icon="comments" className="mr-2" />Comment</div>
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
                                            by {comment.owner.firstName + " " + comment.owner.lastName + " on " + new Date(comment.createTs).toLocaleString()}
                                        </div>
                                    </MDBRow>
                                    <MDBRow><hr className="mr-0 ml-0" style={{ height: "3px" }} /></MDBRow>
                                    <MDBRow>
                                        {ReactHtmlParser(comment.description)}
                                    </MDBRow>
                                    <MDBRow><hr className="mr-0 ml-0 mb-0" /></MDBRow>
                                </MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol>
                                    <div className="mt-3 ml-0" style={{ fontSize: "0.88rem", cursor: "pointer", float:"right" }} onClick={e => this.props.deleteComment(e, comment.commentId)}><MDBIcon icon="trash-alt" className="mr-2" />Delete</div>
                                </MDBCol>
                            </MDBRow>
                        </MDBCol>
                    </div>
                ))
            }
           
            {
                this.state.showAddReply &&
                <div className="container-fluid section border p-4 justify-content d-flex mb-2"  style={{ backgroundColor: "#f6f7f9" }}>
                    <div className="mt-3">
                        Posting as Tom Lee (replace with user in local storage)
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
                        Posting as Tom Lee (replace with user in localStorage)
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
`
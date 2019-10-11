import React, { Component } from "react";
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

const API_URL = "http://localhost:8080/LMS-war/webresources";

class ModuleForumPage extends Component {

    state = {
        moduleId: "",
        forumThreads: [],
        titleInput: "",
        contentInput: "",
        message: "",
        openSnackbar: false,
        modalAdd: false,
        modalEdit: false
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
        if (moduleId) {
            // retrieve forum threads by moduleID
            await axios
                //.get(API_URL + "/forum/retriveForumThreads?moduleId=" + moduleId)
                .get("http://localhost:3001/forums")
                .then((result) => {
                    if (result) {
                        console.log(result)
                        this.setState({
                            ...this.state,
                            moduleId: moduleId,
                            forumThreads: result.data
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

    toggleModal = nr => () => {
        let modalNumber = "modal" + nr;
        this.setState({
            [modalNumber]: !this.state[modalNumber]
        });
    };

    newThread = () => {
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
                    Start a Discussion Thread
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
                                <RichTextEditorStyled textEditorInputChange={this.textEditorInputChange} initial={""}></RichTextEditorStyled>
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

        // api to create new thread
        
        this.setState({
            ...this.state,
            titleInput: "",
            contentInput: "",
            modalAdd: false
        })
        return this.initPage()
    }

    enterForumThread = (id) => {
        console.log(id)
        this.props.history.push(`/modules/${this.state.moduleId}/forum/${id}`);
    }

    editForumThread = (id) => {
        console.log(id)
    }

    deleteForumThread = (id) => {
        console.log(id)
        // call api to delete
    }

    render() {
        let forumThreads = this.state.forumThreads;
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
                                <MDBBtn className="ml-0 mb-4" color="primary" block onClick={e => {this.newThread()}}>Start New Thread</MDBBtn>
                                {
                                    forumThreads.length > 0 && forumThreads.map((forumThread) => (
                                        <ForumThreadListItem key={forumThread.forumId} 
                                        forumThread={forumThread}
                                        moduleId={this.props.moduleId}
                                        delete={e => {this.deleteForumThread(forumThread.forumId)}}
                                        enterForumThread={e => {this.enterForumThread(forumThread.forumId)}}>
                                        </ForumThreadListItem>
                                    ))
                                }
                                {
                                    forumThreads.length == 0 &&
                                    <div>No forum threads available</div>
                                }
                            </MDBCol>
                        </MDBRow>
                        {this.renderAddModal()}
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

export default styled(ModuleForumPage)`
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
    render() {
        let forumThread = this.props.forumThread;
        let userId = localStorage.getItem("userId");
        return <div className="container-fluid section border p-3 justify-content d-flex mb-2">
            <MDBCol sm="12">
                <MDBRow>
                        <div className="mb-2 mt-0 ml-0" 
                            style={{ color: "#2F79B9", fontWeight: "600", fontSize: "16px", lineHeight: "1.2", cursor: "pointer", 
                            textDecoration: "underline", overflow: "hidden" }}>
                            <span onClick={this.props.enterForumThread}>{forumThread.title}</span>
                            <MDBIcon icon="trash-alt" className="indigo-text mt-2 ml-3" size="md" onClick={this.props.delete} />
                        </div>
                </MDBRow>
                <MDBRow>
                    <MDBCol>
                        <MDBRow>
                            <MDBIcon icon="user" className="mr-2 fa-fw mt-1" />
                            <div style={{ fontSize: "0.9rem"}}>
                            by {forumThread.owner.firstName + " " + forumThread.owner.lastName + " on " + new Date(forumThread.createTs).toLocaleString()}
                            </div>
                        </MDBRow>
                        <MDBRow>
                            <MDBIcon icon="comments" className="mr-2 mt-1" /><div style={{ fontSize: "0.9rem"}}>{forumThread.numberOfReply + " replies"}</div>
                        </MDBRow>
                    </MDBCol>
                </MDBRow>
            </MDBCol>
        </div>
    }
}


class RichTextEditor extends Component {
	constructor(props) {
		super(props);

		this.modules = {
			toolbar: [
		      [{ 'font': [] }],
		      [{ 'size': ['small', false, 'large', 'huge'] }],
		      ['bold', 'italic', 'underline'],
		      [{'list': 'ordered'}, {'list': 'bullet'}],
		      [{ 'align': [] }],
		      [{ 'color': [] }, { 'background': [] }],
		      ['clean']
		    ]
		};

		this.formats = [
		    'font',
		    'size',
		    'bold', 'italic', 'underline',
		    'list', 'bullet',
		    'align',
		    'color', 'background'
	  	];

	  	this.state = {
            comments: this.props.initial
		}

		this.rteChange = this.rteChange.bind(this);
	}

	rteChange = (content, delta, source, editor) => {
		//console.log(editor.getHTML()); // rich text
        //console.log(editor.getText()); // plain text
        //var text = editor.getHTML();
        this.setState({
            ...this.state,
            comments: content
        })
        this.props.textEditorInputChange(content);
    }

    render() {
        const comments = this.state.comments
        return (
            <div className={this.props.className}>
                <form onSubmit={e => this.props.submitTextEditor(e, comments)}>
                    <MDBRow>
                        <MDBCol>
                            <ReactQuill modules={this.modules}
                                formats={this.formats} onChange={this.rteChange}
                                value={this.state.comments || ''} />
                        </MDBCol>
                    </MDBRow>
                </form>
            </div>
        );
    }
}

export const RichTextEditorStyled = styled(RichTextEditor)`
.ql-container {
    height: auto !important;
  }

  .ql-editor {
    min-height: 100px !important;
    height: auto !important;
    max-width: 1000px;
  }
`
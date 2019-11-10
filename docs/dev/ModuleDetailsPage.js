import React, { Component } from "react";
import styled from 'styled-components';
import { 
    MDBContainer, 
    MDBRow, 
    MDBCol, 
    MDBIcon, 
    MDBBtn
} from "mdbreact";
import ModuleSideNavigation from "./ModuleSideNavigation";
import ModuleSideNavigationDropdown from "./ModuleSideNavigationDropdown";
import SectionContainer from "../components/sectionContainer";
import axios from "axios";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import ReactHtmlParser from 'react-html-parser';
import Snackbar from '@material-ui/core/Snackbar';

const API_URL = "http://localhost:8080/LMS-war/webresources";

class ModuleDetailsPage extends Component {

    state = {
        accessRight: "",
        module:{
            moduleId: "",
            description: ""
        },
        editMode: false,
        message: "",
        openSnackbar: ""
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

    initPage() {
        let accessRight = sessionStorage.getItem("accessRight");
        let moduleId = this.props.match.params.moduleId;
        if (moduleId && accessRight) {
            // retrieve module & set state
            axios
                .get(API_URL + "/ModuleMounting/getModule/" + moduleId)
                .then(result => {
                    if (result.data) {
                        let data = result.data;
                        this.setState({
                            module: {
                                moduleId: moduleId,
                                description: data.description
                            },
                            accessRight: accessRight
                        });
                    }
                })
                .catch(error => {
                    this.setState({
                        editMode: false,
                        message: error.response.data.errorMessage,
                        openSnackbar: true
                    })
                    console.error("error in axios " + error);
            });
        }
    }

    setEditMode = () => {
        this.setState({
            editMode: !this.state.editMode
        })
    }

    submitTextEditor = (e, htmlText) => {
        e.preventDefault()
        const moduleId = this.state.module.moduleId
        axios
            .post(API_URL + "/ModuleMounting/updateModuleDescription/" + moduleId,
            htmlText, {
                headers: {
                    "Accept": "application/json",
                    "Content-type": "application/json"
                }
            })
            .then(result => {
                if (result) {
                    this.setState({
                        editMode: false,
                        message: "Description updated successfully!",
                        openSnackbar: true
                    })
                    return this.initPage()
                }
            })
            .catch(error => {
                this.setState({
                    editMode: false,
                    message: error.response.data.errorMessage,
                    openSnackbar: true
                })
                console.error("error in axios " + error);
                return this.initPage()
            });
    }

    render() {
        let module = this.state.module;
        if (this.state.editMode) {
            return (
                <div className={this.props.className}>
                    <div className="module-sidebar-large"><ModuleSideNavigation moduleId={this.props.match.params.moduleId}></ModuleSideNavigation></div>
                    <div className="module-navbar-small">
                        <ModuleSideNavigationDropdown moduleId={this.props.match.params.moduleId} activeTab={'Module Details'}></ModuleSideNavigationDropdown>
                    </div>
                    <div className="module-content">
                        <MDBContainer>
                            <MDBRow>
                                <MDBCol>
                                    <h4 className="mb-2">Module Details</h4>
                                </MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol>
                                    <div className="align-right">
                                        <MDBBtn color="blue lighten-2" outline className="mr-0 mb-2" size="md" onClick={this.setEditMode}>
                                            Cancel
                                        </MDBBtn>
                                    </div>
                                </MDBCol>
                            </MDBRow>
                            <RichTextEditorStyled submitTextEditor={this.submitTextEditor} initial={module.description}></RichTextEditorStyled>
                        </MDBContainer>
                    </div>
                </div>
            )
        }
        return (
            <div className={this.props.className}>
                <div className="module-sidebar-large"><ModuleSideNavigation moduleId={this.props.match.params.moduleId}></ModuleSideNavigation></div>
                <div className="module-navbar-small">
                    <ModuleSideNavigationDropdown moduleId={this.props.match.params.moduleId} activeTab={'Module Details'}></ModuleSideNavigationDropdown>
                </div>
                <div className="module-content">
                    <MDBContainer>
                        <MDBRow>
                            <MDBCol>
                                <h4 className="mb-2">Module Details</h4>
                            </MDBCol>
                        </MDBRow>
                        <MDBRow>
                            <MDBCol>
                                <div className="align-right">
                                    {
                                        this.state.accessRight == "Teacher" &&
                                        <MDBBtn color="blue lighten-2" outline className="mr-0" size="md" onClick={this.setEditMode}>
                                            <MDBIcon icon="edit" className="mr-1" /> Edit
                                        </MDBBtn>
                                    }
                                </div>
                            </MDBCol>
                        </MDBRow>
                        <MDBRow>
                            <MDBCol>
                                {
                                    module.description &&
                                    <SectionContainer className="justify-content d-flex mt-2">
                                        <div className="new-paragraph"><div className="h5">Description</div>
                                            {ReactHtmlParser(module.description)}
                                        </div>
                                    </SectionContainer>
                                }
                                {
                                    !module.description &&
                                    <div>No module description set yet</div>
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

export default styled(ModuleDetailsPage)`
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
.new-paragraph{
    margin-top: 0;
    margin-bottom: 1rem;
}
.align-right{
    float: right;
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
                    <MDBRow>
                        <MDBCol>
                            <button type="submit" className="btn btn-primary btn-md mt-2 ml-0">
                                Save
                            </button>
                        </MDBCol>
                    </MDBRow>
                </form>
            </div>
        );
    }
}

const RichTextEditorStyled = styled(RichTextEditor)`
.ql-container {
    height: auto !important;
  }

  .ql-editor {
    min-height: 100px !important;
    height: auto !important;
    max-width: 1000px;
  }
`
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
import SectionContainer from "../components/sectionContainer";
import axios from "axios";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import ReactHtmlParser from 'react-html-parser';

const API_URL = "http://localhost:8080/LMS-war/webresources";

class ModuleDetailsPage extends Component {

    state = {
        module:{
            moduleId: "",
            description: ""
        },
        editMode: false
    }

    componentDidMount() {
        this.initPage();
    }

    initPage() {
        let moduleId = this.props.match.params.moduleId;
        if (moduleId) {
            // retrieve module & set state
            axios
                .get(API_URL + "/ModuleMounting/getModule/" + moduleId)
                .then(result => {
                    if (result.data) {
                        let data = result.data;
                        console.log(data)
                        this.setState({
                            module: {
                                moduleId: moduleId,
                                description: data.description
                            }
                        });
                    }
                })
                .catch(error => {
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
                console.log(result)
                if (result.data) {
                    let data = result.data;
                    this.setState({
                        editMode: false
                    })
                    return this.initPage()
                }
            })
            .catch(error => {
                console.error("error in axios " + error);
                this.setState({
                    editMode: false
                })
                return this.initPage()
            });
    }

    render() {
        let module = this.state.module;
        if (this.state.editMode) {
            return (
                <div className={this.props.className}>
                    <ModuleSideNavigation moduleId={this.props.match.params.moduleId}></ModuleSideNavigation>
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
                                            <MDBIcon icon="cross" className="mr-1" /> Cancel
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
                <ModuleSideNavigation moduleId={this.props.match.params.moduleId}></ModuleSideNavigation>
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
                                        <MDBIcon icon="edit" className="mr-1" /> Edit
                                    </MDBBtn>
                                </div>
                            </MDBCol>
                        </MDBRow>
                        <MDBRow>
                            <MDBCol>
                                {
                                    module.description &&
                                    <SectionContainer className="justify-content d-flex">
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
@media (min-width: 1199.98px) {
    .module-content{
        margin-left: 270px;
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
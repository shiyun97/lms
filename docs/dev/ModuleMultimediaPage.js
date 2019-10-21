import React, { Component } from "react";
import { observer, inject } from 'mobx-react'
import { NavLink, withRouter } from "react-router-dom";
import styled from 'styled-components';
import { 
    MDBContainer, 
    MDBRow, 
    MDBCol, 
    MDBIcon, 
    MDBDataTable,
    MDBBtn,
    MDBModal,
    MDBModalHeader,
    MDBModalBody,
    MDBModalFooter,
    MDBListGroup,
    MDBListGroupItem 
} from "mdbreact";
import ModuleSideNavigation from "./ModuleSideNavigation";
import ModuleSideNavigationDropdown from "./ModuleSideNavigationDropdown";
import SectionContainer from "../components/sectionContainer";
import axios from "axios";
import 'babel-polyfill';
import Dropzone from 'react-dropzone';
import Snackbar from '@material-ui/core/Snackbar';
//import { access } from "fs";

const API_URL = "http://localhost:8080/LMS-war/webresources";

const FILE_SERVER = "http://127.0.0.1:8887/";

@inject('dataStore')
@observer
class ModuleMultimediaPage extends Component {

    state = {
        accessRight: "",
        moduleId: "",
        multimedia: {
            columns: [
                {
                    label: "Name",
                    field: "name",
                    width: 150,
                    sort: "asc"
                },
                {
                    label: "Date Created",
                    field: "createdDt",
                    width: 150,
                    sort: "asc"
                },
                {
                    label: "Created By",
                    field: "uploadedBy",
                    width: 150,
                    sort: "asc"
                },
                {
                    label: "",
                    field: "action",
                    sort: "asc"
                }
            ],
            rows: []
        },
        multimediaStudentView: {
            columns: [
                {
                    label: "Name",
                    field: "name",
                    width: 150,
                    sort: "asc"
                },
                {
                    label: "Date Created",
                    field: "createdDt",
                    width: 150,
                    sort: "asc"
                },
                {
                    label: "Created By",
                    field: "uploadedBy",
                    width: 150,
                    sort: "asc"
                },
                {
                    label: "",
                    field: "action",
                    sort: "asc"
                }
            ],
            rows: []
        },
        modalUploadMultimedia: false,
        uploadedMultimedia: [],
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

    async initPage() {
        let moduleId = this.props.match.params.moduleId;
        let accessRight = localStorage.getItem("accessRight");
        if (moduleId) {
            // retrieve module multimedia & set state
            // customise the clickEvent to pass id
            await axios
                .get(API_URL + "/file/retrieveAllMultimediaForModule?moduleId=" + moduleId)
                .then(result => {
                    let data = result && result.data && result.data.files;
                    let arr = [];
                    let arrStudentView = [];
                    const method = this.clickMultimedia;
                    const deleteMethod = this.deleteMultimedia;
                    Object.keys(data).forEach(function (key) {
                        let dateCreatedDt = data[key].createdDt ? data[key].createdDt.substring(0,10) : "";
                        let timeCreatedDt = data[key].createdDt ? data[key].createdDt.substring(11,16) : "";
                        let temp = {
                            name: data[key].name,
                            createdDt: dateCreatedDt + " " + timeCreatedDt,
                            uploadedBy: data[key].uploader.firstName + " " + data[key].uploader.lastName,
                            action: (<div><MDBBtn size="sm" onClick={e => method(data[key].fileId)}>View</MDBBtn>
                                    <MDBBtn size="sm" color="danger" onClick={e => deleteMethod(data[key].fileId)}>Delete</MDBBtn></div>)
                        }
                        arr.push(temp);

                        let temp2 = {
                            name: data[key].name,
                            createdDt: dateCreatedDt + " " + timeCreatedDt,
                            uploadedBy: data[key].uploader.firstName + " " + data[key].uploader.lastName,
                            action: (<MDBBtn size="sm" onClick={e => method(data[key].fileId)}>View</MDBBtn>)
                        }
                        arrStudentView.push(temp2);
                    });
                    this.setState({
                        ...this.state,
                        accessRight: accessRight,
                        moduleId: moduleId,
                        multimedia: {
                            ...this.state.multimedia,
                            rows: arr
                        },
                        multimediaStudentView: {
                            ...this.state.multimediaStudentView,
                            rows: arrStudentView
                        } 
                    });
                })
                .catch(error => {
                    this.setState({
                        message: error.response.data.errorMessage,
                        openSnackbar: true
                    })
                    console.error("error in axios " + error);
                });
        }
    }

    clickMultimedia = (id) => {
        this.props.dataStore.setPath(`/modules/${this.state.moduleId}/multimedia/${id}`);
        this.props.history.push(`/modules/${this.state.moduleId}/multimedia/${id}`);
        /*var a = document.createElement('a');
        a.href = FILE_SERVER + name;
        a.download = name;
        a.style.display = "none";
        document.body.appendChild(a);
        a.target = "blank";
        a.click();
        document.body.removeChild(a);*/
    }

    selectAllCheckbox = () => {
        var selectAll = document.getElementById("multimediaCheckboxAll");
        if (selectAll.checked == true) {
            var checkboxes = document.getElementsByName("multimediaCheckbox");
            for (var i=0; i<checkboxes.length; i++) {
                (checkboxes[i]).checked = true;
            }
        } else {
            var checkboxes = document.getElementsByName("multimediaCheckbox");
            for (var i=0; i<checkboxes.length; i++) {
                (checkboxes[i]).checked = false;
            }
        }
    }

    deleteMultimedia = (fileId) => {
        /*let arr = [];
        let multimediaIds = this.state.multimediaIds;
        for (var i=0; i < multimediaIds.length; i++) {
            if (document.getElementById(multimediaIds[i]).checked == true) {
                arr.push(multimediaIds[i]);
            }
        }
        console.log(arr)*/
        axios
            .delete(API_URL + "/file/deleteFile?fileId=" + fileId)
            .then((result) => {
                this.setState({
                    message: "File (" + fileId + ") deleted successfully!",
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

    toggleModal = nr => () => {
        let modalNumber = "modal" + nr;
        if (nr == "UploadMultimedia") {
            this.setState({
                ...this.state,
                uploadedMultimedia: [],
                [modalNumber]: !this.state[modalNumber]
            })
        }
        else {
            this.setState({
                ...this.state,
                [modalNumber]: !this.state[modalNumber]
            });
        }
    };

    uploadMultimedia = (e) => {
        this.setState({
            ...this.state,
            modalUploadMultimedia: true
        })
    }

    onDrop = (uploadedMultimedia) => {
        this.setState({
            ...this.state,
            uploadedMultimedia: this.state.uploadedMultimedia.concat(uploadedMultimedia)
        });
    }

    submitNewMultimediaHandler = event => {
        event.preventDefault();

        // call api to send
        var files = this.state.uploadedMultimedia;
        if (files.length > 0 && this.state.moduleId && localStorage.getItem("userId")) {
            const formData = new FormData();
            for (let i = 0; i < files.length; i++) {
                formData.append('file', files[i]);
            }
            
            fetch(`${API_URL}/file/uploadMultiple?moduleId=${this.state.moduleId}&type=multimedia&userId=${localStorage.getItem("userId")}`, {
                method: 'post',
                body: formData
            })
                .then((result) => {
                    if (result.status == "200") {
                        this.setState({
                            ...this.state,
                            modalUploadFiles: false,
                            uploadedFiles: [],
                            message: "New file uploaded successfully!",
                            openSnackbar: true
                        })
                        return this.initPage();
                    }
                })
                .catch(error => {
                    this.setState({
                    ...this.state,
                    modalUploadFiles: false,
                    uploadedFiles: [],
                    message: error.response.data.errorMessage,
                    openSnackbar: true
                });
                console.error("error in axios " + error);
                return this.initPage();
            });
        }
        
        this.setState({
            ...this.state,
            modalUploadMultimedia: false,
            uploadedMultimedia: []
        })
    }

    removeMultimediaUpload = (file) => {
        var array = this.state.uploadedMultimedia.filter(function(item) {
            return item !== file
        });
        console.log(array)
        this.setState({
            ...this.state,
            uploadedMultimedia: array
        })
    }

    upload = () => {
        document.getElementById('multimediaInput').click();
    }

    uploadFileOnChange = () => {
        var file = this.fileUpload.files[0];
        
        if (file != null) {
            const formData = new FormData();
            formData.append('file', file)
            fetch(`${API_URL}/file/upload?moduleId=${this.state.moduleId}&type=multimedia&userId=${localStorage.getItem("userId")}`, {
                method: 'post',
                body: formData
            })
            .then((result) => {
                this.setState({
                    ...this.state,
                    message: "New multimedia file uploaded successfully!",
                    openSnackbar: true,
                    modalUploadMultimedia: false
                })
                return this.initPage();
            })
            .catch(error => {
                this.setState({
                    modalUploadMultimedia: false,
                    message: error.response.data.errorMessage,
                    openSnackbar: true
                })
                console.error("error in axios " + error);
            });
        }
    }

    render() {
        let uploadedMultimedia = this.state.uploadedMultimedia;
        let multimedia = this.state.multimedia;
        if (this.state.accessRight == "Student") {
            multimedia = this.state.multimediaStudentView;
        }
        else if (this.state.accessRight == "Teacher") {
            multimedia = this.state.multimedia;
        }
        return (
            <div className={this.props.className}>
                <div className="module-sidebar-large"><ModuleSideNavigation moduleId={this.props.match.params.moduleId}></ModuleSideNavigation></div>
                <div className="module-navbar-small">
                    <ModuleSideNavigationDropdown moduleId={this.props.match.params.moduleId} activeTab={'Multimedia'}></ModuleSideNavigationDropdown>
                </div>
                <div className="module-content">
                    <MDBContainer>
                        <MDBRow>
                            <MDBCol>
                                <h4 className="mb-4">Multimedia</h4>
                                <hr className="my-4" />
                            </MDBCol>
                        </MDBRow>
                        <MDBRow className="mb-3">
                            <MDBCol>
                                <div className="align-right">
                                    {
                                        this.state.accessRight == "Teacher" &&
                                        <MDBBtn color="primary lighten-2" outline className="mr-0" size="md" onClick={e => this.uploadMultimedia()}>
                                            Upload
                                        </MDBBtn>
                                    }
                                </div>
                            </MDBCol>
                        </MDBRow>

                        <MDBModal
                            isOpen={this.state.modalUploadMultimedia}
                            toggle={this.toggleModal("UploadMultimedia")}
                        >
                            <MDBModalHeader className="text-center"
                                titleClass="w-100"
                                toggle={this.toggleModal("UploadMultimedia")}>
                                Upload Files
                            </MDBModalHeader>
                            <form className="needs-validation" noValidate onSubmit={this.submitNewMultimediaHandler}>
                                <MDBModalBody>
                                    <div className="text-center mt-2">
                                        {/*
                                        <SectionContainer className="mb-0 p-5 mt-1">
                                            <div onClick={e => this.upload()}>
                                                <MDBIcon icon="upload" size="3x" className="mb-3 indigo-text"></MDBIcon><br></br>
                                                Click to Upload Multimedia
                                            </div>
                                        </SectionContainer>*/}
                                        
                                        <Dropzone onDrop={this.onDrop} multiple accept=".mp4">
                                            {({ getRootProps, getInputProps, isDragActive, isDragReject, rejectedFiles }) => (
                                                <div {...getRootProps()}>
                                                    <input {...getInputProps()} />
                                                    <SectionContainer className="mb-0 p-5 mt-1">
                                                        <MDBIcon icon="upload" size="3x" className="mb-3 indigo-text"></MDBIcon><br></br>
                                                        Click to Upload or Drag & Drop
                                                    </SectionContainer>
                                                </div>
                                            )}
                                        </Dropzone>
                                    </div>
                                    <input id="multimediaInput" type="file" value="" ref={(ref) => this.fileUpload = ref} style={{display: 'none'}} onChange={e => this.uploadFileOnChange()} accept=".mp4" />

                                    <MDBListGroup className="my-4 mx-4" style={{width: "26rem", height:"auto", maxHeight: "120px", overflowY: "auto"}}>
                                        {uploadedMultimedia.length > 0 && uploadedMultimedia.map((uploadedFile, index) => (
                                            <MDBListGroupItem key={index}>
                                                <MDBIcon icon="times" className="mr-3" onClick={e => this.removeMultimediaUpload(uploadedFile)}></MDBIcon>{uploadedFile.name}
                                            </MDBListGroupItem>
                                        ))}
                                    </MDBListGroup>
                                </MDBModalBody>
                                <MDBModalFooter>
                                    <MDBBtn color="secondary" onClick={this.toggleModal("UploadMultimedia")}>
                                        Cancel
                                        </MDBBtn>
                                    <MDBBtn color="primary" type="submit" disabled={this.state.uploadedMultimedia.length == 0}>Save</MDBBtn>
                                </MDBModalFooter>
                            </form>
                        </MDBModal>

                        <MDBRow>
                            <MDBCol>
                                {
                                    multimedia.rows.length > 0 &&
                                    <MDBDataTable striped bordered hover searching={true} sortable={true} data={multimedia} />
                                }
                                {
                                    multimedia.rows.length == 0 &&
                                    <div>No multimedia uploaded yet</div>
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

export default styled(withRouter(ModuleMultimediaPage))`
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
.checkbox-option{
    height: 15px;
    width: 15px;
    vertical-align: middle;
}
.align-right{
    float: right;
}
tbody + thead{
    display: none;
}
`;

class ModuleMultimediaDetailsPage extends Component {

    state = {
        multimedia: {
            multimediaId: '',
            name: '',
            message: "",
            openSnackbar: ""
        }
    }

    componentDidMount() {
        this.initPage();
    }

    initPage() {
        let multimediaId = this.props.match.params.multimediaId;
        if (multimediaId) {
            axios
                .get(API_URL + "/file/retrieveMultimediaById?multimediaId=" + multimediaId)
                .then(result => {
                    if (result) {
                        let savedFileName = result.data.location.split('\\')[1];
                        let fullPath = FILE_SERVER + savedFileName;
                        this.setState({
                            ...this.state,
                            multimedia: {
                                multimediaId: multimediaId,
                                name: result.data.name
                            }
                        });
                        document.getElementById('multimediaToShow').src = fullPath;
                    }
                })
                .catch(error => {
                    this.setState({
                        message: error.response.data.errorMessage,
                        openSnackbar: true
                    })
                    console.error("error in axios " + error);
                });
        }
    }

    goToMultimediaMain = () => {
        this.props.dataStore.setPath(`/modules/${this.props.match.params.moduleId}/multimedia`);
        this.props.history.push(`/modules/${this.props.match.params.moduleId}/multimedia`);
    }

    render() {
        return (
            <div className={this.props.className}>
                <div className="module-sidebar-large"><ModuleSideNavigation moduleId={this.props.match.params.moduleId}></ModuleSideNavigation></div>
                <div className="module-navbar-small">
                    <ModuleSideNavigationDropdown moduleId={this.props.match.params.moduleId} activeTab={'Multimedia'}></ModuleSideNavigationDropdown>
                </div>
                <div className="module-content">
                    <MDBContainer>
                        <MDBRow>
                            <MDBCol>
                                <MDBRow className="ml-1">
                                    <div style={{ color:"#007bff", fontWeight:"300", fontSize:"1.5rem", lineHeight:"1.2", marginBlockStart:"1.33em", cursor:"pointer", textDecoration:"underline" }} 
                                        onClick={e => this.goToMultimediaMain()}>
                                            Multimedia
                                    </div>
                                    
                                    <MDBIcon icon="angle-right" className="ml-4 mr-4" style={{ fontSize:"1.5rem", lineHeight:"1.2", marginBlockStart:"1.33em"}} />
                                    <div style={{ fontWeight:"300", fontSize:"1.5rem", lineHeight:"1.2", marginBlockStart:"1.33em" }}>
                                        {this.state.multimedia.name.split(".")[0]}
                                    </div>
                                </MDBRow>
                                <hr className="my-4" />
                            </MDBCol>
                        </MDBRow>
                        <MDBRow>
                            <MDBCol>
                                <video controls controlsList="nodownload" height="500px" id="multimediaToShow" >
                                </video>
                                <div className="mb-4" />
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </div>
            </div>
          );
    }
}

export const ModuleMultimediaDetailsPageStyled = styled(ModuleMultimediaDetailsPage)`
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
.checkbox-option{
    height: 15px;
    width: 15px;
    vertical-align: middle;
}
.align-right{
    float: right;
}
tbody + thead{
    display: none;
}
`
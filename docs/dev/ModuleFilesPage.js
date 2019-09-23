import React, { Component } from "react";
import { NavLink, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { 
    MDBContainer, 
    MDBRow, 
    MDBCol, 
    MDBIcon, 
    MDBBtn, 
    MDBTable, 
    MDBTableHead, 
    MDBTableBody,
    MDBModal,
    MDBModalHeader,
    MDBModalBody,
    MDBModalFooter,
    MDBListGroup,
    MDBListGroupItem 
} from "mdbreact";
import ModuleSideNavigation from "./ModuleSideNavigation";
import SectionContainer from "../components/sectionContainer";
import axios from "axios";
import Dropzone from 'react-dropzone';

class ModuleFilesPage extends Component {

    state = {
        fileIds: [],
        folderIds: [],
        files: {
            columns: [
                {
                    label: [<div key={1}><input type="checkbox" className="mr-4" style={{ 'height': '17px', 'width': '17px', 'verticalAlign': 'middle' }} id={"filesCheckboxAll"} key={"filesCheckboxAll"} onClick={e => this.selectAllFilesCheckbox()} />Name</div>],
                    field: "fileName",
                    sort: "asc",
                },
                {
                    label: "Last Modified By",
                    field: "lastModifiedBy",
                    sort: "asc"
                },
                {
                    label: "Last Modified Dt",
                    field: "lastModifiedDt",
                    sort: "asc"
                },
                {
                    label: "Created Dt",
                    field: "createdDt",
                    sort: "asc"
                },
                {
                    label: "Size",
                    field: "size",
                    sort: "asc"
                }
            ],
            rows: []
        },
        folders: {
            columns: [
                {
                    label: [<input type="checkbox" className="mr-4" style={{ 'height': '17px', 'width': '17px', 'verticalAlign': 'middle' }} id={"foldersCheckboxAll"} key={"foldersCheckboxAll"} onClick={e => this.selectAllFoldersCheckbox()} />],
                    field: "check",
                    sort: "asc"
                },
                {
                    label: "Name",
                    field: "folderName",
                    sort: "asc"
                },
                {
                    label: "Opening Date",
                    field: "openDt",
                    sort: "asc"
                },
                {
                    label: "Closing Date",
                    field: "closeDt",
                    sort: "asc"
                },
                {
                    label: "Status",
                    field: "status",
                    sort: "asc"
                }
            ],
            rows: []
        },
        modalNewFolder: false,
        modalUploadFiles: false,
        folderNameInput: "",
        folderOpenDateInput: "",
        folderCloseDateInput: "",
        folderStudentUploadInput: "",
        folderStudentUploadOpenDateInput: "",
        folderStudentUploadCloseDateInput: "",
        uploadedFiles: []
    }

    componentDidMount() {
        this.initPage();
    }

    initPage() {
        let moduleId = this.props.match.params.moduleId;
        let folderId = this.props.match.params.folderId;
        if (moduleId) {
            console.log(moduleId);
            this.setState({
                moduleId: moduleId
            })
            // retrieve top level folders / files
            axios
                .get("http://localhost:3001/moduleFiles")
                .then(result => {
                    let data = result.data;
                    let arr = [];
                    let fileIds = [];
                    Object.keys(data).forEach(function (key) {
                        let temp = {
                            fileName: (<div>
                                <input type="checkbox" style={{ 'height': '17px', 'width': '17px', 'verticalAlign': 'middle' }} id={data[key].fileId} name="filesCheckbox" />
                                <MDBIcon icon="file" className="mr-2 ml-4" />{data[key].fileName}
                                </div>
                            ),
                            lastModifiedBy: data[key].lastModifiedBy,
                            lastModifiedDt: data[key].lastModifiedDt,
                            createdDt: data[key].createdDt,
                            size: data[key].size
                        }
                        arr.push(temp);
                        fileIds.push(data[key].fileId);
                    });
                    this.setState({
                        ...this.state,
                        files: {
                            ...this.state.files,
                            rows: arr
                        },
                        fileIds: fileIds
                    });
                })
                .catch(error => {
                    console.error("error in axios " + error);
                });
            
            axios
                .get("http://localhost:3001/moduleFolders")
                .then(result => {
                    let data = result.data;
                    let arr = [];
                    let folderIds = [];
                    const method = this.goToFolder;
                    Object.keys(data).forEach(function (key) {
                        let temp = {
                            check: <input type="checkbox" style={{ 'height': '17px', 'width': '17px', 'verticalAlign': 'middle' }} id={data[key].folderId} name="foldersCheckbox" />,
                            folderName: (<NavLink to={`/modules/${moduleId}/files/${data[key].folderId}`}>
                                <MDBRow>
                                    <MDBIcon icon="folder" className="mr-2 ml-4" />
                                    <div style={{ "textDecoration": "underline", 'verticalAlign': 'middle', "color": "#3f51b5" }}>
                                        {data[key].folderName}
                                    </div>
                                </MDBRow>
                            </NavLink>
                            ),
                            openDt: data[key].openDt,
                            closeDt: data[key].closeDt,
                            status: data[key].status
                        }
                        arr.push(temp);
                        folderIds.push(data[key].folderId);
                    });
                    this.setState({
                        folders: {
                            ...this.state.folders,
                            rows: arr
                        },
                        folderIds: folderIds
                    });
                })
                .catch(error => {
                    console.error("error in axios " + error);
                });
        }
        if (folderId) {
            // retrieve folders / files in this folder
        }
    }

    goToFolder = (folderId) => {
        console.log(folderId)
        this.props.history.push(`/modules/${this.state.moduleId}/files/${folderId}`);
    }

    toggleModal = nr => () => {
        let modalNumber = "modal" + nr;
        this.setState({
            [modalNumber]: !this.state[modalNumber]
        });
    };

    newFolder = (e) => {
        this.setState({
            modalNewFolder: true
        })
    }

    inputChangeHandler = (e) => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        });
        console.log(e.target.name + " " + e.target.value)
    }

    submitNewFolderHandler = event => {
        event.preventDefault();
        event.target.className += " was-validated";
    }

    uploadFiles = (e) => {
        this.setState({
            modalUploadFiles: true
        })
    }

    onDrop = (uploadedFiles) => {
        console.log(uploadedFiles);
        this.setState({
            ...this.state,
            uploadedFiles: this.state.uploadedFiles.concat(uploadedFiles)
        });
    }

    submitNewFilesHandler = event => {
        event.preventDefault();
        console.log(this.state.uploadedFiles);

        // call api to send
        let files = this.state.uploadedFiles;
        var formData = new FormData();
        files.map((file, index) => {
            formData.append(`file${index}`, file);
        });
        
        this.setState({
            modalUploadFiles: false
        })
    }

    selectAllFilesCheckbox = () => {
        var selectAll = document.getElementById("filesCheckboxAll");
        if (selectAll.checked == true) {
            var checkboxes = document.getElementsByName("filesCheckbox");
            for (var i=0; i<checkboxes.length; i++) {
                (checkboxes[i]).checked = true;
            }
        } else {
            var checkboxes = document.getElementsByName("filesCheckbox");
            for (var i=0; i<checkboxes.length; i++) {
                (checkboxes[i]).checked = false;
            }
        }
    }

    selectAllFoldersCheckbox = () => {
        var selectAll = document.getElementById("foldersCheckboxAll");
        if (selectAll.checked == true) {
            var checkboxes = document.getElementsByName("foldersCheckbox");
            for (var i=0; i<checkboxes.length; i++) {
                (checkboxes[i]).checked = true;
            }
        } else {
            var checkboxes = document.getElementsByName("foldersCheckbox");
            for (var i=0; i<checkboxes.length; i++) {
                (checkboxes[i]).checked = false;
            }
        }
    }

    downloadFiles = (e) => {
        let arr = {
            files: [],
            folders: []
        }
        let fileIds = this.state.fileIds;
        for (var i=0; i < fileIds.length; i++) {
            if (document.getElementById(fileIds[i]).checked == true) {
                arr.files.push(fileIds[i]);
            }
        }
        let folderIds = this.state.folderIds;
        for (var i=0; i < folderIds.length; i++) {
            if (document.getElementById(folderIds[i]).checked == true) {
                arr.folders.push(folderIds[i]);
            }
        }
        console.log(arr)
    }

    deleteFiles = (e) => {
        let arr = {
            files: [],
            folders: []
        }
        let fileIds = this.state.fileIds;
        for (var i=0; i < fileIds.length; i++) {
            if (document.getElementById(fileIds[i]).checked == true) {
                arr.files.push(fileIds[i]);
            }
        }
        let folderIds = this.state.folderIds;
        for (var i=0; i < folderIds.length; i++) {
            if (document.getElementById(folderIds[i]).checked == true) {
                arr.folders.push(folderIds[i]);
            }
        }
        console.log(arr)
    }

    render() {
        let files = this.state.files;
        let folders = this.state.folders;
        let uploadedFiles = this.state.uploadedFiles;
        return (
            <div className={this.props.className}>
                <ModuleSideNavigation moduleId={this.props.match.params.moduleId}></ModuleSideNavigation>
                <div className="module-content">
                    <MDBContainer className="mb-4">
                        <MDBRow>
                            <MDBCol>
                                <h4>Files</h4>
                                <hr className="my-4" />
                            </MDBCol>
                        </MDBRow>
                        <MDBRow className="mb-3">
                            <MDBCol>
                                <div className="align-right">
                                    <MDBBtn color="primary lighten-2" outline className="mr-0" size="md" onClick={e => this.newFolder()}>
                                        New Folder
                                    </MDBBtn>
                                    <MDBBtn color="primary lighten-2" outline className="mr-0" size="md" onClick={e => this.uploadFiles()}>
                                        Upload Files
                                    </MDBBtn>
                                    <MDBBtn color="primary lighten-2" outline className="mr-0" size="md" onClick={e => this.downloadFiles()}>
                                        Download
                                    </MDBBtn>
                                    <MDBBtn color="danger" outline className="mr-0" size="md" onClick={e => this.deleteFiles()}>
                                        Delete
                                    </MDBBtn>
                                </div>
                            </MDBCol>
                        </MDBRow>

                        <MDBModal
                            isOpen={this.state.modalNewFolder}
                            toggle={this.toggleModal("NewFolder")}
                            centered
                        >
                            <MDBModalHeader className="text-center"
                                titleClass="w-100"
                                toggle={this.toggleModal("NewFolder")}>
                                New Folder
                            </MDBModalHeader>
                            <form className="needs-validation" noValidate onSubmit={this.submitNewFolderHandler}>
                                <MDBModalBody>
                                    <div className="form-row align-items-center mb-2">
                                        <div className="col-12">
                                            <label className="mb-1">Name</label>
                                        </div>
                                        <div className="col-12">
                                            <input type="text" className="form-control" name="folderNameInput"
                                                value={this.state.folderNameInput}
                                                onChange={this.inputChangeHandler}
                                                required />
                                        </div>
                                    </div>
                                    <div className="form-row align-items-center mb-2">
                                        <div className="col-12">
                                            <label className="mb-1">Open Date</label>
                                        </div>
                                        <div className="col-12">
                                            <input type="datetime-local" className="form-control" name="folderOpenDateInput"
                                                value={this.state.folderOpenDateInput}
                                                onChange={this.inputChangeHandler}
                                                required />
                                        </div>
                                    </div>
                                    <div className="form-row align-items-center mb-2">
                                        <div className="col-12">
                                            <label className="mb-1">Close Date</label>
                                        </div>
                                        <div className="col-12">
                                            <input type="datetime-local" className="form-control" name="folderCloseDateInput"
                                                value={this.state.folderCloseDateInput}
                                                onChange={this.inputChangeHandler}
                                                required />
                                        </div>
                                    </div>
                                    <div className="form-row align-items-center mb-2">
                                        <div className="col-12">
                                            <label className="mb-1">Student Upload</label>
                                        </div>
                                        <div className="col-12">
                                            <select className="form-control" onChange={this.inputChangeHandler}
                                                name="folderStudentUploadInput"
                                                value={this.state.folderStudentUploadInput}
                                                required >
                                                <option value="">--</option>
                                                <option value={true}>Yes</option>
                                                <option value={false}>No</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="form-row align-items-center mb-2">
                                        <div className="col-12">
                                            <label className="mb-1">Student Upload Opening Date</label>
                                        </div>
                                        <div className="col-12">
                                            <input type="datetime-local" className="form-control" name="folderStudentUploadOpenDateInput"
                                                value={this.state.folderStudentUploadOpenDateInput}
                                                onChange={this.inputChangeHandler}
                                                disabled={this.state.folderStudentUploadInput !== "true"}
                                                required />
                                        </div>
                                    </div>
                                    <div className="form-row align-items-center mb-2">
                                        <div className="col-12">
                                            <label className="mb-1">Student Upload Closing Date</label>
                                        </div>
                                        <div className="col-12">
                                            <input type="datetime-local" className="form-control" name="folderStudentUploadCloseDateInput"
                                                value={this.state.folderStudentUploadCloseDateInput}
                                                onChange={this.inputChangeHandler}
                                                disabled={this.state.folderStudentUploadInput !== "true"}
                                                required />
                                        </div>
                                    </div>
                                </MDBModalBody>
                                <MDBModalFooter>
                                    <MDBBtn color="secondary" onClick={this.toggleModal("NewFolder")}>
                                        Cancel
                                        </MDBBtn>
                                    <MDBBtn color="primary" type="submit">Save</MDBBtn>
                                </MDBModalFooter>
                            </form>
                        </MDBModal>

                        <MDBModal
                            isOpen={this.state.modalUploadFiles}
                            toggle={this.toggleModal("UploadFiles")}
                        >
                            <MDBModalHeader className="text-center"
                                titleClass="w-100"
                                toggle={this.toggleModal("UploadFiles")}>
                                Upload Files
                            </MDBModalHeader>
                            <form className="needs-validation" noValidate onSubmit={this.submitNewFilesHandler}>
                                <MDBModalBody>
                                    <div className="text-center mt-2">
                                        <Dropzone onDrop={this.onDrop} multiple>
                                            {({ getRootProps, getInputProps, isDragActive, isDragReject, rejectedFiles }) => (
                                                <div {...getRootProps()}>
                                                    <input {...getInputProps()} />
                                                    <SectionContainer className="mb-0 p-5 mt-1">Click to Upload or Drag & Drop</SectionContainer>
                                                </div>
                                            )}
                                        </Dropzone>
                                    </div>
                                    <MDBListGroup className="my-4 mx-4" style={{width: "26rem", height:"auto", maxHeight: "100px", overflowY: "auto"}}>
                                        {uploadedFiles.length > 0 && uploadedFiles.map((uploadedFile, index) => (
                                            <MDBListGroupItem key={index}>
                                                {uploadedFile.name}
                                            </MDBListGroupItem>
                                        ))}
                                    </MDBListGroup>
                                </MDBModalBody>
                                <MDBModalFooter>
                                    <MDBBtn color="secondary" onClick={this.toggleModal("UploadFiles")}>
                                        Cancel
                                        </MDBBtn>
                                    <MDBBtn color="primary" type="submit">Save</MDBBtn>
                                </MDBModalFooter>
                            </form>
                        </MDBModal>

                        {
                            folders.rows.length == 0 && files.rows.length == 0 &&
                            <div className="mt-4"><h6>No Files or Folders to show</h6></div>
                        }
                        {
                            folders.rows.length > 0 && 
                            <MDBRow>
                                <MDBCol>
                                    <MDBTable bordered btn fixed>
                                        <MDBTableHead columns={folders.columns} />
                                        <MDBTableBody rows={folders.rows} />
                                    </MDBTable>
                                </MDBCol>
                            </MDBRow>
                        }
                        {
                            files.rows.length > 0 && 
                            <MDBRow>
                                <MDBCol>
                                    <MDBTable bordered btn fixed >
                                        <MDBTableHead columns={files.columns} />
                                        <MDBTableBody rows={files.rows} />
                                    </MDBTable>
                                </MDBCol>
                            </MDBRow>
                        }

                    </MDBContainer>
                </div>
            </div>
          );
    }
}

class FolderListItem extends Component {

    render(){
        let folder = this.props.folder;
        let moduleId = this.props.moduleId;
        return <div>
            {
                folder.status &&
                <NavLink to={`/modules/${moduleId}/files/${folder.id}`} >
                    <SectionContainer noBottom>
                        <MDBRow>
                            <MDBCol size="1">
                                <input type="checkbox" className="checkbox-option"></input>
                            </MDBCol>
                            <MDBCol size="3">
                                <MDBIcon icon="folder" className="mr-2" /> {folder.folderName}
                            </MDBCol>
                            <MDBCol size="2">
                                {folder.openDate}
                            </MDBCol>
                            <MDBCol size="2">
                                {folder.closeDate}
                            </MDBCol>
                            <MDBCol size="2">
                                <MDBIcon icon="circle" className="green-text ml-3" />
                            </MDBCol>
                            <MDBCol size="1">
                                <MDBIcon icon="trash-alt" />
                            </MDBCol>
                        </MDBRow>
                    </SectionContainer>
                </NavLink>
            }
            {
                !folder.status &&
                <SectionContainer noBottom>
                    <MDBRow>
                        <MDBCol size="1">
                            <input type="checkbox" className="checkbox-option"></input>
                        </MDBCol>
                        <MDBCol size="3">
                            <MDBIcon icon="folder" className="mr-2" /> {folder.folderName}
                        </MDBCol>
                        <MDBCol size="2">
                            {folder.openDate}
                        </MDBCol>
                        <MDBCol size="2">
                            {folder.closeDate}
                        </MDBCol>
                        <MDBCol size="2">
                            <MDBIcon icon="circle" className="red-text ml-3" />
                        </MDBCol>
                        <MDBCol size="1">
                            <MDBIcon icon="trash-alt" />
                        </MDBCol>
                    </MDBRow>
                </SectionContainer>
            }
        </div>
    }
}

class FileListItem extends Component {

    render(){
        let file = this.props.file;
        return <SectionContainer noBottom>
            <MDBRow>
                <MDBCol size="1">
                    <input type="checkbox" className="checkbox-option"></input>
                </MDBCol>
                <MDBCol size="2">
                    <MDBIcon icon="file" className="mr-2" /> {file.fileName}
                </MDBCol>
                <MDBCol size="2">
                    {file.lastModifiedBy}
                </MDBCol>
                <MDBCol size="2">
                    {file.lastModifiedDt}
                </MDBCol>
                <MDBCol size="2">
                    {file.createdDt}
                </MDBCol>
                <MDBCol size="2">
                    {file.size}
                </MDBCol>
                <MDBCol size="1">
                    <MDBIcon icon="trash-alt" />
                </MDBCol>
            </MDBRow>
        </SectionContainer>
    }
}


export default styled(ModuleFilesPage)`
.module-content{
    margin-top: 40px;
}
@media (min-width: 1199.98px) {
    .module-content{
        margin-left: 270px;
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
`;

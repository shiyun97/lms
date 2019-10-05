import React, { Component } from "react";
import { NavLink, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { 
    MDBContainer, 
    MDBRow, 
    MDBCol, 
    MDBIcon, 
    MDBBtn, 
    MDBDataTable,
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
import ModuleSideNavigationDropdown from "./ModuleSideNavigationDropdown";
import SectionContainer from "../components/sectionContainer";
import axios from "axios";
import 'babel-polyfill';
import Dropzone from 'react-dropzone';
import Snackbar from '@material-ui/core/Snackbar';

const API_URL = "http://localhost:8080/LMS-war/webresources";

const FILE_SERVER = "http://127.0.0.1:8887/";

class ModuleFilesPage extends Component {

    state = {
        accessRight: "",
        moduleId: "",
        folderId: "",
        folder: {
            submission: false,
            submissionOpenTs: "",
            submissionCloseTs: ""
        },
        fileIds: [],
        folderIds: [],
        files: {
            columns: [
                {
                    label: "Name",
                    field: "fileName",
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
                    width: 150
                }
            ],
            rows: []
        },
        folders: {
            columns: [
                {
                    label: "Name",
                    field: "folderName",
                    width: 150,
                    attributes: {
                        "aria-controls": "DataTable",
                        "aria-label": "Name"
                    }
                },
                {
                    label: "Submission Open Date",
                    field: "openDt",
                    width: 150
                },
                {
                    label: "Submission Close Date",
                    field: "closeDt",
                    width: 150
                },
                {
                    label: "",
                    field: "action",
                    width: 150
                }
            ],
            rows: []
        },
        foldersStudent: {
            columns: [
                {
                    label: "Name",
                    field: "folderName",
                    width: 150,
                    attributes: {
                        "aria-controls": "DataTable",
                        "aria-label": "Name"
                    }
                },
                {
                    label: "Submission Open Date",
                    field: "openDt",
                    width: 150
                },
                {
                    label: "Submission Close Date",
                    field: "closeDt",
                    width: 150
                },
                {
                    label: "Status",
                    field: "status",
                    width: 150
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
        uploadedFiles: [],
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
        let folderId = this.props.match.params.folderId;
        let accessRight = localStorage.getItem("accessRight");
        let queryString;
        if (this.props.match.params.folderId) {
            queryString = "moduleId=" + moduleId + "&folderId=" + folderId;
        }
        else {
            queryString = "moduleId=" + moduleId;
        }
        if (moduleId) {
            // retrieve folders / files based on folderId
            await axios
                .get(API_URL + "/file/retrieveFilesByFolderIdForModule?" + queryString)
                .then(result => {
                    let files = result.data && result.data.files;
                    let folders = result.data && result.data.folders;
                    let currentFolder = result.data && result.data.folder;
                    let filesArr = [];
                    let filesArrStudent = [];
                    let foldersArr = [];
                    let foldersArrStudent = [];
                    // populate folders
                    const deleteFolderMethod = this.deleteFolder;
                    const viewFolderMethod = this.goToFolder;
                    const twoDigits = this.twoDigits;
                    Object.keys(folders).forEach(function (key) {
                        let today = new Date();
                        let timezoneTemp = today.toString().match(/([-\+][0-9]+)\s/)[1];
                        let timezone = timezoneTemp.substring(0, 3) + ":" + timezoneTemp.substring(3);
                        let currentDate = today.getUTCFullYear() + "-" + twoDigits(1 + today.getUTCMonth()) + "-"
                            + twoDigits(today.getUTCDate()) + "T" + twoDigits(today.getHours())
                            + ":" + twoDigits(today.getMinutes()) + ":"
                            + twoDigits(today.getSeconds()) + timezone;

                        let allowStudentAccess = true;
                        if (folders[key].submission == true && (currentDate <= folders[key].submissionOpenTs || currentDate >= folders[key].submissionCloseTs)) {
                            allowStudentAccess = false;
                        }
                        let folderNameStringField = allowStudentAccess ? (<a href={`/modules/${moduleId}/files/${folders[key].folderId}`}>
                            <div style={{ "textDecoration": "underline", 'verticalAlign': 'middle', "color": "#3f51b5" }}>
                                {folders[key].name}
                            </div>
                        </a>
                        ) : (<div>{folders[key].name}</div>)
                        
                        let dateStart = folders[key].submissionOpenTs ? folders[key].submissionOpenTs.substring(0,10) : "-";
                        let timeStart = folders[key].submissionOpenTs ? folders[key].submissionOpenTs.substring(11,16) : "";
                        let dateClose = folders[key].submissionCloseTs ? folders[key].submissionCloseTs.substring(0,10) : "-";
                        let timeClose = folders[key].submissionCloseTs ? folders[key].submissionCloseTs.substring(11,16) : "";

                        let tempStud = {
                            folderName: folderNameStringField,
                            openDt: dateStart + " " + timeStart,
                            closeDt: dateClose + " " + timeClose,
                            status: allowStudentAccess ? "Open" : "Closed"
                        }
                        let temp = {
                            folderName: (<a href={`/modules/${moduleId}/files/${folders[key].folderId}`}>
                                <div style={{ "textDecoration": "underline", 'verticalAlign': 'middle', "color": "#3f51b5" }}>
                                    {folders[key].name}
                                </div>
                            </a>
                            ),
                            openDt: dateStart + " " + timeStart,
                            closeDt: dateClose + " " + timeClose,
                            action: (<div><MDBBtn color="danger" size="sm" onClick={e => deleteFolderMethod(folders[key].folderId)}>
                                    Delete
                            </MDBBtn></div>)
                        }
                        foldersArr.push(temp);
                        foldersArrStudent.push(tempStud);
                    });

                    const deleteFileMethod = this.deleteFile;
                    const downloadFileMethod = this.downloadFile;
                    Object.keys(files).forEach(function (key) {
                        let dateCreatedDt = files[key].createdDt ? files[key].createdDt.substring(0,10) : "";
                        let timeCreatedDt = files[key].createdDt ? files[key].createdDt.substring(11,16) : "";
                        let temp = {
                            fileName: (<div>
                                <MDBIcon icon="file" className="mr-2 ml-4" />{files[key].name}
                            </div>
                            ),
                            createdDt: dateCreatedDt + " " + timeCreatedDt,
                            uploadedBy: files[key].uploader.firstName + " " + files[key].uploader.lastName,
                            action: (<div>
                                <MDBBtn color="primary" size="sm" onClick={e => downloadFileMethod(files[key].fileId, files[key].name)}>
                                    Download
                                </MDBBtn>
                                <MDBBtn color="danger" size="sm" onClick={e => deleteFileMethod(files[key].fileId)}>
                                    Delete
                                </MDBBtn>
                            </div>)
                        }
                        let tempStud = {
                            fileName: (<div>
                                <MDBIcon icon="file" className="mr-2 ml-4" />{files[key].name}
                            </div>
                            ),
                            createdDt: dateCreatedDt + " " + timeCreatedDt,
                            uploadedBy: files[key].uploader.firstName + " " + files[key].uploader.lastName,
                            action: (<div>
                                <MDBBtn color="primary" size="sm" onClick={e => downloadFileMethod(files[key].fileId, files[key].name)}>
                                    Download
                                </MDBBtn>
                                {
                                    files[key].uploader.userId == localStorage.getItem("userId") &&
                                    <MDBBtn color="danger" size="sm" onClick={e => deleteFileMethod(files[key].fileId)}>
                                        Delete
                                    </MDBBtn>
                                }
                                
                            </div>)
                        }
                        filesArr.push(temp);
                        filesArrStudent.push(tempStud);
                    });

                    this.setState({
                        ...this.state,
                        moduleId: moduleId,
                        folderId: folderId,
                        accessRight: accessRight,
                        folder: currentFolder,
                        folders: {
                            ...this.state.folders,
                            rows: foldersArr
                        },
                        foldersStudent: {
                            ...this.state.foldersStudent,
                            rows: foldersArrStudent
                        },
                        files: {
                            ...this.state.files,
                            rows: filesArr
                        },
                        filesStudent: {
                            ...this.state.files,
                            rows: filesArrStudent
                        }
                    });
                })
                .catch(error => {
                    this.setState({
                        message: error.response.data.errorMessage,
                        openSnackbar: true
                    });
                    console.error("error in axios " + error);
                });
        }
    }

    twoDigits(d) {
        if(0 <= d && d < 10) return "0" + d.toString();
        if(-10 < d && d < 0) return "-0" + (-1*d).toString();
        return d.toString();
    }

    goToFolder = (folderId) => {
        console.log(folderId)
        let moduleId = this.state.moduleId;
        this.props.history.push(`/modules/${moduleId}/files/${folderId}`);
        return this.initPage()
    }

    deleteFolder = (folderId) => {
        axios
            .delete(API_URL + "/file/deleteFolder?folderId=" + folderId)
            .then((result) => {
                this.setState({
                    message: "Folder (" + folderId + ") deleted successfully!",
                    openSnackbar: true
                });
                return this.initPage();
            })
            .catch(error => {
                this.setState({
                    message: error.response.data.errorMessage,
                    openSnackbar: true
                });
                console.error("error in axios " + error);
                return this.initPage();
            });
        
    }

    deleteFile = (fileId) => {
        console.log(fileId);
        axios
            .delete(API_URL + "/file/deleteFile?fileId=" + fileId)
            .then((result) => {
                this.setState({
                    message: "File (" + fileId + ") deleted successfully!",
                    openSnackbar: true
                });
                return this.initPage();
            })
            .catch(error => {
                this.setState({
                    message: error.response.data.errorMessage,
                    openSnackbar: true
                });
                console.error("error in axios " + error);
                return this.initPage();
            });
    }

    downloadFile = (fileId, fileName) => {
        console.log(fileName)
        console.log(fileId)
        fetch(API_URL + "/file/downloadFile?fileId=" + fileId, {
            method: 'get'
        })
        .then((response) => {
            response.blob().then(blob => {
                const link = document.createElement('a');
                const url = URL.createObjectURL(blob);
                link.href = url;
                link.download = fileName;
                link.click();
            })
        }).catch(error => {
            this.setState({
                message: error.response.data.errorMessage,
                openSnackbar: true
            });
            console.error("error in axios " + error);
            return this.initPage();
        });
    }

    toggleModal = nr => () => {
        let modalNumber = "modal" + nr;
        if (nr == "UploadFiles") {
            this.setState({
                ...this.state,
                uploadedFiles: [],
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

    newFolder = (e) => {
        this.setState({
            modalNewFolder: true
        })
    }

    inputChangeHandler = (e) => {
        e.preventDefault();
        console.log(e.target.name + " " + e.target.value)
        this.setState({
            [e.target.name]: e.target.value
        });
        
    }

    submitNewFolderHandler = event => {
        event.preventDefault();
        event.target.className += " was-validated";

        let moduleId = this.state.moduleId;
        let folderNameInput = this.state.folderNameInput;
        let folderStudentUploadInput = this.state.folderStudentUploadInput;

        console.log(folderStudentUploadInput)
        if (this.state.folderStudentUploadInput === "true" && (!this.state.folderStudentUploadOpenDateInput 
            || this.state.folderStudentUploadOpenDateInput.length === 0 || !this.state.folderStudentUploadCloseDateInput
            || this.state.folderStudentUploadCloseDateInput.length === 0)) {
            return;
        }
        if (folderNameInput === "" || folderStudentUploadInput === "") {
            return;
        }
        
        let folderStudentUploadOpenDateInput = this.state.folderStudentUploadOpenDateInput && this.state.folderStudentUploadOpenDateInput + ":00+08:00";
        let folderStudentUploadCloseDateInput = this.state.folderStudentUploadCloseDateInput && this.state.folderStudentUploadCloseDateInput + ":00+08:00";
        let body = {
            name: folderNameInput,
            submission: folderStudentUploadInput,
            submissionOpenTs: folderStudentUploadOpenDateInput,
            submissionCloseTs: folderStudentUploadCloseDateInput,
            accessRight: ""
        }
        if (folderNameInput && folderStudentUploadInput) {
            let query_string;
            if (this.state.folderId) {
                query_string = "?moduleId=" + moduleId + "&folderId=" + this.state.folderId;
            }
            else {
                query_string = "?moduleId=" + moduleId;
            }
            axios({
                method: 'post',
                url: API_URL + "/file/createFolder" + query_string,
                data: JSON.stringify(body),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then((result) => {
                this.setState({
                    ...this.state,
                    modalNewFolder: false,
                    folderNameInput: "",
                    folderStudentUploadInput: "",
                    folderStudentUploadOpenDateInput: "",
                    folderStudentUploadCloseDateInput: "",
                    message: "New folder created successfully!",
                    openSnackbar: true
                });
                return this.initPage()
            })
                .catch(error => {
                    this.setState({
                        message: error.response.data.errorMessage,
                        openSnackbar: true
                    });
                    console.error("error in axios " + error);
                    return this.initPage();
                });
        }
    }

    uploadFiles = (e) => {
        this.setState({
            ...this.state,
            modalUploadFiles: true
        })
    }

    onDrop = (uploadedFiles) => {
        console.log(uploadedFiles);
        let files = this.state.uploadedFiles;
        files.concat(uploadedFiles);
        this.setState({
            ...this.state,
            uploadedFiles: files.concat(uploadedFiles)
        });
    }

    submitNewFilesHandler = event => {
        event.preventDefault();
        console.log("hi")
        console.log(this.state.uploadedFiles);
        let userId = localStorage.getItem('userId');
        userId = "3"
        let moduleId = this.state.moduleId;
        let folderId = this.state.folderId;
        let files = this.state.uploadedFiles;
        console.log(this.state)
        console.log(files)
        if (files == [] || !userId || !moduleId || !folderId) {
            return;
        }
        // call api to send
        
        var formData = new FormData();
        /*files.map((file, index) => {
            formData.append(index, file);
        });*/
        console.log(files[0])
        formData.append('file', files[0])
        axios({
            method: 'post',
            url: `${API_URL}/file/upload?moduleId=${moduleId}&type=document&folderId=${folderId}&userId=${userId}`,
            body: formData
        })
        .then((result) => {
            this.setState({
                message: "File uploaded successfully!",
                openSnackbar: true
            });
            return this.initPage()
        })
        .catch(error => {
            this.setState({
                message: error.response.data.errorMessage,
                openSnackbar: true
            });
            console.error("error in axios " + error);
            return this.initPage()
        });
        
        
        this.setState({
            ...this.state,
            modalUploadFiles: false,
            uploadedFiles: []
        })
    }

    removeFileUpload = (file) => {
        console.log(file);
        var array = this.state.uploadedFiles.filter(function(item) {
            return item !== file
        });
        console.log(array)
        this.setState({
            ...this.state,
            uploadedFiles: array
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

    upload = () => {
        document.getElementById('fileInput').click();
    }

    uploadFileOnChange = () => {
        var file = this.fileUpload.files[0];
        
        if (file != null && this.state.moduleId && this.state.folderId && localStorage.getItem("userId")) {
            const formData = new FormData();
            formData.append('file', file);

            fetch(`${API_URL}/file/upload?moduleId=${this.state.moduleId}&folderId=${this.state.folderId}&type=document&userId=${localStorage.getItem("userId")}`, {
                method: 'post',
                body: formData
            })
            .then((result) => {
                console.log(result)
                this.setState({
                    ...this.state,
                    modalUploadFiles: false,
                    message: "New file uploaded successfully!",
                    openSnackbar: true
                })
                return this.initPage();
            })
            .catch(error => {
                this.setState({
                    ...this.state,
                    modalUploadFiles: false,
                    message: error.response.data.errorMessage,
                    openSnackbar: true
                });
                console.error("error in axios " + error);
                return this.initPage();
            });
        }
    }

    render() {
        let files = this.state.files;
        if (this.state.accessRight == "Student") {
            files = this.state.filesStudent;
        }
        let folders = this.state.folders;
        if (this.state.accessRight == "Student") {
            folders = this.state.foldersStudent;
        }
        let uploadedFiles = this.state.uploadedFiles;
        let moduleId = this.state.moduleId;

        let currentFolder = this.state.folder;
        let today = new Date();
        let timezoneTemp = today.toString().match(/([-\+][0-9]+)\s/)[1];
        let timezone = timezoneTemp.substring(0, 3) + ":" + timezoneTemp.substring(3);
        let currentDate = today.getUTCFullYear() + "-" + this.twoDigits(1 + today.getUTCMonth()) + "-"
            + this.twoDigits(today.getUTCDate()) + "T" + this.twoDigits(today.getHours())
            + ":" + this.twoDigits(today.getMinutes()) + ":"
            + this.twoDigits(today.getSeconds()) + timezone;

        let allowStudentUpload = false;
        if (currentFolder.submission == true && (currentDate >= currentFolder.submissionOpenTs && currentDate <= currentFolder.submissionCloseTs)) {
            allowStudentUpload = true;
        }
        return (
            <div className={this.props.className}>
                <div className="module-sidebar-large"><ModuleSideNavigation moduleId={this.props.match.params.moduleId}></ModuleSideNavigation></div>
                <div className="module-navbar-small">
                    <ModuleSideNavigationDropdown moduleId={this.props.match.params.moduleId} activeTab={'files'}></ModuleSideNavigationDropdown>
                </div>
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
                                    {
                                        folders.rows.length > 0 && this.state.accessRight == "Teacher" &&
                                        <MDBBtn color="primary lighten-2" outline className="mr-0" size="md" onClick={e => this.newFolder()}>
                                            New Folder
                                        </MDBBtn>
                                    }
                                    {
                                        files.rows.length > 0 && (this.state.accessRight == "Teacher" || (this.state.accessRight == "Student" && allowStudentUpload == true)) &&
                                        <MDBBtn color="primary lighten-2" outline className="mr-0" size="md" onClick={e => this.uploadFiles()}>
                                            Upload Files
                                        </MDBBtn>
                                    }
                                    {
                                        folders.rows.length == 0 && files.rows.length == 0 &&
                                        <div>
                                            {
                                                this.state.accessRight == "Teacher" &&
                                                <MDBBtn color="primary lighten-2" outline className="mr-0" size="md" onClick={e => this.newFolder()}>
                                                    New Folder
                                                </MDBBtn>
                                            }
                                            {
                                                (this.state.accessRight == "Teacher" || (this.state.accessRight == "Student" && allowStudentUpload == true)) &&
                                                <MDBBtn color="primary lighten-2" outline className="mr-0" size="md" onClick={e => this.uploadFiles()} disabled={!this.state.folderId}>
                                                    Upload Files
                                                </MDBBtn>
                                            }
                                        </div>
                                    }
                                    
                                    {/*
                                    <MDBBtn color="primary lighten-2" outline className="mr-0" size="md" onClick={e => this.downloadFiles()}>
                                        Download
                                    </MDBBtn>
                                    <MDBBtn color="danger" outline className="mr-0" size="md" onClick={e => this.deleteFiles()}>
                                        Delete
                                    </MDBBtn>*/}
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
                                        <SectionContainer className="mb-0 p-5 mt-1">
                                            <div onClick={e => this.upload()}>
                                                <MDBIcon icon="upload" size="3x" className="mb-3 indigo-text"></MDBIcon><br></br>
                                                Click to Upload Multimedia
                                            </div>
                                        </SectionContainer>
                                        
                                        {/*
                                        <Dropzone onDrop={this.onDrop} multiple>
                                            {({ getRootProps, getInputProps, isDragActive, isDragReject, rejectedFiles }) => (
                                                <div {...getRootProps()}>
                                                    <input {...getInputProps()} />
                                                    <SectionContainer className="mb-0 p-5 mt-1">
                                                        <MDBIcon icon="upload" size="3x" className="mb-3 indigo-text"></MDBIcon><br></br>
                                                        Click to Upload or Drag & Drop
                                                    </SectionContainer>
                                                </div>
                                            )}
                                        </Dropzone>*/}
                                    </div>
                                    <input id="fileInput" type="file" value="" ref={(ref) => this.fileUpload = ref} style={{display: 'none'}} onChange={e => this.uploadFileOnChange()} />

                                    <MDBListGroup className="my-4 mx-4" style={{width: "26rem", height:"auto", maxHeight: "120px", overflowY: "auto"}}>
                                        {uploadedFiles.length > 0 && uploadedFiles.map((uploadedFile, index) => (
                                            <MDBListGroupItem key={index}>
                                                <MDBIcon icon="times" className="mr-3" onClick={e => this.removeFileUpload(uploadedFile)}></MDBIcon>{uploadedFile.name}
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
                                    <MDBDataTable striped bordered hover paging={false} searching={true} sortable={true} data={folders} />
                                </MDBCol>
                            </MDBRow>
                        }
                        {
                            files.rows.length > 0 && 
                            <MDBRow>
                                <MDBCol>
                                    <MDBDataTable striped bordered hover paging={false} searching={true} sortable={true} data={files} />
                                </MDBCol>
                            </MDBRow>
                        }
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

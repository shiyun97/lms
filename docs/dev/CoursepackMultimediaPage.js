import React, { Component } from "react";
import styled from 'styled-components';
import {
    MDBContainer,
    MDBCol,
    MDBBtn,
    MDBRow,
    MDBMedia,
    MDBCard,
    MDBIcon,
    MDBModal,
    MDBModalHeader,
    MDBModalBody,
    MDBModalFooter,
    MDBListGroup,
    MDBListGroupItem,
    MDBDataTable,
    MDBTable, 
    MDBTableBody, 
    MDBTableHead
} from "mdbreact";
import axios from "axios";
import 'babel-polyfill';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, ExpansionPanel, ExpansionPanelSummary, Typography, ExpansionPanelDetails, List, ListItem, ListItemText } from "@material-ui/core";
import CoursepackSideNavigation from "./CoursepackSideNavigation";
import Dropzone from 'react-dropzone';
import Snackbar from '@material-ui/core/Snackbar';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import SectionContainer from "../components/sectionContainer";

const API = "http://localhost:3001"

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


class CoursepackMultimediaPage extends Component {

    state = {
        coursepackId: "",
        open: false,
        uploadedMultimedia: [],
        availableMultimedia: {
            columns: [
                {
                    label: 'File Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Type',
                    field: 'type',
                    sort: 'asc'
                },
                {
                    label: 'Date Uploaded',
                    field: 'createdDt',
                    sort: 'asc'
                },
                {
                    label: '',
                    field: 'action',
                    sort: 'asc'
                }
            ],
            rows: []
        },
        modalUploadMultimedia: false,
        showMultimediaDialog: false,
        multimediaToShow: {},
        showDeleteDialog: false,
        multimediaIdToDelete: "",
        message: "",
        openSnackbar: ""
    }

    handleOpenSnackbar = () => {
        this.setState({ openSnackbar: true });
    };

    handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ openSnackbar: false });
    };

    componentDidMount() {
        this.initPage()
    }

    async initPage() {
        let coursepackId = this.props.match.params.coursepackId;
        if (coursepackId) {
            this.setState({
                coursepackId: coursepackId
            })
            let coursepackId = this.props.match.params.coursepackId;
            axios.get(`${API}/coursepack/${coursepackId}`)
                .then(result => {
                    this.setState({ courseDetails: result.data })
                })
                .catch(error => {
                    console.error("error in axios " + error);
                });

            await axios.get(`${API}/coursepackMultimedia`)
                .then(result => {
                    console.log(result)
                    let data = result.data;
                    let arr = [];
                    let arrStudentView = [];
                    const method = this.clickMultimedia;
                    const deleteMethod = this.deleteMultimedia;
                    Object.keys(data).forEach(function (key) {
                        let dateCreatedDt = data[key].createdDt ? data[key].createdDt.substring(0, 10) : "";
                        let timeCreatedDt = data[key].createdDt ? data[key].createdDt.substring(11, 16) : "";
                        let temp = {
                            name: data[key].name,
                            type: "video",
                            createdDt: dateCreatedDt + " " + timeCreatedDt,
                            action: (<div><span onClick={e => method(data[key].fileId)} className="teal-text" style={{fontWeight:"bold", cursor:"pointer"}}>View</span>
                                <MDBIcon icon="trash-alt" className="teal-text ml-2" onClick={e => deleteMethod(data[key].fileId)}></MDBIcon></div>)
                        }
                        arr.push(temp);

                        let temp2 = {
                            name: data[key].name,
                            type: "video",
                            createdDt: dateCreatedDt + " " + timeCreatedDt,
                            action: (<MDBBtn size="sm" onClick={e => method(data[key].fileId)}>View</MDBBtn>)
                        }
                        arrStudentView.push(temp2);
                    });
                    console.log(arr)
                    this.setState({
                        ...this.state,
                        coursepackId: coursepackId,
                        availableMultimedia: {
                            ...this.state.availableMultimedia,
                            rows: arr
                        }
                    });
                })
                .catch(error => {
                    this.setState({
                        message: "error.response.data.errorMessage",
                        openSnackbar: true
                    })
                    console.error("error in axios " + error);
                });
        }
    }

    showDescriptions = () => {
        return (
            <MDBContainer style={{ paddingTop: 20 }}>
                <MDBRow>
                    <MDBCol size="8">
                        <h1>{this.state.courseDetails && this.state.courseDetails.courseTitle}</h1>
                        <h3>{this.state.courseDetails && this.state.courseDetails.courseDescription}</h3>
                    </MDBCol>
                    <MDBCol size="4">
                        <MDBCard style={{ width: "23rem", minHeight: "12rem" }}>
                            <MDBMedia object src="https://mdbootstrap.com/img/Photos/Others/placeholder1.jpg" alt="" />
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>)
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
        console.log(this.state.uploadedMultimedia);

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
        var array = this.state.uploadedMultimedia.filter(function (item) {
            return item !== file
        });
        console.log(array)
        this.setState({
            ...this.state,
            uploadedMultimedia: array
        })
    }

    /*showUploadModal = () => {
        let uploadedMultimedia = this.state.uploadedMultimedia;

        return <MDBModal
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

                    <MDBListGroup className="my-4 mx-4" style={{ width: "26rem", height: "auto", maxHeight: "120px", overflowY: "auto" }}>
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
    }*/

    showUploadModal = () => {
        let uploadedMultimedia = this.state.uploadedMultimedia;
        console.log("hi")
        return <Dialog
            open={this.state.modalUploadMultimedia}
            onClose={this.toggleModal("UploadMultimedia")}
            TransitionComponent={Transition}
            keepMounted
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                Upload Files
            </DialogTitle>
            <form className="needs-validation" noValidate onSubmit={this.submitNewMultimediaHandler}>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                    <div className="text-center mt-2">
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

                    <List style={{ width: "26rem", height: "auto", maxHeight: "120px", overflowY: "auto" }}>
                        {uploadedMultimedia.length > 0 && uploadedMultimedia.map((uploadedFile, index) => (
                            <ListItem button>
                            <ListItemText key={index}>
                                <IconButton onClick={e => this.removeMultimediaUpload(uploadedFile)}>
                                    <MDBIcon icon="times"></MDBIcon>
                                </IconButton>
                                {uploadedFile.name}
                            </ListItemText>
                            </ListItem>
                        ))}
                    </List>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color="secondary" onClick={this.toggleModal("UploadMultimedia")}>
                        Cancel
                    </Button>
                    <Button color="primary" type="submit" disabled={this.state.uploadedMultimedia.length == 0}>Save</Button>
                </DialogActions>
            </form>
        </Dialog>
    }

    handleCloseMultimediaDialog = () => {
        this.setState({
            showMultimediaDialog: false
        })
    }

    fullScreenMultimediaDialog = () => {
        let multimediaToShow = this.state.multimediaToShow;
        console.log(multimediaToShow.location && "http://127.0.0.1:8887/" + multimediaToShow.location.split('\\')[1])
        return (
            <div>
                <Dialog fullScreen open={this.state.showMultimediaDialog} onClose={e => this.handleCloseMultimediaDialog()} TransitionComponent={Transition}>
                    <AppBar style={{ position: 'relative' }}>
                        <Toolbar>
                            <IconButton edge="start" color="inherit" onClick={e => this.handleCloseMultimediaDialog()} aria-label="close">
                                <MDBIcon icon="times" />
                            </IconButton>
                            <Typography variant="h6" style={{ color: "white", marginLeft: "10px", flex: "1" }}>
                                {multimediaToShow.name}
                             </Typography>
                        </Toolbar>
                    </AppBar>
                    <video controls controlsList="nodownload" id="multimediaToShow" style={{maxHeight:"90%"}}
                        src={multimediaToShow.location && "http://127.0.0.1:8887/" + multimediaToShow.location.split('\\')[1]}>
                    </video>
                    <div className="mb-4" />
                </Dialog>
            </div>
        )
    }

    clickMultimedia = (id) => {
        // retrieve the multimedia location
        let location = "C:/glassfish-4.1.1-uploadedfiles/uploadedFiles\\1570621881447_test_video.mp4";
        let savedFileName = location.split('\\')[1];
        let fullPath = "http://127.0.0.1:8887/" + savedFileName;
        if (document.getElementById('multimediaToShow')) {
            document.getElementById('multimediaToShow').src = fullPath;
        }
        
        this.setState({
            showMultimediaDialog: true,
            multimediaToShow: {
                name: this.state.availableMultimedia.rows[0].name,
                location: "C:/glassfish-4.1.1-uploadedfiles/uploadedFiles\\1570621881447_test_video.mp4"
            }
        })
    }

    deleteMultimedia = (id) => {
        console.log(id)
        this.setState({
            showDeleteDialog: true,
            multimediaIdToDelete: id
        })
    }

    handleCloseDeleteDialog = () => {
        this.setState({
            showDeleteDialog: false,
            multimediaIdToDelete: ""
        })
    }

    confirmDeleteDialog = () => {
        return (
            <div>
                <Dialog
                    open={this.state.showDeleteDialog}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={e => this.handleCloseDeleteDialog()}
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
                        <Button onClick={e => this.handleCloseDeleteDialog()} color="primary">
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

    confirmDelete = () => {
        console.log(this.state.multimediaIdToDelete)
    }

    render() {
        let uploadedMultimedia = this.state.uploadedMultimedia;
        let availableMultimedia = this.state.availableMultimedia;
        let multimediaToShow = this.state.multimediaToShow;
        return (
            <div className="module-content">
                <CoursepackSideNavigation courseId={this.props.match.params.coursepackId} />

                <div style={{ backgroundColor: '#B8CECD', minHeight: 250 }}>
                    < div /* className="module-content" */>
                        <MDBContainer>
                            {this.showDescriptions()}
                        </MDBContainer>
                    </div>
                </div>
                <MDBContainer style={{ paddingTop: 50 }}>
                    <MDBRow>
                        <MDBCol>
                            <h5>Library</h5>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol>
                            <div style={{ float: 'right' }}>
                                <MDBBtn color="default lighten-2" outline className="mr-0" size="md" onClick={e => this.uploadMultimedia()}>
                                    Upload
                            </MDBBtn>
                            </div>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol>
                        {
                            availableMultimedia.rows.length == 0 &&
                            <div>No multimedia uploaded yet</div>
                        }
                        {
                            availableMultimedia.rows.length > 0 &&
                            <MDBTable btn>
                                <MDBTableHead columns={availableMultimedia.columns} />
                                <MDBTableBody rows={availableMultimedia.rows} />
                            </MDBTable>
                        }
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
                {/*
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

                            <MDBListGroup className="my-4 mx-4" style={{ width: "26rem", height: "auto", maxHeight: "120px", overflowY: "auto" }}>
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
                </MDBModal>*/}
                {this.showUploadModal()}
                {this.fullScreenMultimediaDialog()}
                {this.confirmDeleteDialog()}
            </div >
        )
    }
}


export default styled(CoursepackMultimediaPage)`
module-content{
    margin-left: 270px;
}
`;
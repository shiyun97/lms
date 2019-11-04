import React, { Component } from "react";
import { MDBListGroup, MDBListGroupItem, MDBContainer, MDBIcon, MDBDataTable, MDBRow, MDBBtn, MDBCol, MDBTabContent, MDBTabPane, MDBNav, MDBNavItem, MDBNavLink, MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter } from "mdbreact";
import { observer, inject } from 'mobx-react'
import CoursepackCertificatePdf from "../CoursepackCertificatePdf";
import Dropzone from 'react-dropzone';
import SectionContainer from "../../components/sectionContainer";
import { Slide, Card, Dialog, DialogTitle, DialogContent, DialogContentText, ListItem, ListItemText, DialogActions, Button, List } from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

@inject('dataStore')
class CoursepackDashboardAdmin extends Component {

    state = {
        activeItem: "1",
        modalUploadMultimedia: false,
        showMultimediaDialog: false,
        uploadedMultimedia: [],
        badgeName: "",
        toggleCertModal: false,
        certificates: ["HTML", "CSS", "JAVA"], //TODO:
        badges: [{ title: 'Complete 5 courses', achieved: true }, { title: 'Complete 10 courses', achieved: false }, { title: 'Complete first course', achieved: false }]
    }

    componentDidMount() {
        this.initPage()
    }

    initPage() {

    }

    handleChangeBadgeName = event => {
        this.setState({ badgeName: event.target.value })
    }

    toggle = tab => e => {
        if (this.state.activeItem !== tab) {
            this.setState({
                activeItem: tab
            });
        }
    };

    toggleUploadModal = nr => () => {
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

    toggleCertModal = event => {
        this.setState({ toggleCertModal: !this.state.toggleCertModal })
    }

    disabled = (achieved) => {
        if (!achieved) {
            return "grey"
        }
    }

    showBadges = () => {
        return (

            <MDBRow style={{ paddingTop: 30 }}>
                {this.state.badges && this.state.badges.map((badge) => {
                    return (
                        <MDBCol size="3">
                            <MDBCol align="center" size="12">
                                <Card style={{ height: 120, color: this.disabled(badge.achieved) }} >
                                    <div align="right">
                                        <MDBIcon icon="edit" />
                                        <MDBIcon style={{ paddingLeft: 10, paddingRight: 5 }} icon="trash-alt" />
                                    </div>
                                    {badge.title}

                                </Card>
                            </MDBCol>
                        </MDBCol>
                    )
                })}
            </MDBRow>
        )
    }

    showCertTable = () => {
        const data = {
            columns: [
                {
                    label: 'Certificate',
                    field: 'certificate',
                    sort: 'asc',
                    width: 600
                },
                {
                    label: 'Manage',
                    field: 'manage',
                    width: 100
                },
            ],
            rows:
                this.tableRows()
        }
        return (
            <div>
                <MDBDataTable
                    style={{ textAlign: "center", verticalAlign: "center" }}
                    striped
                    bordered
                    hover
                    data={data}
                    responsive
                    small
                />
            </div>
        )
    }

    tableRows = () => {
        let certs = []
        this.state.certificates && this.state.certificates.map((cert, index) => {
            certs.push({
                certificates: cert,
                manage: this.showManageButton(),
                clickEvent: () => this.handleRowClick(index) //TODO:
            })
        })
        return certs
    }

    showManageButton = () => {
        return (
            <MDBBtn size='sm'>Manage</MDBBtn>
        )
    }

    handleRowClick = certIndex => {
         this.props.history.push(`/coursepack/achievements/certificates/${certIndex}`)
        this.props.dataStore.setPath(`/coursepack/achievements/certificates/${certIndex}`);
        console.log(this.props.dataStore.getPath)
    }

    addCert = event => { //TODO:

    }


    cancel = event => { //TODO: clear the state of all selected/ init
        this.setState({ toggleCertModal: false })
    }

    uploadMultimedia = (e) => {
        this.setState({
            ...this.state,
            modalUploadMultimedia: true
        })
    }

    removeMultimediaUpload = (file) => {
        var array = this.state.uploadedMultimedia.filter(function (item) {
            return item !== file
        });
        this.setState({
            ...this.state,
            uploadedMultimedia: array
        })
    }

    showUploadModal = () => {
        let uploadedMultimedia = this.state.uploadedMultimedia;
        return <Dialog
            open={this.state.modalUploadMultimedia}
            onClose={this.toggleUploadModal("UploadMultimedia")}
            TransitionComponent={Transition}
            keepMounted
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                Upload Badge
            </DialogTitle>
            <form className="needs-validation" noValidate onSubmit={this.submitNewMultimediaHandler}>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <div className="text-center mt-2">
                            <input
                                value={this.state.badgeName}
                                name="badgeName"
                                type="text"
                                className="form-control"
                                placeholder="Badge Criteria"
                                onChange={this.handleChangeBadgeName}
                            />
                            {this.state.uploadedMultimedia.length === 0 &&
                                <Dropzone onDrop={this.onDrop} >
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
                            }
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
                    <Button color="secondary" onClick={this.toggleUploadModal("UploadMultimedia")}>
                        Cancel
                    </Button>
                    <Button color="primary" type="submit" disabled={this.state.uploadedMultimedia.length == 0}>Save</Button>
                </DialogActions>
            </form>
        </Dialog>
    }

    submitNewMultimediaHandler = event => { //TODO: add badge criteria and photo
        event.preventDefault();

        // call api to send
        var files = this.state.uploadedMultimedia;
        if (files.length > 0 && this.state.coursepackId && sessionStorage.getItem("userId")) {
            const formData = new FormData();
            for (let i = 0; i < files.length; i++) {
                formData.append('file', files[i]);
            }

            /* fetch(`${API}/file/uploadMultipleMultimediaForCoursepack?coursepackId=${this.state.coursepackId}&userId=${sessionStorage.getItem("userId")}`, {
                method: 'post',
                body: formData
            })
                .then((result) => {
                    if (result.status == "200") {
                        this.setState({
                            ...this.state,
                            modalUploadMultimedia: false,
                            uploadedMultimedia: [],
                            message: "New files uploaded successfully!",
                            openSnackbar: true
                        })
                        return this.initPage();
                    }
                })
                .catch(error => {
                    this.setState({
                        ...this.state,
                        modalUploadMultimedia: false,
                        uploadedMultimedia: [],
                        message: error.response.data.errorMessage,
                        openSnackbar: true
                    });
                    console.error("error in axios " + error);
                    return this.initPage();
                }); */
        }

        this.setState({
            ...this.state,
            modalUploadMultimedia: false,
            uploadedMultimedia: []
        })
    }

    onDrop = (uploadedMultimedia) => {
        this.setState({
            ...this.state,
            uploadedMultimedia: this.state.uploadedMultimedia.concat(uploadedMultimedia)
        });
    }

    showTabs = () => {
        return (
            <div>
                <MDBNav className="nav-tabs mt-5">
                    <MDBNavItem>
                        <MDBNavLink to="#" active={this.state.activeItem === "1"} onClick={this.toggle("1")} role="tab" >Badges</MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                        <MDBNavLink to="#" active={this.state.activeItem === "2"} onClick={this.toggle("2")} role="tab" >Certificates</MDBNavLink>
                    </MDBNavItem>
                </MDBNav>
                <MDBTabContent activeItem={this.state.activeItem} >
                    <MDBTabPane tabId="1" role="tabpanel">
                        <MDBCol align='right'>
                            <MDBBtn onClick={this.uploadMultimedia} color="primary">Add New Badge</MDBBtn>
                        </MDBCol>
                        {this.showUploadModal()}
                        {this.showBadges()}
                    </MDBTabPane>
                    <MDBTabPane tabId="2" role="tabpanel">
                        <MDBCol align='right'>
                            <MDBBtn onClick={this.toggleCertModal} color="primary">Add New Certificate</MDBBtn>
                        </MDBCol>
                        <MDBModal isOpen={this.state.toggleCertModal} toggle={this.toggleCertModal}>
                            <MDBModalHeader toggle={this.toggleCertModal}>Add Certificate</MDBModalHeader>
                            <MDBModalBody>
                                cert name
                                </MDBModalBody>
                            <MDBModalFooter>
                                <MDBBtn color="primary" onClick={this.addCert}>Create</MDBBtn>
                                <MDBBtn color="secondary" onClick={this.cancel}>Cancel</MDBBtn>
                            </MDBModalFooter>
                        </MDBModal>
                        {this.showCertTable()}
                    </MDBTabPane>
                </MDBTabContent>
            </div >
        )
    }

    render() {
        return (
            <div style={{ paddingLeft: 150, paddingTop: 50, paddingRight: 50 }} >
                <MDBCol>
                    <h3><b>Coursepack Achievements Management</b></h3>
                    <hr />
                </MDBCol>
                {this.showTabs()}
                <CoursepackCertificatePdf />
            </div >
        )
    }
}

export default CoursepackDashboardAdmin
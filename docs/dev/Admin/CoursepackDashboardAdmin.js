import React, { Component } from "react";
import { MDBIcon, MDBDataTable, MDBRow, MDBBtn, MDBCol, MDBTabContent, MDBTabPane, MDBNav, MDBNavItem, MDBNavLink, MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBContainer } from "mdbreact";
import { observer, inject } from 'mobx-react'
import Dropzone from 'react-dropzone';
import SectionContainer from "../../components/sectionContainer";
import { Slide, Card, Dialog, DialogTitle, DialogContent, DialogContentText, ListItem, ListItemText, DialogActions, Button, List, Snackbar } from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import axios from "axios";
import styled from 'styled-components';
import MainSideNavDropdown from "../MainSideNavDropdown";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const API = "http://localhost:8080/LMS-war/webresources/";
const FILE_SERVER = "http://127.0.0.1:8887/";

@inject('dataStore')
@observer
class CoursepackDashboardAdmin extends Component {

    state = {
        activeItem: "1",
        modalUploadMultimedia: false,
        showMultimediaDialog: false,
        uploadedMultimedia: [],
        certName: "",
        toggleCertModal: false,
        certificates: [],
        allBadges: [],
        allCertificates: [],
        openSnackbar: false,
        message: ""
    }

    componentDidMount() {
        this.initPage()
    }

    initPage() {
        // get all badges
        axios.get(`${API}Gamification/getAllBadges`)
            .then(result => {
                this.setState({ allBadges: result.data.badgeList })
            })
            .catch(error => {
                console.error("error in axios " + error);
            });

        // get all certs
        axios.get(`${API}Gamification/getAllCertifications`)
            .then(result => {
                this.setState({ allCertificates: result.data.certificationList })
                console.log(this.state.allCertificates)
            })
            .catch(error => {
                console.error("error in axios " + error);
            });
    }

    handleChangeCertName = event => {
        this.setState({ certName: event.target.value })
    }

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({ openSnackbar: false });
    };

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

    deleteBadge = badgeId => {
        axios.delete(`${API}Gamification/deleteBadge?badgeId=${badgeId}`)
            .then(result => {
                this.setState({ message: `Badge deleted`, openSnackbar: true })
                this.initPage()
            })
            .catch(error => {
                this.setState({
                    message: error.response.data,
                    openSnackbar: true,
                })
                console.error("error in axios " + error);
            });
    }

    showBadges = () => {
        var location = ""
        return (

            <MDBRow style={{ paddingTop: 30 }}>
                {this.state.allBadges && this.state.allBadges.map((badge, index) => {
                    location = badge.location
                    let savedFileName = location.split('/')[5]; //FIXME:
                    let fullPath = FILE_SERVER + savedFileName;
                    console.log(fullPath)

                    return (
                        <MDBCol size="3">
                            <MDBCol align="center" size="12" style={{ paddingBottom: 30 }}>
                                <Card style={{ height: 180, color: this.disabled(badge.achieved) }} >
                                    <img src={fullPath} alt={badge.title} />
                                </Card>
                                <MDBIcon onClick={() => this.deleteBadge(badge.id)} icon="trash-alt" />
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
        this.state.allCertificates && this.state.allCertificates.map((cert) => {
            certs.push({
                certificates: cert.title,
                manage: this.showManageButton(cert.id),
            })
        })
        return certs
    }

    showManageButton = (certId) => {
        return (
            <MDBBtn onClick={() => this.showDetails(certId)} color="default" >View</MDBBtn>
        )
    }

    showDetails = certIndex => {
        this.props.history.push(`/coursepack/achievements/certificates/${certIndex}`)
    }

    addCert = event => {
        axios.post(`${API}Gamification/createCertification`, { title: this.state.certName })
            .then(result => {
                this.setState({
                    message: `Successfully created certificate`,
                    openSnackbar: true,
                    toggleCertModal: false
                })
                this.initPage()
            })
            .catch(error => {
                this.setState({
                    message: error.response.data,
                    openSnackbar: true,
                })
                console.error("error in axios " + error);
            });
    }

    cancel = event => {
        this.setState({ toggleCertModal: false, uploadMultimedia: [] })
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
                            <Dropzone onDrop={this.onDrop} multiple /* accept=".mp4" */>
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
                    <Button color="secondary" onClick={this.toggleUploadModal("UploadMultimedia")}>
                        Cancel
                    </Button>
                    <Button color="primary" type="submit" disabled={this.state.uploadedMultimedia.length == 0}>Save</Button>
                </DialogActions>
            </form>
        </Dialog>
    }

    submitNewMultimediaHandler = event => {
        event.preventDefault();

        // call api to send
        var files = this.state.uploadedMultimedia;
        if (files.length > 0) {
            const formData = new FormData();
            for (let i = 0; i < files.length; i++) {
                formData.append('file', files[i]);
            }
            fetch(`${API}Gamification/uploadBadge`, {
                method: 'post',
                body: formData
            })
                .then((result) => {
                    if (result.status == "200") {
                        this.setState({
                            ...this.state,
                            modalUploadMultimedia: false,
                            uploadedMultimedia: [],
                            message: "Badge uploaded!",
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
                        message: error.response.data,
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
                                <input
                                    value={this.state.certName}
                                    name="certName"
                                    type="text"
                                    className="form-control"
                                    placeholder="Eg. Diploma in Infocomm Technology"
                                    onChange={this.handleChangeCertName}
                                />
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
            <div className={this.props.className}>
                <div className="module-navbar-small">
                    <MainSideNavDropdown moduleId={this.props.moduleId} activeTab={'Achievements'}></MainSideNavDropdown>
                </div>
                <div className="module-content">
                    <MDBContainer className="mt-3">
                        <MDBCol style={{ paddingTop: 60 }}>
                            <h2 className="font-weight-bold">Coursepack Achievements Management</h2>
                            <hr />
                        </MDBCol>
                        {this.showTabs()}
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
        )
    }
}

export default styled(CoursepackDashboardAdmin)`
.module-content{
    margin-top: 10px;
}
@media screen and (min-width: 800px) {
    .module-content{
        margin-left: 0px;
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
`
import React, { Component } from "react";
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
import SectionContainer from "../components/sectionContainer";
import axios from "axios";
import Dropzone from 'react-dropzone';

class ModuleMultimediaPage extends Component {

    state = {
        multimedia: {
            columns: [
                {
                    label: [<input type="checkbox" className="mr-4" style={{ 'height': '17px', 'width': '17px', 'verticalAlign': 'middle' }} id={"multimediaCheckboxAll"} key={"multimediaCheckboxAll"} onClick={e => this.selectAllCheckbox()} />],
                    field: "check",
                    width: 150,
                    sort: "asc"
                },
                {
                    label: "Name",
                    field: "name",
                    width: 150,
                    sort: "asc",
                    attributes: {
                        "aria-controls": "DataTable",
                        "aria-label": "Name"
                    }
                },
                {
                    label: "Upload Date",
                    field: "uploadDate",
                    width: 150
                },
                {
                    label: "Opening Date",
                    field: "openingDate",
                    width: 150
                },
                {
                    label: "Close Date",
                    field: "closingDate",
                    width: 150
                },
                {
                    label: "",
                    field: "viewButton",
                    sort: "asc"
                }
            ],
            rows: []
        },
        modalUploadMultimedia: false,
        uploadedMultimedia: []
    }

    componentDidMount() {
        this.initPage();
    }

    initPage() {
        let moduleId = this.props.match.params.moduleId;
        if (moduleId) {
            console.log(moduleId);
            this.setState({
                moduleId: moduleId
            })
            // retrieve module multimedia & set state
            // customise the clickEvent to pass id
            axios
                .get("http://localhost:3001/multimedia")
                .then(result => {
                    let data = result.data;
                    let arr = [];
                    let multimediaIds = [];
                    const method = this.clickMultimedia;
                    Object.keys(data).forEach(function (key) {
                        let temp = {
                            check: <input type="checkbox" style={{ 'height': '17px', 'width': '17px', 'verticalAlign': 'middle' }} id={data[key].multimediaId} name="multimediaCheckbox" />,
                            name: data[key].name,
                            uploadDate: data[key].uploadDt,
                            openingDate: data[key].openDt,
                            closingDate: data[key].closeDt,
                            viewButton: (<MDBBtn size="sm" onClick={e => method(data[key].multimediaId)}>View</MDBBtn>)
                        }
                        arr.push(temp);
                        multimediaIds.push(data[key].multimediaId);
                    });
                    this.setState({
                        ...this.state,
                        multimedia: {
                            ...this.state.multimedia,
                            rows: arr
                        },
                        multimediaIds: multimediaIds
                    });
                })
                .catch(error => {
                    console.error("error in axios " + error);
                });
        }
    }

    clickMultimedia = (id) => {
        console.log(id);
        this.props.history.push(`/modules/${this.state.moduleId}/multimedia/${id}`);
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

    deleteMultimedia = (e) => {
        let arr = [];
        let multimediaIds = this.state.multimediaIds;
        for (var i=0; i < multimediaIds.length; i++) {
            if (document.getElementById(multimediaIds[i]).checked == true) {
                arr.push(multimediaIds[i]);
            }
        }
        console.log(arr)
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
        console.log(uploadedMultimedia);
        this.setState({
            ...this.state,
            uploadedMultimedia: this.state.uploadedMultimedia.concat(uploadedMultimedia)
        });
    }

    submitNewMultimediaHandler = event => {
        event.preventDefault();
        console.log(this.state.uploadedMultimedia);

        // call api to send
        let files = this.state.uploadedMultimedia;
        var formData = new FormData();
        files.map((file, index) => {
            formData.append(`file${index}`, file);
        });
        
        this.setState({
            ...this.state,
            modalUploadMultimedia: false,
            uploadedMultimedia: []
        })
    }

    removeMultimediaUpload = (file) => {
        console.log(file);
        var array = this.state.uploadedMultimedia.filter(function(item) {
            return item !== file
        });
        console.log(array)
        this.setState({
            ...this.state,
            uploadedMultimedia: array
        })
    }

    render() {
        let uploadedMultimedia = this.state.uploadedMultimedia;
        return (
            <div className={this.props.className}>
                <ModuleSideNavigation moduleId={this.props.match.params.moduleId}></ModuleSideNavigation>
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
                                    <MDBBtn color="primary lighten-2" outline className="mr-0" size="md" onClick={e => this.uploadMultimedia()}>
                                        Upload
                                    </MDBBtn>
                                    <MDBBtn color="danger" outline className="mr-0" size="md" onClick={e => this.deleteMultimedia()}>
                                        Delete
                                    </MDBBtn>
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
                                        </Dropzone>
                                    </div>
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
                                    <MDBBtn color="primary" type="submit">Save</MDBBtn>
                                </MDBModalFooter>
                            </form>
                        </MDBModal>

                        <MDBRow>
                            <MDBCol>
                            <MDBDataTable striped bordered hover searching={true} sortable={true} data={this.state.multimedia} />
                            </MDBCol>
                        </MDBRow>
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
@media (min-width: 1199.98px) {
    .module-content{
        margin-left: 270px;
    }
}
.align-right{
    float: right;
}
tbody + thead{
    display: none;
}
`;

export class ModuleMultimediaDetailsPage extends Component {

    state = {
        multimedia: {
            multimediaId: '',
            name: '',
            location: ''
        }
    }

    componentDidMount() {
        this.initPage();
    }

    initPage() {
        let multimediaId = this.props.match.params.multimediaId;
        if (multimediaId) {
            console.log(multimediaId);
            axios
                .get("http://localhost:3001/selectedMultimedia")
                .then(result => {
                    let data = result.data;
                    let fullPath = "http://127.0.0.1:8887/" + data.location;
                    this.setState({
                        ...this.state,
                        multimedia: {
                            multimediaId: data.multimediaId,
                            name: data.name,
                            lcoation: fullPath
                        }
                    });
                    document.getElementById('multimediaToShow').src = fullPath;
                })
                .catch(error => {
                    console.error("error in axios " + error);
                });
        }
    }

    render() {
        console.log(this.state.multimedia)
        return (
            <div>
                <ModuleSideNavigation moduleId={this.props.match.params.moduleId}></ModuleSideNavigation>
                <div className="module-content">
                    <MDBContainer>
                        <MDBRow>
                            <MDBCol>
                                <MDBRow className="ml-1">
                                    <div style={{ color:"#007bff", fontWeight:"300", fontSize:"1.5rem", lineHeight:"1.2", marginBlockStart:"1.33em", cursor:"pointer", textDecoration:"underline" }} 
                                        onClick={e => this.props.history.push(`/modules/${this.props.match.params.moduleId}/multimedia`)}>
                                            Multimedia
                                    </div>
                                    <MDBIcon icon="angle-right" className="ml-4 mr-4" style={{ fontSize:"1.5rem", lineHeight:"1.2", marginBlockStart:"1.33em"}} />
                                    <div style={{ fontWeight:"300", fontSize:"1.5rem", lineHeight:"1.2", marginBlockStart:"1.33em" }}>
                                        {this.state.multimedia.name}
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

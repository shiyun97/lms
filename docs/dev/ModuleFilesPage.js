import React, { Component } from "react";
import styled from 'styled-components';
import { MDBContainer, MDBRow, MDBCol, MDBIcon, MDBBtn } from "mdbreact";
import ModuleSideNavigation from "./ModuleSideNavigation";
import SectionContainer from "../components/sectionContainer";
import { NavLink } from 'react-router-dom';

class ModuleFilesPage extends Component {

    state = {
        files:[
            {
                id:'1',
                fileName:'file1',
                lastModifiedBy:'User X',
                lastModifiedDt:'12 Aug 2019 7.27am',
                createdDt:'12 Aug 2019 7.27am',
                size:'47.09 KB'
            },
            {
                id:'2',
                fileName:'file2',
                lastModifiedBy:'User X',
                lastModifiedDt:'12 Aug 2019 7.27am',
                createdDt:'12 Aug 2019 7.27am',
                size:'49.70 KB'
            }
        ],
        folders:[
            {
                id:'1',
                folderName:'folder1',
                openDate:'12 Aug 2019 7.27am',
                closeDate:'22 Dec 2019 12:00am',
                status:true
            },
            {
                id:'2',
                folderName:'folder2',
                openDate:'14 Aug 2019 7.27am',
                closeDate:'22 Dec 2019 12:00am',
                status:true
            },
            {
                id:'3',
                folderName:'folder3',
                openDate:'20 Aug 2019 7.27am',
                closeDate:'22 Aug 2019 12:00am',
                status:false
            }
        ]
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
        }
        if (folderId) {
            // retrieve folders / files in this folder
        }
    }

    render() {
        let files = this.state.files;
        let folders = this.state.folders;
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
                        <MDBRow>
                            <MDBCol>
                                <div className="input-group mt-1">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text">
                                            <MDBIcon icon="search"></MDBIcon>
                                        </div>
                                    </div>
                                    <input
                                        type="text"
                                        className="form-control py-0"
                                        id="inlineFormInputGroup"
                                        placeholder="Search"
                                    />
                                </div>
                            </MDBCol>
                            <MDBCol>
                                <div className="align-right">
                                    <MDBBtn color="blue lighten-2" outline className="mr-0" size="md">
                                        <MDBIcon icon="download" className="mr-1" /> Download
                                    </MDBBtn>
                                    <MDBBtn color="primary lighten-2" outline className="mr-0" size="md">
                                        <MDBIcon icon="upload" className="mr-1" /> Upload
                                    </MDBBtn>
                                </div>
                            </MDBCol>
                        </MDBRow>
                        
                        {
                            folders.length == 0 && files.length == 0 &&
                            <div className="mt-4"><h6>No Files to show</h6></div>
                        }
                        {
                            folders.length > 0 && 
                            <SectionContainer noBottom className="mt-4">
                                <MDBRow>
                                    <MDBCol size="1">
                                        <input type="checkbox" className="checkbox-option"></input>
                                    </MDBCol>
                                    <MDBCol size="3">
                                        Name <MDBIcon icon="sort" className="ml-2" />
                                    </MDBCol>
                                    <MDBCol size="2">
                                        Opening Date <MDBIcon icon="sort" className="ml-2" />
                                    </MDBCol>
                                    <MDBCol size="2">
                                        Closing Date <MDBIcon icon="sort" className="ml-2" />
                                    </MDBCol>
                                    <MDBCol size="2">
                                        Status
                                    </MDBCol>
                                </MDBRow>
                            </SectionContainer>
                        }
                        {
                            folders.length > 0 &&
                            folders.map((folder) => (
                                <FolderListItem key={folder.id} folder={folder} moduleId={this.state.moduleId}></FolderListItem>
                            ))
                            
                        }
                        {
                            files.length > 0 && 
                            <SectionContainer noBottom className="mt-4">
                                <MDBRow>
                                    <MDBCol size="1">
                                        <input type="checkbox" className="checkbox-option"></input>
                                    </MDBCol>
                                    <MDBCol size="2">
                                        Name <MDBIcon icon="sort" className="ml-2" />
                                    </MDBCol>
                                    <MDBCol size="2">
                                        Last Modified By <MDBIcon icon="sort" className="ml-2" />
                                    </MDBCol>
                                    <MDBCol size="2">
                                        Last Modified Date <MDBIcon icon="sort" className="ml-2" />
                                    </MDBCol>
                                    <MDBCol size="2">
                                        Created Date <MDBIcon icon="sort" className="ml-2" />
                                    </MDBCol>
                                    <MDBCol size="2">
                                        Size <MDBIcon icon="sort" className="ml-2" />
                                    </MDBCol>
                                </MDBRow>
                            </SectionContainer>
                        }
                        {
                            files.length > 0 &&
                            files.map((file) => (
                                <FileListItem key={file.id} file={file}></FileListItem>
                            ))
                            
                        }
                        <div className="mb-2"></div>

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
    margin-left: 270px;
    margin-top: 40px;
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

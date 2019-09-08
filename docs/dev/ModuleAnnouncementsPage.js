import React, { Component } from "react";
import styled from 'styled-components';
import { MDBContainer, MDBRow, MDBCol, MDBIcon, MDBBtn } from "mdbreact";
import ModuleSideNavigation from "./ModuleSideNavigation";
import SectionContainer from "../components/sectionContainer";
import SideNav from "./SideNav";

class ModuleAnnouncementsPage extends Component {

    state = {
        announcements: [
            {
                id: '1',
                title: 'Announcement Title 1', 
                content: 'Announcement Content', 
                createdBy: 'Dr. Tan Wee Kek', 
                createdDt: '28 Aug 2019'
            },
            {
                id: '2',
                title: 'Announcement Title 2', 
                content: 'Announcement Content', 
                createdBy: 'Dr. Tan Wee Kek', 
                createdDt: '28 Aug 2019'
            },
            {
                id: '3',
                title: 'Announcement Title 3', 
                content: 'Announcement Content', 
                createdBy: 'Dr. Tan Wee Kek', 
                createdDt: '28 Aug 2019'
            }
        ]
    }

    componentDidMount() {
        this.initPage();
    }

    initPage() {
        let moduleId = this.props.match.params.moduleId;
        if (moduleId) {
            console.log(moduleId);
            // retrieve module & set state
        }
    }

    edit() {
        
    }

    render() {
        let announcements = this.state.announcements;
        console.log(announcements.length > 0);
        return (
            <div className={this.props.className}>
                <ModuleSideNavigation moduleId={this.props.match.params.moduleId}></ModuleSideNavigation>
                <div className="module-content">
                    <MDBContainer>
                        <MDBRow>
                            <MDBCol>
                                <MDBRow>
                                    <MDBCol>
                                        <h4 className="mb-2">Announcements</h4>
                                        <hr className="my-4" />
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow>
                                    <MDBCol>
                                        <div className="align-right">
                                            <MDBBtn color="primary" outline className="mr-0 mb-4" size="md">
                                                <MDBIcon icon="plus" className="mr-1" /> Add
                                            </MDBBtn>
                                        </div>
                                    </MDBCol>
                                </MDBRow>
                                
                                {
                                    announcements.length == 0 && <h6>No Announcements to show</h6>
                                }
                                {
                                    announcements.length > 0 && announcements.map((announcement) => (
                                        <AnnouncementListItem key={announcement.id} announcement={announcement}></AnnouncementListItem>
                                    ))
                                }
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </div>
            </div>
          );
    }
}

class AnnouncementListItem extends Component {

    edit(id){
        console.log(id);
        // edit announcement with this id
    }

    render(){
        let announcement = this.props.announcement;
        return <div className="container-fluid section border p-3 justify-content d-flex mb-2">
            <p>
                <div className="h6">{announcement.title} <MDBIcon icon="magic" className="ml-2"  onClick={e=>{this.edit(announcement.id)}}/></div>
                <MDBIcon icon="user" className="mr-2 fa-fw" />
                by {announcement.createdBy}<br />
                <MDBIcon icon="calendar-alt" className="mr-2 fa-fw" />
                on {announcement.createdDt}
                <div className="mb-2"></div>
                {announcement.content}
            </p>
        </div>
    }
    
}

export default styled(ModuleAnnouncementsPage)`
.module-content{
    margin-left: 270px;
    margin-top: 40px;
}
.edit-button{
    border: none;
    background-color: transparent;
}
.align-right{
    float: right;
}
`;

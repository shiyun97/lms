import React, { Component } from "react";
import styled from 'styled-components';
import { MDBContainer, MDBRow, MDBCol, MDBIcon, MDBBtn, MDBCard, MDBCardBody, MDBTable, MDBTableHead, MDBTableBody } from "mdbreact";
import ModuleSideNavigation from "./ModuleSideNavigation";
import SectionContainer from "../components/sectionContainer";

class ModuleGradebookPage extends Component {

    state = {
        grades: [
            {
                id: 1,
                assessmentName: 'Quiz 1',
                marksScored: 8.5,
                totalMarks: 10.0,
                comments: '',
                markedBy: 'User X',
                markedDt: '20 Aug 2019 5:00pm',
                action: (
                    <MDBBtn color="primary" outline size="sm">
                        Edit
                    </MDBBtn>
                )
            },
            {
                id: 2,
                assessmentName: 'Quiz 2',
                marksScored: 8.5,
                totalMarks: 10.0,
                comments: '',
                markedBy: 'User X',
                markedDt: '20 Aug 2019 5:00pm',
                action: (
                    <MDBBtn color="primary" outline size="sm">
                        Edit
                    </MDBBtn>
                )
            },
            {
                id: 3,
                assessmentName: 'Quiz 3',
                marksScored: 8.5,
                totalMarks: 10.0,
                comments: '',
                markedBy: 'User X',
                markedDt: '20 Aug 2019 5:00pm',
                action: (
                    <MDBBtn color="primary" outline size="sm">
                        Edit
                    </MDBBtn>
                )
            },
            {
                id: 4,
                assessmentName: 'Quiz 4',
                marksScored: 8.5,
                totalMarks: 10.0,
                comments: '',
                markedBy: 'User X',
                markedDt: '20 Aug 2019 5:00pm',
                action: (
                    <MDBBtn color="primary" outline size="sm">
                        Edit
                    </MDBBtn>
                )
            },
            {
                id: 5,
                assessmentName: 'Quiz 5',
                marksScored: 8.5,
                totalMarks: 10.0,
                comments: '',
                markedBy: 'User X',
                markedDt: '20 Aug 2019 5:00pm',
                action: (
                    <MDBBtn color="primary" outline size="sm">
                        Edit
                    </MDBBtn>
                )
            },
            {
                id: 6,
                assessmentName: 'Quiz 6',
                marksScored: 8.5,
                totalMarks: 10.0,
                comments: '',
                markedBy: 'User X',
                markedDt: '20 Aug 2019 5:00pm',
                action: (
                    <MDBBtn color="primary" outline size="sm">
                        Edit
                    </MDBBtn>
                )
            },
            {
                id: 7,
                assessmentName: 'Quiz 7',
                marksScored: 8.5,
                totalMarks: 10.0,
                comments: '',
                markedBy: 'User X',
                markedDt: '20 Aug 2019 5:00pm',
                action: (
                    <MDBBtn color="primary" outline size="sm">
                        Edit
                    </MDBBtn>
                )
            },
            {
                id: 8,
                assessmentName: 'Quiz 8',
                marksScored: 8.5,
                totalMarks: 10.0,
                comments: '',
                markedBy: 'User X',
                markedDt: '20 Aug 2019 5:00pm',
                action: (
                    <MDBBtn color="primary" outline size="sm">
                        Edit
                    </MDBBtn>
                )
            },
            {
                id: 9,
                assessmentName: 'Quiz 9',
                marksScored: 8.5,
                totalMarks: 10.0,
                comments: '',
                markedBy: 'User X',
                markedDt: '20 Aug 2019 5:00pm',
                action: (
                    <MDBBtn color="primary" outline size="sm">
                        Edit
                    </MDBBtn>
                )
            },
            {
                id: 10,
                assessmentName: 'Quiz 10',
                marksScored: 8.5,
                totalMarks: 10.0,
                comments: '',
                markedBy: 'User X',
                markedDt: '20 Aug 2019 5:00pm',
                action: (
                    <MDBBtn color="primary" outline size="sm">
                        Edit
                    </MDBBtn>
                )
            },
            {
                id: 11,
                assessmentName: 'Quiz 11',
                marksScored: 8.5,
                totalMarks: 10.0,
                comments: '',
                markedBy: 'User X',
                markedDt: '20 Aug 2019 5:00pm',
                action: (
                    <MDBBtn color="primary" outline size="sm">
                        Edit
                    </MDBBtn>
                )
            }
        ],
        columns: [
            {
                label: '#',
                field: 'id',
                sort: 'asc'
            },
            {
                label: 'Name',
                field: 'assessmentName',
                sort: 'asc'
            },
            {
                label: 'Score',
                field: 'marksScored',
                sort: 'asc'
            },
            {
                label: 'Max',
                field: 'totalMarks',
                sort: 'asc'
            },
            {
                label: 'Comments',
                field: 'comments',
                sort: 'asc'
            },
            {
                label: 'Marked By',
                field: 'markedBy',
                sort: 'asc'
            },
            {
                label: 'Marked On',
                field: 'markedDt',
                sort: 'asc'
            },
            {
                label: '',
                field: 'action',
                sort: 'asc'
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

    render() {
        return (
            <div className={this.props.className}>
                <ModuleSideNavigation moduleId={this.props.match.params.moduleId}></ModuleSideNavigation>
                <div className="module-content">
                    <MDBContainer>
                        <MDBRow>
                            <MDBCol>
                                <MDBRow>
                                    <MDBCol>
                                        <h4 className="mb-2">Gradebook</h4>
                                        <hr className="my-4" />
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow>
                                    <MDBCol>
                                        <div className="align-right">
                                            <MDBBtn color="primary" outline className="mr-4 mb-2" size="md">
                                                <MDBIcon icon="plus" className="mr-1" /> Add
                                            </MDBBtn>
                                        </div>
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow>
                                    <MDBCol size="12">
                                        <MDBCard style={{'border':'none', 'box-shadow':'none'}}>
                                            <MDBCardBody>
                                                <MDBTable responsive>
                                                    <MDBTableHead columns={this.state.columns} color="primary-color" textWhite />
                                                    <MDBTableBody rows={this.state.grades} />
                                                </MDBTable>
                                            </MDBCardBody>
                                        </MDBCard>
                                    </MDBCol>
                                </MDBRow>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </div>
            </div>
          );
    }
}

export default styled(ModuleGradebookPage)`
.module-content{
    margin-left: 270px;
    margin-top: 40px;
}
.align-right{
    float: right;
}
`;

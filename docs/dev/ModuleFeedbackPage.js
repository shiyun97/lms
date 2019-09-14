import React, { Component } from "react";
import styled from 'styled-components';
import { MDBContainer, MDBRow, MDBCol, MDBIcon, MDBBtn, MDBDataTable } from "mdbreact";
import ModuleSideNavigation from "./ModuleSideNavigation";
import SectionContainer from "../components/sectionContainer";

class ModuleFeedbackPage extends Component {

    state = {
        feedbacks: {
            columns: [
                {
                    label: "Module Code",
                    field: "moduleCode",
                    width: 150,
                    attributes: {
                        "aria-controls": "DataTable",
                        "aria-label": "Name"
                    }
                },
                {
                    label: "Type",
                    field: "type",
                    width: 150
                },
                {
                    label: "Date Created",
                    field: "dateCreated",
                    width: 150
                },
                {
                    label: "Date Submitted",
                    field: "dateSubmitted",
                    width: 150
                }
            ],
            rows: [
                {
                    moduleCode: "IS4103",
                    type: "Lecture",
                    dateCreated: "2019 August 20",
                    dateSubmitted: "-",
                    clickEvent: () => this.goToFeedback(1)
                },
                {
                    moduleCode: "IS4103",
                    type: "Tutorial",
                    dateCreated: "2019 August 20",
                    dateSubmitted: "-",
                    clickEvent: () => this.goToFeedback(2)
                },
                {
                    moduleCode: "IS4103",
                    type: "Practical",
                    dateCreated: "2019 August 20",
                    dateSubmitted: "-",
                    clickEvent: () => this.goToFeedback(3)
                }
            ]
        },
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
            // retrieve module & set state
        }
    }

    goToFeedback(id) {
        console.log(id);
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
                                        <h4 className="mb-2">Feedback</h4>
                                        <hr className="my-4" />
                                        <MDBDataTable striped bordered hover searching={true} data={this.state.feedbacks} />
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

export default styled(ModuleFeedbackPage)`
.module-content{
    margin-left: 270px;
    margin-top: 40px;
}
.align-right{
    float: right;
}
`;

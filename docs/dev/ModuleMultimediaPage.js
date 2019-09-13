import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import styled from 'styled-components';
import { MDBContainer, MDBRow, MDBCol, MDBIcon, MDBDataTable } from "mdbreact";
import ModuleSideNavigation from "./ModuleSideNavigation";
import SectionContainer from "../components/sectionContainer";

class ModuleMultimediaPage extends Component {

    state = {
        multimedia: {
            columns: [
                {
                    label: "Name",
                    field: "name",
                    width: 150,
                    attributes: {
                        "aria-controls": "DataTable",
                        "aria-label": "Name"
                    }
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
                }
            ],
            rows: [
                {
                    name: "Multimedia 1",
                    openingDate: "2019",
                    closingDate: "2019",
                    clickEvent: () => this.clickMultimedia(1)
                },
                {
                    name: "Multimedia 2",
                    openingDate: "2019",
                    closingDate: "2019",
                    clickEvent: () => this.clickMultimedia(2)
                },
                {
                    name: "Multimedia 3",
                    openingDate: "2019",
                    closingDate: "2019",
                    clickEvent: () => this.clickMultimedia(3)
                },
            ]
        }
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
        }
    }

    clickMultimedia(id) {
        console.log(id);
        this.props.history.push(`/modules/${this.state.moduleId}/multimedia/${id}`);
    }

    render() {
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
                        <MDBRow>
                            <MDBCol>
                            <MDBDataTable striped bordered hover searching={true} data={this.state.multimedia} />
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
    margin-left: 270px;
    margin-top: 40px;
}
`;

export class ModuleMultimediaDetailsPage extends Component {

    state = {
        multimedia: {
            name: 'Multimedia 1',
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
            this.setState({
                multimediaId: multimediaId
            })
            // retrieve multimedia & set state
        }
    }

    render() {
        return (
            <div>
                <ModuleSideNavigation moduleId={this.props.match.params.moduleId}></ModuleSideNavigation>
                <div className="module-content">
                    <MDBContainer>
                        <MDBRow>
                            <MDBCol>
                                <h4 className="mb-4">Multimedia<MDBIcon icon="angle-right" className="ml-4 mr-4" />
                                {this.state.multimedia.name}
                                </h4>
                                <hr className="my-4" />
                            </MDBCol>
                        </MDBRow>
                        <MDBRow>
                            <MDBCol>
                            
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </div>
            </div>
          );
    }
}

import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import axios from "axios";
import { observer, inject } from 'mobx-react';
import ModulesPageTeacher from "./Teacher/ModulesPageTeacher";
import ModulesPageStudent from "./Student/ModulesPageStudent";

@inject('dataStore')
@observer
class ModulesPage extends Component {

    state = {
        status: "retrieving"
    };

    componentDidMount() {
        axios
            .get(`http://localhost:8080/LMS-war/webresources/studentEnrollment/getCurrentScheduleDetails`)
            .then(result => {
                // console.log(result)
                this.props.dataStore.updateYearSem(result.data.year, result.data.semester);
                this.setState({
                    status: "done"
                });
            })
            .catch(error => {
                this.setState({
                    status: "error"
                });
                console.error("error in axios " + error);
            });
    }

    render() {
        return (
            <MDBContainer style={{ paddingBottom: 240 }}>
                <MDBRow>
                    <MDBCol md="8" className="mt-4">
                        <h2 className="font-weight-bold" style={{ paddingTop: 50 }}>
                            Modules
                    </h2>
                        {/* <MDBInputGroup
                            containerClassName="mb-3"
                            style={{ width: 300 }}
                            prepend="Term"
                            inputs={
                                <select className="browser-default custom-select">
                                    <option value="0">AY XX/XX SEMESTER XX</option>
                                    <option value="1">Past Semesters</option>
                                </select>
                            }
                        /> */}
                    </MDBCol>
                    {this.props.dataStore.getAccessRight === "Student" ?
                        <ModulesPageStudent /> :
                        <ModulesPageTeacher />
                    }
                </MDBRow>
            </MDBContainer>
        );
    }
}

export default ModulesPage;

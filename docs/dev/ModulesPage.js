import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import axios from "axios";
import { observer, inject } from 'mobx-react';
import ModulesPageTeacher from "./Teacher/ModulesPageTeacher";
import ModulesPageStudent from "./Student/ModulesPageStudent";
import styled from 'styled-components';
import MainSideNavDropdown from "./MainSideNavDropdown";

@inject('dataStore')
@observer
class ModulesPage extends Component {

    componentDidMount() {
        axios
            .get(`http://localhost:8080/LMS-war/webresources/studentEnrollment/getCurrentScheduleDetails`)
            .then(result => {
                // console.log(result)
                this.props.dataStore.updateYearSem(result.data.year, result.data.semester);
            })
            .catch(error => {
                console.error("error in axios " + error);
            });
    }

    render() {
        return (
            <div className={this.props.className}>
                <div className="module-navbar-small">
                    <MainSideNavDropdown moduleId={this.props.moduleId} activeTab={'Modules'}></MainSideNavDropdown>
                </div>
                <div className="module-content">
            <MDBContainer style={{ paddingBottom: 240 }}>
                <MDBRow>
                    <MDBCol md="8" className="mt-4">
                        <h2 className="font-weight-bold" style={{ paddingTop: 50 }}>
                            Modules
                    </h2>
                    </MDBCol>
                    {this.props.dataStore.getAccessRight === "Student" ?
                        <ModulesPageStudent /> :
                        <ModulesPageTeacher />
                    }
                </MDBRow>
            </MDBContainer>
                </div>
            </div>
        );
    }
}

export default styled(ModulesPage)`
.module-content{
    margin-top: 40px;
}
@media screen and (min-width: 800px) {
    .module-content{
        margin-left: 90px;
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
`;

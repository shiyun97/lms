import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBBtn } from "mdbreact";
import axios from 'axios';
import { observer, inject } from 'mobx-react';
import styled from 'styled-components';
import ModuleSideNavigation from "../ModuleSideNavigation";

@inject('dataStore')
@observer
class ModuleQuizPageViewStatistics extends Component {

  state = {
    moduleId: 0,
    status: "retrieving",
  }

  initPage() {
    var pathname = location.pathname;
    pathname = pathname.split("/");
    this.props.dataStore.setCurrModId(pathname[2]);
    this.props.dataStore.setCurrQuizId(pathname[4]);
  }

  componentDidMount() {
    this.initPage();
    this.getModuleQuizStatistics()
  }

  getModuleQuizStatistics = () => {
    let quizId = this.props.dataStore.getCurrQuizId;
    axios
      .get(`http://localhost:8080/LMS-war/webresources/Assessment/retrieveQuizStatistics?quizId=${quizId}`)
      .then(result => {
        this.setState({ status: "done" })
      })
      .catch(error => {
        this.setState({ status: "error" })
      });
  }

  render() {
    var moduleId = this.props.dataStore.getCurrModId;
    return (
      <div className={this.props.className}>
        <ModuleSideNavigation moduleId={moduleId}></ModuleSideNavigation>
        <div className="module-content">
          <MDBContainer className="mt-3">
            <MDBRow className="py-3">
              <MDBCol md="12">
                <MDBCard cascade className="my-3 grey lighten-4" style={{ padding: 20 }}>
                  Quiz Statistics
                    </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </div>
      </div>
    )
  }
}

export default styled(ModuleQuizPageViewStatistics)`
.module-content{
    margin-left: 270px;
    margin-top: 40px;
}
`;
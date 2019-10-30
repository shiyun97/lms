import React, { Component } from 'react';
import { MDBRow, MDBContainer, MDBCard, MDBCardBody, MDBIcon, MDBCol, MDBCardText, MDBBreadcrumb, MDBBreadcrumbItem, MDBFormInline, MDBBtn } from 'mdbreact';
import styled from 'styled-components';
import ModuleSideNavigation from "../ModuleSideNavigation";
import { observer, inject } from 'mobx-react';
// import TableSection from './sections/TableSection';
// import ChartSection1 from './sections/ChartSection1';
// import ChartSection2 from './sections/ChartSection2';
// import MapSection from './sections/MapSection';
// import ModalSection from './sections/ModalSection';

@inject('dataStore')
@observer
class ModuleAnalyticsPage extends Component {

  componentDidMount() {
    this.initPage();
  }

  initPage() {
    var pathname = location.pathname;
    pathname = pathname.split("/");
    // console.log(pathname[2])
    this.props.dataStore.setCurrModId(pathname[2]);
  }

  renderCardSection1 = () => {
    return (
      <MDBRow className="mb-4">
        <MDBCol xl="3" md="6" className="mb-r">
          <MDBCard className="cascading-admin-card">
            <div className="admin-up">
              <MDBIcon icon="money-bill-alt" className="primary-color" />
              <div className="data">
                <p>SALES</p>
                <h4>
                  <strong>$2000</strong>
                </h4>
              </div>
            </div>
            <MDBCardBody>
              <div className="progress">
                <div aria-valuemax="100" aria-valuemin="0" aria-valuenow="25" className="progress-bar bg-primary" role="progressbar"
                  style={{ width: '25%' }}></div>
              </div>
              <MDBCardText>Better than last week (25%)</MDBCardText>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol xl="3" md="6" className="mb-r">
          <MDBCard className="cascading-admin-card">
            <div className="admin-up">
              <MDBIcon icon="chart-line" className="warning-color" />
              <div className="data">
                <p>SUBSCRIPTIONS</p>
                <h4>
                  <strong>200</strong>
                </h4>
              </div>
            </div>
            <MDBCardBody>
              <div className="progress">
                <div aria-valuemax="100" aria-valuemin="0" aria-valuenow="25" className="progress-bar bg grey" role="progressbar"
                  style={{ width: '25%' }}></div>
              </div>
              <MDBCardText>Worse than last week (25%)</MDBCardText>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol xl="3" md="6" className="mb-r">
          <MDBCard className="cascading-admin-card">
            <div className="admin-up">
              <MDBIcon icon="chart-pie" className="light-blue lighten-1" />
              <div className="data">
                <p>TRAFFIC</p>
                <h4>
                  <strong>20000</strong>
                </h4>
              </div>
            </div>
            <MDBCardBody>
              <div className="progress">
                <div aria-valuemax="100" aria-valuemin="0" aria-valuenow="25" className="progress-bar grey darken-2" role="progressbar"
                  style={{ width: '75%' }}></div>
              </div>
              <MDBCardText>Worse than last week (75%)</MDBCardText>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol xl="3" md="6" className="mb-r">
          <MDBCard className="cascading-admin-card">
            <div className="admin-up">
              <MDBIcon icon="chart-bar" className="red accent-2" />
              <div className="data">
                <p>ORGANIC TRAFFIC</p>
                <h4>
                  <strong>2000</strong>
                </h4>
              </div>
            </div>
            <MDBCardBody>
              <div className="progress">
                <div aria-valuemax="100" aria-valuemin="0" aria-valuenow="25" className="progress-bar bg-primary" role="progressbar"
                  style={{ width: '25%' }}></div>
              </div>
              <MDBCardText>Better than last week (25%)</MDBCardText>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    )
  }

  renderNumberCardSection2 = () => {
    return (
      <MDBRow className="mb-4">
          <MDBCol xl="3" md="6" className="mb-3">
            <MDBCard color="primary-color" className="classic-admin-card">
              <MDBCardBody>
                <div className="float-right">
                <MDBIcon far icon="money-bill-alt"/>
                </div>
                <p className="white-text">SALES</p>
                <h4><strong>$2000</strong></h4>
              </MDBCardBody>
              <div className="progress">
                <div aria-valuemax="100" aria-valuemin="0" aria-valuenow="25" className="progress-bar bg grey darken-3" role="progressbar" style={{width: "25%"}}></div>
              </div>
              <MDBCardBody>
                <p>Better than last week (25%)</p>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol xl="3" md="6" className="mb-3">
            <MDBCard color="warning-color" className="classic-admin-card">
              <MDBCardBody>
                <div className="float-right">
                <MDBIcon icon="chart-line"/>
                </div>
                <p className="white-text">SUBSCRIPTIONS</p>
                <h4><strong>200</strong></h4>
              </MDBCardBody>
              <div className="progress">
                <div aria-valuemax="100" aria-valuemin="0" aria-valuenow="25" className="progress-bar bg grey darken-3" role="progressbar" style={{width: "25%"}}></div>
              </div>
              <MDBCardBody>
                <p>Worse than last week (25%)</p>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol xl="3" md="6" className="mb-3">
            <MDBCard color="primary-color" className="classic-admin-card">
              <MDBCardBody>
                <div className="float-right">
                <MDBIcon icon="chart-pie"/>
                </div>
                <p className="white-text">TRAFFIC</p>
                <h4><strong>20000</strong></h4>
              </MDBCardBody>
              <div className="progress">
                <div aria-valuemax="100" aria-valuemin="0" aria-valuenow="75" className="progress-bar bg grey darken-3" role="progressbar" style={{width: "75%"}}></div>
              </div>
              <MDBCardBody>
                <p>Better than last week (75%)</p>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol xl="3" md="6" className="mb-3">
            <MDBCard color="red accent-2" className="classic-admin-card">
              <MDBCardBody>
                <div className="float-right">
                <MDBIcon icon="chart-bar"/>
                </div>
                <p className="white-text">ORGANIC TRAFFIC</p>
                <h4><strong>2000</strong></h4>
              </MDBCardBody>
              <div className="progress">
                <div aria-valuemax="100" aria-valuemin="0" aria-valuenow="25" className="progress-bar bg grey darken-3" role="progressbar" style={{width: "25%"}}></div>
              </div>
              <MDBCardBody>
                <p>Better than last week (75%)</p>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
    )
  }

  renderBreadcrumbSection = () => {
    return (
      <MDBCard className="mb-5">
          <MDBCardBody id="breadcrumb" className="d-flex align-items-center justify-content-between">
              <MDBBreadcrumb>
                  <MDBBreadcrumbItem>Module</MDBBreadcrumbItem>
                  <MDBBreadcrumbItem active>Analytics</MDBBreadcrumbItem>
              </MDBBreadcrumb>
          </MDBCardBody>
      </MDBCard>
    )
  }

  render() {
    var moduleId = this.props.dataStore.getCurrModId;
    return (
      <div className={this.props.className}>
        <ModuleSideNavigation moduleId={moduleId}></ModuleSideNavigation>
        <div className="module-content">
          <MDBContainer>
            {this.renderBreadcrumbSection()}
            {this.renderCardSection1()}
            {this.renderNumberCardSection2()}
            {/* <ChartSection1 />
        <TableSection />
        <ChartSection2 /> */}
            <MDBRow className="mb-4">
              {/* <MapSection />
          <ModalSection /> */}
            </MDBRow>
          </MDBContainer>
        </div>
      </div>
    );
  }
}

export default styled(ModuleAnalyticsPage)`
.module-content{
    margin-left: 270px;
    margin-top: 40px;
}`
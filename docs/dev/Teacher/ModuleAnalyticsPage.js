import React, { Component } from 'react';
import { MDBRow, MDBContainer, MDBCard, MDBCardBody, MDBTable, MDBTableBody, MDBCardHeader, MDBTableHead, MDBListGroup, MDBListGroupItem, MDBBadge, MDBIcon, MDBCol, MDBCardText, MDBBreadcrumb, MDBBreadcrumbItem, MDBFormInline, MDBBtn } from 'mdbreact';
import styled from 'styled-components';
import ModuleSideNavigation from "../ModuleSideNavigation";
import { Bar, Pie, Line, Doughnut, Radar } from 'react-chartjs-2';
import { observer, inject } from 'mobx-react';
import CanvasJSReact from '../../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

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

  renderTableSection = () => {
    return (
      <MDBRow className="mb-4">
        <MDBCol md="6">
          <MDBCard>
            <MDBCardBody>
              <MDBTable hover>
                <MDBTableHead color="blue-grey lighten-4">
                  <tr>
                    <th>#</th>
                    <th>First</th>
                    <th>Last</th>
                    <th>Handle</th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  <tr>
                    <td>1</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Larry</td>
                    <td>the Bird</td>
                    <td>@twitter</td>
                  </tr>
                </MDBTableBody>
              </MDBTable>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol md="6" className="mb-4">
          <MDBCard>
            <MDBCardBody>
              <MDBTable hover>
                <MDBTableHead color="blue lighten-4">
                  <tr>
                    <th>#</th>
                    <th>First</th>
                    <th>Last</th>
                    <th>Handle</th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  <tr>
                    <td>1</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Larry</td>
                    <td>the Bird</td>
                    <td>@twitter</td>
                  </tr>
                </MDBTableBody>
              </MDBTable>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    )
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
                <MDBIcon far icon="money-bill-alt" />
              </div>
              <p className="white-text">SALES</p>
              <h4><strong>$2000</strong></h4>
            </MDBCardBody>
            <div className="progress">
              <div aria-valuemax="100" aria-valuemin="0" aria-valuenow="25" className="progress-bar bg grey darken-3" role="progressbar" style={{ width: "25%" }}></div>
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
                <MDBIcon icon="chart-line" />
              </div>
              <p className="white-text">SUBSCRIPTIONS</p>
              <h4><strong>200</strong></h4>
            </MDBCardBody>
            <div className="progress">
              <div aria-valuemax="100" aria-valuemin="0" aria-valuenow="25" className="progress-bar bg grey darken-3" role="progressbar" style={{ width: "25%" }}></div>
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
                <MDBIcon icon="chart-pie" />
              </div>
              <p className="white-text">TRAFFIC</p>
              <h4><strong>20000</strong></h4>
            </MDBCardBody>
            <div className="progress">
              <div aria-valuemax="100" aria-valuemin="0" aria-valuenow="75" className="progress-bar bg grey darken-3" role="progressbar" style={{ width: "75%" }}></div>
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
                <MDBIcon icon="chart-bar" />
              </div>
              <p className="white-text">ORGANIC TRAFFIC</p>
              <h4><strong>2000</strong></h4>
            </MDBCardBody>
            <div className="progress">
              <div aria-valuemax="100" aria-valuemin="0" aria-valuenow="25" className="progress-bar bg grey darken-3" role="progressbar" style={{ width: "25%" }}></div>
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

  renderChartSection1 = () => {

    const dataBar = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      datasets: [
        {
          label: '#1',
          data: [12, 39, 3, 50, 2, 32, 84],
          backgroundColor: 'rgba(245, 74, 85, 0.5)',
          borderWidth: 1
        }, {
          label: '#2',
          data: [56, 24, 5, 16, 45, 24, 8],
          backgroundColor: 'rgba(90, 173, 246, 0.5)',
          borderWidth: 1
        }, {
          label: '#3',
          data: [12, 25, 54, 3, 15, 44, 3],
          backgroundColor: 'rgba(245, 192, 50, 0.5)',
          borderWidth: 1
        }
      ]
    };

    const barChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        xAxes: [{
          barPercentage: 1,
          gridLines: {
            display: true,
            color: 'rgba(0, 0, 0, 0.1)'
          }
        }],
        yAxes: [{
          gridLines: {
            display: true,
            color: 'rgba(0, 0, 0, 0.1)'
          },
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }

    const dataPie = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      datasets: [
        {
          data: [300, 50, 100, 40, 120, 24, 52],
          backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360', '#ac64ad'],
          hoverBackgroundColor: ['#FF5A5E', '#5AD3D1', '#FFC870', '#A8B3C5', '#616774', '#da92db']
        }
      ]
    }
    return (
      <MDBRow className="mb-4">
        <MDBCol md="8" className="mb-4">
          <MDBCard className="mb-4">
            <MDBCardBody>
              <Bar data={dataBar} height={500} options={barChartOptions} />
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol md="4" className="mb-4">
          <MDBCard className="mb-4">
            <MDBCardHeader>Pie chart</MDBCardHeader>
            <MDBCardBody>
              <Pie data={dataPie} height={300} options={{ responsive: true }} />
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    )
  }

  renderChartSection2 = () => {
    const dataLine = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'My First dataset',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [65, 59, 80, 81, 56, 55, 40]
        }
      ]
    };

    const dataRadar = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      datasets: [
        {
          label: '#1',
          backgroundColor: 'rgba(245, 74, 85, 0.5)',
          data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
          label: '#2',
          backgroundColor: 'rgba(90, 173, 246, 0.5)',
          data: [12, 42, 121, 56, 24, 12, 2]
        },
        {
          label: '#3',
          backgroundColor: 'rgba(245, 192, 50, 0.5)',
          data: [2, 123, 154, 76, 54, 23, 5]
        }
      ]
    };

    const dataDoughnut = {
      labels: ["Red", "Green", "Yellow", "Grey", "Dark Grey"],
      datasets: [{
        data: [300, 50, 100, 40, 120],
        backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C", "#949FB1", "#4D5360"],
        hoverBackgroundColor: ["#FF5A5E", "#5AD3D1", "#FFC870", "#A8B3C5", "#616774"]
      }]
    };
    return (
      <MDBRow className="mb-4">
        <MDBCol md="12" lg="4" className="mb-4">
          <MDBCard className="mb-4">
            <MDBCardHeader>Line chart</MDBCardHeader>
            <MDBCardBody>
              <Line data={dataLine} options={{ responsive: true }} />
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol md="12" lg="4" className="mb-4">
          <MDBCard className="mb-4">
            <MDBCardHeader>Radar chart</MDBCardHeader>
            <MDBCardBody>
              <Radar data={dataRadar} height={300} options={{ responsive: true }} />
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol md="12" lg="4" className="mb-4">
          <MDBCard className="mb-4">
            <MDBCardHeader>Doughnut chart</MDBCardHeader>
            <MDBCardBody >
              <Doughnut data={dataDoughnut} height={300} options={{ responsive: true }} />
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    )
  }

  render() {
    const options = {
      theme: "light2",
      animationEnabled: true,
      title: {
        text: "Energy in Baked Foods"
      },
      axisY: {
        title: "Energy Per 100 g (kcal/100g)",
        includeZero: false
      },
      data: [{
        type: "boxAndWhisker",
        yValueFormatString: "#,##0.# \"kcal/100g\"",
        dataPoints: [
          { label: "Bread", y: [179, 256, 300, 418, 274] },
          { label: "Cake", y: [252, 346, 409, 437, 374.5] },
          { label: "Biscuit", y: [236, 281.5, 336.5, 428, 313] },
          { label: "Doughnut", y: [340, 382, 430, 452, 417] },
          { label: "Pancakes", y: [194, 224.5, 342, 384, 251] },
          { label: "Bagels", y: [241, 255, 276.5, 294, 274.5] }
        ]
      }]
    }

    var moduleId = this.props.dataStore.getCurrModId;
    return (
      <div className={this.props.className}>
        <ModuleSideNavigation moduleId={moduleId}></ModuleSideNavigation>
        <div className="module-content">
          <MDBContainer>
            {this.renderBreadcrumbSection()}
            {this.renderCardSection1()}
            {this.renderNumberCardSection2()}
            <MDBRow className="mb-4">
              <MDBCol md="12">
                <MDBCard>
                  <MDBCardBody>
                    <CanvasJSChart options={options} />
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
            {this.renderTableSection()}
            {this.renderChartSection1()}
            {this.renderChartSection2()}
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
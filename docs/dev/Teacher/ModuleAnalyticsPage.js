import React, { Component } from 'react';
import { MDBRow, MDBContainer, MDBCard, MDBCardBody, MDBCardHeader, MDBIcon, MDBCol, MDBCardText, MDBBreadcrumb, MDBBreadcrumbItem } from 'mdbreact';
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

  renderCardSection1 = () => {
    return (
      <MDBRow className="mb-4">
        <MDBCol xl="3" md="6" className="mb-r">
          <MDBCard className="cascading-admin-card">
            <div className="admin-up">
              <MDBIcon icon="calendar-check" className="primary-color" />
              <div className="data">
                <p>STUDENTS</p>
                <h4>
                  <strong>75/200</strong>
                </h4>
              </div>
            </div>
            <MDBCardBody>
              <div className="progress">
                <div aria-valuemax="100" aria-valuemin="0" aria-valuenow="25" className="progress-bar bg-primary" role="progressbar"
                  style={{ width: '25%' }}></div>
              </div>
              <MDBCardText>Attendance of Latest Lecture</MDBCardText>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol xl="3" md="6" className="mb-r">
          <MDBCard className="cascading-admin-card">
            <div className="admin-up">
              <MDBIcon icon="calendar-alt" className="warning-color" />
              <div className="data">
                <p>CONSULTATIONS</p>
                <h4>
                  <strong>5/30</strong>
                </h4>
              </div>
            </div>
            <MDBCardBody>
              <div className="progress">
                <div aria-valuemax="100" aria-valuemin="0" aria-valuenow="25" className="progress-bar bg grey" role="progressbar"
                  style={{ width: '25%' }}></div>
              </div>
              <MDBCardText>Booked Consultations</MDBCardText>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol xl="3" md="6" className="mb-r">
          <MDBCard className="cascading-admin-card">
            <div className="admin-up">
              <MDBIcon icon="star" className="light-blue lighten-1" />
              <div className="data">
                <p>QUIZ</p>
                <h4>
                  <strong>180/200</strong>
                </h4>
              </div>
            </div>
            <MDBCardBody>
              <div className="progress">
                <div aria-valuemax="100" aria-valuemin="0" aria-valuenow="25" className="progress-bar grey darken-2" role="progressbar"
                  style={{ width: '75%' }}></div>
              </div>
              <MDBCardText>Attempts for Latest Quiz</MDBCardText>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol xl="3" md="6" className="mb-r">
          <MDBCard className="cascading-admin-card">
            <div className="admin-up">
              <MDBIcon icon="comments" className="red accent-2" />
              <div className="data">
                <p>FORUM</p>
                <h4>
                  <strong>20/200</strong>
                </h4>
              </div>
            </div>
            <MDBCardBody>
              <div className="progress">
                <div aria-valuemax="100" aria-valuemin="0" aria-valuenow="25" className="progress-bar bg-primary" role="progressbar"
                  style={{ width: '25%' }}></div>
              </div>
              <MDBCardText>Students Contributed</MDBCardText>
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
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7'],
      datasets: [
        {
          label: 'Lecture - Present',
          data: [12, 39, 3, 50, 2, 32, 84],
          backgroundColor: 'rgba(245, 74, 85, 0.5)',
          borderWidth: 1
        }, {
          label: 'Tutorial - Present',
          data: [56, 24, 5, 16, 45, 24, 8],
          backgroundColor: 'rgba(90, 173, 246, 0.5)',
          borderWidth: 1
        }, {
          label: 'Lecture - Absent',
          data: [12, 25, 54, 3, 15, 44, 3],
          backgroundColor: 'rgba(245, 192, 50, 0.5)',
          borderWidth: 1
        }, {
          label: 'Tutorial - Absent',
          data: [12, 25, 54, 3, 15, 44, 3],
          backgroundColor: 'rgba(90, 192, 50, 0.5)',
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
      labels: ['Topic 1', 'Topic 2', 'Topic 3', 'Topic 4', 'Topic 5', 'Topic 6', 'Topic 7'],
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
            <MDBCardHeader>Attendance</MDBCardHeader>
            <MDBCardBody>
              <Bar data={dataBar} height={500} options={barChartOptions} />
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol md="4" className="mb-4">
          <MDBCard className="mb-4">
            <MDBCardHeader>Forum Contribution</MDBCardHeader>
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
    const optionsQuiz = {
      animationEnabled: true,
      theme: "light2", // "light1", "light2", "dark1", "dark2"
      title: {
        text: "Quiz Scores"
      },
      subtitles: [{
        text: "Overall Scores",
        fontSize: 15
      }],
      axisY: {
        title: "Scores",
        includeZero: true,
        tickLength: 0,
      },
      data: [{
        type: "boxAndWhisker",
        whiskerColor: "#C0504E",
        toolTipContent: "<span style=\"color:#6D78AD\">{label}:</span> <br><b>Maximum:</b> {y[3]},<br><b>Q3:</b> {y[2]},<br><b>Median:</b> {y[4]}<br><b>Q1:</b> {y[1]}<br><b>Minimum:</b> {y[0]}",
        yValueFormatString: "#####.0",
        dataPoints: [
          { label: "Quiz 1", y: [54, 85, 98, 99, 95] },
          { label: "Quiz 2", y: [56, 80, 89, 96, 84] },
          { label: "Quiz 3", y: [54, 84, 88, 91, 86] },
          { label: "Quiz 4", y: [52, 76, 87, 92, 81] },
          { label: "Quiz 5", y: [54, 80, 87, 95, 81] }
        ]
      },
      {
        type: "scatter",
        name: "Your Score",
        toolTipContent: "<span style=\"color:#C0504E\">{name}</span>: {y}",
        showInLegend: true,
        dataPoints: [
          { label: "Quiz 1", y: 65 },
          { label: "Quiz 2", y: 62 },
          { label: "Quiz 3", y: 72 },
          { label: "Quiz 4", y: 72 },
          { label: "Quiz 5", y: 97 }
        ]
      }]
    }
    const optionsGradebook = {
      animationEnabled: true,
      theme: "light2", // "light1", "light2", "dark1", "dark2"
      title: {
        text: "Grade Item Scores"
      },
      subtitles: [{
        text: "Overall Scores",
        fontSize: 15
      }],
      axisY: {
        title: "Scores",
        includeZero: true,
        tickLength: 0,
      },
      data: [{
        type: "boxAndWhisker",
        whiskerColor: "#C0504E",
        toolTipContent: "<span style=\"color:#6D78AD\">{label}:</span> <br><b>Maximum:</b> {y[3]},<br><b>Q3:</b> {y[2]},<br><b>Median:</b> {y[4]}<br><b>Q1:</b> {y[1]}<br><b>Minimum:</b> {y[0]}",
        yValueFormatString: "#####.0",
        dataPoints: [
          { label: "Grade Item 1", y: [54, 85, 98, 99, 95] },
          { label: "Grade Item 2", y: [56, 80, 89, 96, 84] },
          { label: "Grade Item 3", y: [54, 84, 88, 91, 86] },
          { label: "Grade Item 4", y: [52, 76, 87, 92, 81] },
          { label: "Grade Item 5", y: [54, 80, 87, 95, 81] }
        ]
      },
      {
        type: "scatter",
        name: "Your Score",
        toolTipContent: "<span style=\"color:#C0504E\">{name}</span>: {y}",
        showInLegend: true,
        dataPoints: [
          { label: "Grade Item 1", y: 65 },
          { label: "Grade Item 2", y: 62 },
          { label: "Grade Item 3", y: 72 },
          { label: "Grade Item 4", y: 72 },
          { label: "Grade Item 5", y: 97 }
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
            {this.renderChartSection1()}
            {/* {this.renderChartSection2()} */}
            <MDBRow className="mb-4">
              <MDBCol md="12">
                <MDBCard>
                  <MDBCardBody>
                    <CanvasJSChart options={optionsQuiz} />
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
            <MDBRow className="mb-4">
              <MDBCol md="12">
                <MDBCard>
                  <MDBCardBody>
                    <CanvasJSChart options={optionsGradebook} />
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
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
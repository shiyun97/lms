import React, { Component } from 'react';
import { MDBRow, MDBContainer, MDBCard, MDBCardBody, MDBCardHeader, MDBIcon, MDBCol, MDBCardText, MDBBreadcrumb, MDBBreadcrumbItem } from 'mdbreact';
import styled from 'styled-components';
import ModuleSideNavigation from "../ModuleSideNavigation";
import { Bar, Pie } from 'react-chartjs-2';
import { observer, inject } from 'mobx-react';
import CanvasJSReact from '../../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
import axios from 'axios';

@inject('dataStore')
@observer
class ModuleAnalyticsPage extends Component {

  state = {
    barStatus: "retrieving",
    barMessage: "Overall Module Analytics is not available at the moment.",
    classSize: 0,
    lectureAttendance: 0,
    bookedConsultations: 0,
    totalConsultations: 0,
    quizAttempts: 0,
    forumContributions: 0,
    gradeItems: [],
    gradeItemStatus: "retrieving",
    gradeItemMessage: "Grade Item Analytics is not available at the moment.",
    quizItems: [],
    quizStatus: "retrieving",
    quizMessage: "Quiz Analytics is not available at the moment.",
    forumLabels: [],
    forumData: [],
    forumStatus: "retrieving",
    forumMessage: "Forum Analytics is not available at the moment.",
    presentData: [],
    absentData: [],
    attendanceStatus: "retrieving",
    attendanceMessage: "Attendance Analytics is not available at the moment.",
    allAnalyticsLoaded: false,
  }

  componentDidMount() {
    this.initPage();
    this.getBarAnalytics();
    this.getGradeItemAnalytics();
    this.getQuizAnalytics();
    this.getForumAnalytics();
    this.getAttendanceAnalytics();
    this.setState({ allAnalyticsLoaded: true })
  }

  initPage() {
    var pathname = location.pathname;
    pathname = pathname.split("/");
    this.props.dataStore.setCurrModId(pathname[2]);
  }

  getBarAnalytics = () => {
    var moduleId = this.props.dataStore.getCurrModId;
    axios
      .get(`http://localhost:8080/LMS-war/webresources/analytics/retrieveBarAnalytics?moduleId=${moduleId}`)
      .then(result => {
        this.setState({
          barStatus: "done",
          classSize: result.data.classSize,
          lectureAttendance: result.data.lectureAttendance,
          bookedConsultations: result.data.bookedConsultations,
          totalConsultations: result.data.totalConsultations,
          quizAttempts: result.data.quizAttempts,
          forumContributions: result.data.forumContributions,
        });
      })
      .catch(error => {
        this.setState({
          barStatus: "error",
        });
        console.error("error in axios " + error);
      });
  }

  getGradeItemAnalytics = () => {
    let userId = sessionStorage.getItem('userId');
    var moduleId = this.props.dataStore.getCurrModId;
    axios
      .get(`http://localhost:8080/LMS-war/webresources/analytics/retrieveGradeItemAnalytics?userId=${userId}&moduleId=${moduleId}`)
      .then(result => {
        var temp = []
        var tempY = []
        result.data.items.map((item) => {
          tempY[0] = item.min;
          tempY[1] = item.twentyfifth;
          tempY[2] = item.seventyfifth;
          tempY[3] = item.max;
          tempY[4] = item.median;

          temp.push({
            label: "Grade Item",
            y: tempY,
            click: () => console.log(1)
          })
          tempY = []
        })
        this.setState({
          gradeItems: temp,
          gradeItemStatus: "done"
        });
      })
      .catch(error => {
        this.setState({
          gradeItemStatus: "error",
        });
        console.error("error in axios " + error);
      });
  }

  getQuizAnalytics = () => {
    let userId = sessionStorage.getItem('userId');
    var moduleId = this.props.dataStore.getCurrModId;
    axios
      .get(`http://localhost:8080/LMS-war/webresources/analytics/retrieveQuizAnalytics?userId=${userId}&moduleId=${moduleId}`)
      .then(result => {
        var temp = []
        var tempY = []
        result.data.items.map((item) => {
          tempY[0] = item.min;
          tempY[1] = item.twentyfifth;
          tempY[2] = item.seventyfifth;
          tempY[3] = item.max;
          tempY[4] = item.median;

          temp.push({
            label: "Quiz",
            y: tempY,
            click: () => console.log(1)
          })
          tempY = []
        })
        this.setState({
          quizItems: temp,
          quizStatus: "done"
        });
        console.log(temp)
      })
      .catch(error => {
        this.setState({
          quizStatus: "error",
        });
        console.error("error in axios " + error);
      });
  }

  getForumAnalytics = () => {
    var moduleId = this.props.dataStore.getCurrModId;
    axios
      .get(`http://localhost:8080/LMS-war/webresources/analytics/retrieveForumAnalytics?moduleId=${moduleId}`)
      .then(result => {
        var data = []
        var labels = []
        result.data.items.map((item, index) => {
          labels[index] = item.title
          data[index] = item.threads + item.comments + item.replies
        })
        this.setState({
          forumData: data,
          forumLabels: labels,
          forumStatus: "done"
        })
      })
      .catch(error => {
        this.setState({
          forumStatus: "error",
        });
        console.error("error in axios " + error);
      });
  }

  getAttendanceAnalytics = () => {
    var moduleId = this.props.dataStore.getCurrModId;
    axios
      .get(`http://localhost:8080/LMS-war/webresources/analytics/retrieveAttendanceAnalytics?moduleId=${moduleId}`)
      .then(result => {
        var present = this.state.presentData
        var absent = []
        result.data.items.map((item, index) => {
          if (item.startDate !== null && item.startDate !== undefined) {
            present.push({
              label: "Week " + (index+1) + " - Lecture",
              y: item.presentLecture
            })
            present.push({
              label: "Week " + (index+1) + " - Tutorial",
              y: item.presentTutorial
            })
            absent.push({
              label: "Week " + (index+1) + " - Lecture",
              y: item.absentLecture
            })
            absent.push({
              label: "Week " + (index+1) + " - Tutorial",
              y: item.absentTutorial
            })
          }
        })
        this.setState({
          presentData: present,
          absentData: absent,
          attendanceStatus: "done"
        })
      })
      .catch(error => {
        this.setState({
          attendanceStatus: "error",
        });
        console.error("error in axios " + error);
      });
  }

  renderNoCardSection = (stats) => {
    return (
      <MDBRow className="mb-4">
        <MDBCol md="12" className="mb-r" align="center">
          <MDBCard>
            {stats === "bar" && <h5 style={{ padding: 20 }}>{this.state.barMessage}</h5>}
            {stats === "gradeItem" && <h5 style={{ padding: 20 }}>{this.state.gradeItemMessage}</h5>}
            {stats === "quiz" && <h5 style={{ padding: 20 }}>{this.state.quizMessage}</h5>}
            {stats === "forum" && <h5 style={{ padding: 20 }}>{this.state.forumMessage}</h5>}
            {stats === "attendance" && <h5 style={{ padding: 20 }}>{this.state.attendanceMessage}</h5>}
          </MDBCard>
        </MDBCol>
      </MDBRow>
    )
  }

  renderCardSection = () => {
    const { classSize, lectureAttendance, bookedConsultations, totalConsultations, quizAttempts, forumContributions } = this.state;
    var attendancePercentage = lectureAttendance / classSize * 100 + "%"
    var consultationsPercentage = bookedConsultations / totalConsultations * 100 + "%"
    var quizPercentage = quizAttempts / classSize * 100 + "%"
    var forumPercentage = forumContributions / classSize * 100 + "%"
    return (
      <MDBRow className="mb-4">
        <MDBCol xl="3" md="6" className="mb-r">
          <MDBCard className="cascading-admin-card">
            <div className="admin-up">
              <MDBIcon icon="calendar-check" className="primary-color" />
              <div className="data">
                <p>STUDENTS</p>
                <h4>
                  <strong>{lectureAttendance}/{classSize}</strong>
                </h4>
              </div>
            </div>
            <MDBCardBody>
              <div className="progress">
                <div aria-valuemax="100" aria-valuemin="0" aria-valuenow="25" className="progress-bar bg-primary" role="progressbar"
                  style={{ width: attendancePercentage }}></div>
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
                  <strong>{bookedConsultations}/{totalConsultations}</strong>
                </h4>
              </div>
            </div>
            <MDBCardBody>
              <div className="progress">
                <div aria-valuemax="100" aria-valuemin="0" aria-valuenow="25" className="progress-bar bg grey" role="progressbar"
                  style={{ width: consultationsPercentage }}></div>
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
                  <strong>{quizAttempts}/{classSize}</strong>
                </h4>
              </div>
            </div>
            <MDBCardBody>
              <div className="progress">
                <div aria-valuemax="100" aria-valuemin="0" aria-valuenow="25" className="progress-bar grey darken-2" role="progressbar"
                  style={{ width: quizPercentage }}></div>
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
                  <strong>{forumContributions}/{classSize}</strong>
                </h4>
              </div>
            </div>
            <MDBCardBody>
              <div className="progress">
                <div aria-valuemax="100" aria-valuemin="0" aria-valuenow="25" className="progress-bar bg-primary" role="progressbar"
                  style={{ width: forumPercentage }}></div>
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

  renderAttendanceBarChart = () => {
		const options = {
			animationEnabled: true,
			exportEnabled: true,
			title: {
				text: "",
				fontFamily: "verdana"
			},
			axisY: {
				title: "Number of Students",
			},
			toolTip: {
				shared: true,
				reversed: true
			},
			legend: {
				verticalAlign: "center",
				horizontalAlign: "right",
				reversed: true,
				cursor: "pointer",
				itemclick: this.toggleDataSeries
			},
			data: [
			{
				type: "stackedColumn",
				name: "Present",
				showInLegend: true,
				yValueFormatString: "#",
				dataPoints: this.state.presentData
			},
			{
				type: "stackedColumn",
				name: "Absent",
				showInLegend: true,
				yValueFormatString: "#",
				dataPoints: this.state.absentData
			}]
		}
    return (
      <MDBCol md="8" className="mb-4">
        <MDBCard className="mb-4">
          <MDBCardHeader>Attendance</MDBCardHeader>
          <MDBCardBody>
			<CanvasJSChart options = {options}
				 onRef={ref => this.chart = ref}
			/>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    )
  }

  renderForumPieChart = () => {
    const dataPie = {
      labels: this.state.forumLabels,
      datasets: [
        {
          data: this.state.forumData,
          backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360', '#ac64ad'],
          hoverBackgroundColor: ['#FF5A5E', '#5AD3D1', '#FFC870', '#A8B3C5', '#616774', '#da92db']
        }
      ]
    }
    return (
      <MDBCol md="4" className="mb-4">
        <MDBCard className="mb-4">
          <MDBCardHeader>Forum Contribution</MDBCardHeader>
          <MDBCardBody>
            <Pie data={dataPie} height={300} options={{ responsive: true }} />
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    )
  }

  renderBoxPlot = (data) => {
    return (
      <MDBRow className="mb-4">
        <MDBCol md="12">
          <MDBCard>
            <MDBCardBody>
              <CanvasJSChart options={data} />
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    )
  }

  render() {
    const optionsQuiz = {
      animationEnabled: true,
			exportEnabled: true,
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
        toolTipContent: "<span style=\"color:#6D78AD\">{label}:</span> <br><b>Maximum:</b> {y[3]},<br><b>Q3:</b> {y[2]},<br><b>Median:</b> {y[4]}<br><b>Q1:</b> {y[1]}<br><b>Minimum:</b> {y[0]}<br>Click to view quiz details.",
        yValueFormatString: "#####.0",
        dataPoints: this.state.quizItems
        // [
        //   { label: "Quiz 1", y: [54, 85, 98, 99, 95], click: () => console.log(1) },
        //   { label: "Quiz 2", y: [56, 80, 89, 96, 84], click: () => console.log(1) },
        //   { label: "Quiz 3", y: [54, 84, 88, 91, 86], click: () => console.log(1) },
        //   { label: "Quiz 4", y: [52, 76, 87, 92, 81], click: () => console.log(1) },
        //   { label: "Quiz 5", y: [54, 80, 87, 95, 81], click: () => console.log(1) }
        // ]
      },
        // {
        //   type: "scatter",
        //   name: "Your Score",
        //   toolTipContent: "<span style=\"color:#C0504E\">{name}</span>: {y}",
        //   showInLegend: true,
        //   dataPoints: [
        //     { label: "Quiz 1", y: 65 },
        //     { label: "Quiz 2", y: 62 },
        //     { label: "Quiz 3", y: 72 },
        //     { label: "Quiz 4", y: 72 },
        //     { label: "Quiz 5", y: 97 }
      ]
      // }]
    }
    const optionsGradebook = {
      animationEnabled: true,
			exportEnabled: true,
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
        toolTipContent: "<span style=\"color:#6D78AD\">{label}:</span> <br><b>Maximum:</b> {y[3]},<br><b>Q3:</b> {y[2]},<br><b>Median:</b> {y[4]}<br><b>Q1:</b> {y[1]}<br><b>Minimum:</b> {y[0]}<br>Click to view grade item details.",
        yValueFormatString: "#####.0",
        dataPoints: this.state.gradeItems
      },
        // {
        //   type: "scatter",
        //   name: "Your Score",
        //   toolTipContent: "<span style=\"color:#C0504E\">{name}</span>: {y}",
        //   showInLegend: true,
        //   dataPoints: [
        //     { label: "Grade Item 1", y: 65 },
        //     { label: "Grade Item 2", y: 62 },
        //     { label: "Grade Item 3", y: 72 },
        //     { label: "Grade Item 4", y: 72 },
        //     { label: "Grade Item 5", y: 97 }
      ]
      // }]
    }

    var moduleId = this.props.dataStore.getCurrModId;
    return (
      <div className={this.props.className}>
        <ModuleSideNavigation moduleId={moduleId}></ModuleSideNavigation>
        <div className="module-content">
          <MDBContainer>
            {this.renderBreadcrumbSection()}
            {this.state.barStatus === "done" ? this.renderCardSection() : this.renderNoCardSection("bar")}
            <MDBRow>
              {this.state.attendanceStatus === "done" ? this.renderAttendanceBarChart(): this.renderNoCardSection("attendance")}
              {this.state.forumStatus === "done" ? this.renderForumPieChart() : this.renderNoCardSection("forum")}
            </MDBRow>
            {this.state.quizStatus === "done" ? this.renderBoxPlot(optionsQuiz) : this.renderNoCardSection("quiz")}
            {this.state.gradeItemStatus === "done" ? this.renderBoxPlot(optionsGradebook) : this.renderNoCardSection("gradeItem")}
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
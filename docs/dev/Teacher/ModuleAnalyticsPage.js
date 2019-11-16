import React, { Component } from 'react';
import { MDBRow, MDBContainer, MDBCard, MDBCardBody, MDBCardHeader, MDBIcon, MDBCol, MDBDataTable, MDBCardText, MDBEdgeHeader, MDBBreadcrumb, MDBBreadcrumbItem, MDBProgress, MDBBtn } from 'mdbreact';
import styled from 'styled-components';
import ModuleSideNavigation from "../ModuleSideNavigation";
import ModuleSideNavigationDropdown from "../ModuleSideNavigationDropdown";
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

    gradeColumns: [
      {
        "label": "Student",
        "field": "student",
        "width": 50,
        "attributes": {
          "aria-controls": "DataTable",
          "aria-label": "Name"
        }
      },
      {
        "label": "Email",
        "field": "email",
        "width": 100
      },
      {
        "label": "",
        "field": "",
        "width": 100
      }
    ],
    gradeRows: [{ label: "Retrieving data..." }],
    percentileStatus: "retrieving"
  }

  componentDidMount() {
    this.initPage();
    this.getBarAnalytics();
    this.getGradeItemAnalytics();
    this.getQuizAnalytics();
    this.getForumAnalytics();
    this.getAttendanceAnalytics();
    this.getPercentileAnalytics();
  }

  initPage() {
    var pathname = location.pathname;
    pathname = pathname.split("/");
    this.props.dataStore.setCurrModId(pathname[2]);
  }

  routeChange = (path) => {
    this.props.history.push(path);
  }

  getPercentileAnalytics = () => {
    var moduleId = this.props.dataStore.getCurrModId;
    axios
      .get(`http://localhost:8080/LMS-war/webresources/analytics/retrieveBottomStudents?moduleId=${moduleId}`)
      .then(result => {
        console.log(result.data.userList)
        this.setState({
          gradeRows: result.data.userList,
          percentileStatus: "done"
        });
      })
      .catch(error => {
        this.setState({
          percentileStatus: "error",
        });
        console.error("error in axios " + error);
      });
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
        if (result.data.items.length === 0) {
          this.setState({ gradeItemStatus: "Empty Data" })
        } else {
          result.data.items.map((item) => {
            tempY[0] = item.min;
            tempY[1] = item.twentyfifth;
            tempY[2] = item.seventyfifth;
            tempY[3] = item.max;
            tempY[4] = item.median;

            temp.push({
              label: item.title,
              y: tempY,
              click: () => this.routeChange(`/modules/${moduleId}/gradebook/${item.gradeItemId}/viewGrades`)
            })
            tempY = []
          })
          this.setState({
            gradeItems: temp,
            gradeItemStatus: "done"
          });
        }
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
        if (result.data.items.length === 0) {
          this.setState({ gradeItemStatus: "Empty Data" })
        } else {
          result.data.items.map((item) => {
            tempY[0] = item.min;
            tempY[1] = item.twentyfifth;
            tempY[2] = item.seventyfifth;
            tempY[3] = item.max;
            tempY[4] = item.median;

            temp.push({
              label: item.title,
              y: tempY,
              click: () => this.routeChange(`/modules/${moduleId}/quiz/${item.quizId}/statistics`)
            })
            tempY = []
          })
          this.setState({
            quizItems: temp,
            quizStatus: "done"
          });
        }
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
        if (result.data.items.length === 0) {
          this.setState({ forumStatus: "Empty Data" })
        } else {
          result.data.items.map((item, index) => {
            labels[index] = item.title
            data[index] = item.threads + item.comments + item.replies
          })
          this.setState({
            forumData: data,
            forumLabels: labels,
            forumStatus: "done"
          })
        }
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
        if (result.data.items.length === 0) {
          this.setState({ attendanceStatus: "Empty Data" })
        } else {
          result.data.items.map((item, index) => {
            // if (item.startDate !== null && item.startDate !== undefined) {
            present.push({
              label: "Week " + (index + 1) + " - Lecture",
              y: item.presentLecture,
              click: () => this.routeChange(`/modules/${moduleId}/attendance`)
            })
            present.push({
              label: "Week " + (index + 1) + " - Tutorial",
              y: item.presentTutorial,
              click: () => this.routeChange(`/modules/${moduleId}/attendance`)
            })
            absent.push({
              label: "Week " + (index + 1) + " - Lecture",
              y: item.absentLecture,
              click: () => this.routeChange(`/modules/${moduleId}/attendance`)
            })
            absent.push({
              label: "Week " + (index + 1) + " - Tutorial",
              y: item.absentTutorial,
              click: () => this.routeChange(`/modules/${moduleId}/attendance`)
            })
            // }
          })
          this.setState({
            presentData: present,
            absentData: absent,
            attendanceStatus: "done"
          })
        }
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
            {stats === "bar" &&
              <>
                <MDBCardHeader>Overall Module Analytics</MDBCardHeader>
                <MDBCardBody>
                  {this.state.barMessage}
                </MDBCardBody>
              </>
            }
            {stats === "gradeItem" &&
              <>
                <MDBCardHeader>Grade Item</MDBCardHeader>
                <MDBCardBody>
                  {this.state.gradeItemMessage}
                </MDBCardBody>
              </>
            }
            {stats === "quiz" &&
              <>
                <MDBCardHeader>Quiz</MDBCardHeader>
                <MDBCardBody>
                  {this.state.quizMessage}
                </MDBCardBody>
              </>
            }
            {stats === "forum" &&
              <>
                <MDBCardHeader>Forum</MDBCardHeader>
                <MDBCardBody>
                  {this.state.forumMessage}
                </MDBCardBody>
              </>
            }
            {stats === "attendance" &&
              <>
                <MDBCardHeader>Attendance</MDBCardHeader>
                <MDBCardBody>
                  {this.state.attendanceMessage}
                </MDBCardBody>
              </>
            }
          </MDBCard>
        </MDBCol>
      </MDBRow>
    )
  }

  renderCardSection = () => {
    var moduleId = this.props.dataStore.getCurrModId;
    const { classSize, lectureAttendance, bookedConsultations, totalConsultations, quizAttempts, forumContributions } = this.state;
    var attendancePercentage = lectureAttendance / classSize * 100
    var consultationsPercentage = bookedConsultations / totalConsultations * 100
    var quizPercentage = quizAttempts / classSize * 100
    var forumPercentage = forumContributions / classSize * 100
    return (
      <MDBRow className="mb-4">
        <MDBCol xl="3" md="6" className="mb-r">
          <MDBCard className="cascading-admin-card">
            <div className="admin-up">
              <a href={`/modules/${moduleId}/attendance`}><MDBIcon icon="calendar-check" className="primary-color" /></a>
              <div className="data">
                <p>ATTENDANCE</p>
                <h4>
                  <strong>{lectureAttendance}/{classSize}</strong>
                </h4>
              </div>
            </div>
            <MDBCardBody>
              <MDBProgress value={attendancePercentage} color="blue" />
              <MDBCardText>Attendance of Latest Lecture</MDBCardText>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol xl="3" md="6" className="mb-r">
          <MDBCard className="cascading-admin-card">
            <div className="admin-up">
              <a href={`/modules/${moduleId}/consultation`}><MDBIcon icon="calendar-alt" className="warning-color" /></a>
              <div className="data">
                <p>CONSULTATIONS</p>
                <h4>
                  <strong>{bookedConsultations}/{totalConsultations}</strong>
                </h4>
              </div>
            </div>
            <MDBCardBody>
              <MDBProgress value={consultationsPercentage} color="warning" />
              <MDBCardText>Booked Consultations</MDBCardText>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol xl="3" md="6" className="mb-r">
          <MDBCard className="cascading-admin-card">
            <div className="admin-up">
              <a href={`/modules/${moduleId}/quiz`}><MDBIcon icon="star" className="green lighten-1" /></a>
              <div className="data">
                <p>QUIZ</p>
                <h4>
                  <strong>{quizAttempts}/{classSize}</strong>
                </h4>
              </div>
            </div>
            <MDBCardBody>
              <MDBProgress value={quizPercentage} color="success" />
              <MDBCardText>Attempts for Latest Quiz</MDBCardText>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol xl="3" md="6" className="mb-r">
          <MDBCard className="cascading-admin-card">
            <div className="admin-up">
              <a href={`/modules/${moduleId}/forum/topics`}><MDBIcon icon="comments" className="red accent-2" /></a>
              <div className="data">
                <p>FORUM</p>
                <h4>
                  <strong>{forumContributions}/{classSize}</strong>
                </h4>
              </div>
            </div>
            <MDBCardBody>
              <MDBProgress value={forumPercentage} color="danger" />
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
        reversed: true,
        cursor: "pointer",
      },
      data: [
        {
          type: "stackedColumn",
          name: "Present",
          showInLegend: true,
          yValueFormatString: "0",
          dataPoints: this.state.presentData
        },
        {
          type: "stackedColumn",
          name: "Absent",
          showInLegend: true,
          yValueFormatString: "0",
          dataPoints: this.state.absentData
        }]
    }
    return (
      <MDBCol md="8" className="mb-4">
        <MDBCard className="mb-4">
          <MDBCardHeader>Attendance</MDBCardHeader>
          <MDBCardBody>
            <CanvasJSChart options={options}
              onRef={ref => this.chart = ref}
            />
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    )
  }

  renderForumPieChart = () => {
    var moduleId = this.props.dataStore.getCurrModId;
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
            <Pie data={dataPie} height={300} options={{ responsive: true, legend: { position: 'bottom' } }} />
          </MDBCardBody>
          <MDBBtn color="blue" onClick={() => this.routeChange(`/modules/${moduleId}/forum/topics`)}>Go To Forum</MDBBtn>
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

  renderUserPercentileTable = (tableData) => {
    return (
      <MDBCard>
        <MDBCardHeader>
          Students Below 25th Percentile
                </MDBCardHeader>
        <MDBCardBody>
          <MDBDataTable striped bordered hover scrollX scrollY maxHeight="400px" data={tableData} pagesAmount={4} />
        </MDBCardBody>
      </MDBCard>
    )
  }

  renderPercentileTableWithMessage = (message) => {
    const data = () => ({ columns: this.state.gradeColumns, rows: [{ label: message }] })

    const tableData = {
      columns: [...data().columns.map(col => {
        col.width = 200;
        return col;
      })], rows: [...data().rows]
    }
    return (
      <MDBCard>
        <MDBCardHeader>
          Students Below 25th Percentile
                </MDBCardHeader>
        <MDBCardBody>
          <MDBDataTable striped bordered hover scrollX scrollY maxHeight="400px" data={tableData} pagesAmount={4} />
        </MDBCardBody>
      </MDBCard>
    )
  }

  renderPercentileAwaiting = () => {
    return (
      <div className="spinner-border text-primary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    )
  }

  renderPercentileTable = () => {
    var newRows = []
    const row = this.state.gradeRows
    for (let i = 0; i < row.length; i++) {
      newRows.push({
        user: row[i].firstName + " " + row[i].lastName,
        email: row[i].email,
        button: <center><MDBBtn color="primary" outline size="sm" href={`mailto:${row[i].email}`}>SEND EMAIL</MDBBtn></center>
      })
    }
    const data = () => ({ columns: this.state.gradeColumns, rows: newRows })

    const widerData = {
      columns: [...data().columns.map(col => {
        col.width = 150;
        return col;
      })], rows: [...data().rows.map(row => {
        return row;
      })]
    }

    if (this.state.percentileStatus === "retrieving")
      return this.renderPercentileAwaiting();
    else if (this.state.percentileStatus === "error")
      return this.renderPercentileTableWithMessage("Error in Retrieving Data. Please try again later.");
    else if (this.state.percentileStatus === "done")
      return this.renderUserPercentileTable(widerData);
    else
      return this.renderPercentileTableWithMessage("No data found.");
  }

  render() {
    const optionsQuiz = {
      animationEnabled: true,
      exportEnabled: true,
      theme: "light2", // "light1", "light2", "dark1", "dark2"
      title: {
        text: "Quiz",
        fontSize: 25
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
        toolTipContent: "<span style=\"color:#6D78AD\">{label}:</span> <br><b>Maximum:</b> {y[3]},<br><b>Q3:</b> {y[2]},<br><b>Median:</b> {y[4]}<br><b>Q1:</b> {y[1]}<br><b>Minimum:</b> {y[0]}<br>Click to view quiz statistics.",
        yValueFormatString: "0.0",
        dataPoints: this.state.quizItems
      }]
    }
    const optionsGradebook = {
      animationEnabled: true,
      exportEnabled: true,
      theme: "light2", // "light1", "light2", "dark1", "dark2"
      title: {
        text: "Grade Item",
        fontSize: 25
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
        toolTipContent: "<span style=\"color:#6D78AD\">{label}:</span> <br><b>Maximum:</b> {y[3]},<br><b>Q3:</b> {y[2]},<br><b>Median:</b> {y[4]}<br><b>Q1:</b> {y[1]}<br><b>Minimum:</b> {y[0]}<br>Click to review grade entries for grade item.",
        yValueFormatString: "0.0",
        dataPoints: this.state.gradeItems
      }]
    }

    var moduleId = this.props.dataStore.getCurrModId;
    return (
      <div className={this.props.className}>
        <div className="module-sidebar-large"><ModuleSideNavigation moduleId={moduleId}></ModuleSideNavigation></div>
        <div className="module-navbar-small">
          <ModuleSideNavigationDropdown moduleId={moduleId} activeTab={'Analytics'}></ModuleSideNavigationDropdown>
        </div>
        <div className="module-content">
          <MDBEdgeHeader color="indigo darken-3" className="analyticsPage" />
          <MDBContainer style={{ paddingBottom: 240, paddingTop: 60 }}>
            {this.renderBreadcrumbSection()}
            {this.state.barStatus === "done" ? this.renderCardSection() : this.renderNoCardSection("bar")}
            <MDBRow>
              {this.state.attendanceStatus === "done" ? this.renderAttendanceBarChart() : this.renderNoCardSection("attendance")}
              {this.state.forumStatus === "done" ? this.renderForumPieChart() : this.renderNoCardSection("forum")}
            </MDBRow>
            {this.state.gradeItemStatus === "done" ? this.renderBoxPlot(optionsGradebook) : this.renderNoCardSection("gradeItem")}
            {this.state.quizStatus === "done" ? this.renderBoxPlot(optionsQuiz) : this.renderNoCardSection("quiz")}
            {this.state.percentileStatus === "done" && this.renderPercentileTable()}
            <br />
            <br />
          </MDBContainer>
        </div>
      </div>
    );
  }
}

export default styled(ModuleAnalyticsPage)`
.module-content{
    margin-top: 0px;
}
@media screen and (min-width: 800px) {
    .module-content{
        margin-left: 270px;
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
`
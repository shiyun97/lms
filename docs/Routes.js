import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { MDBContainer, MDBCol, MDBRow, MDBJumbotron } from "mdbreact";
import { observer, inject } from 'mobx-react';

// FREE
import NavigationNavPage from "./pages/NavigationNavPage";
import FormsNavPage from "./pages/FormsNavPage";
import TablesNavPage from "./pages/TablesNavPage";
import AddonsNavPage from "./pages/AddonsNavPage";
import ModalsNavPage from "./pages/ModalsNavPage";
import AdvancedNavPage from "./pages/AdvancedNavPage";
import ComponentsNavPage from "./pages/ComponentsNavPage";
import AnimationPage from "./pages/AnimationPage";
import AlertPage from "./pages/AlertPage";
import HomePage from "./pages/HomePage";
import ButtonPage from "./pages/ButtonPage";
import CSSNavPage from "./pages/CSSNavPage";
import TablePage from "./pages/TablePage";
import TableResponsivePage from "./pages/TableResponsivePage";
import TableScrollPage from "./pages/TableScrollPage";
import TableStylesPage from "./pages/TableStylesPage";
import BadgePage from "./pages/BadgePage";
import BreadcrumbPage from "./pages/BreadcrumbPage";
import FaPage from "./pages/FaPage";
import DatatablePage from "./pages/DatatablePage";
import DatatableApiPage from "./pages/DatatableApiPage";
import ModalPage from "./pages/ModalPage";
import ModalFormPage from "./pages/ModalFormPage";
import ModalExamplesPage from "./pages/ModalExamplesPage";
import ProgressPage from "./pages/ProgressPage";
import InputPage from "./pages/InputPage";
import MediaPage from "./pages/MediaPage";
import JumbotronPage from "./pages/JumbotronPage";
import CardsPage from "./pages/CardsPage";
import PaginationPage from "./pages/PaginationPage";
import PopoverPage from "./pages/PopoverPage";
import ListGroupPage from "./pages/ListGroupPage";
import CarouselPage from "./pages/CarouselPage";
import PanelPage from "./pages/PanelPage";
import CollapsePage from "./pages/CollapsePage";
import TooltipsPage from "./pages/TooltipsPage";
import FooterPage from "./pages/FooterPage";
import MasksPage from "./pages/MasksPage";
import DropdownPage from "./pages/DropdownPage";
import VideoCarouselPage from "./pages/VideoCarouselPage";
import HoverPage from "./pages/HoverPage";
import FormsPage from "./pages/FormsPage";
import ChartsPage from "./pages/ChartsPage";
import SearchPage from "./pages/SearchPage";
import ValidationPage from "./pages/ValidationPage";
import NavbarPage from "./pages/NavbarPage";
import IframePage from "./pages/IframePage";
import EdgeHeaderPage from "./pages/EdgeHeaderPage"
import SpinnerPage from './pages/SpinnerPage';
import MasonryPage from './pages/MasonryPage';
import ScrollBarPage from './pages/ScrollBarPage';
import NavsPage from './pages/NavsPage';
import TabsPage from './pages/TabsPage';
import PillsPage from './pages/PillsPage';
import NotificationPage from './pages/NotificationPage';
import InputGroupPage from './pages/InputGroupPage'
import TreeviewPage from './pages/TreeviewPage'
import AnalyticsPage from './pages/AnalyticsPage';

// LMS IMPORTS
import PublicLoginPage from './dev/Public/PublicLoginPage';
import RegisterPage from './dev/Public/RegisterPage';
import ModuleOverviewPage from './dev/ModuleOverviewPage';
import ModuleDetailsPage from './dev/ModuleDetailsPage';
import ModuleAnnouncementsPage from './dev/ModuleAnnouncementsPage';
import ModuleClassGroupsPage, { ClassGroupDetailsStyled, LectureGroupDetailsStyled, TutorialGroupDetailsStyled } from './dev/ModuleClassGroupsPage';
import ModuleFilesPage from './dev/ModuleFilesPage';
import ModuleForumPage from './dev/ModuleForumPage';
import ModuleForumDetailsPage from './dev/ModuleForumDetailsPage';
import ModuleGradebookPage from './dev/ModuleGradebookPage';
import ModuleQuizPage from './dev/ModuleQuizPage';
import ModuleMultimediaPage, { ModuleMultimediaDetailsPageStyled } from './dev/ModuleMultimediaPage';
import ModuleConsultationPage from './dev/ModuleConsultationPage';
import ModuleAttendancePage from './dev/ModuleAttendancePage';
import ModuleMarkAttendanceLecturePage from './dev/Student/ModuleMarkAttendanceLecturePage';
import ModuleMarkAttendanceTutorialPage from "./dev/Student/ModuleMarkAttendanceTutorialPage";
import ModuleFeedbackPage from './dev/ModuleFeedbackPage';
import ModuleFeedbackEvaluationPage from './dev/ModuleFeedbackEvaluationPage';
import DashboardPage from './dev/DashboardPage';
import ModulesPage from './dev/ModulesPage';
import UsersManagementPage from './dev/Admin/UsersManagementPage';
import UserProfilePage from "./dev/UserProfilePage";
import UnderMaintenancePage from "./dev/UnderMaintenancePage";
import AdminLoginPage from "./dev/Admin/AdminLoginPage";
import StudentLoginPage from "./dev/Student/StudentLoginPage";
import MobileLogin from "./dev/Student/MobileLogin";
import ModuleQuizPageCreateQuiz from './dev/Teacher/ModuleQuizPageCreateQuiz';
import ModuleQuizPageAnswerQuiz from "./dev/Student/ModuleQuizPageAnswerQuiz";
import ModuleForumTopicsPage from "./dev/ModuleForumTopicsPage";
import ModuleQuizPageViewStudents from "./dev/Teacher/ModuleQuizPageViewStudents";
import ModuleQuizPageViewStudentAttempt from "./dev/Teacher/ModuleQuizPageViewStudentAttempt";
import ModuleGradebookPageTeacherViewGrades from "./dev/Teacher/ModuleGradebookPageTeacherViewGrades";
import ModuleQuizPageEditQuiz from "./dev/Teacher/ModuleQuizPageEditQuiz";
import AccessDeniedPage from "./dev/AccessDeniedPage";
import DashboardPageAdmin from "./dev/Admin/DashboardPageAdmin";

//COURSEPACK IMPORTS
import CoursepackEnrolledCourses from './dev/CoursepackEnrolledCourses';
import CoursepackCreatePage from "./dev/Teacher/CoursepackCreatePage";
import CoursepackDashboardPage from './dev/CoursepackDashboardPage';
import CoursepackDetailsPage from './dev/CoursepackDetailsPage'
import CoursepackMultimediaPage from './dev/CoursepackMultimediaPage';
import CoursepackArrangementPage from "./dev/Teacher/CoursepackArrangementPage";
import CoursePackEditPage from "./dev/Teacher/CoursepackEditPage";
import CoursepackAssessmentPage from "./dev/CoursepackAssessmentPage";
import CoursepackFeedbackPage from "./dev/CoursepackFeedbackPage";
import CoursepackForumTopicsPage from "./dev/CoursepackForumTopicsPage";
import CoursepackForumPage from "./dev/CoursepackForumPage";
import CoursepackForumDetailsPage from "./dev/CoursepackForumDetailsPage";
import CoursepackQuizPage from './dev/CoursepackQuizPage';
import CoursepackQuizPageCreateQuiz from "./dev/Teacher/CoursepackQuizPageCreateQuiz";
import ModuleQuizPagePreviewQuiz from "./dev/Teacher/ModuleQuizPagePreviewQuiz";
import CoursepackQuizPagePreviewQuiz from "./dev/Teacher/CoursepackQuizPagePreviewQuiz";
import ModuleAnalyticsPage from "./dev/Teacher/ModuleAnalyticsPage";
import CoursepackCartPage from "./dev/CoursepackCartPage";
import CoursepackCheckoutPage from "./dev/CoursepackCheckoutPage";
import CoursepackCertificatesDetailsPage from "./dev/Admin/CoursepackCertificatesDetailsPage";
import CoursepackDashboardAdmin from "./dev/Admin/CoursepackDashboardAdmin";
import CoursepackQuizPageEditQuiz from "./dev/Teacher/CoursepackQuizPageEditQuiz";
import CoursepackViewAllPage from "./dev/CoursepackViewAllPage";
import CoursepackAchievementsPage from "./dev/CoursepackAchievementsPage";
import ModuleQuizPageViewStatistics from "./dev/Teacher/ModuleQuizPageViewStatistics";
import ModuleFeedbackPageViewStatistics from "./dev/Teacher/ModuleFeedbackPageViewStatistics";
import CoursepackAchievementsPageView from "./dev/CoursepackAchievementsPageView";

@inject('dataStore')
@observer
class Routes extends React.Component {

  render() {

    const PrivateRoute = ({ path: Path, component: Component, ...rest }) => (
      <Route {...rest} render={(props) => (
        this.props.dataStore.getSignInStatus === true
          ? <Component {...props} />
          :
          <>
            {this.props.dataStore.setPath(Path)}
            <Redirect to='/login' />
          </>
      )
      }
      />
    )

    const AdminPrivateRoute = ({ path: Path, component: Component, ...rest }) => (
      <Route {...rest} render={(props) => (
        this.props.dataStore.getSignInStatus === true
          ? <Component {...props} />
          :
          <>
            {this.props.dataStore.setPath(Path)}
            <Redirect to='/admin' />
          </>
      )
      }
      />
    )
    return (
      <Switch>
        <Route exact path="/accessdenied" component={AccessDeniedPage} />
        <Route exact path="/undermaintenance" component={UnderMaintenancePage} />
        <Route exact path="/account" component={UserProfilePage} />

        {/* LMS PAGES - Admin */}
        <Route exact path="/admin" component={AdminLoginPage} />
        <Route exact path="/coursepack/users" component={UsersManagementPage} />
        <Route exact path="/dashboard/active" component={DashboardPageAdmin} />
        <Route exact path="/dashboard/upcoming" component={DashboardPageAdmin} />
        <Route exact path="/dashboard/expired" component={DashboardPageAdmin} />

        {/* LMS PAGES - Teacher */}
        <Route exact path="/modules/:moduleId/quiz/create" component={ModuleQuizPageCreateQuiz} />
        <Route exact path="/modules/:moduleId/quiz/:quizId/edit" component={ModuleQuizPageEditQuiz} />
        <Route exact path="/coursepack/:coursepackId/arrangements" component={CoursepackArrangementPage} />
        <Route exact path="/coursepack/:coursepackId/edit" component={CoursePackEditPage} />
        <Route exact path="/coursepack/:coursepackId/assessments/" component={CoursepackAssessmentPage} />
        <Route exact path="/coursepack/create/" component={CoursepackCreatePage} />
        <Route exact path="/modules/:moduleId/quiz/:quizId/review" component={ModuleQuizPageViewStudents} />
        <Route exact path="/modules/:moduleId/quiz/:quizId/statistics" component={ModuleQuizPageViewStatistics} />
        <Route exact path="/modules/:moduleId/feedback/statistics" component={ModuleFeedbackPageViewStatistics} />
        <Route exact path="/modules/:moduleId/quiz/:quizId/review/:studentId" component={ModuleQuizPageViewStudentAttempt} />
        <Route exact path="/modules/:moduleId/gradebook/:gradeItemId/viewGrades" component={ModuleGradebookPageTeacherViewGrades} />
        <Route exact path="/coursepack/:coursepackId/quiz/create" component={CoursepackQuizPageCreateQuiz} />
        <Route exact path="/modules/:moduleId/quiz/:quizId/preview" component={ModuleQuizPagePreviewQuiz} />
        <Route exact path="/coursepack/:coursepackId/quiz/:quizId/preview" component={CoursepackQuizPagePreviewQuiz} />
        <Route exact path="/modules/:moduleId/analytics" component={ModuleAnalyticsPage} />

        {/* LMS PAGES - Student */}
        <Route exact path="/modules/:moduleId/quiz/:quizId" component={ModuleQuizPageAnswerQuiz} />
        <Route exact path="/student/markAttendance/lecture/:moduleId/:attendanceId/" component={ModuleMarkAttendanceLecturePage} />
        <Route exact path="/student/markAttendance/tutorial/:tutorialId/:attendanceId/" component={ModuleMarkAttendanceTutorialPage} />
        <Route exact path="/student/mobileLogin/:classType/:classId/:attendanceId" component={MobileLogin} />

        {/* LMS PAGES - Public Student */}
        <Route exact path="/coursepack/login" component={PublicLoginPage} />
        <Route exact path="/coursepack/register" component={RegisterPage} />
        <Route exact path="/coursepack/account" component={UserProfilePage} />
        <Route exact path="/coursepack/cart" component={CoursepackCartPage} />
        <Route exact path="/coursepack/cart/checkout" component={CoursepackCheckoutPage} />
        <Route exact path="/coursepack/:coursepackId/quiz/:quizId/edit" component={CoursepackQuizPageEditQuiz} />

        {/* LMS PAGES - Student/ Teacher */}
        <Route exact path="/" component={StudentLoginPage} />
        <Route exact path="/login" component={StudentLoginPage} />
        <Route exact path="/dashboard" component={DashboardPage} />
        <Route exact path="/modules" component={ModulesPage} />
        <Route exact path="/modules/:moduleId/" component={ModuleOverviewPage} />
        <Route exact path="/modules/:moduleId/moduleDetails" component={ModuleDetailsPage} />
        <Route exact path="/modules/:moduleId/announcements/" component={ModuleAnnouncementsPage} />
        <Route exact path="/modules/:moduleId/announcements/active" component={ModuleAnnouncementsPage} />
        <Route exact path="/modules/:moduleId/announcements/upcoming" component={ModuleAnnouncementsPage} />
        <Route exact path="/modules/:moduleId/announcements/expired" component={ModuleAnnouncementsPage} />
        <Route exact path="/modules/:moduleId/files" component={ModuleFilesPage} />
        <Route exact path="/modules/:moduleId/files/:folderId" component={ModuleFilesPage} />
        <Route exact path="/modules/:moduleId/students/" component={ModuleClassGroupsPage} />
        <Route exact path="/modules/:moduleId/students/student-roster" component={ModuleClassGroupsPage} />
        <Route exact path="/modules/:moduleId/students/class-groups" component={ModuleClassGroupsPage} />
        <Route exact path="/modules/:moduleId/students/class-groups/:classGroupId" component={ClassGroupDetailsStyled} />
        <Route exact path="/modules/:moduleId/students/lecture-groups" component={ModuleClassGroupsPage} />
        <Route exact path="/modules/:moduleId/students/lecture-groups/:lectureGroupId" component={LectureGroupDetailsStyled} />
        <Route exact path="/modules/:moduleId/students/tutorial-groups" component={ModuleClassGroupsPage} />
        <Route exact path="/modules/:moduleId/students/tutorial-groups/:tutorialGroupId" component={TutorialGroupDetailsStyled} />
        <Route exact path="/modules/:moduleId/forum/topics" component={ModuleForumTopicsPage} />
        <Route exact path="/modules/:moduleId/forum/topics/:topicId" component={ModuleForumPage} />
        <Route exact path="/modules/:moduleId/forum/topics/:topicId/:forumId" component={ModuleForumDetailsPage} />
        <Route exact path="/modules/:moduleId/gradebook" component={ModuleGradebookPage} />
        <Route exact path="/modules/:moduleId/quiz" component={ModuleQuizPage} />
        <Route exact path="/modules/:moduleId/multimedia" component={ModuleMultimediaPage} />
        <Route exact path="/modules/:moduleId/multimedia/:multimediaId" component={ModuleMultimediaDetailsPageStyled} />
        <Route exact path="/modules/:moduleId/consultation" component={ModuleConsultationPage} />
        <Route exact path="/modules/:moduleId/attendance" component={ModuleAttendancePage} />
        <Route exact path="/modules/:moduleId/feedback" component={ModuleFeedbackPage} />
        <Route exact path="/modules/:moduleId/feedback/evaluation" component={ModuleFeedbackEvaluationPage} />
        <Route exact path="/coursepack/myCourses" component={CoursepackEnrolledCourses} />
        <Route exact path="/coursepack/dashboard" component={CoursepackDashboardPage} />
        <Route exact path="/coursepack/:coursepackId/" component={CoursepackDetailsPage} />
        <Route exact path="/coursepack/:coursepackId/multimedia" component={CoursepackMultimediaPage} />
        <Route exact path="/coursepack/:coursepackId/forum/topics" component={CoursepackForumTopicsPage} />
        <Route exact path="/coursepack/:coursepackId/forum/topics/:topicId" component={CoursepackForumPage} />
        <Route exact path="/coursepack/:coursepackId/forum/topics/:topicId/:forumId" component={CoursepackForumDetailsPage} />
        <Route exact path="/coursepack/:coursepackId/feedback" component={CoursepackFeedbackPage} />
        <Route exact path="/coursepack/:coursepackId/quiz" component={CoursepackQuizPage} />
        <Route exact path="/coursepack/achievements/certificates/:certId" component={CoursepackCertificatesDetailsPage} />
        <Route exact path="/coursepack/dashboard/admin/" component={CoursepackDashboardAdmin} />
        <Route exact path="/coursepacks" component={CoursepackViewAllPage} />
        <Route exact path="/coursepacks/:categoryId" component={CoursepackViewAllPage} />
        <Route exact path="/coursepack/achievements/view/certificates" component={CoursepackAchievementsPage} />
        <Route exact path="/coursepack/achievements/view/badges" component={CoursepackAchievementsPage} />
        <Route exact path="/coursepack/achievements/certificates/view/:certId" component={CoursepackAchievementsPageView} />

        {/* FREE Templates */}
        <Route exact path="/home" component={HomePage} />
        <Route exact path="/analytics" component={AnalyticsPage} />
        <Route exact path="/addons" component={AddonsNavPage} />
        <Route exact path="/advanced" component={AdvancedNavPage} />
        <Route exact path="/components" component={ComponentsNavPage} />
        <Route exact path="/css" component={CSSNavPage} />
        <Route exact path="/forms" component={FormsNavPage} />
        <Route exact path="/modals" component={ModalsNavPage} />
        <Route exact path="/navigation" component={NavigationNavPage} />
        <Route exact path="/tables" component={TablesNavPage} />
        <Route path="/addons/iframe" component={IframePage} />
        <Route path="/addons/edge-header" component={EdgeHeaderPage} />
        <Route path="/addons/notifications" component={NotificationPage} />
        <Route path="/addons/treeview" component={TreeviewPage} />
        <Route path="/advanced/carousel" component={CarouselPage} />
        <Route path="/advanced/collapse" component={CollapsePage} />
        <Route path="/advanced/videocarousel" component={VideoCarouselPage} />
        <Route path="/advanced/videocarousel" component={VideoCarouselPage} />
        <Route path="/advanced/alerts" component={AlertPage} />
        <Route path="/advanced/popover" component={PopoverPage} />
        <Route path="/advanced/tooltips" component={TooltipsPage} />
        <Route path="/advanced/charts" component={ChartsPage} />
        <Route path="/advanced/scrollbar" component={ScrollBarPage} />
        <Route path="/css/animations" component={AnimationPage} />
        <Route path="/css/icons" component={FaPage} />
        <Route path="/css/jumbotron" component={JumbotronPage} />
        <Route path="/css/masks" component={MasksPage} />
        <Route path="/css/hover" component={HoverPage} />
        <Route path="/css/masonry" component={MasonryPage} />
        <Route path="/components/media" component={MediaPage} />
        <Route path="/components/badge" component={BadgePage} />
        <Route path="/components/cards" component={CardsPage} />
        <Route path="/components/buttons" component={ButtonPage} />
        <Route path="/components/dropdown" component={DropdownPage} />
        <Route path="/components/progress" component={ProgressPage} />
        <Route path="/components/pagination" component={PaginationPage} />
        <Route path="/components/list-group" component={ListGroupPage} />
        <Route path="/components/panels" component={PanelPage} />
        <Route path="/components/search" component={SearchPage} />
        <Route path="/components/spinner" component={SpinnerPage} />
        <Route path="/components/tabs" component={TabsPage} />
        <Route path="/components/pills" component={PillsPage} />
        <Route path="/forms/forms" component={FormsPage} />
        <Route path="/forms/validation" component={ValidationPage} />
        <Route path="/forms/input" component={InputPage} />
        <Route path="/forms/inputgroup" component={InputGroupPage} />
        <Route path="/modals/modal" component={ModalPage} />
        <Route path="/modals/modal-form" component={ModalFormPage} />
        <Route path="/modals/modal-examples" component={ModalExamplesPage} />
        <Route path="/navigation/navbar" component={NavbarPage} />
        <Route path="/navigation/breadcrumb" component={BreadcrumbPage} />
        <Route path="/navigation/navs" component={NavsPage} />
        <Route path="/navigation/footer" component={FooterPage} />
        <Route path="/tables/table" component={TablePage} />
        <Route path="/tables/table-responsive" component={TableResponsivePage} />
        <Route path="/tables/table-scroll" component={TableScrollPage} />
        <Route path="/tables/table-styles" component={TableStylesPage} />
        <Route path="/tables/datatable-api" component={DatatableApiPage} />
        <Route path="/tables/datatable" component={DatatablePage} />

        <Route
          render={function () {
            return (
              <MDBContainer style={{ paddingTop: 50, paddingBottom: 50 }} align="center">
                <MDBRow>
                  <MDBCol md="12" className="mt-3 mx-auto">
                    <MDBJumbotron>
                      <img src="https://image.freepik.com/free-vector/design-404-error-page-is-lost-found-message-template-web-page-with-404-error-modern-line-design_6280-165.jpg" width="50%" />
                    </MDBJumbotron>
                  </MDBCol>
                </MDBRow>
              </MDBContainer>
            )
          }}
        />
      </Switch>
    );
  }
}

export default Routes;

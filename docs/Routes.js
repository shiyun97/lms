import React from "react";
import { Route, Switch } from "react-router-dom";
import { MDBIcon } from 'mdbreact';

import NavigationNavPage from "./pages/NavigationNavPage";
import FormsNavPage from "./pages/FormsNavPage";
import TablesNavPage from "./pages/TablesNavPage";
import AddonsNavPage from "./pages/AddonsNavPage";
import ModalsNavPage from "./pages/ModalsNavPage";
import AdvancedNavPage from "./pages/AdvancedNavPage";
import ComponentsNavPage from "./pages/ComponentsNavPage";

// FREE
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
import LoginPage from './dev/LoginPage';
import RegisterPage from './dev/RegisterPage';
import ModuleOverviewPage from './dev/ModuleOverviewPage';
import ModuleDetailsPage from './dev/ModuleDetailsPage';
import ModuleAnnouncementsPage from './dev/ModuleAnnouncementsPage';
import ModuleClassGroupsPage from './dev/ModuleClassGroupsPage';
import ModuleFilesPage from './dev/ModuleFilesPage';
import ModuleForumPage from './dev/ModuleForumPage';
import ModuleGradebookPage from './dev/ModuleGradebookPage';
import ModuleQuizPage from './dev/ModuleQuizPage';
import ModuleMultimediaPage from './dev/ModuleMultimediaPage';
import ModuleConsultationPage from './dev/ModuleConsultationPage';
import DashboardPage from './dev/DashboardPage';
import ModulesPage from './dev/ModulesPage';

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/analytics" component={AnalyticsPage} />
        <Route exact path="/addons" component={AddonsNavPage} />
        <Route exact path="/advanced" component={AdvancedNavPage} />
        <Route exact path="/components" component={ComponentsNavPage} />
        <Route exact path="/css" component={CSSNavPage} />
        <Route exact path="/forms" component={FormsNavPage} />
        <Route exact path="/modals" component={ModalsNavPage} />
        <Route exact path="/navigation" component={NavigationNavPage} />
        <Route exact path="/tables" component={TablesNavPage} />

        {/* LMS PAGES */}
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/dashboard" component={DashboardPage} />
        <Route exact path="/modules" component={ModulesPage} />
        <Route exact path="/modules/:moduleId/" component={ModuleOverviewPage} />
        <Route exact path="/modules/:moduleId/moduleDetails" component={ModuleDetailsPage} />
        <Route exact path="/modules/:moduleId/announcements" component={ModuleAnnouncementsPage} />
        <Route exact path="/modules/:moduleId/files" component={ModuleFilesPage} />
        <Route exact path="/modules/:moduleId/files/:folderId" component={ModuleFilesPage} />
        <Route exact path="/modules/:moduleId/class-groups" component={ModuleClassGroupsPage} />
        <Route exact path="/modules/:moduleId/forum" component={ModuleForumPage} />
        <Route exact path="/modules/:moduleId/gradebook" component={ModuleGradebookPage} />
        <Route exact path="/modules/:moduleId/quiz" component={ModuleQuizPage} />
        <Route exact path="/modules/:moduleId/multimedia" component={ModuleMultimediaPage} />
        <Route exact path="/modules/:moduleId/consultation" component={ModuleConsultationPage} />

        {/* FREE Templates */}
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
              <center>
                <h1 style={{ paddingTop: 100 }}>
                  <MDBIcon icon="exclamation-triangle" />
                  <br />
                  404 <br />
                  Page Not Found
                  </h1>
              </center>
            )
          }}
        />
      </Switch>
    );
  }
}

export default Routes;

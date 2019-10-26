import React, { Component } from "react";
import styled from 'styled-components';
import { observer, inject } from 'mobx-react';
import AccessDeniedPage from './AccessDeniedPage';
import ModuleAnnouncementsPageStudent from './Student/ModuleAnnouncementsPageStudent';
import ModuleAnnouncementsPageTeacher from './Teacher/ModuleAnnouncementsPageTeacher';

@inject('dataStore')
@observer
class ModuleAnnouncementsPage extends Component {

    state = {
    }

    componentDidMount() {
        this.initPage();
    }

    initPage() {
        let moduleId = this.props.match.params.moduleId;
        if (moduleId) {
            // console.log(moduleId);
            this.props.dataStore.setCurrModId(moduleId)

            let url = this.props.match.url;
            let active = url.split("/").pop();
            if (active == "announcements") active = "active";
            this.setState({
                activeItem: active,
                moduleId: moduleId
            })
        }
    }

    render() {
        console.log(this.props.dataStore.accessRight)
        if (this.props.dataStore.accessRight === "Teacher")
            return <ModuleAnnouncementsPageTeacher />;
        else if (this.props.dataStore.accessRight === "Student")
            return <ModuleAnnouncementsPageStudent />;
        else
            return <AccessDeniedPage />;
    }
}

export default styled(ModuleAnnouncementsPage)`
.module-content{
    margin-top: 40px;
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
.edit-button{
    border: none;
    background-color: transparent;
}
.align-right{
    float: right;
}
.new-paragraph{
    margin-top: 0;
    margin-bottom: 1rem;
}
`;
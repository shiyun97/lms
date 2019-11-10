import React, { Component } from "react";
import styled from 'styled-components';
import { observer, inject } from 'mobx-react';
import AccessDeniedPage from "./AccessDeniedPage";
import ModuleGradebookPageTeacher from "./Teacher/ModuleGradebookPageTeacher";
import ModuleGradebookPageStudent from "./Student/ModuleGradebookPageStudent";

@inject('dataStore')
@observer
class ModuleGradebookPage extends Component {

    state = {
        moduleId: 0,
        status: "retrieving",
    }

    componentDidMount() {
        this.initPage();
    }

    initPage() {
        let moduleId = this.props.match.params.moduleId;
        if (moduleId) {
            // console.log(moduleId);
            // retrieve module & set state
            this.setState({ moduleId: moduleId })
            this.props.dataStore.setCurrModId(moduleId);
        }
    }

    render() {
        if (this.props.dataStore.getAccessRight === "Student")
            return <ModuleGradebookPageStudent history={this.props.history}/>;
        else if (this.props.dataStore.getAccessRight === "Teacher")
            return <ModuleGradebookPageTeacher history={this.props.history} />;
        else
            return <AccessDeniedPage />;
    }
}
export default styled(ModuleGradebookPage)`
.module-content{
    margin-left: 270px;
    margin-top: 40px;
}
.align-right{
    float: right;
}
`;

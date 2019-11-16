import React, { Component } from 'react';
import { MDBListGroup, MDBListGroupItem, MDBIcon } from 'mdbreact';
import { NavLink } from 'react-router-dom';
import { observer, inject } from 'mobx-react';

@inject('dataStore')
@observer
class CoursepackSideNavigation extends Component {

    componentDidMount() {
        var pathname = location.pathname;
        pathname = pathname.split("/");
        // console.log(pathname[2])
        this.props.dataStore.setCurrCoursepackId(pathname[2]);
    }

    render() {
        var courseId = this.props.dataStore.getCurrCoursepackId;
        return (
            <div className="sidebar-module-fixed position-fixed" style={{ paddingTop: 150, backgroundColor: "#F5F5F5" }}>

                <MDBListGroup className="list-group-flush">
                    <NavLink exact={true} to={`/coursepack/${courseId}`} activeClassName="activeClass-coursepack" style={{ color: "#fb6d63" }}>
                        <MDBListGroupItem style={{ backgroundColor: "#F5F5F5" }}>
                            <MDBIcon far icon="eye" className="mr-3 fa-fw" />
                            Preview
                        </MDBListGroupItem>
                    </NavLink>
                    <NavLink to={`/coursepack/${courseId}/edit`} activeClassName="activeClass-coursepack" style={{ color: "#fb6d63" }}>
                        <MDBListGroupItem style={{ backgroundColor: "#F5F5F5" }}>
                            <MDBIcon icon="edit" className="mr-3 fa-fw" />
                            Manage Course
                        </MDBListGroupItem>
                    </NavLink>
                    <NavLink to={`/coursepack/${courseId}/multimedia`} activeClassName="activeClass-coursepack" style={{ color: "#fb6d63" }}>
                        <MDBListGroupItem style={{ backgroundColor: "#F5F5F5" }}>
                            <MDBIcon icon="video" className="mr-3 fa-fw" />
                            Multimedia
                        </MDBListGroupItem>
                    </NavLink>
                    <NavLink to={`/coursepack/${courseId}/quiz`} activeClassName="activeClass-coursepack" style={{ color: "#fb6d63" }}>
                        <MDBListGroupItem style={{ backgroundColor: "#F5F5F5" }}>
                            <MDBIcon icon="star" className="mr-3 fa-fw" />
                            Quizzes
                        </MDBListGroupItem>
                    </NavLink>
                    <NavLink to={`/coursepack/${courseId}/arrangements`} activeClassName="activeClass-coursepack" style={{ color: "#fb6d63" }}>
                        <MDBListGroupItem style={{ backgroundColor: "#F5F5F5" }}>
                            <MDBIcon icon="layer-group" className="mr-3 fa-fw" />
                            Arrangements
                        </MDBListGroupItem>
                    </NavLink>
                    <NavLink to={`/coursepack/${courseId}/feedback`} activeClassName="activeClass-coursepack" style={{ color: "#fb6d63" }}>
                        <MDBListGroupItem style={{ backgroundColor: "#F5F5F5" }}>
                            <MDBIcon icon="comment-alt" className="mr-3 fa-fw" />
                            Feedbacks
                        </MDBListGroupItem>
                    </NavLink>
                    <NavLink to={`/coursepack/${courseId}/forum/topics`} activeClassName="activeClass-coursepack" style={{ color: "#fb6d63" }}>
                        <MDBListGroupItem style={{ backgroundColor: "#F5F5F5" }}>
                            <MDBIcon icon="comments" className="mr-3 fa-fw" />
                            Forum
                        </MDBListGroupItem>
                    </NavLink>
                    <NavLink to={`/coursepack/${courseId}/analytics`} activeClassName="activeClass-coursepack" style={{ color: "#fb6d63" }}>
                        <MDBListGroupItem style={{ backgroundColor: "#F5F5F5" }}>
                            <MDBIcon icon="chart-line" className="mr-3 fa-fw" />
                            Analytics
                        </MDBListGroupItem>
                    </NavLink>
                </MDBListGroup>

            </div>
        );
    }

}

export default CoursepackSideNavigation;
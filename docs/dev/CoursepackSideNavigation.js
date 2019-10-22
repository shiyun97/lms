import React, { Component } from 'react';
import { MDBListGroup, MDBListGroupItem, MDBIcon } from 'mdbreact';
import { NavLink } from 'react-router-dom';

class CoursepackSideNavigation extends Component {

    render() {
        let courseId = this.props.courseId;
        return (
            <div className="sidebar-module-fixed position-fixed" style={{ paddingTop: 150 }}>

                <MDBListGroup className="list-group-flush">
                    <NavLink exact={true} to={`/coursepack/${courseId}`} activeClassName="activeClass">
                        <MDBListGroupItem>
                            <MDBIcon far icon="eye" className="mr-3 fa-fw" />
                            Preview
                        </MDBListGroupItem>
                    </NavLink>
                    <NavLink to={`/coursepack/${courseId}/edit`} activeClassName="activeClass">
                        <MDBListGroupItem>
                            <MDBIcon icon="edit" className="mr-3 fa-fw" />
                            Manage Course
                        </MDBListGroupItem>
                    </NavLink>
                    <NavLink to={`/coursepack/${courseId}/multimedia`} activeClassName="activeClass">
                        <MDBListGroupItem>
                            <MDBIcon icon="video" className="mr-3 fa-fw" />
                            Multimedia
                        </MDBListGroupItem>
                    </NavLink>
                    <NavLink /* to={`/modules/${moduleId}/announcements`} */ activeClassName="activeClass">
                        <MDBListGroupItem>
                            <MDBIcon icon="star" className="mr-3 fa-fw" />
                            Quizzes
                        </MDBListGroupItem>
                    </NavLink>
                    <NavLink to={`/coursepack/${courseId}/arrangements`}  activeClassName="activeClass">
                        <MDBListGroupItem>
                            <MDBIcon icon="layer-group" className="mr-3 fa-fw" />
                            Arrangements
                        </MDBListGroupItem>
                    </NavLink>
                    <NavLink to={`/coursepack/${courseId}/feedback`} activeClassName="activeClass">
                        <MDBListGroupItem>
                            <MDBIcon icon="comment-alt" className="mr-3 fa-fw" />
                            Feedbacks
                        </MDBListGroupItem>
                    </NavLink>
                    <NavLink to={`/coursepack/${courseId}/forum/topics`} activeClassName="activeClass">
                        <MDBListGroupItem>
                            <MDBIcon icon="comment-alt" className="mr-3 fa-fw" />
                            Forum
                        </MDBListGroupItem>
                    </NavLink>
                </MDBListGroup>

            </div>
        );
    }

}

export default CoursepackSideNavigation;
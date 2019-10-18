import React, { Component } from 'react';
import { MDBListGroup, MDBListGroupItem, MDBIcon } from 'mdbreact';
import { NavLink } from 'react-router-dom';

class CoursepackSideNavigation extends Component {

    /*     clickLink = () => {
            var a = document.createElement('a');
            a.href = `/modules/${this.props.moduleId}/files`;
            a.click();
            return;
        } */

    render() {
        let courseId = this.props.courseId;
        return (
            <div className="sidebar-module-fixed position-fixed" style={{ paddingTop: 150 }}>

                <MDBListGroup className="list-group-flush">
                    <NavLink /* exact={true} to={`/modules/${moduleId}/`} */ activeClassName="activeClass">
                        <MDBListGroupItem>
                            <MDBIcon far icon="eye" className="mr-3 fa-fw" />
                            Preview
                        </MDBListGroupItem>
                    </NavLink>
                    <NavLink /* to={`/modules/${moduleId}/moduleDetails`} */ activeClassName="activeClass">
                        <MDBListGroupItem>
                            <MDBIcon icon="book-open" className="mr-3 fa-fw" />
                            Course Information
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
                    <NavLink /* to={`/modules/${moduleId}/forum`}  */ activeClassName="activeClass">
                        <MDBListGroupItem>
                            <MDBIcon icon="layer-group" className="mr-3 fa-fw" />
                            Arrangements
                        </MDBListGroupItem>
                    </NavLink>
                    <NavLink /* to={`/modules/${moduleId}/gradebook`} */ activeClassName="activeClass">
                        <MDBListGroupItem>
                            <MDBIcon icon="comment-alt" className="mr-3 fa-fw" />
                            Feedbacks
                        </MDBListGroupItem>
                    </NavLink>
                </MDBListGroup>

            </div>
        );
    }

}

export default CoursepackSideNavigation;
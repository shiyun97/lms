import React, { Component } from "react";
import axios from "axios";
import { MDBNavbar, MDBNavbarBrand, MDBNavbarToggler, MDBNavbarNav, MDBNavLink, MDBCollapse, MDBNavItem } from "mdbreact";

const API = "http://localhost:3001"

class CoursepackTopNav extends Component {

    state={
        category: ""
    }

    componentDidMount() {
    
        axios.get(`${API}/category`)
          .then(result => {
            this.setState({ category: result.data })
            console.log(result.data)
          })
          .catch(error => {
            console.error("error in axios " + error);
          });
      }

    render() {
        return (
            <MDBNavbar style={{ background: '#F1948A' }} dark expand="md" scrolling fixed="top">
                <MDBNavbarBrand href="/coursepack/dashboard" style={{ paddingLeft: 80 }}>
                    <strong>Coursepack</strong>
                </MDBNavbarBrand>
                <MDBNavbarToggler onClick={this.onClick} />
                <MDBCollapse isOpen={this.state.collapse} navbar>
                    <MDBNavbarNav center>
                        {this.state.category && this.state.category.map((category, index) => {
                            
                            return (
                                <MDBNavItem key={index}>
                                    <MDBNavLink to={`/coursepack/${category}/list`}>{category}</MDBNavLink>
                                </MDBNavItem>
                            )
                        })}
                    </MDBNavbarNav>
                </MDBCollapse>
            </MDBNavbar>

        )
    }
}

export default CoursepackTopNav
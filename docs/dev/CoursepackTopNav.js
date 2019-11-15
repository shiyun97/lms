import React, { Component } from "react";
import axios from "axios";
import { observer, inject } from 'mobx-react';
import { withRouter } from "react-router-dom";
import {
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarToggler,
    MDBNavbarNav,
    MDBNav,
    MDBNavLink,
    MDBCollapse,
    MDBNavItem
} from "mdbreact";
import Badge from '@material-ui/core/Badge';
import Tooltip from '@material-ui/core/Tooltip';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import styled from 'styled-components';

const API = "http://localhost:8080/LMS-war/webresources/Coursepack"

@inject('dataStore')
@observer
class CoursepackTopNav extends Component {

    state = {
        collapseID: "",
        categories: []
    }

    componentDidMount() {

        axios.get(`${API}/getAllCategories`)
            .then(result => {
                this.setState({ categories: result.data.categories })
                console.log(result.data)
            })
            .catch(error => {
                console.error("error in axios " + error);
            });
    }

    toggleCollapse = collapseID => () =>
        this.setState(prevState => ({
            collapseID: prevState.collapseID !== collapseID ? collapseID : ""
        }));

    closeCollapse = collapseID => () => {
        window.scrollTo(0, 0);
        this.state.collapseID === collapseID && this.setState({ collapseID: "" });
    };

    goToCart = () => {
        this.props.dataStore.setPath('/coursepack/cart');
        this.props.history.push('/coursepack/cart');
    }

    goToCategory = (id) => {
        this.props.dataStore.setPath('/coursepacks/' + id);
        this.props.history.push('/coursepacks/' + id);
    }

    updatePath = (path) => {
        this.props.dataStore.setPath(path);
    }

    logOutUser = () => {
        this.props.dataStore.setSignOutStatus();
    }

    render() {
        let itemsInCart = 0;
        let cart = sessionStorage.getItem("cart");
        if (cart != null && cart != undefined) {
            let cartObjs = JSON.parse(cart)
            itemsInCart = cartObjs.length;
        }

        const overlay = (
            <div
                id="sidenav-overlay"
                style={{ backgroundColor: "transparent" }}
                onClick={this.toggleCollapse("mainNavbarCollapse")}
            />
        );
        const { collapseID } = this.state;
        let categories = this.state.categories;
        return (
            <div className={this.props.className}>
                <MDBNavbar style={{ background: "#fb6d63"}} dark expand="md" fixed="top">
                    <MDBNavbarBrand href="/coursepack/dashboard" className="Navbar-coursepack-title">
                        <strong>Coursepack</strong>
                    </MDBNavbarBrand>
                    <MDBNavbarToggler onClick={this.toggleCollapse("mainNavbarCollapse")} />
                    <MDBCollapse id="mainNavbarCollapse" isOpen={this.state.collapseID} navbar>
                        {/*<MDBNavbarNav left>
                            <MDBNavItem>
                                <MDBDropdown>
                                    <MDBDropdownToggle nav>
                                        <MDBIcon icon="th" size="lg" className="mr-2" />
                                        Categories
                                    </MDBDropdownToggle>
                                    <MDBDropdownMenu>
                                        {categories.length > 0 && categories.map((category, index) => {
                                            return (
                                                <MDBDropdownItem href={`/coursepacks/${category.categoryId}`} onClick={e => this.goToCategory(category.categoryId)}>{category.name}</MDBDropdownItem>

                                            )
                                        })}
                                    </MDBDropdownMenu>
                                </MDBDropdown>
                            </MDBNavItem>
                            {/*
                            <MDBNavItem>
                                <input type="text" id="searchCoursepack" className="form-control" placeholder="Search" />
                                <IconButton aria-label="search">
                                    <SearchIcon /> 
                                </IconButton>
                            </MDBNavItem>
                            <MDBNavItem>
                                <Paper styles={{padding: '2px 4px', display: 'flex', alignItems: 'center', width: 400}}>
                                    <InputBase
                                        style={{flex: 1}}
                                        placeholder="Search"
                                        inputProps={{ 'aria-label': 'search google maps' }}
                                    />
                                    <IconButton aria-label="search">
                                        <SearchIcon />
                                    </IconButton>
                                </Paper>
                            </MDBNavItem>
                            </MDBNavbarNav>*/}
                        <MDBNavbarNav right>
                            <div className="show-main-nav">
                                {(this.props.dataStore.accessRight !== "Admin" && this.props.dataStore.accessRight !== "Teacher") &&
                                    <MDBNavItem>
                                        <MDBNavLink exact={true} to={`/coursepack/dashboard`} onClick={() => this.updatePath("/coursepack/dashboard")}>
                                            Dashboard
                                            </MDBNavLink>
                                    </MDBNavItem>
                                }
                                
                            </div>
                            {
                                sessionStorage.getItem("accessRight") === "Public" &&
                                <MDBNavItem active={false}>
                                    {
                                        this.props.cartNum > 0 && <MDBNavLink exact to="/coursepack/cart" >
                                            <Tooltip title="Cart">
                                                <span className="mr-2">
                                                    <Badge badgeContent={itemsInCart} color="secondary">
                                                        <ShoppingCartIcon style={{ color: "white" }} aria-label="add" />
                                                    </Badge>
                                                    <span className="show-cart-word ml-3">Cart</span>
                                                </span>
                                            </Tooltip></MDBNavLink>
                                    }
                                    {
                                        this.props.cartNum == 0 && <MDBNavLink exact to="/coursepack/cart" onClick={this.closeCollapse("mainNavbarCollapse")}>
                                            <Tooltip title="Empty Cart!">
                                                <span className="mr-2">
                                                    <ShoppingCartIcon style={{ color: "white" }} aria-label="add" />
                                                    <span className="show-cart-word ml-2">Cart</span>
                                                </span>
                                            </Tooltip></MDBNavLink>
                                    }
                                </MDBNavItem>
                            }
                            <div className="show-main-nav">
                            {(this.props.dataStore.accessRight !== "Admin" && this.props.dataStore.accessRight !== "Public") &&
                                    <MDBNavItem>
                                        <MDBNavLink exact={true} to={`/modules`} onClick={() => this.updatePath("/modules")}>
                                            Module
                                            </MDBNavLink>
                                    </MDBNavItem>
                                }
                                {this.props.dataStore.accessRight !== "Admin" &&
                                    <MDBNavItem>
                                        <MDBNavLink exact={true} to={`/coursepack/myCourses`} onClick={() => this.updatePath("/coursepack/myCourses")}>
                                            My Coursepacks
                                            </MDBNavLink>
                                    </MDBNavItem>
                                }
                                {(this.props.dataStore.accessRight !== "Admin" && this.props.dataStore.accessRight !== "Teacher") &&
                                    <MDBNavItem>
                                        <MDBNavLink exact={true} to={`/coursepack/achievements/view/badges`} onClick={() => this.updatePath("/coursepack/achievements/view/badges")}>
                                            My Achievements
                                            </MDBNavLink>
                                    </MDBNavItem>
                                }
                                {this.props.dataStore.accessRight === "Admin" &&
                                    <MDBNavItem>
                                        <MDBNavLink exact={true} to={`/coursepack/dashboard/admin`} onClick={() => this.updatePath("/coursepack/dashboard/admin")}>
                                            Achievements
                                            </MDBNavLink>
                                    </MDBNavItem>
                                }
                                {(this.props.dataStore.accessRight === "Admin" &&
                                    <MDBNavItem>
                                        <MDBNavLink exact={true} to={`/dashboard`} onClick={() => this.updatePath("/dashboard")}>
                                            LMP
                                            </MDBNavLink>
                                    </MDBNavItem>
                                )}
                                {this.props.dataStore.accessRight === "Admin" &&
                                    <MDBNavItem>
                                        <MDBNavLink exact={true} to={`/coursepack/users`} onClick={() => this.updatePath("/coursepack/users")}>
                                            Public Users
                                            </MDBNavLink>
                                    </MDBNavItem>
                                }
                                <MDBNavItem>
                                    <MDBNavLink exact={true} to={`/coursepack/account`} onClick={() => this.updatePath("/coursepack/account")}>
                                        Account
                                            </MDBNavLink>
                                </MDBNavItem>
                                <MDBNavItem>
                                    <MDBNavLink exact={true} onClick={() => this.logOutUser()} to="/coursepack/login">
                                        Logout
                                    </MDBNavLink>
                                </MDBNavItem>
                            </div>
                        </MDBNavbarNav>
                    </MDBCollapse>
                </MDBNavbar>
                {collapseID && overlay}
                {/*<MDBNav right>
                    {this.state.category && this.state.category.map((category, index) => {
                        return (
                            <MDBNavLink to={`/coursepack/${category}/list`}>{category}</MDBNavLink>
                        )
                    })}
                </MDBNav>*/}
            </div>
        )
    }
}

export class CategoryTopNav extends Component {

    state = {
        category: ["Category 1", "Category 2", "Category 3"]
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
            <div>
                <MDBNav style={{ marginTop: '16px' }} dark expand="lg" fixed="top" className="justify-content-center">
                        {this.state.category && this.state.category.map((category, index) => {
                            return (
                                <MDBNavItem><MDBNavLink to={`/coursepack/${category}/list`}>{category}</MDBNavLink></MDBNavItem>
                            )
                        })}
                </MDBNav>
            </div>
        )
    }
}

export default styled(withRouter(CoursepackTopNav))`
@media screen and (min-width: 800px) {
    .Navbar-coursepack-title {
        padding-left: 80px;
    }

    .show-cart-word {
        display: none;
    }

    .show-main-nav {
        display: none;
    }
}
`;
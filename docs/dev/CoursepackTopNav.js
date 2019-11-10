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
    MDBNavItem,
    MDBIcon,
    MDBDropdown,
    MDBDropdownMenu,
    MDBDropdownItem,
    MDBDropdownToggle,
    MDBBtn,
    NavbarNav,
    MDBInput, 
    MDBRow
} from "mdbreact";
import Badge from '@material-ui/core/Badge';
import Tooltip from '@material-ui/core/Tooltip';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

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
            <div>
                <MDBNavbar style={{ background: '#F1948A' }} dark expand="md" fixed="top">
                    <MDBNavbarBrand href="/coursepack/dashboard" style={{ paddingLeft: 80 }}>
                        <strong>Coursepack</strong>
                    </MDBNavbarBrand>
                    <MDBNavbarToggler onClick={this.toggleCollapse("mainNavbarCollapse")} />
                    <MDBCollapse isOpen={this.state.collapseID} navbar>
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
                        {
                            sessionStorage.getItem("accessRight") === "Public" &&
                            <NavbarNav right>
                                <MDBNavItem>
                                    {
                                        this.props.cartNum > 0 &&
                                        <Tooltip title="Cart">
                                            <span className="mr-2">
                                                <Badge badgeContent={itemsInCart} color="secondary">
                                                    <ShoppingCartIcon style={{ color: "white" }} aria-label="add" onClick={e => this.goToCart()} />
                                                </Badge>
                                            </span>
                                        </Tooltip>
                                    }
                                    {
                                        this.props.cartNum == 0 &&
                                        <Tooltip title="Empty Cart!">
                                            <span className="mr-2">
                                                <ShoppingCartIcon style={{ color: "white" }} aria-label="add" />
                                            </span>
                                        </Tooltip>
                                    }
                                </MDBNavItem>
                            </NavbarNav>
                        }
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

export default withRouter(CoursepackTopNav);
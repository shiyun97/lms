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
    MDBRow
} from "mdbreact";
import Badge from '@material-ui/core/Badge';
import Tooltip from '@material-ui/core/Tooltip';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const API = "http://localhost:3001"

const useStyles = makeStyles((theme) =>
  createStyles({
    margin: {
      margin: theme.spacing(2),
    },
    padding: {
      padding: theme.spacing(0, 2),
    },
  }),
);

@inject('dataStore')
@observer
class CoursepackTopNav extends Component {

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

    goToCart = () => {
        this.props.dataStore.setPath('/coursepack/cart');
        this.props.history.push('/coursepack/cart');
    }

    render() {
        let itemsInCart = 0;
        let cart = sessionStorage.getItem("cart");
        if (cart != null && cart != undefined) {
            let cartObjs = JSON.parse(cart)
            itemsInCart = cartObjs.length;
        }
        
        return (
            <div>
                <MDBNavbar style={{ background: '#F1948A' }} dark expand="md" fixed="top">
                    <MDBNavbarBrand href="/coursepack/dashboard" style={{ paddingLeft: 80 }}>
                        <strong>Coursepack</strong>
                    </MDBNavbarBrand>
                    <MDBNavbarToggler onClick={this.onClick} />
                    <MDBCollapse isOpen={this.state.collapseID} navbar>
                        <NavbarNav left>
                            <MDBNavItem>
                                <MDBDropdown>
                                    <MDBDropdownToggle nav>
                                        <MDBIcon icon="th" size="lg" className="mr-2" />
                                        Categories
                                    </MDBDropdownToggle>
                                    <MDBDropdownMenu>
                                        {this.state.category && this.state.category.map((category, index) => {
                                            return (
                                                <MDBDropdownItem to={`/coursepack/${category}/list`}>{category}</MDBDropdownItem>

                                            )
                                        })}
                                    </MDBDropdownMenu>
                                </MDBDropdown>
                            </MDBNavItem>
                        </NavbarNav>
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
                                        <IconButton aria-label="delete">
                                            <ShoppingCartIcon style={{color:"white"}} />
                                        </IconButton>
                                    </Tooltip>
                                }
                            </MDBNavItem>
                        </NavbarNav>
                    </MDBCollapse>
                </MDBNavbar>
                <MDBNav right>
                    {this.state.category && this.state.category.map((category, index) => {
                        return (
                            <MDBNavLink to={`/coursepack/${category}/list`}>{category}</MDBNavLink>
                        )
                    })}
                </MDBNav>
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
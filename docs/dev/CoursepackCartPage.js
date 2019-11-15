import React, { Component } from "react";
import {
    MDBContainer,
    MDBJumbotron,
    MDBBtn,
    MDBCol,
    MDBRow,
    MDBCardTitle,
    MDBIcon,
    MDBCard
} from "mdbreact";
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CoursepackTopNav from "./CoursepackTopNav";
import styled from 'styled-components';
import { Card, CardActionArea, CardContent, CardMedia, CardActions, Button } from "@material-ui/core";

class CoursepackCartPage extends Component {

    state = {
        cartObjs: []
    }

    componentDidMount() {
        this.initPage()
    }

    initPage() {
        let cart = sessionStorage.getItem("cart");
        if (cart != undefined && cart != null) {
            let cartObjs = JSON.parse(cart);
            this.setState({
                cartObjs: cartObjs
            })
        }
    }

    removeItem = (coursepackId) => {
        console.log(coursepackId)
        let cart = this.state.cartObjs;
        let found = false;
        for (var i = 0; i < cart.length && found == false; i++) {
            if (cart[i].coursepackId == coursepackId) {
                cart.splice(i, 1);
                found = true;
            }
        }
        sessionStorage.setItem("cart", JSON.stringify(cart));
        this.setState({
            cartObjs: cart
        })
    }

    emptyCart = () => {
        return (
            <MDBCol md={12}>
                No courses added yet.
                </MDBCol>
        )
    }

    showCartItems = () => {
        let cartObjs = this.state.cartObjs;
        let totalPrice = 0;
        for (var idx = 0; idx < cartObjs.length; idx++) {
            totalPrice += cartObjs[idx].price;
        }
        return (
            <>
                {/* desktop view */}
                <div className="coursepack-sidebar-large">
                    <MDBRow>
                        <MDBCol md="10">
                            <MDBRow>
                                <h4 className="mb-3">{cartObjs.length + " Coursepacks in Cart"}</h4>
                            </MDBRow>
                            {
                                cartObjs.map((cartObj) => (
                                    <MDBRow>
                                        <div className="container-fluid section border py-3 px-0 justify-content d-flex mr-5">
                                            <MDBCol md="3" lg="3">
                                                <img src={cartObj.imageLocation} className="img-fluid" />
                                            </MDBCol>
                                            <MDBCol md="5" lg="5">
                                                <MDBRow>
                                                    <b>{cartObj.title}</b>
                                                </MDBRow>
                                                <MDBRow>
                                                    {"By " + cartObj.assignedTeacher.firstName + " " + cartObj.assignedTeacher.lastName}
                                                </MDBRow>
                                            </MDBCol>
                                            <MDBCol md="2" lg="2">
                                                <MDBRow>
                                                    <span style={{ cursor: "pointer" }} onClick={e => this.removeItem(cartObj.coursepackId)}>Remove</span>
                                                </MDBRow>
                                            </MDBCol>
                                            <MDBCol md="2" lg="2">
                                                <MDBRow>
                                                    <b style={{ color: "#f44336" }}>S${cartObj.price.toFixed(2)}<MDBIcon icon="tag" className="red-text pl-2" /></b>
                                                </MDBRow>
                                            </MDBCol>
                                        </div>
                                    </MDBRow>
                                ))
                            }
                        </MDBCol>
                        <MDBCol md="2" lg="2">
                            <MDBRow className="mb-3">
                                <span style={{ fontSize: "20px", color: "#686f7a" }}>Total:</span>
                            </MDBRow>
                            <MDBRow>
                                <span style={{ fontSize: "36px", fontWeight: 500 }}>S${totalPrice.toFixed(2)}</span>
                            </MDBRow>
                            <div className="mb-4" />
                            <MDBRow>
                                <Link href="/coursepack/cart/checkout">
                                    <MDBBtn size="lg" className="ml-0" style={{ width: "100%" }} color="deep-orange">Checkout</MDBBtn>
                                </Link>
                            </MDBRow>
                        </MDBCol>
                    </MDBRow>
                </div>

                {/* mobile view */}
                <div className="coursepack-navbar-small">
                    <MDBCol md="12">
                        <h6 className="mb-3">{cartObjs.length + " Coursepacks in Cart"}</h6>
                        {
                            cartObjs.map((cartObj) => (
                                <div style={{ paddingBottom: 15 }}>
                                    <Card>
                                        <CardActionArea>
                                            <CardMedia
                                                style={{ height: 140 }}
                                                image={cartObj.imageLocation}
                                                title={cartObj.title}
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="h2" style={{ color: "#000000" }}>
                                                    {cartObj.title}
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary" component="p">
                                                    {"By " + cartObj.assignedTeacher.firstName + " " + cartObj.assignedTeacher.lastName}
                                                </Typography>
                                                <Typography gutterBottom variant="h6" component="h2" style={{ color: "#000000", marginTop: 10 }}>
                                                    <b style={{ color: "#f44336" }}>S${cartObj.price.toFixed(2)}<MDBIcon icon="tag" className="red-text pl-2" /></b>
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                        <CardActions>
                                            <Button variant="contained" style={{ backgroundColor: "#fb6d63" }} onClick={e => this.removeItem(cartObj.coursepackId)}>
                                                Remove
                                  </Button>
                                        </CardActions>
                                    </Card></div>
                            ))
                        }
                    </MDBCol>
                    <MDBCol md="12" style={{ paddingTop: 20 }}>
                        <span style={{ fontSize: "20px", color: "#686f7a" }}>Total:</span><br />
                        <span style={{ fontSize: "36px", fontWeight: 500 }}>S${totalPrice.toFixed(2)}</span><br />
                        <Link href="/coursepack/cart/checkout">
                            <MDBBtn size="lg" className="ml-0" style={{ width: "100%" }} color="deep-orange">Checkout</MDBBtn>
                        </Link>
                    </MDBCol>
                </div>
            </>
        )
    }

    showBreadcrumb = () => {
        return (
            <MDBRow>
                <Paper elevation={0} style={{ backgroundColor: "#505763" }}>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link href="/coursepack/dashboard" color="inherit" >
                            <MDBIcon icon="home" style={{ color: "#a1a7b3" }} />
                        </Link>
                        <Typography style={{ color: "#fff" }}>Cart</Typography>
                    </Breadcrumbs>
                </Paper>
            </MDBRow>
        )
    }

    render() {
        let cartObjs = this.state.cartObjs;
        return (
            <div className={this.props.className}>
                <CoursepackTopNav cartNum={cartObjs.length} />
                {/* desktop view */}
                <div className="coursepack-sidebar-large">
                    <MDBJumbotron style={{ padding: 0, backgroundColor: "#505763", width: "100%" }}>
                        <MDBCol className="text-white">
                            <MDBCol className="py-3">
                                <MDBCardTitle className="h1-responsive pt-5 m-3 ml-5 px-5">
                                    {this.showBreadcrumb()}
                                    <MDBRow>Shopping Cart</MDBRow>
                                </MDBCardTitle>
                            </MDBCol>
                        </MDBCol>
                    </MDBJumbotron>
                    <MDBContainer style={{ paddingBottom: 240 }}>
                        <MDBRow>
                            {
                                cartObjs.length == 0 && this.emptyCart()
                            }
                            {
                                cartObjs.length > 0 && this.showCartItems()
                            }
                        </MDBRow>
                    </MDBContainer>
                </div>

                {/* mobile view */}
                <div className="coursepack-navbar-small">
                    <MDBRow style={{ backgroundColor: "#505763", color: "#fff" }}>
                        <MDBCardTitle className="h1-responsive pt-5 m-3 px-5">
                            {this.showBreadcrumb()}
                            <MDBRow>Shopping Cart</MDBRow>
                        </MDBCardTitle>
                    </MDBRow>
                    <MDBContainer style={{ paddingBottom: 240 }}>
                        <MDBContainer style={{ paddingTop: 17 }} >
                            <MDBCol>
                                {
                                    cartObjs.length == 0 && this.emptyCart()
                                }
                                {
                                    cartObjs.length > 0 && this.showCartItems()
                                }
                            </MDBCol>
                        </MDBContainer>
                    </MDBContainer>
                </div>
            </div>
        );
    }
}

export default styled(CoursepackCartPage)`
.coursepack-content{
    margin-top: 0px;
}
@media screen and (min-width: 800px) {
    .coursepack-content{
        margin-left: 270px;
    }
    .coursepack-navbar-small{
        display: none;
    }
    .coursepack-sidebar-large{
        display: block;
    }
}
@media screen and (max-width: 800px) {
    .coursepack-sidebar-large{
        display: none;
    }
    .coursepack-navbar-small{
        display: block;
    }
}
`;
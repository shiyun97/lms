import React, { Component } from "react";
import {
  MDBContainer, 
  MDBJumbotron,
  MDBCarouselInner, 
  MDBView, 
  MDBCarouselItem, 
  MDBBtn, 
  MDBCol, 
  MDBRow,
  MDBCardTitle,
  MDBIcon
} from "mdbreact";
import Button from '@material-ui/core/Button';
import CoursepackTopNav from "./CoursepackTopNav";
import coursepackBanner from './Coursepack-dashboard-banner.jpg';
import SectionContainer from "../components/sectionContainer";
import cprog from './cprog.jpg';

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
        for (var i=0; i<cart.length && found == false; i++) {
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
            <MDBRow>
                <MDBCol>
                    <div>No courses added yet.</div>
                </MDBCol>
            </MDBRow>
        )
    }

    showCartItems = () => {
        let cartObjs = this.state.cartObjs;
        let totalPrice = 0;
        for (var idx=0; idx < cartObjs.length; idx++) {
            totalPrice += cartObjs[idx].price;
        }
        return (
            <MDBRow>
                <MDBCol md="10" lg="10">
                    <MDBRow>
                        <h4 className="mb-3">{cartObjs.length + " Course in Cart"}</h4>
                    </MDBRow>
                    {
                        cartObjs.map((cartObj) => (
                            <MDBRow>
                                <div className="container-fluid section border py-3 px-0 justify-content d-flex mr-5">
                                    <MDBCol md="3" lg="3">
                                        <img src={cprog} className="img-fluid"/>
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
                                            <span style={{cursor: "pointer"}} onClick={e => this.removeItem(cartObj.coursepackId)}>Remove</span>
                                        </MDBRow>
                                    </MDBCol>
                                    <MDBCol md="2" lg="2">
                                        <MDBRow>
                                            <b style={{color: "#f44336"}}>S${cartObj.price.toFixed(2)}<MDBIcon icon="tag" className="red-text pl-2"/></b>
                                        </MDBRow>
                                    </MDBCol>
                                </div>
                            </MDBRow>
                        ))
                    }
                </MDBCol>
                <MDBCol md="2" lg="2">
                    <MDBRow className="mb-3">
                        <span style={{ fontSize: "20px", color: "#686f7a"}}>Total:</span>
                    </MDBRow>
                    <MDBRow>
                        <span style={{fontSize: "36px", fontWeight: 500}}>S${totalPrice.toFixed(2)}</span>
                    </MDBRow>
                    <div className="mb-4" />
                    <MDBRow>
                        <MDBBtn size="lg" className="ml-0" style={{width: "100%"}} color="pink accent-3">Checkout</MDBBtn>
                    </MDBRow>
                </MDBCol>
            </MDBRow>
        )
    }

    render() {
        let cartObjs = this.state.cartObjs;
        return (
            <div>
                <CoursepackTopNav cartNum={cartObjs.length} />
                <MDBJumbotron style={{ padding: 0, backgroundColor: "#505763", width: "100%" }}>
                    <MDBCol className="text-white">
                        <MDBCol className="py-3">
                            <MDBCardTitle className="h1-responsive pt-3 m-3 ml-5 px-5">Shopping Cart</MDBCardTitle>
                        </MDBCol>
                    </MDBCol>
                </MDBJumbotron>
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
        );
    }
}

export default CoursepackCartPage;
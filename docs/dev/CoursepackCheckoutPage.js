import React, { Component, useState, useRef, useEffect } from "react";
import axios from "axios";
import {
    MDBContainer,
    MDBJumbotron,
    MDBBtn,
    MDBCol,
    MDBRow,
    MDBCardTitle,
    MDBIcon
} from "mdbreact";
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CoursepackTopNav from "./CoursepackTopNav";
import cprog from './img/cprog.jpg';
import paypalLogo from './img/paypalLogo.jpg';

const API = "http://localhost:8080/LMS-war/webresources/"

class CoursepackCheckoutPage extends Component {

    state = {
        cartObjs: [],
        stripe: null
    }

    componentDidMount() {
        this.initPage();
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

    showBreadcrumb = () => {
        return (
            <MDBRow>
                <Paper elevation={0} style={{ backgroundColor: "#505763" }}>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link href="/coursepack/dashboard" color="inherit" >
                            <MDBIcon icon="home" style={{ color: "#a1a7b3" }} />
                        </Link>
                        <Link href="/coursepack/cart" color="inherit" >
                            <div style={{ color: "#a1a7b3" }}>Cart</div>
                        </Link>
                        <Typography style={{ color: "#fff" }}>Checkout</Typography>
                    </Breadcrumbs>
                </Paper>
            </MDBRow>
        )
    }

    render() {
        let cartObjs = this.state.cartObjs;
        let totalPrice = 0;
        for (var idx=0; idx < cartObjs.length; idx++) {
            totalPrice += cartObjs[idx].price;
        }
        let currency = 'SGD';
        let total = totalPrice;
        return (
            <div>
                <CoursepackTopNav cartNum={cartObjs.length} />
                <MDBJumbotron style={{ padding: 0, backgroundColor: "#505763", width: "100%" }}>
                    <MDBCol className="text-white">
                        <MDBCol className="py-3">
                            <MDBCardTitle className="h1-responsive pt-5 m-3 ml-5 px-5">
                                { this.showBreadcrumb()}
                                <MDBRow>Checkout</MDBRow>
                            </MDBCardTitle>
                        </MDBCol>
                    </MDBCol>
                </MDBJumbotron>
                <MDBContainer style={{ paddingBottom: 240 }}>
                    <MDBContainer style={{ paddingTop: 17 }} >
                        <MDBRow>
                            <MDBCol md="5" lg="5">
                                <MDBRow>
                                    <MDBCol>
                                        <h5 className="mb-3">{"Your Item (" + cartObjs.length + ")"}</h5>
                                        <hr style={{ borderTop: "3px solid rgba(0,0,0,.1)" }} />
                                    </MDBCol>
                                </MDBRow>
                                {
                                    cartObjs.map((cartObj) => (
                                        <MDBRow>
                                            <div className="container-fluid section py-3 px-0 justify-content d-flex mr-2">
                                                <MDBCol md="5" lg="5">
                                                    <img src={cartObj.imageLocation} className="img-fluid" />
                                                </MDBCol>
                                                <MDBCol md="7" lg="7">
                                                    <MDBRow>
                                                        <b>{cartObj.title}</b>
                                                    </MDBRow>
                                                    <MDBRow>
                                                        {"By " + cartObj.assignedTeacher.firstName + " " + cartObj.assignedTeacher.lastName}
                                                    </MDBRow>
                                                    <MDBRow>
                                                        <b style={{ color: "#f44336" }}>S${cartObj.price.toFixed(2)}</b>
                                                    </MDBRow>
                                                </MDBCol>
                                            </div>
                                        </MDBRow>
                                    ))
                                }
                            </MDBCol>
                            <MDBCol md="7" lg="7" className="px-5">
                                <MDBRow>
                                    <div style={{ fontSize: "36px", fontWeight: 600, marginLeft: 12 }}>
                                        Total: S${totalPrice.toFixed(2)}
                                    </div>
                                </MDBRow>
                                <div className="mb-4" />
                                <MDBRow>
                                    {/*<PaypalButton
                                    currency={currency}
                                    total={total}
                                    onError={onError}
                                    onSuccess={onSuccess}
                                    onCancel={onCancel} />*/}
                                    <MDBCol md="12" lg="12">
                                    {/*<StripeProvider
                                        stripe={this.state.stripe}
                                    >
                                        <Elements>
                                            <CheckoutForm></CheckoutForm>
                                        </Elements>
                                    </StripeProvider>*/}
                                        <div className="container-fluid section border py-3 px-0 justify-content d-flex mr-3 ml-0">
                                            <MDBCol md="3" lg="3"><img src={paypalLogo} className="img-fluid"/></MDBCol>
                                        </div>
                                        <div className="container-fluid section border py-3 px-0 justify-content d-flex mr-3 ml-0">
                                            <MDBCol>
                                                <MDBRow>
                                                    <MDBCol>
                                                        Proceed to Paypal checkout to complete transaction.<br />
                                                    </MDBCol>
                                                </MDBRow>
                                                <div className="mb-4" />
                                                <MDBRow>
                                                    <MDBCol>
                                                        <PaypalButtonComponent/>
                                                    </MDBCol>
                                                </MDBRow>
                                            </MDBCol>
                                        </div>
                                    </MDBCol>
                                </MDBRow>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </MDBContainer>
            </div>
        );
    }
}

export default CoursepackCheckoutPage;

function PaypalButtonComponent() {

    const [paidFor, setPaidFor] = useState(false);
    const [loaded, setLoaded] = useState(false); 

    let paypalRef = useRef();

    useEffect(() => {
        // load Paypal script
        const script = document.createElement("script");
        script.src = "https://www.paypal.com/sdk/js?client-id=AbP8vjStK0qu6C988APNirLLgBECd58mFubBCu77Y22n4EC60vLLkGD_n9hE3hDaPE9muxbz1fQtMS81&currency=SGD";
        script.addEventListener("load", () => setLoaded(true));
        document.body.appendChild(script);

        if(loaded) {
            setTimeout(() => {
                window.paypal.Buttons({
                    createOrder: (data, actions) => {
                        let cartObjs = JSON.parse(sessionStorage.getItem("cart"));
                        let totalPrice = 0;
                        for (var i=0; i<cartObjs.length; i++) {
                            totalPrice += cartObjs[i].price;
                        }
                        return actions.order.create({
                            purchase_units: [{
                                description: "test",
                                amount: {
                                    currency_code: "SGD",
                                    value: totalPrice
                                }
                            }
                        ]
                        })
                    },
                    onApprove: async(data, actions) => {
                        const order = await actions.order.capture();
                        setPaidFor(true);
                        console.log(order);
                    }
                }).render(paypalRef);
            })
        }
    })

    const goToMyCourses = () => {
        console.log("completed payment")
        let boughtItems = JSON.parse(sessionStorage.getItem("cart"))
        for (var i=0; i<boughtItems.length; i++) {
            axios
                .put(`${API}CoursepackEnrollment/enrollCoursepack?userId=${sessionStorage.getItem("userId")}&coursepackId=${boughtItems[i].coursepackId}`)
                .then(result => {
                    console.log(result)
                    sessionStorage.setItem("cart", JSON.stringify([]))
                    setPaidFor(false)
                    setLoaded(false)
                    document.getElementById("goToMyCourses").click();
                })
                .catch(error => {
                    console.error("error in axios " + error);
                });
        }
    }

    let cartObjs = JSON.parse(sessionStorage.getItem("cart"))
    if (cartObjs > 0) {
        setPaidFor(false);
    }
    return (
        <div>
        {
            paidFor ? (
                <div>{goToMyCourses()}</div>
            ) : (
                <div>
                    <div ref={v => (paypalRef = v)} />
                </div>
            )
        }
        <div><a href="/coursepack/myCourses" id="goToMyCourses" style={{display: "none"}} /></div>
        </div>
    )
}

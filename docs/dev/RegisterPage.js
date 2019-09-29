import React from "react";
import { MDBEdgeHeader, MDBContainer, MDBRow, MDBCol, MDBJumbotron,  MDBAnimation } from "mdbreact";

const RegisterPage = () => {
    return (
        <>
            <MDBEdgeHeader color="indigo darken-3" className="sectionPage" />
            <MDBAnimation type="zoomIn" duration="500ms">
                <MDBContainer>
                    <MDBRow>
                        <MDBCol md="8" className="mt-3 mx-auto">
                            <MDBJumbotron>
                                <h1 className="text-center" style={{ fontWeight: "bold" }}>
                                    LUMINUS
                </h1>
                                <h3 className="text-center">
                                    Learning Management Platform
                </h3>
                                <ul className="list-unstyled example-components-list">
                                    <form>
                                        <br />
                                        <label htmlFor="defaultFormRegisterNameEx" className="grey-text">
                                            Your name
                </label>
                                        <input type="text" id="defaultFormRegisterNameEx" className="form-control" />
                                        <br />
                                        <label htmlFor="defaultFormRegisterEmailEx" className="grey-text">
                                            Your email
                </label>
                                        <input type="email" id="defaultFormRegisterEmailEx" className="form-control" />
                                        <br />
                                        <label htmlFor="defaultFormRegisterConfirmEx" className="grey-text">
                                            Confirm your email
                </label>
                                        <input type="email" id="defaultFormRegisterConfirmEx" className="form-control" />
                                        <br />
                                        <label htmlFor="defaultFormRegisterPasswordEx" className="grey-text">
                                            Your password
                </label>
                                        <input type="password" id="defaultFormRegisterPasswordEx" className="form-control" />
                                        <div className="text-center mt-4">
                                            <button className="btn btn-indigo" type="submit">
                                                Sign Up
                  </button>
                                        </div>
                                    </form>
                                </ul>
                            </MDBJumbotron>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </MDBAnimation>
        </>
    );
}

export default RegisterPage;

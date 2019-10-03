import React from "react";
import { MDBEdgeHeader, MDBContainer, MDBRow, MDBCol, MDBJumbotron, MDBAnimation } from "mdbreact";

const PublicLoginPage = () => {
  return (
    <>
      <MDBEdgeHeader color="indigo darken-3" className="loginPage" />
      <MDBAnimation type="zoomIn" duration="500ms">
        <MDBContainer>
          <MDBRow>
            <MDBCol md="8" className="mt-3 mx-auto">
              <MDBJumbotron>
                <h1 className="text-center" style={{ fontWeight: "bold" }}>
                  FLIPIT
                </h1>
                <h3 className="text-center">
                  Learning Management Platform
                </h3>
                <ul className="list-unstyled example-components-list">
                  <form>
                    <br />
                    <label htmlFor="defaultFormRegisterEmailEx" className="grey-text">
                      Email
                </label>
                    <input type="email" id="defaultFormRegisterEmailEx" className="form-control" />
                    <br />
                    <label htmlFor="defaultFormRegisterPasswordEx" className="grey-text">
                      Password
                </label>
                    <input type="password" id="defaultFormRegisterPasswordEx" className="form-control" />
                    <div className="text-center mt-4">
                      <button className="btn btn-indigo" type="submit">
                        Login
                  </button>
                      <br />
                      <br />
                      <p className="text-center grey-text">
                        Do you have an account? If not, sign up
                        <a href="/register"> here</a>.
                        </p>
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

export default PublicLoginPage;

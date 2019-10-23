import React from "react";
import { MDBCol, MDBRow, MDBJumbotron } from "mdbreact";

const AccessDeniedPage = () => {
    return (
        <MDBRow align="center">
            <MDBCol md="12" className="mt-3 mx-auto">
                <MDBJumbotron>
                    <h2 className="font-weight-bold blue-text">
                        FLIPIT
                </h2>
                    <p className="text-muted mb-1">
                        You are unauthorised to view this page.
                </p>
                    <img src="https://cdn.dribbble.com/users/516732/screenshots/4527062/dribbble-403.png" width="50%" />
                </MDBJumbotron>
            </MDBCol>
        </MDBRow>
    );
}

export default AccessDeniedPage;

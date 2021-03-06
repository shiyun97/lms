import React from "react";
import { MDBCol, MDBRow, MDBJumbotron } from "mdbreact";

const UnderMaintenancePage = () => {
    return (
        <MDBRow align="center">
            <MDBCol md="12" className="mt-3 mx-auto">
                <MDBJumbotron>
                    <h2 className="font-weight-bold blue-text">
                        FLIPIT
                </h2>
                    <p className="text-muted mb-1">
                        Learning Management Platform
                </p>
                    <img src="https://cdn.dribbble.com/users/2817186/screenshots/5956171/under-maintenance-design-224806.jpg" width="50%" />
                </MDBJumbotron>
            </MDBCol>
        </MDBRow>
    );
}

export default UnderMaintenancePage;

import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText } from "mdbreact";

const UserProfilePage = () => {
    return (
        <MDBContainer className="mt-3">
            <MDBRow style={{ paddingTop: 60 }}>
                <MDBCol md="8">
                    <h2 className="font-weight-bold">
                        Your Account
                    </h2>
                </MDBCol>
                <MDBCol md="4" align="right">
                    {/* to edit profile for coursepack users */}
                    {/* <MDBBtn color="primary">Edit Profile</MDBBtn> */}
                </MDBCol>
            </MDBRow>
            <MDBRow className="py-3">
                <MDBCol md="3">
                    <img src="https://i.dlpng.com/static/png/5327106-businessman-icon-png-263229-free-icons-library-businessman-icon-png-512_512_preview.png" width="100%" />

                </MDBCol>
                <MDBCol md="3">
                    <MDBCard cascade className="my-3 grey lighten-4">
                        <MDBCardBody cascade>
                            <MDBCardTitle align="center" style={{ fontSize: "20px", paddingTop: 20 }}>Student Name</MDBCardTitle>
                            <MDBCardText align="center">
                                Faculty Name
                                <br />
                                <br /><strong>Student Number:</strong>
                                <br />A0000000Z
                                <br />
                                <br /><strong>User ID:</strong>
                                <br />e0000000
                                <br /><br />
                            </MDBCardText>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
                <MDBCol md="6">
                    <MDBCard cascade className="my-3 grey lighten-4">
                        <MDBCardBody cascade>
                            <MDBCardText style={{ paddingTop: 10 }}>
                                <strong>Contact Details</strong>
                                <br />
                                <MDBRow>
                                    <MDBCol md="2">
                                        Email:
                                <br />Mobile Number:
                </MDBCol>
                                    <MDBCol md="10">
                                        email@email.com
                                <br />98765432
                </MDBCol>
                                </MDBRow>
                            </MDBCardText>
                            <MDBCardText style={{ paddingTop: 10 }}>
                                <strong>Password</strong>
                                <br />Your password will expire in XX days.
                    <br />
                                {/* <MDBBtn size="sm" outline color="primary">Change Password</MDBBtn> */}
                            </MDBCardText>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}

export default UserProfilePage;

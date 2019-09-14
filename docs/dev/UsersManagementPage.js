import React from "react";
import { MDBDataTable, MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody } from "mdbreact";
import data from '../test/users_data'

const UsersManagementPage = () => {

    const widerData = {
        columns: [...data().columns.map(col => {
            col.width = 200;
            return col;
        })], rows: [...data().rows]
    }
    return (
        <MDBContainer className="mt-3">
            <MDBRow style={{ paddingTop: 60 }}>
                <MDBCol md="8">
                    <h2 className="font-weight-bold">
                        Users Management
  </h2>
                </MDBCol>
                <MDBCol md="4" align="right">
                    <MDBBtn color="primary">Create User</MDBBtn>
                </MDBCol>
            </MDBRow>
            <MDBRow className="py-3">
                <MDBCol md="12">
                    <MDBCard>
                        <MDBCardBody>
                            <MDBDataTable striped bordered hover scrollX scrollY maxHeight="400px" data={widerData} pagesAmount={4} />
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}

export default UsersManagementPage;

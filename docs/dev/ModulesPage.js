import React from "react";
import { MDBInputGroup, MDBCardBody, MDBCard, MDBCardTitle, MDBCardText, MDBNavLink, MDBContainer, MDBRow, MDBCol, MDBAnimation } from "mdbreact";

const ModulesPage = () => {
    return (
        <MDBContainer style={{ paddingBottom: 240 }}>
            <MDBRow>
                <MDBCol md="12" className="mt-4">
                    <h2 className="font-weight-bold" style={{ paddingTop: 50 }}>
                        Modules
                </h2>
                    <MDBInputGroup
                        containerClassName="mb-3"
                        style={{ width: 300 }}
                        prepend="Term"
                        inputs={
                            <select className="browser-default custom-select">
                                <option value="0">AY XX/XX SEMESTER XX</option>
                                <option value="1">Past Semesters</option>
                            </select>
                        }
                    />
                    <hr className="my-5" />

                    <MDBRow id="categories">
                        <MDBCol md="3">
                            <MDBAnimation reveal type="fadeInUp">
                                <MDBCard cascade className="my-3 grey lighten-4">
                                    <MDBCardBody cascade>
                                        <h6>XX1234</h6>
                                        <MDBCardTitle>MODULE NAME</MDBCardTitle>
                                        <MDBCardText style={{ paddingTop: 40 }}>
                                            AY XX/XX SEM XX <br />
                                            PROFESSOR'S NAME
                          </MDBCardText>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBAnimation>
                        </MDBCol>
                        <MDBCol md="3">
                            <MDBAnimation reveal type="fadeInUp">
                                <MDBCard cascade className="my-3 grey lighten-4">
                                    <MDBCardBody cascade>
                                        <h6>XX1234</h6>
                                        <MDBCardTitle>MODULE NAME</MDBCardTitle>
                                        <MDBCardText style={{ paddingTop: 40 }}>
                                            AY XX/XX SEM XX <br />
                                            PROFESSOR'S NAME
                          </MDBCardText>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBAnimation>
                        </MDBCol>
                        <MDBCol md="3">
                            <MDBAnimation reveal type="fadeInUp">
                                <MDBCard cascade className="my-3 grey lighten-4">
                                    <MDBCardBody cascade>
                                        <h6>XX1234</h6>
                                        <MDBCardTitle>MODULE NAME</MDBCardTitle>
                                        <MDBCardText style={{ paddingTop: 40 }}>
                                            AY XX/XX SEM XX <br />
                                            PROFESSOR'S NAME
                          </MDBCardText>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBAnimation>
                        </MDBCol>
                        <MDBCol md="3">
                            <MDBAnimation reveal type="fadeInUp">
                                <MDBCard cascade className="my-3 grey lighten-4">
                                    <MDBCardBody cascade>
                                        <h6>XX1234</h6>
                                        <MDBCardTitle>MODULE NAME</MDBCardTitle>
                                        <MDBCardText style={{ paddingTop: 40 }}>
                                            AY XX/XX SEM XX <br />
                                            PROFESSOR'S NAME
                          </MDBCardText>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBAnimation>
                        </MDBCol>
                    </MDBRow>

                    <MDBRow id="categories">
                        <MDBCol md="3">
                            <MDBAnimation reveal type="fadeInUp">
                                <MDBCard cascade className="my-3 grey lighten-4">
                                    <MDBCardBody cascade>
                                        <h6>XX1234</h6>
                                        <MDBCardTitle>MODULE NAME</MDBCardTitle>
                                        <MDBCardText style={{ paddingTop: 40 }}>
                                            AY XX/XX SEM XX <br />
                                            PROFESSOR'S NAME
                          </MDBCardText>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBAnimation>
                        </MDBCol>
                        <MDBCol md="3">
                            <MDBAnimation reveal type="fadeInUp">
                                <MDBCard cascade className="my-3 grey lighten-4">
                                    <MDBCardBody cascade>
                                        <h6>XX1234</h6>
                                        <MDBCardTitle>MODULE NAME</MDBCardTitle>
                                        <MDBCardText style={{ paddingTop: 40 }}>
                                            AY XX/XX SEM XX <br />
                                            PROFESSOR'S NAME
                          </MDBCardText>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBAnimation>
                        </MDBCol>
                    </MDBRow>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}

export default ModulesPage;

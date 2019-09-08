import React from "react";
import { MDBCardBody, MDBCard, MDBCardTitle, MDBCardText, MDBContainer, MDBRow, MDBCol, MDBAnimation } from "mdbreact";

const DashboardPage = () => {
  return (
    <MDBContainer style={{ paddingBottom: 240 }}>
      <h2 className="font-weight-bold" style={{ paddingTop: 100 }}>
        Dashboard
      </h2>
      <p className="text-muted mb-1">
        AY XX/XX SEMESTER XX
          </p>
      <MDBRow>
        <MDBCol md="8" className="mt-4">
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
        <MDBCol md="4" className="mt-4">
          <MDBAnimation reveal type="fadeInUp">
            <MDBCard cascade className="my-3 white">
              <MDBCardBody cascade>
                <MDBCardTitle>Announcements</MDBCardTitle>
                <MDBCardText style={{ paddingTop: 40 }}>
                  text
                          </MDBCardText>
              </MDBCardBody>
            </MDBCard>
            <MDBCard cascade className="my-3 white">
              <MDBCardBody cascade>
                <MDBCardTitle>What's Due</MDBCardTitle>
                <MDBCardText style={{ paddingTop: 40 }}>
                  text
                </MDBCardText>
              </MDBCardBody>
            </MDBCard>
          </MDBAnimation>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default DashboardPage;

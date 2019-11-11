import React, { useState } from "react";
import axios from "axios";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { PdfDocument } from "./CoursepackAchievementsCertificatePdf";
import { MDBContainer, MDBCol, MDBBtn } from "mdbreact";


export default function CoursepackAchievementsCertificate(props) {

    const [certDetails, setDetails] = useState([]);
    const [show, setHide] = useState(false);

    const fetchCert = async e => {
        try {
            let res = await axios(
                `http://localhost:8080/LMS-war/webresources/Gamification/getUserCertification?userId=${sessionStorage.getItem("userId")}&certificationId=${e.target.value}`
            );
            setDetails(res.data);
            setHide(true);
        } catch (error) {
            console.log(error);
        }
    };

    if (props.attainedCerts.length === 0) { //FIXME:
        return <div align="center" style={{paddingTop: 30}}>No certificate attained</div>
    } else {
        var attainedCerts = props.attainedCerts
        return (
            <MDBContainer style={{paddingTop: 30}} align="center">
                <MDBCol size="12">
                    <h5>Select a certificate</h5>
                </MDBCol>
                <MDBCol size="12">
                    <select className="browser-default custom-select" onChange={fetchCert}>
                        <option defaultValue="">
                            Select an option
                </option>
                        {attainedCerts && attainedCerts.map((cert, index) => {
                            return (
                                <option key={cert.id} value={cert.id}>
                                    {cert.title}
                                </option>
                            );
                        })}
                    </select>
                </MDBCol>
                {show && (
                    <MDBBtn>

                        <PDFDownloadLink
                            document={<PdfDocument data={certDetails} />}
                            fileName="certificate.pdf"
                        >
                            {({ blob, url, loading, error }) =>
                                loading ? "Loading document..." : "Download Certificate"
                            }
                        </PDFDownloadLink>
                    </MDBBtn>

                )}
            </MDBContainer>
        )
    };
}

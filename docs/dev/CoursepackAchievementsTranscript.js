import React, { useState } from "react";
import axios from "axios";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { PdfDocument } from "./CoursepackAchievementsTranscriptPdf";
import { MDBContainer, MDBCol, MDBBtn } from "mdbreact";

const API = "http://localhost:8080/LMS-war/webresources/"

export default function CoursepackAchievementsTranscript(props) {

    const [coursepackDetails, setCoursepackDetails] = useState([]);
    const [certDetails, setCertDetails] = useState([]);
    const [show, setHide] = useState(false);

    const fetchCert = async e => {
        try {
            let res_coursepack = await axios(
                `${API}Gamification/getCompletedCoursepacks?userId=${sessionStorage.getItem("userId")}`
            );
            setCoursepackDetails(res_coursepack.data.coursepack);
        } catch (error) {
            console.log(error);
        }
        try {
            let res_cert = await axios(
                `${API}Gamification/getAllUserCertifications?userId=${sessionStorage.getItem("userId")}`
            );
            setCertDetails(res_cert.data);
        } catch (error) {
            console.log(error);
        }
        setHide(true);
    };


    return (
        <MDBContainer style={{ paddingTop: 30 }} align="center">

            <MDBCol size="12">
                <MDBBtn onClick={fetchCert}>Get Transcript</MDBBtn>
            </MDBCol>

            {show && (
                <MDBBtn>
                    <PDFDownloadLink
                        document={<PdfDocument cert={certDetails} coursepack={coursepackDetails}  />}
                        fileName="transcript.pdf"
                    >
                        {({ blob, url, loading, error }) =>
                            loading ? "Loading document..." : "Download Certificate"
                        }
                    </PDFDownloadLink>

                    {/* <PDFViewer
                    >
                        <PdfDocument cert={certDetails} coursepack={coursepackDetails} />
                    </PDFViewer> */}
                </MDBBtn>

            )}
        </MDBContainer>
    )
};


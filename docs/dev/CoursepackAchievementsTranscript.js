import React, { useState } from "react";
import axios from "axios";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { PdfDocument } from "./CoursepackAchievementsTranscriptPdf";
import { MDBContainer, MDBCol, MDBBtn } from "mdbreact";
import { Button } from "@material-ui/core";

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
            setCertDetails(res_cert.data.certificationList);
        } catch (error) {
            console.log(error);
        }
        setHide(true);
    };


    return (
        <MDBContainer style={{ paddingTop: 30 }} align="center">
            {show === false &&
                <MDBCol size="12">
                    <Button color="primary" onClick={fetchCert}>Get Transcript</Button>
                </MDBCol>
            }

            {show && (
                <Button color="primary">
                    <PDFDownloadLink
                        document={<PdfDocument cert={certDetails} coursepack={coursepackDetails} />}
                        fileName={`${sessionStorage.getItem("firstName")}_${sessionStorage.getItem("lastName")}.pdf`}
                    >
                        {({ blob, url, loading, error }) =>
                            loading ? "Loading document..." : "Download Transcript"
                        }
                    </PDFDownloadLink>

                    {/* <PDFViewer>
                        <PdfDocument cert={certDetails} coursepack={coursepackDetails} />
                    </PDFViewer> */}
                </Button>

            )}
        </MDBContainer>
    )
};


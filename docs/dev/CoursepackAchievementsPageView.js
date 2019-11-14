import React, { Component } from "react";
import { MDBDataTable, MDBCol } from "mdbreact";
import axios from "axios";

const API = "http://localhost:8080/LMS-war/webresources/";

class CoursepackAchievementsPageView extends Component {

    state = {
        certId: 0,
        certDetails: [],
        certTitle: ""
    }

    componentDidMount() {
        this.initPage()
    }

    initPage() {
        let certId = this.props.match.params.certId
        this.setState({ certId: certId })
        console.log(certId)

        // get the list of coursepacks in this cert
        axios.get(`${API}Gamification/getCertification?certificationId=${certId}`)
            .then(result => {
                this.setState({ certDetails: result.data.coursepackList, certTitle: result.data.title })
            })
            .catch(error => {
                console.error("error in axios " + error);
            });
    }

    showTable = () => {
        const data = {
            columns: [
                {
                    label: 'Coursepack Title',
                    field: 'coursepackTitle',
                    sort: 'asc',
                    width: 600
                },
                {
                    label: 'Code',
                    field: 'code',
                    width: 100
                },
            ],
            rows:
                this.tableRows()
        }
        return (
            <div>
                <MDBDataTable
                    style={{ textAlign: "center", verticalAlign: "center" }}
                    striped
                    bordered
                    hover
                    data={data}
                    responsive
                    small
                />
            </div>
        )
    }

    tableRows = () => {
        let coursepacks = []

        this.state.certDetails && this.state.certDetails.map((coursepack) => {
            coursepacks.push({
                coursepackTitle: coursepack.title,
                code: coursepack.code,
            })
        })
        return coursepacks
    }

    render() {

        return (
            <div style={{ paddingLeft: 150, paddingTop: 50, paddingRight: 50 }} >
                <MDBCol>
                    <h3><b>{this.state.certTitle} Coursepacks</b></h3>
                    <hr />
                </MDBCol>
                {this.showTable()}
            </div >
        )
    }
}

export default CoursepackAchievementsPageView
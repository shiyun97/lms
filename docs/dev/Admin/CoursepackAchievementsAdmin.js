import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBDataTable, MDBBtn } from "mdbreact";
import { observer, inject } from 'mobx-react'

@inject('dataStore')
@observer
class CoursepackAchievementsAdmin extends Component {

    state = {
        certificates: ["HTML", "CSS", "JAVA"]
    }

    componentDidMount() {
        this.initPage()
    }

    initPage () {
/*         this.props.dataStore.setPath(`/coursepack/achievements/certificates`);
 */
    }

    showTable = () => {
        const data = {
            columns: [
                {
                    label: 'Certificate',
                    field: 'certificate',
                    sort: 'asc',
                    width: 600
                },
                {
                    label: 'View',
                    field: 'view',
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
        let certs = []
        this.state.certificates && this.state.certificates.map((cert, index) => {
            certs.push({
                certificates: cert,
                view: this.showViewButton(),
                clickEvent: () => this.handleRowClick(index) //TODO:
            })
        })
        return certs
    }

    showViewButton = () => {
        return (
            <MDBBtn>View</MDBBtn>
        )
    }

    handleRowClick = certIndex => {
        this.props.history.push(`/coursepack/achievements/certificates/${certIndex}`)
        this.props.dataStore.setPath(`/coursepack/achievements/certificates/${certIndex}`);
        console.log(this.props.dataStore.getPath)
    }


    render() {
        return (
            <div >
                <h3 className="font-weight-bold">Certificates</h3>
                <MDBBtn>Add New Certificate</MDBBtn>
                <hr />
                {this.showTable()}
            </div>
        )
    }
}

export default CoursepackAchievementsAdmin; 
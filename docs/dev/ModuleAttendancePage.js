import React, { Component } from "react";
import styled from 'styled-components';
import { MDBContainer, MDBRow, MDBCol, MDBIcon, MDBBtn, MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import ModuleSideNavigation from "./ModuleSideNavigation";
import SectionContainer from "../components/sectionContainer";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';

var QRCode = require('qrcode.react');

class ModuleAttendancePage extends Component {

    state = {
        open: false,
    }

    componentDidMount() {
        this.initPage();
    } 

    initPage() {

        /* if (moduleId) {
            console.log(moduleId);
            // retrieve module & set state
        } */

    }

    generateQRCode = event => {
        return (

            //set the time for the qr code to expire
            <QRCode value="http://facebook.github.io/react/" />
        )

    }

    handleClickOpen = event => {
        this.setState({ open: true })
    }

    handleClickClose = event => {
        this.setState({ open: false })
    }

    showAttendance = () => {
        //attendance for the week
        // breadcrumb to go back and forth of the week

        
        return (
            <MDBTable>
                <MDBTableHead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Mon</th> {/*render based on how many classes the module has in the week */}
                        <th>Tuesday</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    <tr>
                        <td>1</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>Larry</td>
                        <td>the Bird</td>
                        <td>@twitter</td>
                    </tr>
                </MDBTableBody>
            </MDBTable>
        )
    }

    render() {
        return (
            <div className={this.props.className}>
                <ModuleSideNavigation moduleId={this.props.match.params.moduleId}></ModuleSideNavigation>
                <div className="module-content">
                    <MDBContainer>
                        <MDBRow>
                            <MDBCol>
                                <h2 className="font-weight-bold"> Attendance </h2>
                                <hr className="my-3" />
                                <MDBBtn onClick={this.handleClickOpen} color="primary" >Generate QR Code</MDBBtn>
                                <Dialog open={this.state.open} maxWidth="sm" fullWidth={true} fullScreen={true}>
                                    <DialogTitle>Insert Date Attendance</DialogTitle>
                                    <DialogContent>
                                        {this.generateQRCode()}
                                        <DialogActions>
                                            <MDBBtn variant="contained" color="primary" onClick={this.handleClickClose}>Close</MDBBtn>
                                        </DialogActions>
                                    </DialogContent>
                                </Dialog>
                                {this.showAttendance()}
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </div>
            </div>
        );
    }
}

export default styled(ModuleAttendancePage)`
.module-content{
    margin-left: 270px;
    margin-top: 40px;
}
`;

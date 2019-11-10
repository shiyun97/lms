import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from "mdbreact";
import styled from '@react-pdf/styled-components';
import { BlobProvider, Page, Text, View, Document, StyleSheet, Font, Image } from '@react-pdf/renderer';
import axios from "axios";
import certbackground from './img/certBackground.jpg'
const API = "http://localhost:8080/LMS-war/webresources/"

const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
    },
    pageBackground: {
        position: 'absolute',
        minWidth: '100%',
        minHeight: '100%',
        display: 'block',
        height: '100%',
        width: '100%',
    },
    nusLogo: {
        paddingTop: 40,
        maxHeight: 180,
        maxWidth: 200,
        left: '40%'
    }
});
const Heading = styled.Text`
  font-size: 53px;
  font-family: 'Playball';
  padding-top: 85px;
  padding-bottom: 35px;
  text-align: center;
`;
const Content = styled.Text`
  font-size: 33px;
  font-family: 'OleoSript';
  text-align: center;
  padding-right: 50px,
  padding-left: 50px,
`;
const Name = styled.Text`
  font-size: 50px;
  font-family: 'OleoSript';
  text-align: center;
  padding-right: 50px,
  padding-left: 50px,
  color: #b08f26
`;

Font.register(
    {
        family: 'Playball',
        src: `http://fonts.gstatic.com/s/playball/v6/bTcyeVjOJ0HzO36ebPilS_esZW2xOQ-xsNqO47m55DA.ttf`
    }
);
Font.register(
    {
        family: `OleoSript`,
        src: `http://fonts.gstatic.com/s/cormorantupright/v3/0n68kajKjTOJn9EPQkf1a5OaXSpdknEt7iHrNREE1MM.ttf`
    }
);
Font.register(
    {
        family: `HindSiliguri`,
        src: `http://fonts.gstatic.com/s/hindsiliguri/v2/f2eEi2pbIa8eBfNwpUl0AkPlcwLEEFMaFVaeSfNKhMM.ttf`
    }
);

class CoursepackCertificatePdf extends Component {

    state = {
        id: ""
    }

    render() {
        console.log(this.state.id)
        return (
            <MDBContainer className="mt-5">
                <BlobProvider document={<Docs heading={this.props.heading} firstName={this.props.firstName} lastName={this.props.lastName} />}>
                    {({ blob, url }) => (
                        <div>
                            <MDBBtn><a href={url} target="_blank"><div style={{color: "white"}}>View Certificate</div></a></MDBBtn>
                        </div>
                    )}

                </BlobProvider>

            </MDBContainer >
        )
    }
}

class Docs extends Component {
    state = {
        date: '11-11-2019' //TODO:
    }
    render() {
        return (
            <Document>
                <Page orientation='landscape' size="A4" style={styles.page}>
                    <Image style={styles.pageBackground} src={certbackground} />

                    <View>
                        <Heading>Certificate of Completion</Heading>
                        <Content>This is to certify that</Content>
                        <Name> {this.props.firstName} {this.props.lastName} </Name>
                        <Content> has attained Level 3 in {this.props.heading} on {this.state.date}.</Content>
                        <Image style={styles.nusLogo} src={'https://logos-download.com/wp-content/uploads/2016/12/National_University_of_Singapore_logo_NUS.png'} />
                    </View>

                </Page>
            </Document>
        )
    }
}

export default CoursepackCertificatePdf; 
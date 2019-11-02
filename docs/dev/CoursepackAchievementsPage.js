import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from "mdbreact";
import CoursepackAchievementsAdmin from "./Admin/CoursepackAchievementsAdmin";
import styled from '@react-pdf/styled-components';
import { BlobProvider, Page, Text, View, Document, StyleSheet, Font, Image } from '@react-pdf/renderer';

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
        paddingTop: 70,
        maxHeight: 180,
        maxWidth: 200,
        left: '40%'
    }
});
const Heading = styled.Text`
  font-size: 53px;
  font-family: 'Playball';
  padding: 25px;
  text-align: center;
`;
const Content = styled.Text`
  font-size: 33px;
  font-family: 'OleoSript';
  text-align: center;
  padding-right: 50px,
  padding-left: 50px,
  padding-bottom: 30px
`;
const Teacher = styled.Text`
  font-size: 23px;
  font-family: 'HindSiliguri';
  text-align: center;
  text-decoration-line: underline;
  padding-top: 52px,
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

class CoursepackAchievementsPage extends Component {


    render() {
        return (
            <MDBContainer className="mt-5">
                {/* <CoursepackAchievementsAdmin/> */}
                
            <BlobProvider document={<Docs />}>
                {({ blod, url }) => (
                    <div>
                        <MDBBtn ><a href={url} target="_blank">View Certificate</a></MDBBtn>
                    </div>
                )}

            </BlobProvider>
                
            </MDBContainer>
        )
    }
}

class Docs extends Component {
    state = {
        name: 'John Tan',
        prof: 'Alice Tan',
        designation: 'IS Prof',
        coursepackName: "Introduction to CSS",
        date: '11-11-2019'
    }

    render() {
        return (
            <Document>
                <Page orientation='landscape' size="A4" style={styles.page}>
                    <Image style={styles.pageBackground} src='https://www.pptgrounds.com/wp-content/uploads/2019/08/Certificate-Border-Image-1000x750.jpg' />

                    <View>
                        <Image style={styles.nusLogo} src='https://logos-download.com/wp-content/uploads/2016/12/National_University_of_Singapore_logo_NUS.png' />
                        <Heading>Certificate of Completion</Heading>
                        <Content>This is to certify that {this.state.name} has successfully completed {this.state.coursepackName} on {this.state.date}.</Content>
                        <Teacher>Given by: {this.state.prof}, {this.state.designation}</Teacher>
                    </View>

                </Page>
            </Document>
        )
    }
}

export default CoursepackAchievementsPage; 
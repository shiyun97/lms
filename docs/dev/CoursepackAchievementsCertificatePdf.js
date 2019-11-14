import React from "react";
import {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
    Image,
    Font,
} from "@react-pdf/renderer";
import certbackground from './img/certBackground.jpg'

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
        left: '55%'
    },
    heading: {
        fontSize: 53,
        fontFamily: 'Playball',
        paddingTop: 85,
        paddingBottom: 35,
        textAlign: "center"
    },
    content: {
        fontSize: 33,
        fontFamily: 'OleoSript',
        textAlign: "center",
        paddingRight: 50,
        paddingLeft: 50
    },
    name: {
        fontSize: 50,
        fontFamily: 'OleoSript',
        textAlign: "center",
        paddingRight: 50,
        paddingLeft: 50,
        color: '#b08f26'
    },
    certID: {
        fontSize: 14,
        fontFamily: 'HindSiliguri',
        textAlign: "left",
        paddingLeft: 85,
        paddingTop: 70
    }
});

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


export function PdfDocument(props) {
    const day = props.data.dateAchieved.substring(8, 10)
    const month = props.data.dateAchieved.substring(5, 7)
    const year = props.data.dateAchieved.substring(0, 4)

    return (
        <Document>
            <Page orientation='landscape' size="A4" style={styles.page}>
                <Image style={styles.pageBackground} src={certbackground} />

                <View>
                    <Text style={styles.heading} >Certificate of Completion</Text>
                    <Text style={styles.content}>This is to certify that</Text>
                    <Text style={styles.name}> {sessionStorage.getItem("firstName")} {sessionStorage.getItem("lastName")}</Text>
                    <Text style={styles.content}> has attained {props.data.title} on {day}-{month}-{year}.</Text>
                    <Image style={styles.nusLogo} src={'https://logos-download.com/wp-content/uploads/2016/12/National_University_of_Singapore_logo_NUS.png'} />
                    <Text style={styles.certID}>Certification Id: {props.data.id}</Text>
                </View>

            </Page>
        </Document>
    );
}

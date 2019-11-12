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

const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        paddingLeft: 50
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
        maxHeight: 150,
        maxWidth: 170,
        paddingBottom: 20,
    },
    personalInfo: {
        fontSize: 12,
        fontFamily: 'HindSiliguri',
    },
    heading: {
        paddingRight: 58,
        fontSize: 14,
        fontWeight: "bold",
        paddingBottom: 15
    },
    content: {
        fontSize: 14,
        paddingRight: 40,
        paddingBottom: 40
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
    console.log(props.cert)
    console.log(props.coursepack.length)

    if (props.cert.length === 0 && props.coursepack.length === 0) {
        return (
            <Document>
                <Page size="A4" style={styles.page}>

                    <View style={{ flexGrow: 1 }}>
                        <Image style={styles.nusLogo} src={'https://logos-download.com/wp-content/uploads/2016/12/National_University_of_Singapore_logo_NUS.png'} />
                        <Text style={styles.personalInfo}>{sessionStorage.getItem('firstName')} {sessionStorage.getItem('lastName')}</Text>
                        <Text style={styles.personalInfo}>{sessionStorage.getItem('gender')}</Text>
                        <Text style={styles.personalInfo}>{sessionStorage.getItem('email')}</Text>

                        <Text style={{ textAlign: "center" }}>
                            No certificates attainted. No coursepack Completed.
                        </Text>

                    </View>
                </Page>
            </Document>
        )
    } else if (props.coursepack.length !== 0) {
        return (
            <Document>
                <Page size="A4" style={styles.page}>

                    <View >
                        <Image style={styles.nusLogo} src={'https://logos-download.com/wp-content/uploads/2016/12/National_University_of_Singapore_logo_NUS.png'} />
                        <Text style={styles.personalInfo}>{sessionStorage.getItem('firstName')} {sessionStorage.getItem('lastName')}</Text>
                        <Text style={styles.personalInfo}>{sessionStorage.getItem('gender')}</Text>
                        <Text style={styles.personalInfo}>{sessionStorage.getItem('email')}</Text>
                        <Text style={{ textAlign: "center", fontWeight: "bold", paddingRight: 50, fontSize: 15, paddingTop: 30 }}>Offical Transcript</Text>
                        <View style={{ flexDirection: 'row', paddingTop: 30 }}>
                            <Text style={styles.heading}>Code</Text>
                            <Text style={styles.heading}>Coursepack</Text>
                        </View>
                        {props.coursepack && props.coursepack.map((coursepack) => {
                            return (
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.content}>{coursepack.code}</Text>
                                    <Text style={styles.content}>{coursepack.title}</Text>
                                </View>
                            )
                        })}
                    </View>
                </Page>
            </Document>
        )
    }


    return (
        <Document>
            <Page size="A4" style={styles.page}>

                <View style={{ paddingLeft: 30 }}>
                    <Image style={styles.nusLogo} src={'https://logos-download.com/wp-content/uploads/2016/12/National_University_of_Singapore_logo_NUS.png'} />
                    <Text style={styles.personalInfo}>{sessionStorage.getItem('firstName')} {sessionStorage.getItem('lastName')}</Text>
                    <Text style={styles.personalInfo}>{sessionStorage.getItem('gender')}</Text>
                    <Text style={styles.personalInfo}>{sessionStorage.getItem('email')}</Text>

                    {props.cert.length === 0 && props.coursepack.length === 0 &&
                        <Text style={{ textAlign: "center" }}>
                            No certificates attainted. No coursepack Completed.
                        </Text>
                    }
                    {props.cert.length !== 0 &&
                        <Text style={{ textAlign: "center" }}>
                            Show cert
                        </Text>
                    }
                    {props.coursepack.length !== 0 &&
                        props.coursepack && props.coursepack.map((coursepack) => {
                            return (
                                <Text>{coursepack.code} {coursepack.title}</Text>
                            )
                        })
                    }

                </View>

            </Page>
        </Document>
    );
} 

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
        fontFamily: 'Muli',
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
        paddingBottom: 8,
        fontFamily: 'Muli',
    },
    officialTranscript: {
        textAlign: "center",
        fontWeight: "extrabold",
        paddingRight: 50,
        fontSize: 15,
        paddingTop: 30,
        fontFamily: 'Kanit',
    },
    coursepackCertAttained: {
        paddingTop: 20,
        fontWeight: "bold",
        fontSize: 13,
        textDecoration: "underline",
    }
});

Font.register(
    {
        family: 'Roboto Slab',
        src: `http://fonts.gstatic.com/s/robotoslab/v6/y7lebkjgREBJK96VQi37Zp0EAVxt0G0biEntp43Qt6E.ttf`
    }
);
Font.register(
    {
        family: `Muli`,
        src: `http://fonts.gstatic.com/s/muli/v10/BfQP1MR3mJNaumtWa4Tizg.ttf`
    }
);
Font.register(
    {
        family: `Kanit`,
        src: `http://fonts.gstatic.com/s/kanit/v1/kkq0USULIwHHdoKxKBuLog.ttf`
    }
);
Font.register(
    {
        family: `Noto Sans`,
        src: `http://fonts.gstatic.com/s/notosans/v6/LeFlHvsZjXu2c3ZRgBq9nKCWcynf_cDxXwCLxiixG1c.ttf`
    }
);


export function PdfDocument(props) {
    console.log(props.cert)
    console.log(props.coursepack.length)

    if (props.cert.length === 0 && props.coursepack.length === 0) { //no coursepack and no cert
        return (
            <Document>
                <Page size="A4" style={styles.page}>

                    <View style={{ flexGrow: 1 }}>
                        <Image style={styles.nusLogo} src={'https://logos-download.com/wp-content/uploads/2016/12/National_University_of_Singapore_logo_NUS.png'} />
                        <Text style={styles.personalInfo}>{sessionStorage.getItem('firstName')} {sessionStorage.getItem('lastName')}</Text>
                        <Text style={styles.personalInfo}>{sessionStorage.getItem('gender')}</Text>
                        <Text style={styles.personalInfo}>{sessionStorage.getItem('email')}</Text>

                        <Text style={{ textAlign: "center", fontSize: 14, paddingTop: 20 }}>
                            No certificates attained. No coursepack completed.
                        </Text>

                    </View>
                </Page>
            </Document>
        )
    } else if (props.coursepack.length !== 0 && props.cert.length !== 0) { //there are certs and coursepacks
        return (
            <Document>
                <Page size="A4" style={styles.page}>

                    <View >
                        <Image style={styles.nusLogo} src={'https://logos-download.com/wp-content/uploads/2016/12/National_University_of_Singapore_logo_NUS.png'} />
                        <Text style={styles.personalInfo}>{sessionStorage.getItem('firstName')} {sessionStorage.getItem('lastName')}</Text>
                        <Text style={styles.personalInfo}>{sessionStorage.getItem('gender')}</Text>
                        <Text style={styles.personalInfo}>{sessionStorage.getItem('email')}</Text>
                        <Text style={{ textAlign: "center", fontWeight: "bold", paddingRight: 50, fontSize: 15, paddingTop: 30 }}>Offical Transcript</Text>
                        <Text style={styles.coursepackCertAttained}>Certificates Attained</Text>

                        <View style={{ flexDirection: 'row', paddingTop: 13 }}>
                            <Text style={styles.heading}>Id</Text>
                            <Text style={styles.heading}>Title</Text>
                        </View>

                        {props.cert && props.cert.map((cert) => {
                            return (
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.content}>{cert.id}</Text>
                                    <Text style={styles.content}>{cert.title}</Text>
                                </View>
                            )
                        })}

                        <Text style={styles.coursepackCertAttained}>Coursepack Completed</Text>
                        <View style={{ flexDirection: 'row', paddingTop: 13 }}>
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
    } else { // there is coursepack but no cert
        return (
            <Document>
                <Page size="A4" style={styles.page}>

                    <View >
                        <Image style={styles.nusLogo} src={'https://logos-download.com/wp-content/uploads/2016/12/National_University_of_Singapore_logo_NUS.png'} />
                        <Text style={styles.personalInfo}>{sessionStorage.getItem('firstName')} {sessionStorage.getItem('lastName')}</Text>
                        <Text style={styles.personalInfo}>{sessionStorage.getItem('gender')}</Text>
                        <Text style={styles.personalInfo}>{sessionStorage.getItem('email')}</Text>
                        <Text style={{ textAlign: "center", fontWeight: "bold", paddingRight: 50, fontSize: 15, paddingTop: 30 }}>Offical Transcript</Text>
                        <Text style={{ paddingTop: 20, fontWeight: "bold", fontSize: 14, textDecoration: "underline" }}>Coursepack Completed</Text>

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
} 

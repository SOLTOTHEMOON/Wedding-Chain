import React from 'react'
import { usePDF, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';


const styles = StyleSheet.create({
    page: {
        backgroundColor: '#214A49',
        color: '#fff',
        border: '1px solid #8bbf14'
    },
    headingContainer: {
        margin: 10,
        padding: 10,
    },
    heading: {
        fontSize: 50,
        textAlign: 'center',
        fontFamily: 'Helvetica',
        fontWeight: 'bold',

    },
    text: {
        fontSize: 12
    }

});

const MyDoc = (
    <Document>
        <Page size="A4" style={styles.page}>

            <View style={styles.headingContainer}>
                <Text style={styles.heading}>Certificate of Marriage</Text>
            </View>

            <View style={styles.headingContainer}>
                <Text style={styles.heading}>This is to certify that
                </Text>

                <Text style={styles.text}>7nbyxVXZpmo4Mxq4ZvTjjH1nMb1yBT8Nm5TX9f7fZ2uK</Text>
                <Text style={styles.text}>&</Text>
                <Text style={styles.text}>7nbyxVXZpmo4Mxq4ZvTjjH1nMb1yBT8Nm5TX9f7fZ2uK</Text>

                <Text style={styles.text}>were united in the holy bonds of matrimony.</Text>
                <Text style={styles.text}>on the 17th day of June in the year 2000.</Text>
            </View>

            <View style={styles.headingContainer}>

                <Text style={styles.text}>Officated by Chain-wedding</Text>
            </View>



        </Page>
    </Document>
);


export default function DownloadCertificate() {
    const [instance] = usePDF({ document: MyDoc });

    if (instance.loading) return <div>Loading ...</div>;

    if (instance.error) return <div>Something went wrong: {instance.error}</div>;


    return (

        <>
            <button>
                <a href={instance.url!} download="test.pdf">
                    Download
                </a>
            </button>
        </>)
}

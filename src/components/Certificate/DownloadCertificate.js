import React from 'react'
import { usePDF, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';



const styles = StyleSheet.create({
    page: {
        backgroundColor: '#214A49',
        color: '#fff',
    },
    section: {
        margin: 10,
        padding: 10,
    },
    text: {
        fontSize: 12
    }

});

const MyDoc = (
    <Document>
        <Page size="A4" style={styles.page}>

            <View style={styles.section}>
                <Text style={styles.text}>Name - SOLTOTHEMOON</Text>
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
                <a href={instance.url} download="test.pdf">
                    Download
                </a>
            </button>
        </>)
}

import React, { useEffect, useRef, useState } from "react"
import { PDFViewer } from '@react-pdf/renderer';

import SimpleCard from '@Components/Card/SimpleCard'
import Form1 from '@View/pdfFile/form1/form1' 

import { makeStyles } from '@mui/styles';
import Paper from '@mui/material/Paper';

const useStyles = makeStyles((theme) => ({

    paper :{
            width:"100%",
            height:"70vh",
            // marginLeft:"25%"
    },

    grid:{
        width: '100%',
        marginLeft: 5,
        marginTop: '2%'
    },

    typography:{
        fontWeight:"bold",
        borderLeft: 5,
        borderColor: "#000",

        '&::after': {
            content: '""',
            display: 'block',
            height: 30,
            marginTop: -30,
            marginRight:10,
            background: '#db0011',
            width: 5,
            position: 'absolute',
            // right: 'auto',
            // left: -5,
          }
    }

  }));

function PdfViewer(props){
console.log(props)
    const classes = useStyles();
    const {data, status} = props
    return(
        <SimpleCard>
            <Paper elevation={0} className={classes.paper}>
                {status == '20'?<PDFViewer PDFViewer width = '100%' height='100%' showToolbar={false}><Form1/></PDFViewer>:<PDFViewer PDFViewer width = '100%' height='100%'><Form1/></PDFViewer>}    
            </Paper>
        </SimpleCard>
    )

}

export default PdfViewer
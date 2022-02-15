import React from 'react';
import {Document, Page, Image, Text, View, StyleSheet, PDFViewer} from "@react-pdf/renderer";

import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import Paper from '@mui/material/Paper';

import SimpleCard from '@Components/Card/SimpleCard'
import { makeStyles } from '@mui/styles';

import './thankyou.css'

const styles = StyleSheet.create({
  image:{
    width: '600px',
    height: '80px',
    float: 'left',
    marginTop:0,
    padding: 0,
  }

 
});


const UseStyles = makeStyles((theme) => ({

  paper :{
          width:"50%",
          marginLeft:"25%",
          height:'100vh',
          display:'flex',
          flexDirection:'column',
          overflow:'hidden'
  },

  grid:{
      width: '100%',
      marginLeft: 5,
      marginTop: '2%'
  },

  image:{
    width: '50px',
    height: '80px',
    float: 'left',
    marginTop:0,
    padding: 0,
  },

  typography:{
      fontWeight:"bold",
      borderLeft: 5,
      borderColor: "#000",
      marginTop:'22rem!important',
      color: '#4175b5',

      caption:{
        fontWeight:"bold",
      }
      

      // '&::after': {
      //     content: '""',
      //     display: 'block',
      //     height: '2.125rem',
      //     marginTop: '-2.125rem',
      //     marginRight:10,
      //     background: '#db0011',
      //     width: 5,
      //     // position: 'absolute',
      //     // right: 'auto',
      //     // left: -5,
      //   }
  }

}));

export default function thankYou() {

  const classes = UseStyles();
  
  return (

    <div className={'root'}>
      <LinearProgress color="secondary" className ={'linear_progress'} />

      <SimpleCard>
      <Paper elevation={0} className={classes.paper}>
            
      {/* <Text style={styles.bankTitle}> <Image style={styles.image} src="assets\img\logo.png"/>
              </Text> */}
        
            <Typography className={classes.typography} variant="h4" gutterBottom component="div" align='center' > 
            Thank you agent is working on it
            </Typography>
            <Typography className={classes.typography.caption} variant="caption" gutterBottom component="div" align='center' > 
              ...Please come again
            </Typography>
            
      </Paper>
        </SimpleCard>
    </div>
  );
}

import React from 'react'
import {Document, Page, Image, Text, View, StyleSheet, PDFViewer} from "@react-pdf/renderer";

import Grid from '@mui/material/Grid';

import Form from '@View/form/form'
import { padding } from '@mui/system';

  // Create styles
  const styles = StyleSheet.create({
    body:{
      padding: 20,
      paddingTop:40,
    },

    page: {
        flexDirection: 'row',
        backgroundColor: '#E4E4E4'
        },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
        },
    grid:{
          width: '100%',
          marginLeft: 5,
          marginTop: '2%'
      },
    logo:{
      float: 'left',
      width: 100,
      height:100,
    },

    bankTitle:{
      marginBottom:10,
      fontSize: 20,
      fontWeight: 'bold',
    },

    title:{
      fontSize:18,
      marginBottom:20,

    },

    subtitle:{
      fontWeight:"bold",
      borderLeft: 5,
      borderColor: "#000",
      fontSize:16,
      marginBottom:10,

      '&::after': {
          content: '""',
          display: 'block',
          height: 30,
          marginTop: -30,
          marginRight:10,
          backgroundColor: '#DB0011',
          width: 5,
          position: 'absolute',
          // right: 'auto',
          // left: -5,
        }
    },

    group:{
      fontSize:12,
      width:'100%',
      color:'#fff',
      backgroundColor:'#333',
      padding:5,
      marginBottom:10,
    },

    label:{
      fontSize:12,
      fontWeight:700,
      margin: 5,

    },

    inputText:{
      width:'100%',
      height:20,
      border:'1px solid #959595',
      fontSize:9,
      padding:5,
      marginBottom:10,
    },

    pageNumber:{
      position:'absolute',
      bottom:10,
      width:'100%',
      textAlign:'center',
    },

    image:{
      width: '600px',
      height: '80px',
      float: 'left',
      marginTop:0,
      padding: 0,
    },
    formdetails:{
      width: '550px',
      height: '100px',
      float: 'left',
      marginTop:0,
      padding: 0,
    }


   
  });
  
  // Create Document Component
  function BasicDocument(props) {
    console.log(props)
    const {data, status, form} = props

    let filterItem = data.FormData[form]

    return (
          <Document>
            <Page style={styles.body}>

              <Grid container spacing={6}>
              
              <Text style={styles.bankTitle}> <Image style={styles.image} src="assets\img\logo.png"/>
              </Text>

              <Text style={styles.subtitle}>&nbsp; {form.replace(/^./, form[0].toUpperCase())}</Text>
              <Text style={styles.bankTitle}> <Image style={styles.formdetails} src="assets\img\formdetails.png"/>
              </Text>
              <Text style={styles.group}> General Information</Text>
          
                {
                  filterItem.map((item)=>{
                    return(
                      <Grid item xs={item.grid}>
                        {/* <label for="fname">First name:</label><br/> */}
                        {/* <input type="text" id="fname" name="fname"/><br/> */}
                        <Text style={styles.label}>
                          {item.label} :
                        </Text>
                        <Text style={styles.inputText}>
                          {item.value}
                        </Text>
                      </Grid>
                    )
                    
                  })
                }
              </Grid>

              

              <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
                `${pageNumber} / ${totalPages}`
              )} fixed />
            </Page>
        </Document>
    );
  }
  export default BasicDocument;
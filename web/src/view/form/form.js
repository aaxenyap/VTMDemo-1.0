import React,{useState, useEffect} from 'react';

import FilterInput from '@Components/formInput/FilterInput'

import SimpleCard from '@Components/Card/SimpleCard'
import { makeStyles } from '@mui/styles';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import './form.css'
import { typography } from '@mui/system';

const useStyles = makeStyles((theme) => ({

    paper :{
            width:"50%",
            marginLeft:"25%"
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

function Form (props) {

const classes = useStyles();

let data = props.data.FormData
let formType = props.form
let filterItem = data[formType]

const [filterReturn, setfilterReturn] = useState({data})
const [onFocusReturn, setOnFocusReturn] = useState({data})

useEffect(() => {
    props.getFilterItems(filterReturn)
  },[filterReturn]);

//   let filterOption = getFilterOptions(data,filterAttr)
//   let getFilterReturn = {};

  const updateFilterItems = (val,id) =>{
    let formItem = data[formType] 
    let res = formItem.findIndex((obj => obj.id === id))
    // objIndex = myArray.findIndex((obj => obj.id == 1));
    formItem[res].value = val
      setfilterReturn({
        data
        });              
  }

  const updateFocusItems = (val) =>{
    props.getOnfocus(val)
  }



return(
    <SimpleCard>
        <Paper elevation={0} className={classes.paper}>
            <Typography className={classes.typography} variant="h6" gutterBottom component="div" >&nbsp; {formType.replace(/^./, formType[0].toUpperCase())}</Typography>
            <Divider />
            <Grid container spacing={6} className={classes.grid}>
                {
                    filterItem.map((item)=>{

                        if(item.type === 'input'){
                            return(
                                <Grid item xs={item.grid}>
                                    <FilterInput 
                                        key   = {item.id}   
                                        id    = {item.id}    
                                        path  = {item.path}
                                        label = {item.label}
                                        value = {item.value}
                                        getInputItems = {updateFilterItems}
                                        getFocusItems = {updateFocusItems}
                                    />
                                </Grid>
                            )
                        }

                    //     if(item.type === 'checkbox'){
                    //         return(
                    //             <FilterCheckbox
                    //                 id    = {item.id}  
                    //                 label = {item.label}
                    //                 data  = {filterOption[item.id]} 
                    //                 getCheckedItems = {updateFilterItems}   
                    //             />
                    //         )
                    //     }
                    })
                }
            </Grid>
        </Paper>
    
    </SimpleCard>
)

}

export default Form;
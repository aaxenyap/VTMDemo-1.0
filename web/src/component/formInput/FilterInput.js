import React from 'react';

import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import './FilterInput.css'

const useStyles = makeStyles((theme) => ({

    inputLabel :{
            fontSize: "1rem",
            fontWeight: "bold",
    },

    inputBox: {
        height:38,
        borderColor: '#CED4DA'
    },
    input: {
        color: 'white'
    }

  }));

const FilterInput = (props) =>{
    const classes = useStyles();


    const inputChangeHandler = (e) => {
        props.getInputItems(e.target.value, props.id)
    }

    const onFocusHandler=(e) =>{
      props.getFocusItems(props.id)
    }

    return(
        <div>
            <Typography className ={classes.inputLabel} variant="h6" component="h2" gutterBottom> {props.label} </Typography>
            <TextField 
          id={props.id}
          variant="outlined"
          fullWidth
          onChange ={inputChangeHandler}
          onFocus  ={onFocusHandler}
          value= {props.value}
          InputProps={{
            className: classes.inputBox,
        }}
        />
        </div>
    )
}

export default FilterInput
import React from 'react';
import './formGroup.css'

import { makeStyles } from '@mui/styles';

import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';

import '@splidejs/splide/dist/css/splide.min.css';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    '& > *': {
      margin: theme.spacing(1),
    },
  },

  img:{
    width:50,
    cursor:'pointer'
  },

  btnLabel:{
    fontWeight:"bold",
    textAlign:"center",
    overflow:"hidden",
    width:50,
    textOverflow:"ellipsis"
  }

}));

export default function BasicButtonGroup(props) {
    console.log(props)
  const classes = useStyles();

  let btnArry = Object.keys(props.data.FormData)

  const onClickHandler = (e) =>{
    var val = e.currentTarget.dataset.value
    props.getSelectedForm(val)
  }

  return (
    <div className={classes.root}>
        {
          btnArry.map((item)=>{
            // const str = item.replace(/^./, item[0].toUpperCase())
            return(
                <div>
                    <Tooltip title={item} placement="right">
                        <a key ={item} data-value = {item} onClick={onClickHandler} >
                            <img className= {classes.img} src="assets\img\image1.png" alt="Image 1" width="70" />
                            <Typography className={classes.btnLabel} variant="caption" display="block" gutterBottom noWrap>{item}</Typography>
                        </a>
                    </Tooltip>
                </div>
              
            )
            
          })
        }
    </div>
  );
}
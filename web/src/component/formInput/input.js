import React from 'react';

import { Button, CircularProgress, Grid, Paper , Snackbar ,TextField, Typography} from '@mui/material';

const Input = (props) =>{

    const inputChangeHandler = (e) => {
        props.getInputItems(e.target.value, props.id)
    }

    // Lib.uniqArray(props)
    return(
        <div>
            <TextField
          id="outlined-textarea"
          label={props.label}
          placeholder={props.label}
          multiline
          variant="outlined"
          fullWidth
          onChange ={inputChangeHandler}
        />
        </div>
    )
}

export default Input
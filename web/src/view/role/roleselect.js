import React from 'react';

import { makeStyles } from '@mui/styles';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import './roleselect.css'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    backgroundColor : '#fff'
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SimpleSelect(props) {

  const classes = useStyles();
  const [role, setRole] = React.useState('');

  const handleChange = (event) => {
    setRole(event.target.value);
    props.getRole(event.target.value)
  };

  return (
    <div>
      <FormControl variant="filled" className={classes.formControl}>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={role}
          onChange={handleChange}
        >
         <MenuItem value={'Client'}>Client</MenuItem>
         <MenuItem value={'Agent'}>Agent</MenuItem>
        </Select>

      </FormControl>
    </div>
  );
}
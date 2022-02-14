import React from 'react';
import Cards from '@Components/Card/'
import Button from '@mui/material/Button';
import './allowControl.css'

export default function allowControl(props) {
    console.log(props)
    const onClickHandler = () =>{
        props.getCtrlStatus('allowShareScreen')
    }

  return (
    <div className={'allowControl'}>
        <Cards className="expense-item">
            <h1>Agent seek permission to <br></br> share screen</h1>
            <Button className = {'btn'} variant="contained" color="primary" onClick={onClickHandler}>Allow</Button>
        </Cards>
    </div>
  );
}
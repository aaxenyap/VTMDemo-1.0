import React from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Cards from '@Components/Card/'
import './thankyou.css'

export default function thankYou() {

  return (
    <div className={'root'}>
        <Cards className="expense-item">
            <h1>Thank you agent is working on it</h1>
            <LinearProgress className ={'linear_progress'} />
        </Cards>
    </div>
  );
}

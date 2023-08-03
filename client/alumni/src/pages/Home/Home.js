import React, { useEffect, useState } from 'react';
import {Button} from '@mui/material';

function Home() {
  useEffect(()=>{
    
  },[]);
  return (/*
    <div className='Home'>
      <div className='account'>
        {accounts && accounts.map((account) => (
          <p key={account._id}>{account.Email}</p>
        ))}
      </div>
    </div>*/
    <Button variant='outlined'>Save</Button>
  )
}

export default Home
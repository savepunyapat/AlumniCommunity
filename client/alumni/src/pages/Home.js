import React, { useEffect, useState } from 'react';
import {Button} from '@mui/material';

function Home() {
  const [accounts, setAccounts] = useState(null);
  useEffect(() => {
    const fetchAccount = async () => {
      const response = await fetch("http://localhost:3000/allAccount")
      const json = await response.json()

      if (response.ok) {
        console.log(json)
        setAccounts(json)
      }
    }
    fetchAccount();
  }, []);
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
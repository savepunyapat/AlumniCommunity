import React, { useEffect, useState } from 'react';


function Home() {
  const [accounts, setAccounts] = useState(null);
  useEffect(() => {
    const fetchAccount = async () => {
      const response = await fetch("http://localhost:3000/AllAccount")
      const json = await response.json()

      if (response.ok) {
        console.log(json)
        setAccounts(json)
      }
    }
    fetchAccount();
  }, []);
  return (
    <div className='Home'>
      <div className='account'>
        {accounts && accounts.map((account) => (
          <p key={account._id}>{account.Address}</p>
        ))}
      </div>
    </div>
  )
}

export default Home
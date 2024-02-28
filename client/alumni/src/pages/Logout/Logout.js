import React, { useEffect } from 'react'
import {Navigate, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';
import { useAuth } from '../../Context/auth';
function Logout() {
    const {LogoutUser} = useAuth();

    useEffect(() => {
        LogoutUser();
    }, [LogoutUser]);
  return (
    <Navigate to={'/'}/>
  )
}

export default Logout
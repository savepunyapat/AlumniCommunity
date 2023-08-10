import React from 'react'
import {Navigate, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';
function Logout() {
    localStorage.removeItem('token');
    Cookies.remove('token',{path:'/'});
    const navigate = useNavigate();
    const redirect = () => {
      navigate('/');
    }
    redirect();
  return (
    <Navigate to={'/'}/>
  )
}

export default Logout
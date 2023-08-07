import React from 'react'
import {useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';
function Logout() {
    localStorage.removeItem('token');
    Cookies.remove('token',{path:'/'});
    const navigate = useNavigate();
  return (
    navigate('/')
  )
}

export default Logout
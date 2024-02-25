import axios from 'axios';
import Cookies from "js-cookie";    
const axiosReq = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    timeout:10000,
});

const axiosWithTokenReq = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    timeout: 10000,
    headers: { Authorization: `Bearer ${Cookies.get("token")}` },
});

const logOut = () =>{
    localStorage.removeItem('token');
}
export {
    axiosReq,
    axiosWithTokenReq,
    logOut
}
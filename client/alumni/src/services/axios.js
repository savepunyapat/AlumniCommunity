import axios from 'axios';
import Cookies from "js-cookie";
export default axios.create({
    baseURL: 'http://localhost:8000',
    timeout:10000,
});

const axiosWithToken = axios.create({
    baseURL: 'http://localhost:8000',
    timeout: 10000,
    headers: { Authorization: `Bearer ${Cookies.get("token")}` },
});

export {axiosWithToken}
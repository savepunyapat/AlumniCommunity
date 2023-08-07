import React, { useEffect, useState } from 'react'
import {axiosReq, axiosWithTokenReq } from '../../services/service';

const Profile = () => {
    const [user,setUser] = useState();
    const getMe = async (event) => {
        console.log('kkkk')
        try {
            const response = await axiosWithTokenReq.get('http://localhost:8000/me');
            setUser(response?.data);
            console.log(JSON.stringify(response?.data));
        } catch (err) {
            console.log(err.message);
        }
    }
    getMe();
    return (
        <div>
            {user && (
                <div>
                    <p>ID: {user.id}</p>
                    <p>First Name: {user.FirstName}</p>
                    <p>Email: {user.Email}</p>
                </div>
            )}
        </div>
    )
}

export default Profile
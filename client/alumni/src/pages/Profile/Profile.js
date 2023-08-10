import React, { useEffect, useState } from 'react'
import {axiosReq, axiosWithTokenReq } from '../../services/service';
import { Grid, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import './Profile.css';
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
        <Container maxWidth="sm">
            {user && (
                <Box id='profile-box' sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }} >
                    <Grid item xs={6}>
                        <TextField disabled placeholder={user.StdID}>รหัสนักศึกษา: {user.StdID}</TextField>
                        <TextField disabled placeholder={user.FirstName}>ชื่อ: {user.FirstName}</TextField>
                        <TextField disabled placeholder={user.LastName}>นามสกุล </TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField disabled placeholder={user.Email}>อีเมล: {user.Email}</TextField>
                        <TextField disabled placeholder={user.PhoneNumber}>เบอร์โทรศัพท์: {user.PhoneNumber}</TextField>
                        <TextField disabled placeholder={user.Course}>สาขา: {user.Course}</TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField disabled placeholder={user.Qualification}>วุฒิการศึกษา: {user.Qualification}</TextField>
                        <TextField disabled placeholder={user.GraduateYear}>ปีจบการศึกษา</TextField>
                        <TextField disabled placeholder={user.Address}>ที่อยู่: {user.Address}</TextField>
                    </Grid>
                    
                    
                    
                    
                </Box>
            )}
        </Container>
    )
}

export default Profile
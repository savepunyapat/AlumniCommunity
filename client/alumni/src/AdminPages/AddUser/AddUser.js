import React from 'react';
import { useState, useEffect } from 'react';
import './AddUser.css';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { axiosReq } from '../../services/service';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import {
    Container,
    Input,
    InputLabel,
    Radio,
    Button,
    RadioGroup,
    FormLabel,

} from '@mui/material';


function AddUser() {
    const [user, setUser] = useState({
        FirstName: '',
        LastName: '',
        StdID: '',
        PhoneNumber: '',
        Permission: '',
        Password: '',
        Email: '',

    });
    const [selectedDate, setSelectedDate] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        console.log(user);
    };
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = { ...user, Birthday: selectedDate }; // Add selected date to user data
        try {
            const response = await axiosReq.post('http://localhost:8000/register', userData);
            console.log('User added:', response.data);
        } catch (error) {
            console.log('Error adding user:', error.message);
        }
    };

    useEffect(() => {
        console.log(user); // Log changes to user state
    }, [user]);
    return (
        <Container className='adduser-wrap-container'>
            <h1>
                เพิ่มบัญชีผู้ใช้
            </h1>
            <form onSubmit={handleSubmit}>
                <Grid sx={{ marginTop: 5 }} className='adduser-grid-container' container spacing={4}>
                    <Grid item xs={10} sm={4}>
                        <TextField
                            required
                            id="FirstName"
                            name="FirstName"
                            label="ชื่อ"
                            variant="outlined"
                            value={user.FirstName}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={10} sm={4}>
                        <TextField
                            required
                            id="LastName"
                            name="LastName"
                            label="นามสกุล"
                            variant="outlined"
                            value={user.LastName}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            required
                            id="Email"
                            name="Email"
                            label="อีเมล"
                            variant="outlined"
                            value={user.Email}
                            onChange={handleInputChange}

                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            required
                            id="StdID"
                            name="StdID"
                            label="รหัสนักศึกษา"
                            variant="outlined"
                            value={user.StdID}
                            onChange={handleInputChange}

                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            id="PhoneNumber"
                            name="PhoneNumber"
                            label="เบอร์โทรศัพท์"
                            variant="outlined"
                            value={user.PhoneNumber}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            id="Password"
                            name="Password"
                            label="รหัสผ่าน"
                            type='password'
                            variant="outlined"
                            value={user.Password}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Basic date picker"
                                value={selectedDate}
                                onChange={handleDateChange}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <FormLabel id="demo-row-radio-buttons-group-label">สถานะ</FormLabel>
                        <RadioGroup
                            required
                            id="Permission"
                            name="Permission"
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            onChange={handleInputChange}
                        >
                            <FormControlLabel value="admin" control={<Radio />} label="Admin" />
                            <FormControlLabel value="user" control={<Radio />} label="User" />
                        </RadioGroup>
                    </Grid>
                </Grid>
                <Button sx={{ margin: 5 }} type='submit' variant='contained' color="info">เพิ่มบัญชี</Button>
            </form>

        </Container>
    );
}

export default AddUser;

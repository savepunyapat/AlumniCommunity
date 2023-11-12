import React from 'react';
import { useState, useEffect } from 'react';
import './AddUser.css';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
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

    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        console.log(user);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(user);
    };

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
                            fullWidth
                            variant="standard"
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
                            fullWidth
                            variant="standard"
                            value={user.LastName}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            required
                            id="StdID"
                            name="StdID"
                            label="รหัสนักศึกษา"
                            fullWidth
                            variant="standard"
                            value={user.StdID}
                            onChange={handleInputChange}

                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            id="PhoneNumber"
                            name="PhoneNumber"
                            label="เบอร์โทรศัพท์"
                            fullWidth
                            variant="standard"
                            value={user.PhoneNumber}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            id="Password"
                            name="Password"
                            label="รหัสผ่าน"
                            fullWidth
                            variant="standard"
                            value={user.Password}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
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

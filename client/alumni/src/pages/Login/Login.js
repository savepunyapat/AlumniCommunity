import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { NavLink, useNavigate } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { axiosReq } from '../../services/service';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../../Context/auth';


export default function Login() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const navigate = useNavigate();
  const { storeTokenInLS } = useAuth();
  const theme = createTheme({
    typography: {
      fontFamily: "Kanit, sans-serif",
    },
  });
  const notifyError = () => toast.error('Invalid Email or Password!', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
  const notifySuccess = () => toast.success('Login Success!', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const response = await axiosReq.post('/login', { Email, Password });
      if (response?.data?.message === 'invalid-user') {
        notifyError();
        return;
      }
      const accessToken = response?.data?.accessToken;
      storeTokenInLS(accessToken);
      
      localStorage.setItem('reloadNeeded', 'true');

      window.location.reload();

      
    } catch (err) {
      console.log(err.message)
    }
  };
  useEffect(() => {
    document.title = "เข้าสู่ระบบ | CS-Alumni";
  }, []);


  return (
    <ThemeProvider theme={theme}>
      <Container sx={{
        boxShadow: 2,
        marginTop: 20,
        marginBottom: 20,
        borderRadius: 2,
      }} component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            เข้าสู่ระบบ
          </Typography>
          <ToastContainer />
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3}}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  autoFocus
                  id="Email"
                  label="อีเมล"
                  name="Email"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="Password"
                  label="รหัสผ่าน"
                  type="password"
                  id="Password"
                  autoComplete="new-password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              style={{ backgroundColor: "#0776bc" }}
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
import React, { useEffect, useState } from 'react'
import {
    Container,
    ImageList,
    ImageListItem,
    Modal,
    Box,
    IconButton,
    Typography,
    ImageListItemBar,
    ThemeProvider,
    CircularProgress,
    Button,
    TextField,
    createTheme,
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { axiosReq } from '../../services/service';


function AlumniSearch() {
    const [alumni, setAlumni] = useState([]);
    const [searchTerm, setSearchTerm] = useState({
      firstName: '',
      lastName: '',
      stdID: '',
      workplace: '',
    });
    const [loading, setLoading] = useState(false);
  
    const searchBoxStyle = {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '4vh',
    };
  
    const resultBoxStyle = {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '4vh',
    };
  
    const theme = createTheme({
      typography: {
        fontFamily: 'Kanit, sans-serif',
      },
    });
  
    const handleSearchChange = (field) => (event) => {
      setSearchTerm({
        ...searchTerm,
        [field]: event.target.value,
      });
    };
  
    const handleSearchSubmit = (event) => {
      event.preventDefault();
      // Trigger API call with updated search terms
      fetchAlumniData();
    };
  
    const fetchAlumniData = async () => {
      try {
        setLoading(true);
        const response = await axiosReq.get('http://localhost:8000/search', {
          params: searchTerm,
        });
        setAlumni(response.data);
      } catch (error) {
        console.error('Error fetching alumni:', error);
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <ThemeProvider theme={theme}>
        <Container sx={{ fontFamily: 'Kanit, sans-serif', marginTop: '4vh' }}>
          <Typography variant="h4" sx={{ textAlign: 'center' }}>
            ค้นหาศิษย์เก่า
          </Typography>
          <Box sx={searchBoxStyle}>
            <form onSubmit={handleSearchSubmit}>
              <TextField
                id="firstName"
                label="First Name"
                variant="outlined"
                value={searchTerm.firstName}
                onChange={handleSearchChange('firstName')}
              />
              <TextField
                id="lastName"
                label="Last Name"
                variant="outlined"
                value={searchTerm.lastName}
                onChange={handleSearchChange('lastName')}
              />
              <TextField
                id="stdID"
                label="StdID"
                variant="outlined"
                value={searchTerm.stdID}
                onChange={handleSearchChange('stdID')}
              />
              <TextField
                id="workplace"
                label="Workplace"
                variant="outlined"
                value={searchTerm.workplace}
                onChange={handleSearchChange('workplace')}
              />
              <Button type="submit" variant="contained" startIcon={<SearchIcon />}>
                ค้นหา
              </Button>
            </form>
          </Box>
          <Box sx={resultBoxStyle}>
            {loading ? (
              <CircularProgress />
            ) : alumni.length === 0 ? (
              <Typography variant="body1" sx={{ textAlign: 'center', marginTop: 2 }}>
                ไม่พบข้อมูลศิษย์เก่า.
              </Typography>
            ) : (
              <ul>
                {alumni.map((alum, index) => (
                  <li key={index}>{alum.FirstName} {alum.LastName} - {alum.StdID} </li>
                  // Display more information as needed
                ))}
              </ul>
            )}
          </Box>
        </Container>
      </ThemeProvider>
    );
  }
  
  export default AlumniSearch;
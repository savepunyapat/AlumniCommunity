import React, { useEffect, useState } from "react";
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
  makeStyles,
  Grid,
  createTheme,
  Card,
  CardContent,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { axiosReq, axiosWithTokenReq } from "../../services/service";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

const theme = createTheme({
  typography: {
    fontFamily: "Kanit, sans-serif",
  },
});

function AlumniSearch() {
  const [alumni, setAlumni] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [emptySearch, setEmptySearch] = useState(false);

  const searchBoxStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "4vh",
  };

  const resultBoxStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "4vh",
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setEmptySearch(false);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    if (searchTerm.trim() === "") {
      setEmptySearch(true);
      return;
    }

    getAllAlumni();
  };

  const filterAlumni = () => {
    return alumni.filter((alum) => {
      const fullName = `${alum.FirstName} ${alum.LastName}`;
      return (
        fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alum.StdID.includes(searchTerm) ||
        alum.Email.includes(searchTerm) ||
        alum.WorkPlace.some((work) => work.CompanyName.includes(searchTerm)) ||
        alum.Education.some((edu) => edu.Course.includes(searchTerm))
      );
    });
  };

  const getAllAlumni = async () => {
    try {
      setLoading(true);
      const response = await axiosWithTokenReq.get("/getAllAlumni");
      setAlumni(response.data);
    } catch (error) {
      console.error("Error fetching alumni:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllAlumni();
    document.title = "ค้นหาศิษย์เก่า | CS-Alumni";
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Container sx={{ fontFamily: "Kanit, sans-serif", marginTop: "4vh", minHeight: '70vh' }}>
        <Typography variant="h4" sx={{ textAlign: "center" }}>
          ค้นหาศิษย์เก่า
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "4vh" }}>
          <form onSubmit={handleSearchSubmit} sx={{ display: "flex", alignItems: "center" }}>
            <TextField
              id="searchTerm"
              label="Search"
              variant="outlined"
              value={searchTerm}
              onChange={handleSearchChange}
              error={emptySearch}
              helperText={emptySearch ? "Please enter a search term" : "ค้นหาจากชื่อ สกุล รหัสนักศึกษา ที่ทำงาน"}
              sx={{ marginRight: "8px" }}
            />
          </form>
        </Box>
        <Box sx={resultBoxStyle}>
          {loading ? (
            <CircularProgress />
          ) : filterAlumni().length === 0 ? (
            <Typography
              variant="body1"
              sx={{ textAlign: "center", marginTop: "20vh" }}
            >
              ไม่พบข้อมูลศิษย์เก่า.
            </Typography>
          ) : (
            <Grid container spacing={2}>
              {filterAlumni().map((alum, index) => (
                <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                  <Card variant="outlined" sx={{ minWidth: 275, margin: "2vh" }}>
                    <CardContent>
                      <Typography variant="h6">
                        {alum.FirstName} {alum.LastName}
                      </Typography>
                      <Typography variant="body1">
                        รหัสนักศึกษา: {alum.StdID}
                      </Typography>
                      <AccountBoxIcon />
                      <Typography variant="body1">
                        อีเมล : {alum.Email}
                      </Typography>
                      {alum.WorkPlace.length === 0 ? (
                        <Typography variant="body1">
                          ที่ทำงาน : ไม่มีข้อมูล
                        </Typography>
                      ) : (
                        <>
                          {alum.WorkPlace.map((work, index) => (
                            <Typography key={index} variant="body1">
                              ที่ทำงาน : {work.CompanyName}
                            </Typography>
                          ))}
                        </>
                      )}
                      {alum.Education.length === 0 ? (
                        <Typography variant="body1">
                          สถานศึกษา : ไม่มีข้อมูล
                        </Typography>
                      ) : (
                        <>
                          {alum.Education.map((edu, index) => (
                            <Typography key={index} variant="body1">
                              การศึกษา : {edu.Course}
                            </Typography>
                          ))}
                        </>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default AlumniSearch;

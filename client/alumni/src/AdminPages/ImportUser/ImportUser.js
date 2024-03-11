import React, { useState } from "react";
import "./ImportUser.css";
import {
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  Modal,
  Box,
  InputLabel,
  IconButton,
  CircularProgress,
  createTheme,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { axiosWithTokenReq } from "../../services/service";

function ImportUser() {
  const [file, setFile] = useState(null);
  const [previewData, setPreviewData] = useState(null);
  const FontTheme = createTheme({
    typography: {
      fontFamily: "Kanit, sans-serif",
    },
  });

  const handleImportSubmit = async (e) => {
    try {
      const response = await axiosWithTokenReq.post(
        "/import/user",
        previewData
      );
      console.log(response);
      setPreviewData(null);
    } catch (err) {
      console.log(err);
    }
  };
  const handleFileChange = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    const response = await axiosWithTokenReq.post("/import", formData);
    setPreviewData(response.data);
    console.log(response);
  };
  return (
    <ThemeProvider theme={FontTheme}>
      <Container sx={{ height: "80vh" }}>
        <Typography variant="h4" sx={{ textAlign: "center", marginTop: "4vh",fontWeight:'bold',marginBottom:'2vh' }}>
          นำเข้าข้อมูลผู้ใช้
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            flexDirection: "column",
          }}
        >
          <label style={{margin:'1vh'}}>Import ข้อมูลผู้ใช้</label>
          <input
            name="ImportFile"
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            style={{margin:'1vh'}}
          />
          <p style={{margin:'1vh'}}>หมายเหตุ สามารถนำเข้าจากไฟล์ .csv เท่านั้น</p>
        </Box>
        <div style={{ height: "70%", overflow: "auto" }}>
          {previewData && (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>First Name</TableCell>
                    <TableCell>Last Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Permission</TableCell>
                    <TableCell>Birthday</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {previewData.map((user, index) => (
                    <>
                      <TableRow key={index}>
                        <TableCell>{user.FirstName}</TableCell>
                        <TableCell>{user.LastName}</TableCell>
                        <TableCell>{user.Email}</TableCell>
                        <TableCell>{user.Permission}</TableCell>
                        <TableCell>{user.Birthday}</TableCell>
                      </TableRow>
                    </>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </div>
        <Container sx={{justifyContent:'center',display:'flex'}}>
          {previewData && (
            <Button variant="contained" onClick={handleImportSubmit}>
              ยืนยันการนำเข้า
            </Button>
          )}
        </Container>
      </Container>
    </ThemeProvider>
  );
}

export default ImportUser;

import React, { useEffect, useState } from "react";
import { axiosReq, axiosWithTokenReq } from "../../services/service";
import { Grid, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Button } from "@mui/material";
import Cookies from "js-cookie";
import Modal from "@mui/material/Modal";
import "./Profile.css";
import { NavLink } from "react-router-dom";
import ClearIcon from '@mui/icons-material/Clear';
import AddHomeWorkIcon from '@mui/icons-material/AddHomeWork';
import AddHomeIcon from '@mui/icons-material/AddHome';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from "react-router-dom";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [permission, setPermission] = useState(false);
  const [education, setEducation] = useState({});
  const [workplace, setWorkplace] = useState({});
  const [openEducationModal, setOpenEducationModal] = React.useState(false);
  const handleEducationOpen = () => setOpenEducationModal(true);
  const handleEducationClose = () => setOpenEducationModal(false);
  const [openWorkPlaceModal, setOpenWorkPlaceModal] = React.useState(false);
  const handleWorkPlaceOpen = () => setOpenWorkPlaceModal(true);
  const handleWorkPlaceClose = () => setOpenWorkPlaceModal(false);
  const [Address, setAddress] = useState("");

  const [openPasswordModal, setOpenPasswordModal] = React.useState(false);
  const handlePasswordOpen = () => setOpenPasswordModal(true);
  const handlePasswordClose = () => setOpenPasswordModal(false);

  const [openBioModal, setOpenBioModal] = React.useState(false);
  const handleBioOpen = () => setOpenBioModal(true);
  const handleBioClose = () => setOpenBioModal(false);


  const handleUpdateBioSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log(e.target.newAddress.value);
      const newAddress = e.target.newAddress.value;
      setAddress(newAddress);
      console.log(Address);
      const response = await axiosWithTokenReq.put(`http://localhost:8000/acc/${user.id}`, { Address: Address });
      window.location.reload();
    } catch (err) {
      console.log(err.message);
    }
  };


  const handleEducationSubmit = async (e) => {
    try {
      e.preventDefault();
      const Education = {
        Course: e.target.Course.value,
        Qualification: e.target.Qualification.value,
        GraduateYear: e.target.GraduateYear.value,
      };
      const response = await axiosWithTokenReq.put("http://localhost:8000/addEducation", Education);
      window.location.reload();

    } catch (err) {
      console.log(err.message);
    }
  };
  const handleWorkPlaceSubmit = async (e) => {
    try {
      e.preventDefault();
      const WorkPlace = {
        CompanyName: e.target.CompanyName.value,
        Position: e.target.Position.value,
        StartDate: e.target.StartDate.value,
        EndDate: e.target.EndDate.value,
      };
      const response = await axiosWithTokenReq.put("http://localhost:8000/addWorkPlace", WorkPlace);
      window.location.reload();
    } catch (err) {
      console.log(err.message);
    }
  };


  const style = {
    position: 'absolute',

    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height: 300,
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 10,
    borderRadius: "10px",
  };

  const deleteEducation = async (index) => {
    try {
      const response = await axiosWithTokenReq.delete(`http://localhost:8000/deleteEducation/${index}`);
      window.location.reload();
    } catch (err) {
      console.log(err.message);
    };
  }

  const deleteWorkPlace = async (index) => {
    try {
      const response = await axiosWithTokenReq.delete(`http://localhost:8000/deleteWorkPlace/${index}`);
      window.location.reload();
    } catch (err) {
      console.log(err.message);
    };
  }

  const handleDeleteWorkPlaceClick = (index) => {
    deleteWorkPlace(index);
  }
  const handleDeleteEducaitonClick = (index) => {
    deleteEducation(index);
  };

  const closePasswordModal = () => {
    setOpenPasswordModal(false);
  }

  const closeEducationModal = () => {
    setOpenEducationModal(false);
  }
  const closeWorkPlaceModal = () => {
    setOpenWorkPlaceModal(false);
  }
  const closeBioModal = () => {
    setOpenBioModal(false);
  }
  const handleChangePasswordSubmit = async (e) => {
    try {
      e.preventDefault();
      const Password = {
        oldPassword: e.target.oldPassword.value,
        newPassword: e.target.newPassword.value,
        confirmPassword: e.target.confirmPassword.value,
      };
      const response = await axiosWithTokenReq.post("http://localhost:8000/changePassword", Password);
      console.log(response?.data);
    } catch (err) {
      console.log(err.message);
    }
  };
  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };
  const getMe = async () => {
    try {
      const response = await axiosWithTokenReq.get("http://localhost:8000/me");
      setUser(response?.data);
      setEducation(response?.data?.Education);
      setWorkplace(response?.data?.WorkPlace);
      console.log(education);
      console.log(workplace);
      console.log(user.Permission);
      if (user.Permission === "admin") {
        setPermission(true);
      } else {
        setPermission(false);
      }
      console.log(JSON.stringify(response?.data));
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    console.log(permission);
    getMe();
    console.log(permission);
  }, user, openEducationModal, openWorkPlaceModal);

  return (
    <Container maxWidth="lg">
      {user && (
        <div>
          <Box
            id="bio-box"
            sx={{
              marginTop: "4vh",
              width: "100%",
              height: "20vh",
              borderRadius: "10px",
            }}
          >
            <Typography className="profile-user-info">
              {user.FirstName + "    " + user.LastName}
            </Typography>
            <Typography className="profile-user-info">{user.Email}</Typography>
            <div><Button sx={{marginTop:2}} color="info" variant="text" startIcon={<EditIcon color="info" />} onClick={handlePasswordOpen} > เปลี่ยนรหัสผ่าน </Button></div>
            <Modal
              open={openPasswordModal}
              onClose={handlePasswordClose}
              className="profile-modals"

            >
              <Box sx={style}>
                <form onSubmit={handleChangePasswordSubmit}>
                  <label>รหัสผ่านปัจจุบัน</label>
                  <input type="password" name="oldPassword" placeholder="รหัสผ่าน" />
                  <br /><br />
                  <label>รหัสผ่านใหม่</label>
                  <input type="password" name="newPassword" placeholder="รหัสผ่านใหม่" />
                  <br /><br />
                  <label>ยืนยันรหัสผ่านใหม่</label>
                  <input type="password" name="confirmPassword" placeholder="ยืนยันรหัสผ่านใหม่" />
                  <br /><br />
                  <Button sx={{marginRight:2}} type="submit" variant="contained" color="success">
                    แก้ไข
                  </Button>
                  <Button onClick={closePasswordModal} variant="contained" color="error">
                    ปิด
                  </Button>
                </form>
              </Box>
            </Modal>
          </Box>
          <Box
            id="profile-box"
            sx={{
              width: "100%",
              height: "45vh",
              alignContent: "center",
              alignItems: "center",
              borderRadius: "10px",
            }}
          >
            <Grid
              container
              display="flex"
              alignItems="center"
              justifyContent="center"
              spacing={2}
              direction="collumn"
            >
              <Grid item xs={3}>
                <p>รหัสนักศึกษา</p>
                <TextField disabled value={user.StdID}>
                  รหัสนักศึกษา: {user.StdID}
                </TextField>
              </Grid>
              <Grid item xs={3}>
                <p>เบอร์โทรศัพท์</p>
                <TextField disabled value={user.PhoneNumber}>
                  ชื่อ: {user.FirstName}
                </TextField>
              </Grid>
              <Grid item xs={3}>
                <p>สถานะ</p>
                <TextField disabled value={user.Permission}></TextField>
              </Grid>

            </Grid>
            <Box id="profile-address-box">
              <p>ที่อยู่</p>
              <p id="profile-address-text" >{user.Address}</p>
            </Box>
            <Box>
              <div className="profile-edit-btn">
                <Button variant="text" color="info" onClick={handleBioOpen} startIcon={<EditIcon color="info" />}>แก้ไข</Button>
              </div>
              <Modal
                open={openBioModal}
                onClose={handleBioClose}
                className="profile-modals"
              >
                <Box sx={style}>
                  <form onSubmit={handleUpdateBioSubmit}>
                    <label>ที่อยู่</label>
                    <input type="text" id="profile-address-input" onChange={handleAddressChange} name="newAddress" placeholder="ที่อยู่" />
                    <br /><br />
                    <Button sx={{ marginRight: 2 ,marginTop:10 }} type="submit" variant="contained" color="success">
                      แก้ไข
                    </Button>
                    <Button sx={{marginTop:10}} onClick={closeBioModal} variant="contained" color="error">
                      ปิด
                    </Button>
                  </form>
                </Box>
              </Modal>
            </Box>
          </Box>
        </div>
      )}
      <div className="profile-education-workplace-wrap">


        <div className="profile-education-div">
          <h2 className="profile-h2-title">ประวัติการศึกษา</h2>
          <div>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 400 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>คณะ/สาขา</TableCell>
                    <TableCell align="right">วุฒิการศึกษา</TableCell>
                    <TableCell align="right">ปีที่สำเร็จการศึกษา</TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Array.isArray(education)
                    ? education.map((edu, index) => (
                      <TableRow
                        key={edu}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">
                          {edu.Course}
                        </TableCell>
                        <TableCell align="right">{edu.Qualification}</TableCell>
                        <TableCell align="right">{edu.GraduateYear}</TableCell>
                        <TableCell align="right"><Button sx={{marginRight:2}} variant="contained" color="info" ><EditIcon /></Button><Button variant="contained" onClick={() => handleDeleteEducaitonClick(index)} color="error" ><ClearIcon /></Button></TableCell>
                      </TableRow>
                    ))
                    : null}
                </TableBody>
              </Table>
            </TableContainer>

            {/*{Array.isArray(education)
              ? education.map((edu, index) => (
                <div className="profile-edu-container" key={edu}>
                  <div className="profile-edu-items"><p>{edu.Course}</p><p>{edu.Qualification}</p><p>{edu.GraduateYear}</p></div>

                  <Button className="profile-edu-delbtn" variant="contained" onClick={() => handleDeleteEducaitonClick(index)} color="error" ><DeleteIcon /></Button>

                </div>
              ))
              : null}*/}
          </div>

          <Button id="profile-add-btn" variant="contained" onClick={handleEducationOpen} color="success">
            <AddHomeIcon />
          </Button>
          <Modal
            open={openEducationModal}
            onClose={handleEducationClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className="profile-modals"
          >
            <Box sx={style}>
              <form onSubmit={handleEducationSubmit}>
                <label>คณะ/สาขา</label>
                <input type="text" name="Course" placeholder="Course" />
                <br /><br />
                <label>วุฒิการศึกษา</label>
                <input
                  type="text"
                  name="Qualification"
                  placeholder="Qualification"
                />
                <br /><br />
                <label>ปีที่สำเร็จการศึกษา</label>
                <input
                  type="text"
                  name="GraduateYear"
                  placeholder="GraduateYear"
                />
                <br /><br />
                <Button sx={{ marginRight: 2 }} type="submit" variant="contained" color="success">
                  เพิ่ม
                </Button>
                <Button onClick={closeEducationModal} variant="contained" color="error">
                  ปิด
                </Button>
              </form>
            </Box>
          </Modal>
        </div>
        <div className="profile-workplace-div">
          <h2 className="profile-h2-title">ประวัติการทำงาน</h2>
          <div className="profile-items-list">
            <TableContainer  component={Paper}>
              <Table sx={{ minWidth: 400 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>สถานที่ทำงาน/บริษัท</TableCell>
                    <TableCell align="right">ตำแหน่ง</TableCell>
                    <TableCell align="right">วันที่เริ่มงาน</TableCell>
                    <TableCell align="right">วันที่ออก</TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Array.isArray(workplace)
                    ? workplace.map((work, index) => (
                      <TableRow
                        key={work}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">
                          {work.CompanyName}
                        </TableCell>
                        <TableCell align="right">{work.Position}</TableCell>
                        <TableCell align="right">{work.StartDate}</TableCell>
                        <TableCell align="right">{work.EndDate}</TableCell>
                        <TableCell align="right"><Button sx={{marginRight:2}} variant="contained" color="info" ><EditIcon /></Button><Button variant="contained" onClick={() => handleDeleteWorkPlaceClick(index)} color="error" ><ClearIcon /></Button></TableCell>
                      </TableRow>
                    ))
                    : null}
                </TableBody>
              </Table>
            </TableContainer>

            {/*<div className="profile-workplace-label"><p>หน่วยงาน/บริษัท</p><p>ตำแหน่ง</p><p>วันที่เริ่มงาน</p><p>วันที่ออก</p></div>
            {Array.isArray(workplace)
              ? workplace.map((work, index) => (
                <div>
                  <div key={work}>
                    <div className="profile-workplace-items"><p>{work.CompanyName}</p><p>{work.Position}</p><p>{work.StartDate}</p><p>{work.EndDate}</p></div>

                    <Button variant="contained" onClick={() => handleDeleteWorkPlaceClick(index)} color="error" ><DeleteIcon /></Button>
                  </div>
                </div>

              ))
              : null}*/}
          </div>
          <Button variant="contained" onClick={handleWorkPlaceOpen} color="success">
            <AddHomeWorkIcon />
          </Button>
          <Modal
            open={openWorkPlaceModal}
            onClose={handleWorkPlaceClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className="profile-modals"
          >
            <Box sx={style}>
              <form onSubmit={handleWorkPlaceSubmit}>
                <label>สถานที่ทำงาน/บริษัท</label>
                <input type="text" name="CompanyName" placeholder="CompanyName" />
                <br /><br />
                <label>ตำแหน่ง</label>
                <input type="text" name="Position" placeholder="Position" />
                <br /><br />
                <label>วันที่เริ่มงาน</label>
                <input type="date" name="StartDate" placeholder="StartDate" />
                <br /><br />
                <label>วันที่ออก</label>
                <input type="date" name="EndDate" placeholder="EndDate" />
                <br /><br />
                <Button sx={{ marginRight: 2 }} type="submit" variant="contained" color="success">
                  เพิ่ม
                </Button>
                <Button variant="contained" onClick={closeWorkPlaceModal} color="error">
                  ปิด
                </Button>
              </form>
            </Box>
          </Modal>
        </div>
      </div>



      {permission ? (
        <div className="profile-admin-div">
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            spacing={2}
          >
            <Grid item xs={6}>
              <NavLink to="/admin/posts">
                <Button variant="contained">จัดการข่าวสาร</Button>
              </NavLink>
            </Grid>
            <Grid item xs={6}>
              <NavLink to="/admin/users">
                <Button variant="contained">จัดการบัญชีผู้ใช้</Button>
              </NavLink>
            </Grid>
          </Grid>
        </div>
      ) : null}
    </Container>
  );
};

export default Profile;

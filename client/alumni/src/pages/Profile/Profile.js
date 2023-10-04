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
import DeleteIcon from '@mui/icons-material/Delete';
import AddHomeWorkIcon from '@mui/icons-material/AddHomeWork';
import AddHomeIcon from '@mui/icons-material/AddHome';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from "react-router-dom";


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
    <Container maxWidth="sm">
      <div className="profile-header">
        <h1>โปรไฟล์</h1>
      </div>
      {user && (
        <div>
          <Box
            id="bio-box"
            sx={{
              width: "100%",
              height: "20vh",
              borderRadius: "10px",
            }}
          >
            <Typography className="profile-user-info">
              {user.FirstName + "    " + user.LastName}
            </Typography>
            <Typography className="profile-user-info">{user.Email}</Typography>
            <div><Button variant="text" startIcon={<EditIcon />} onClick={handlePasswordOpen} color="success"> เปลี่ยนรหัสผ่าน </Button></div>
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
                  <Button type="submit" variant="contained" color="success">
                    Add
                  </Button>
                  <Button onClick={closePasswordModal} variant="contained" color="error">
                    Close
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
              spacing={1}
              direction="row"
            >
              <Grid item xs={5}>
                <p>รหัสนักศึกษา</p>
                <TextField disabled value={user.StdID}>
                  รหัสนักศึกษา: {user.StdID}
                </TextField>
              </Grid>
              <Grid item xs={5}>
                <p>เบอร์โทรศัพท์</p>
                <TextField disabled value={user.PhoneNumber}>
                  ชื่อ: {user.FirstName}
                </TextField>
              </Grid>
              <Grid item xs={5}>
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
                <Button variant="text" color="success" onClick={handleBioOpen} startIcon={<EditIcon />}>แก้ไข</Button>
              </div>
              <Modal
                open={openBioModal}
                onClose={handleBioClose}
                className="profile-modals"
              >
                <Box sx={style}>
                  <form onSubmit={handleUpdateBioSubmit}>
                    <label>ที่อยู่</label>
                    <input type="text" name="newAddress" placeholder="ที่อยู่" />
                    <br /><br />
                    <Button sx={{marginRight:2}} type="submit" variant="contained" color="success">
                      Add
                    </Button>
                    <Button onClick={closeBioModal} variant="contained" color="error">
                      Close
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
            {Array.isArray(education)
              ? education.map((edu, index) => (
                <div className="profile-edu-container" key={edu}>
                  <div className="profile-edu-items"><p>{edu.Course}</p><p>{edu.Qualification}</p><p>{edu.GraduateYear}</p></div>

                  <Button className="profile-edu-delbtn" variant="contained" onClick={() => handleDeleteEducaitonClick(index)} color="error" ><DeleteIcon /></Button>

                </div>
              ))
              : null}
          </div>

          <Button variant="contained" onClick={handleEducationOpen} color="success">
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
                <label>Course</label>
                <input type="text" name="Course" placeholder="Course" />
                <br /><br />
                <label>Qualification</label>
                <input
                  type="text"
                  name="Qualification"
                  placeholder="Qualification"
                />
                <br /><br />
                <label>GraduateYear</label>
                <input
                  type="text"
                  name="GraduateYear"
                  placeholder="GraduateYear"
                />
                <br /><br />
                <Button sx={{marginRight:2}} type="submit" variant="contained" color="success">
                  Add
                </Button>
                <Button onClick={closeEducationModal} variant="contained" color="error">
                  Close
                </Button>
              </form>
            </Box>
          </Modal>
        </div>
        <div className="profile-workplace-div">
          <h2 className="profile-h2-title">ประวัติการทำงาน</h2>
          <div className="profile-items-list">
            <div className="profile-workplace-label"><p>หน่วยงาน/บริษัท</p><p>ตำแหน่ง</p><p>วันที่เริ่มงาน</p><p>วันที่ออก</p></div>
            {Array.isArray(workplace)
              ? workplace.map((work, index) => (
                <div>
                  <div key={work}>
                    <div className="profile-workplace-items"><p>{work.CompanyName}</p><p>{work.Position}</p><p>{work.StartDate}</p><p>{work.EndDate}</p></div>

                    <Button variant="contained" onClick={() => handleDeleteWorkPlaceClick(index)} color="error" ><DeleteIcon /></Button>
                  </div>
                </div>

              ))
              : null}
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
                <label>CompanyName</label>
                <input type="text" name="CompanyName" placeholder="CompanyName" />
                <br /><br />
                <label>Position</label>
                <input type="text" name="Position" placeholder="Position" />
                <br /><br />
                <label>StartDate</label>
                <input type="date" name="StartDate" placeholder="StartDate" />
                <br /><br />
                <label>EndDate</label>
                <input type="date" name="EndDate" placeholder="EndDate" />
                <br /><br />
                <Button sx={{marginRight:2}} type="submit" variant="contained" color="success">
                  Add
                </Button>
                <Button variant="contained" onClick={closeWorkPlaceModal} color="error">
                  Close
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
                <Button variant="contained">Post Manager</Button>
              </NavLink>
            </Grid>
            <Grid item xs={6}>
              <NavLink to="/admin/users">
                <Button variant="contained">Account Manager</Button>
              </NavLink>
            </Grid>
          </Grid>
        </div>
      ) : null}
    </Container>
  );
};

export default Profile;

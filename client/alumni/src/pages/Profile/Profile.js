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

const Profile = () => {
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
  const [newAddress, setNewAddress] = useState("");

  const handleNewAddress = (e) => {
    setNewAddress(e.target.value);
    console.log(newAddress);
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
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: "10px",
  };

  const deleteEducation = async (index) => {
    try {
      const response = await axiosWithTokenReq.delete("http://localhost:8000/deleteEducation", {index});
      window.location.reload();
    }catch(err) {
      console.log(err.message);
    };
  }

  const deleteWorkPlace = async (index) => {
    try {
      const response = await axiosWithTokenReq.delete("http://localhost:8000/deleteWorkPlace", {index});
      window.location.reload();
    }catch(err) {
      console.log(err.message);
    };
  }

  const handleDeleteWorkPlaceClick = (index) => {
    deleteWorkPlace(index);
  }
  const handleDeleteEducaitonClick = (index) => {
    deleteEducation(index);
  };

  const closeEducationModal = () => {
    setOpenEducationModal(false);
  }
  const closeWorkPlaceModal = () => {
    setOpenWorkPlaceModal(false);
  }
  
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
  }, user,openEducationModal,openWorkPlaceModal);

  useEffect(() => { 
    
  },);

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
                <TextField value={user.Permission}></TextField>
              </Grid>
            </Grid>
            <Box id="profile-address-box">
              <p>ที่อยู่</p>
              <TextField onChange={handleNewAddress} defaultValue={user.Address}></TextField>
            </Box>
          </Box>
        </div>
      )}
      <div className="profile-education-div">
        <h2>Education</h2>
        <ul>
          {Array.isArray(education)
            ? education.map((edu, index) => (
              <div key={edu}>
                <li>{edu.Course}</li>
                <li>{edu.Qualification}</li>
                <li>{edu.GraduateYear}</li>
                <Button variant="contained" onClick={() => handleDeleteEducaitonClick(index)} color="error" ><DeleteIcon/></Button>
                
              </div>
            ))
            : null}
        </ul>

        <Button variant="contained" onClick={handleEducationOpen} color="success">
          <AddHomeIcon/>
        </Button>
        <Modal
          open={openEducationModal}
          onClose={handleEducationClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <form onSubmit={handleEducationSubmit}>
              <label>Course</label>
              <input type="text"  name="Course" placeholder="Course" />
              <br />
              <label>Qualification</label>
              <input
                type="text"
                name="Qualification"
                placeholder="Qualification"
              />
              <br />
              <label>GraduateYear</label>
              <input
                type="text"
                name="GraduateYear"
                placeholder="GraduateYear"
              />
              <br />
              <Button type="submit" variant="contained" color="success">
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
        <h2>Workplace</h2>
        <ul>
          {Array.isArray(workplace)
            ? workplace.map((work, index) => (
                <div key={work}>
                  <li>{work.CompanyName}</li>
                  <li>{work.Position}</li>
                  <li>{work.StartDate}</li>
                  <li>{work.EndDate}</li>
                  <Button variant="contained" onClick={() => handleDeleteWorkPlaceClick(index)} color="error" ><DeleteIcon/></Button>
                </div>
              ))
            : null}
        </ul>
        <Button variant="contained" onClick={handleWorkPlaceOpen} color="success">
          <AddHomeWorkIcon/>
        </Button>
        <Modal
          open={openWorkPlaceModal}
          onClose={handleWorkPlaceClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <form onSubmit={handleWorkPlaceSubmit}>
              <label>CompanyName</label>
              <input type="text" name="CompanyName" placeholder="CompanyName" />
              <br />
              <label>Position</label>
              <input type="text" name="Position" placeholder="Position" />
              <br />
              <label>StartDate</label>
              <input type="date" name="StartDate" placeholder="StartDate" />
              <br />
              <label>EndDate</label>
              <input type="date" name="EndDate" placeholder="EndDate" />
              <br />
              <Button type="submit" variant="contained" color="success">
                Add
              </Button>
              <Button variant="contained" onClick={closeWorkPlaceModal} color="error">
                Close
              </Button>
            </form>
          </Box>
        </Modal>
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
              <NavLink>
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

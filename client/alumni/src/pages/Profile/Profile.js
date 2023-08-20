import React, { useEffect, useState } from "react";
import { axiosReq, axiosWithTokenReq } from "../../services/service";
import { Grid, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Button } from "@mui/material";
import Cookies from "js-cookie";
import "./Profile.css";
import { NavLink } from "react-router-dom";
const Profile = () => {
  const [user, setUser] = useState();
  const [permission, setPermission] = useState(false);
  const getMe = async () => {
    try {
      const response = await axiosWithTokenReq.get(
        "http://localhost:8000/me"
      );
      setUser(response?.data);
      console.log(user.Permission);
      if ((user.Permission === "admin")) {
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

    console.log(permission)
    getMe();
    console.log(permission)

  }, user);

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
            <Typography className='profile-user-info'>{user.FirstName + "    " + user.LastName}</Typography>
            <Typography className='profile-user-info'>{user.Email}</Typography>

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

            <Grid container display='flex' alignItems="center" justifyContent="center" spacing={1} direction="row">
              <Grid item xs={5}>
                <p>รหัสนักศึกษา</p>
                <TextField disabled placeholder={user.StdID}>
                  รหัสนักศึกษา: {user.StdID}
                </TextField>
              </Grid>
              <Grid item xs={5}>
                <p>เบอร์โทรศัพท์</p>
                <TextField disabled placeholder={user.FirstName}>
                  ชื่อ: {user.FirstName}
                </TextField>
              </Grid>
              <Grid item xs={5}>
                <p>สาขาวิชา</p>
                <TextField disabled placeholder={user.LastName}>
                  นามสกุล{" "}
                </TextField>
              </Grid>
              <Grid item xs={5}>
                <p>วุฒิการศึกษา</p>
                <TextField disabled placeholder={user.StdID}>
                  รหัสนักศึกษา: {user.StdID}
                </TextField>
              </Grid>
              <Grid item xs={5}>
                <p>ปีที่สำเร็จการศึกษา</p>
                <TextField disabled placeholder={user.FirstName}>
                  ชื่อ: {user.FirstName}
                </TextField>
              </Grid>
              <Grid item xs={5}>
                <p>สถานะ</p>
                <TextField disabled placeholder={user.Permission}>
                  
                </TextField>
              </Grid>
            </Grid>
            <Box id="profile-address-box">
              <p>ที่อยู่</p>
              <TextField placeholder={user.Address}></TextField>
            </Box>
          </Box>
        </div>
      )}
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

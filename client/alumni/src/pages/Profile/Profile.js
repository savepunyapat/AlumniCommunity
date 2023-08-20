import React, { useEffect, useState } from "react";
import { axiosReq, axiosWithTokenReq } from "../../services/service";
import { Grid, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Button } from "@mui/material";
import Cookies from "js-cookie";
import "./Profile.css";
import { NavLink } from "react-router-dom";
const Profile = () => {
  const [user, setUser] = useState();
  const [permission, setPermission] = useState(false);
  useEffect(() => {
    const getMe = async () => {
      console.log("kkkk");
      try {
        const response = await axiosWithTokenReq.get(
          "http://localhost:8000/me"
        );
        setUser(response?.data);
        if ((user.Permission = "admin")) {
          setPermission(true);
        }
        console.log(JSON.stringify(response?.data));
      } catch (err) {
        console.log(err.message);
      }
    };

    getMe();
    
  }, user);

  return (
    <Container maxWidth="sm">
      <div className="profile-header">
        <h1>โปรไฟล์</h1>
      </div>
      {user && (
        <Box
          id="profile-box"

          
        >
          <Grid container alignItems="center" justifyContent="center" spacing={2} direction="row">
            <Grid item xs={6}>
              <TextField disabled placeholder={user.StdID}>
                รหัสนักศึกษา: {user.StdID}
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField disabled placeholder={user.FirstName}>
                ชื่อ: {user.FirstName}
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField disabled placeholder={user.LastName}>
                นามสกุล{" "}
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField disabled placeholder={user.StdID}>
                รหัสนักศึกษา: {user.StdID}
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField disabled placeholder={user.FirstName}>
                ชื่อ: {user.FirstName}
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField disabled placeholder={user.StdID}>
                รหัสนักศึกษา: {user.StdID}
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField disabled placeholder={user.FirstName}>
                ชื่อ: {user.FirstName}
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField disabled placeholder={user.LastName}>
                นามสกุล{" "}
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField disabled placeholder={user.StdID}>
                รหัสนักศึกษา: {user.StdID}
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField disabled placeholder={user.FirstName}>
                ชื่อ: {user.FirstName}
              </TextField>
            </Grid>
          </Grid>
          
          
        </Box>
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

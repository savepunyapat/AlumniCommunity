import React from 'react'
import './SendPostcard.css'
import {
  Container,
  Box,
  Typography,
  Button,
} from '@mui/material';
import JoditEditor from "jodit-react";
import { NavLink } from 'react-router-dom';


function SendPostcard() {
  return (
    <Container>
      <Box sx={{ display: 'flex', alignContent: 'center', justifyContent: 'center', height: '80vh' }}>
        <form className="send-postcard-form">
          <label>ส่งโปสการ์ด</label>
          <br />
          <p>ระบบโปสการ์ดรับเนื้อหาที่เป็น HTML เท่านั้น</p>
          <br />
          <label>เนื้อหา</label>
          <br />
          <JoditEditor
            tabIndex={1} // tabIndex of textarea
            onBlur={(newContent) => { }} // preferred to use only this option to update the content for performance reasons
            onChange={(newContent) => { }}
          />
          <Button
            sx={{ marginTop: "1vh", marginRight: "1vw" }}
            color="success"
            variant="contained"
            className="addpostBTN"
            type="submit"
            value=""
          >
            ส่งโปสการ์ด
          </Button>
          <NavLink to="/profile">
            <Button
              sx={{ marginTop: "1vh" }}
              color="error"
              variant="contained"
              className="addpostBTN"
            >
              กลับ
            </Button>
          </NavLink>
        </form>
      </Box>
    </Container>
  )
}

export default SendPostcard
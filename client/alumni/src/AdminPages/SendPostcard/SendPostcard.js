import React from "react";
import "./SendPostcard.css";
import {
  Container,
  Box,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import JoditEditor from "jodit-react";
import { NavLink } from "react-router-dom";
import { axiosReq } from "../../services/service";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";


function SendPostcard() {
  const [postcardContent, setPostcardContent] = React.useState("");
  const [eventSubject, setEventSubject] = React.useState("");
  const [stdBatch, setStdBatch] = React.useState("");
  const handleChange = (event) => {
    setStdBatch(event.target.value);
  };
  const notifySuccess = () =>
    toast.success("ส่งโปสการ์ดสำเร็จ!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(postcardContent, eventSubject, stdBatch);
    try {
      const response = await axiosReq.post(
        `http://localhost:8000/send-event-postcard-to-all-account`,
        {
          postcardContent,
          eventSubject,
          stdBatch,
        }
      );
      console.log(response.data);
      if (response.data.success) {
        notifySuccess();
      } else {
        alert("ส่งโปสการ์ดไม่สำเร็จ");
      }
    } catch (err) {
      console.log(err);
    }
  };
  React.useEffect(() => {
    setStdBatch(""); 
  }, []);

  return (
    <Container>
      <ToastContainer/>
      <Box
        sx={{ display: "flex", justifyContent: "center", minHeight: "80vh" }}
      >
        <div style={{ marginTop: "5vh" }}>
          <form onSubmit={handleSubmit} className="send-postcard-form">
            <label>ส่งโปสการ์ด</label>
            <br />
            <p>ระบบโปสการ์ดรับเนื้อหาที่เป็น HTML เท่านั้น</p>
            <br />
            <label>หัวเรื่อง</label>
            <br />
            <input
              style={{
                width: "20vw",
                height: "5vh",
                borderRadius: "15px",
                borderColor: "rgba(0,0,0,0.2)",
              }}
              type="text"
              name="subjectEvent"
              onChange={(e) => setEventSubject(e.target.value)}
              value={eventSubject}
            ></input>
            <br />
            <br />
            <label>รุ่นที่ต้องการส่ง</label>
            <br />
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={stdBatch}
              label="รุ่นที่ต้องการส่ง"
              onChange={handleChange}
              sx={{ marginTop: "1vh" }}
            >
              <MenuItem value="e">ทุกรุ่น</MenuItem>
              <MenuItem value="64">64</MenuItem>
              <MenuItem value="63">63</MenuItem>
            </Select>
            <br />
            <br />
            <label>เนื้อหา</label>
            <br />
            <JoditEditor
              value={postcardContent}
              tabIndex={1} // tabIndex of textarea
              onBlur={(newContent) => setPostcardContent(newContent)} // preferred to use only this option to update the content for performance reasons
              onChange={(newContent) => setPostcardContent(newContent)}
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
        </div>
      </Box>
    </Container>
  );
}

export default SendPostcard;

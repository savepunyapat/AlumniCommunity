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
import { axiosReq, axiosWithTokenReq } from "../../services/service";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import BackBtn from "../../components/BackBtn/BackBtn";

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
    const batchList = [
      { value: "e", label: "ทุกรุ่น" },
      { value: "64", label: "64" },
      { value: "63", label: "63" },
      { value: "62", label: "62" },
      { value: "61", label: "61" },
      { value: "60", label: "60" },
      { value: "59", label: "59" },
      { value: "58", label: "58" },
      { value: "57", label: "57" },
      { value: "56", label: "56" },
      { value: "55", label: "55" },
      { value: "54", label: "54" },
      { value: "53", label: "53" },
      { value: "52", label: "52" },
      { value: "51", label: "51" },
      { value: "50", label: "50" },
      { value: "49", label: "49" },
      { value: "48", label: "48" },
      { value: "47", label: "47" },
      { value: "46", label: "46" },
      { value: "45", label: "45" },
      { value: "44", label: "44" },
      { value: "43", label: "43" },
      { value: "42", label: "42" },
      { value: "41", label: "41" },
      { value: "40", label: "40" },
      { value: "39", label: "39" },
      { value: "38", label: "38" },
      { value: "37", label: "37" },
      { value: "36", label: "36" },
      { value: "35", label: "35" },
      { value: "34", label: "34" },
      { value: "33", label: "33" },
      { value: "32", label: "32" },
      { value: "31", label: "31" },
      { value: "30", label: "30" },
      { value: "29", label: "29" },
      { value: "28", label: "28" },
      { value: "27", label: "27" },
      { value: "26", label: "26" },
      { value: "25", label: "25" },
      { value: "24", label: "24" },
      { value: "23", label: "23" },
      { value: "22", label: "22" },
      { value: "21", label: "21" },
      { value: "20", label: "20" },
      { value: "19", label: "19" },
      { value: "18", label: "18" },
      { value: "17", label: "17" },
      { value: "16", label: "16" },
      { value: "15", label: "15" },
      { value: "14", label: "14" },
      { value: "13", label: "13" },
      { value: "12", label: "12" },
      { value: "11", label: "11" },
      { value: "10", label: "10" },
      { value: "9", label: "9" },
      { value: "8", label: "8" },
      { value: "7", label: "7" },
      { value: "6", label: "6" },
      { value: "5", label: "5" },
      { value: "4", label: "4" },
      { value: "3", label: "3" },
      { value: "2", label: "2" },
      { value: "1", label: "1" },

    ]


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(postcardContent, eventSubject, stdBatch);
    try {
      const response = await axiosWithTokenReq.post(
        `/send-event-postcard-to-all-account`,
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
    document.title = "ส่งโปสการ์ด | CS-Alumni";
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
              
              {batchList.map((batch) => (
                <MenuItem value={batch.value}>{batch.label}</MenuItem>
              ))}
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

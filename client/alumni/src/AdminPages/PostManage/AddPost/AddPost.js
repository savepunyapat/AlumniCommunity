import { useState, useEffect, useMemo } from "react";
import JoditEditor from "jodit-react";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import "./AddPost.css";
import { axiosReq, axiosWithTokenReq } from "../../../services/service";
import Cookies from "js-cookie";
import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddPost() {
  const [PostDetail, setPostDetail] = useState("");
  const [PostSubject, setPostSubject] = useState("");
  const [PostCategory, setPostCategory] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileBase64, setFileBase64] = useState("");
  const [Pic_url, setPic_url] = useState("");
  const notifySuccess = () =>
    toast.success("โพสต์ สำเร็จ!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  const handleChange = (event) => {
    setPostCategory(event.target.value);
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Get the first selected file
    if (file) {
      setSelectedFile(file);

      const reader = new FileReader();
      reader.onload = () => {
        const base64Data = reader.result; // This will contain the base64 data URL
        setFileBase64(base64Data);
        setPic_url(base64Data);
      };
      reader.readAsDataURL(file);
    }
  };
  const notifyEmptyField = () =>
    toast.warn("กรุณากรอกข้อมูลให้ครบ", {
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
    console.log(Pic_url)

    try {
      e.preventDefault();
      if (PostSubject.trim() === "" || PostDetail.trim() === "" || PostCategory.trim() === "") {
        notifyEmptyField();
        return;
      }
      const response = await axiosWithTokenReq.post("/addPost", {
        PostSubject,
        PostDetail,
        PostCategory,
        Pic_url
      });
      notifySuccess();
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    document.title = "เพิ่มข่าวสาร | CS-Alumni";
  }, []);

  return (
    <div id="addpost-box" className="addpost-container">
      <ToastContainer />
      <div className="addpost-container" id="form-box">
        <h1>เพิ่มโพสต์</h1>
        <form onSubmit={handleSubmit} defaultValue="" required>
          <label>หัวข้อ</label>
          <br />
          <input
            onChange={(e) => {
              setPostSubject(e.target.value);
            }}
            name="PostSubject"
            placeholder="ชื่อหัวข้อ"
          />
          <br />
          <br />
          <label>หมวดหมู่</label>
          <br />
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={PostCategory}
            label="Age"
            onChange={handleChange}
          >
            <MenuItem value={"ข่าวทั่วไป"}>ข่าวทั่วไป</MenuItem>
            <MenuItem value={"ข่าวประชาสัมพันธ์"}>ข่าวประชาสัมพันธ์</MenuItem>
            <MenuItem value={"แนะนำศิษย์เก่า"}>แนะนำศิษย์เก่า</MenuItem>
            <MenuItem value={"กิจกรรม"}>กิจกรรม</MenuItem>
            <MenuItem value={"รับสมัครงาน"}>รับสมัครงาน</MenuItem>
          </Select>
          <br />
          <br />
          <label>รูปภาพหน้าปก</label>
          <br />
          <input type="file" name="post-picture" id="file" class="inputfile" onChange={handleFileChange} />
          <br />
          <br />
          <label>เนื้อหาข่าว</label>
          <br />
          <JoditEditor
            value={PostDetail}
            tabIndex={1} // tabIndex of textarea
            onBlur={(newContent) => setPostDetail(newContent)} // preferred to use only this option to update the content for performance reasons
            onChange={(newContent) => {}}
          />
          <Button
            sx={{ marginTop: "1vh", marginRight: "1vw" }}
            color="success"
            variant="contained"
            className="addpostBTN"
            type="submit"
            value=""
          >
            โพสต์
          </Button>
          <NavLink to="/admin/posts">
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
    </div>
  );
}

export default AddPost;

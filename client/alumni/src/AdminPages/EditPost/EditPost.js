import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './EditPost.css'
import JoditEditor from "jodit-react";
import { Container } from '@mui/material'
import { axiosReq } from '../../services/service'
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function EditPost() {
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
    const [PostCategory, setPostCategory] = useState("");
    const [PostDetail, setPostDetail] = useState("");
    const [PostSubject, setPostSubject] = useState("");
    const [Pic_url, setPic_url] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileBase64, setFileBase64] = useState("");
    const { id } = useParams();
    const [post, setPost] = useState();
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
    const fakeSubmit = (e) => {
        e.preventDefault();
        console.log(PostCategory);
        console.log(PostDetail);
        console.log(PostSubject);
        console.log(Pic_url);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosReq.put(`http://localhost:8000/post/${id}`, {
                PostCategory,
                PostDetail,
                PostSubject,
                Pic_url
            });
            notifySuccess();
            console.log(response.data);
        } catch (err) {
            console.error(err.message);
        }
    };
    const getPostByID = async (id) => {
        try {
            const response = await axiosReq.get(`http://localhost:8000/post/${id}`);
            setPost(response?.data);
            setPostCategory(response?.data.PostCategory);
            setPostDetail(response?.data.PostDetail);
            setPostSubject(response?.data.PostSubject);
            setPic_url(response?.data.Pic_url);
        } catch (err) {
            console.error(err.message);
        }
    }
    const handleCategoryChange = (event) => {
        setPostCategory(event.target.value);
    };


    useEffect(() => {
        getPostByID(id);


    }, [])
    return (
        <Container maxWidth="lg" >
            <ToastContainer />
            <div className="editpost-header">
                <h1>แก้ไขเนื้อหาข่าว</h1>
            </div>
            <div className="editpost-container">
                {post && (
                    <form onSubmit={handleSubmit}>
                        <label>หัวข้อ</label>
                        <br />
                        <input type="text" onChange={(e) => setPostSubject(e.target.value)} value={post.PostSubject} />
                        <br /><br />
                        <label>หมวดหมู่</label>
                        <br />
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={PostCategory}
                            label="Age"
                            onChange={handleCategoryChange}
                        >
                            <MenuItem value={"ข่าวทั่วไป"}>ข่าวทั่วไป</MenuItem>
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
                            onChange={(newContent) => { setPostDetail(newContent) }}
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
                )}
            </div>
        </Container>
    )
}

export default EditPost
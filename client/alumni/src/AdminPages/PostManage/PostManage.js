import React, { useEffect, useState } from "react";
import { axiosReq, axiosWithTokenReq } from "../../services/service";
import {
  Button,
  Grid,
  Modal,
  Box,
  Typography,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import Cookies from "js-cookie";
import "../PostManage/PostManage.css";
import cslogo from "../../img/logo/cs_logo.png";
import { NavLink } from "react-router-dom";
import parse from "html-react-parser";

function PostManage() {
  const [posts, setPosts] = useState([]);
  const [openDeleteConfirmationModal, setOpenDeleteConfirmationModal] =
    useState(false);
  const [deletingPostId, setDeletingPostId] = useState(null);
  const handleDeleteConfirmationOpen = (postId) => {
    setDeletingPostId(postId);
    setOpenDeleteConfirmationModal(true);
  };
  const deleteModalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    height: 100,
    width: 200,
    p: 3,
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: "10px",
    textAlign: "center",
  };

  const handleDeleteConfirmationClose = () => {
    setDeletingPostId(null);
    setOpenDeleteConfirmationModal(false);
  };

  const handleDeleteConfirmed = async () => {
    if (deletingPostId) {
      await deletePost(deletingPostId);
      handleDeleteConfirmationClose();
    }
  };
  const commentExist = (comments) => {
    if (comments && Object.keys(comments).length > 0) {
      return (
        <div>
          <h4>Comments:</h4>
          {Object.values(comments).map((comment, index) => (
            <p key={index}>{comment.comment}</p>
          ))}
        </div>
      );
    }
    return null;
  };
  const theme = createTheme({
    typography: {
      fontFamily: "Kanit, sans-serif",
    },
  });

  const handleDeleteClick = (id) => {
    deletePost(id);
  };
  const deletePost = async (id) => {
    try {
      const response = await axiosWithTokenReq.delete(`/post/${id}`);
      fetchData();
    } catch (err) {
      console.error(err.message);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axiosReq.get("/getAllPosts");
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
    document.title = "จัดการข่าวสาร | CS-Alumni";
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div className="div-center">
        <div className="postmanage-header">
          <NavLink to="/admin/addPost">
            <Button id="addBtn" color="success" variant="contained">
              Add Post
            </Button>
          </NavLink>
        </div>
        {posts.map((post) => (
          <div className="postmanage-container">
            <Grid container spacing={2}>
              <Grid item xs={4} sx={{ display: "flex" }}>
                <img className="postmanage-post-logo" src={post.Pic_url} />
              </Grid>
              <Grid wrap={true} item xs={8}>
                <Typography noWrap={false} variant="h6" sx={{fontWeight:'bold'}}>
                  {post.PostSubject}
                </Typography>
                <Button
                  onClick={() => handleDeleteConfirmationOpen(post._id)}
                  variant="contained"
                  color="error"
                >
                  Delete
                </Button>
                <NavLink to={`/admin/editPost/${post._id}`}>
                  <Button variant="contained">Edit</Button>
                </NavLink>
              </Grid>
            </Grid>
            <div className="posts" key={post._id}></div>
          </div>
        ))}
        <Modal
          open={openDeleteConfirmationModal}
          onClose={handleDeleteConfirmationClose}
          className="profile-modals"
        >
          <Box sx={deleteModalStyle}>
            <p>ยืนยันการลบ</p>
            <Button
              sx={{ marginRight: 2 }}
              variant="contained"
              color="error"
              onClick={handleDeleteConfirmed}
            >
              Delete
            </Button>
            <Button
              onClick={handleDeleteConfirmationClose}
              variant="contained"
              color="success"
            >
              Cancel
            </Button>
          </Box>
        </Modal>
      </div>
    </ThemeProvider>
  );
}

export default PostManage;

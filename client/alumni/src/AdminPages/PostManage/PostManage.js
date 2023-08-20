import React, { useEffect, useState } from "react";
import { axiosReq } from "../../services/service";
import { Button, Grid } from "@mui/material";
import Cookies from "js-cookie";
import "../PostManage/PostManage.css";
import cslogo from "../../img/logo/cs_logo.png";
import { NavLink } from "react-router-dom";
import parse from 'html-react-parser';

function PostManage() {
  const [posts, setPosts] = useState([]);
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

  useEffect(() => {
    const isAdmin = async () => {
      try {
        const accessToken = Cookies.get("token");
        if (!accessToken) {
          window.location.href = "/login";
        }
        const response = await axiosReq.get("http://localhost:8000/isAdmin");
        if (response.data === "not-admin") {
          window.location.href = "/";
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const fetchData = async () => {
      try {
        const response = await axiosReq.get(
          "http://localhost:8000/getAllPosts"
        );
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    isAdmin();
    fetchData();
  }, []);

  return (
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
            <Grid item xs={4}>
              <img src={cslogo} />
            </Grid>
            <Grid item xs={8}>
              <h2>{post.PostSubject}</h2>
              <p id="postmanager-post-detail">{parse(post.PostDetail)}</p>
              <Button variant="contained" color="error">
                Delete
              </Button>
              <Button variant="contained">Edit</Button>
            </Grid>
          </Grid>
          <div className="posts" key={post._id}></div>
        </div>
      ))}
    </div>
  );
}

export default PostManage;

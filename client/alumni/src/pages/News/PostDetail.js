import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../services/service";
import "./PostDetail.css";
import Container from "@mui/material/Container";
import parse from "html-react-parser";

function PostDetail() {
  const [post, setPost] = useState();
  const { id } = useParams();

  const getNews = async () => {
    try {
      const response = await axiosReq.get(`http://localhost:8000/post/${id}`);
      setPost(response?.data);
      console.log(response?.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    getNews();
    console.log(post);
  }, []);
  return (
    <Container maxWidth="lg">
      <Container id="postdetail-news-box">
        <div>
          {post && (
            <div>
              <Container id="postdetail-news-img">
                <img src={post.Pic_url} alt="" className="postdetail-img-banner" />
              </Container>
              <h1 id="postdetail-postsubject">{post.PostSubject}</h1>
              <h3 id="postdetail-postcategory">{post.PostCategory}</h3>
              <Container id="postdetail-news-detail">
                <p>{parse(post.PostDetail)}</p>
              </Container>
            </div>
          )}
        </div>
      </Container>
    </Container>
  );
}

export default PostDetail;

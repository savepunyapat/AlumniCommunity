import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../services/service";
import "./PostDetail.css";
import Container from "@mui/material/Container";
import parse from "html-react-parser";
import FacebookIcon from '@mui/icons-material/Facebook';
import { Button } from "@mui/material";

function PostDetail() {
  const [post, setPost] = useState();
  const { id } = useParams();
  const baseURL = process.env.REACT_APP_BASE_URL;
  
  const getNews = async () => {
    try {
      const response = await axiosReq.get(`/post/${id}`);
      setPost(response?.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    getNews();
    document.title = "ข่าว | CS-Alumni";
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
              <h3 id="postdetail-postcategory">{"หมวดหมู่ : "+post.PostCategory}</h3>
              <Button variant="contained" color="primary"  href={`https://www.facebook.com/dialog/share?app_id=1537111350440705&display=popup&href=http://10.199.6.104/post/`+id} target="_blank" startIcon={<FacebookIcon />}>
                แชร์ไปยัง Facebook
              </Button>
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

import React, { useEffect, useState } from "react";
import {
  Card,
  ButtonGroup,
  Button,
  Divider,
  List,
  ListItemText,
  Typography,
  ListItem,
  ListItemAvatar,
  Avatar,
} from "@mui/material";
import { axiosReq } from "../../services/service";
import NewsCard from "../../components/NewsCard/NewsCard";
import "./Home.css";
import parse from "html-react-parser";
import cslogo from "../../img/logo/cs_logo.png";
import { NavLink } from "react-router-dom";
import Carousel from "../../components/Carousel/Carousel";

function Home() {
  const [posts, setPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const filteredPosts = selectedCategory
    ? posts.filter((post) => post.PostCategory === selectedCategory)
    : posts;

  useEffect(() => {
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
    fetchData();
  }, []);

  return (
    <div className="wrapped">
      <div className="carousel-container">
      <div className="home-carousel-container">
        <Carousel />
      </div>
      </div>
      <div className="home-container">
        <Card
        >
          <ButtonGroup variant="outlined" aria-label="outlined button group">
            <Button onClick={() => setSelectedCategory("")}>หน้าหลัก</Button>
            <Button onClick={() => setSelectedCategory("ข่าวประชาสัมพันธ์")}>
              ข่าวประชาสัมพันธ์
            </Button>
            <Button onClick={() => setSelectedCategory("แนะนำศิษย์เก่า")}>
              แนะนำศิษย์เก่า
            </Button>
            <Button onClick={() => setSelectedCategory("กิจกรรม")}>
              กิจกรรม
            </Button>
            <Button onClick={() => setSelectedCategory("รับสมัครงาน")}>
              รับสมัครงาน
            </Button>
          </ButtonGroup>
          <Divider />
          <List
            sx={{
              width: "100%",
              height: "100%",
              maxWidth: 500,
              bgcolor: "background.paper",
            }}
          >
            {filteredPosts.map((post, index) => (
                
              <div>
                <NavLink to={`/post/${post._id}`}>
                  <ListItem className="home-news-lists" alignItems="flex-start">
                    <ListItemAvatar sx={{ paddingRight: 4 }}>
                      <img className="home-news-photo" src={post.Pic_url} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={post.PostSubject}
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          ></Typography>
                          <p className="home-postdetail">{post.PostSubject}</p>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </NavLink>
              </div>
            ))}
          </List>
        </Card>
        
      </div>
      
    </div>
  );
}

export default Home;

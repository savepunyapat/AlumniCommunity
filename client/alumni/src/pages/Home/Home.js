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
  createTheme,
  ThemeProvider,
  Container,
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
    const theme = createTheme({
      typography: {
        fontFamily: "Kanit, sans-serif", // Change this to your desired font
      },
    });


  useEffect(() => {
    const fetchData = async () => {
      try {
        const baseURL = process.env.REACT_APP_BASE_URL;
        const response = await axiosReq.get(
          `${baseURL}/getAllPosts`
        );
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <ThemeProvider theme={theme}>

    <div className="wrapped">
      <div className="carousel-container">
        <div className="home-carousel-container">
          <Carousel />
        </div>
      </div>
      <div className="home-container">
        <Card
          sx={{
            minWidth: 750,
            display: "flex",
            margin: "auto",
            padding: 2,
            marginTop: 10,
            marginBottom: 4,
            borderRadius: 2,
            boxShadow: 3,
            backgroundColor: "#f5f5f5",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <ButtonGroup
            sx={{
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
            variant="outlined"
            aria-label="outlined button group"
          >
            <Button onClick={() => setSelectedCategory("")}>
              หน้าหลัก
            </Button>
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
              minWidth: 750,
              maxWidth: 750,
              bgcolor: "background.paper",
            }}
          >
            {filteredPosts.map((post, index) => (
              <div>
                <NavLink to={`/post/${post._id}`}>
                  <ListItem
                    className="home-news-lists"
                    alignItems="flex-start"
                  >
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
                          <p className="home-postdetail">
                            {post.PostSubject}
                          </p>
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
      <Container sx={{width:"100%",justifyContent:'center',alignItems:'center',display:'flex',flexDirection:'column'}}>
        <Typography 
          variant="h4" 
          component="h2"
          fontWeight={"bold"} 
          sx={{textAlign:'center',marginBottom:2}}
        >
          วิดิทัศน์แนะนำ: วิทยาลัยการคอมพิวเตอร์-มหาวิทยาลัยขอนแก่น
        </Typography>
        <iframe width="750" height="315" src="https://www.youtube.com/embed/OfCIf9y3cPQ?si=BIuQpUMUjWT0V4AQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
      </Container>
    </div>
    </ThemeProvider>

  );
}

export default Home;

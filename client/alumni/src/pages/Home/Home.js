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
  Grid,
  Paper,
  Box,
  styled,
  Link,
  CardContent,
  CardMedia,
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
        const response = await axiosReq.get(`/getAllPosts`);
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
    document.title = "หน้าหลัก | CS-Alumni";
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
        <Container
          sx={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            variant="h4"
            component="h2"
            fontWeight={"bold"}
            sx={{ textAlign: "center", marginBottom: 2 }}
          >
            วิดิทัศน์แนะนำ: วิทยาลัยการคอมพิวเตอร์-มหาวิทยาลัยขอนแก่น
          </Typography>
          <iframe
            width="750"
            height="315"
            src="https://www.youtube.com/embed/OfCIf9y3cPQ?si=BIuQpUMUjWT0V4AQ"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </Container>
        <Container sx={{ mt: "5vh",borderBottom:"1px solid grey",pb:"3vh"}}>
          <Typography variant="h6" sx={{fontWeight:'bold'}}>Links ที่เกี่ยวข้อง</Typography>
          <Container sx={{justifyContent:'space-between',display:'flex',alignItems:'center',justifyItems:'center'}}>
                <a
                  href="https://reg.kku.ac.th/registrar/home.asp?avs=44510.6267361111"
                  target="_blank"
                >
                  <img
                    src="https://app.gs.kku.ac.th/images/img/img/logo/1.jpg"
                    alt="kkureg"
                    style={{ width: "180px" }}
                  />
                </a>
                <a href="http://englishservices.kku.ac.th/app/" target="_blank">
                  <img
                    src="https://app.gs.kku.ac.th/images/img/img/logo/2.png"
                    alt="kkureg"
                    style={{ width: "180px" }}
                  />
                </a>
                <a href="http://journal.gs.kku.ac.th/" target="_blank">
                  <img
                    src="https://app.gs.kku.ac.th/images/img/img/logo/5.jpg"
                    alt="kkureg"
                    style={{ width: "180px" }}
                  />
                </a>
                <a
                  href="http://app.gs.kku.ac.th/gs/th/category/16/research/2077/thai-journal.html"
                  target="_blank"
                >
                  <img
                    alt=""
                    src="https://app.gs.kku.ac.th/images/img/img/logo/4.jpg"
                    style={{ width: "180px" }}
                  />
                </a>
          </Container>
        </Container>
        <Container sx={{ mt: "5vh" ,borderBottom:"1px solid grey",pb:"3vh"}}>
          <Typography variant="h6" sx={{fontWeight:'bold'}}>เครือข่ายต่างๆ ของบัณฑิตวิทยาลัย</Typography>
          <Container sx={{justifyContent:'space-between',display:'flex',alignItems:'center',justifyItems:'center'}}>
                <a
                  href="https://app.gs.kku.ac.th/gs/gsclub/"
                  target="_blank"
                >
                  <img
                    src="https://app.gs.kku.ac.th/images/img/img/logo/6-1.png"
                    alt="kkureg"
                    style={{ width: "180px" }}
                  />
                </a>
                <a href="http://app.gs.kku.ac.th/gs/th/page/gs_network/gsnetwork" target="_blank">
                  <img
                    src="https://app.gs.kku.ac.th/images/img/img/logo/7.jpg"
                    alt="kkureg"
                    style={{ width: "180px" }}
                  />
                </a>
                <a href="https://cgau.net/" target="_blank">
                  <img
                    src="https://app.gs.kku.ac.th/images/img/img/logo/10.jpg"
                    alt="kkureg"
                    style={{ width: "180px" }}
                  />
                </a>
                <a
                  href="https://app.gs.kku.ac.th/gs/th/page/cross-ins-reg/"
                  target="_blank"
                >
                  <img
                    alt=""
                    src="https://app.gs.kku.ac.th/images/img/img/logo/Logo%20%E0%B8%A5%E0%B8%87%E0%B8%97%E0%B8%B0%E0%B9%80%E0%B8%9A%E0%B8%B5%E0%B8%A2%E0%B8%99%E0%B8%82%E0%B9%89%E0%B8%B2%E0%B8%A1%E0%B8%AA%E0%B8%96%E0%B8%B2%E0%B8%9A%E0%B8%B1%E0%B8%99%202.png"
                    style={{ width: "180px" }}
                  />
                </a>
          </Container>
        </Container>
        <Container sx={{ mt: "5vh" }}>
          <Typography variant="h6" sx={{fontWeight:'bold'}}>รางวัลและผลงาน</Typography>
          <Container sx={{justifyContent:'space-between',display:'flex',alignItems:'center',justifyItems:'center'}}>
                <a
                  href="https://app.gs.kku.ac.th/gs/th/page/best-thesis-award/bestthesisaward"
                  target="_blank"
                >
                  <img
                    src="https://app.gs.kku.ac.th/images/img/img/logo/8.png"
                    alt="kkureg"
                    style={{ width: "180px" }}
                  />
                </a>
                <a href="http://app.gs.kku.ac.th/gs/th/page/alumni-gs" target="_blank">
                  <img
                    src="https://app.gs.kku.ac.th/images/img/img/logo/11.jpg"
                    alt="kkureg"
                    style={{ width: "180px" }}
                  />
                </a>
                <a href="http://app.gs.kku.ac.th/gs/th/page/professor-kanok-award" target="_blank">
                  <img
                    src="https://app.gs.kku.ac.th/images/img/img/logo/9.jpg"
                    alt="kkureg"
                    style={{ width: "180px" }}
                  />
                </a>
                <a
                  href="https://app.gs.kku.ac.th/gs/th/page/Hall_of_Fame/main"
                  target="_blank"
                >
                  <img
                    alt=""
                    src="https://app.gs.kku.ac.th/images/img/img/logo/logoHallofFame2.png"
                    style={{ width: "180px" }}
                  />
                </a>
          </Container>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default Home;

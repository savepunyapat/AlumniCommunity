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

function Home() {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosReq.get(
                    "http://localhost:8000/getAllPosts"
                );
                setPosts(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();

    }, []);
    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + "...";
        }
        return text;
    };
    return (
        <div className="home-container">
            <Card
                sx={{
                    p: 2,
                    marginTop:10,
                }}
            >
                <ButtonGroup
                    variant="outlined"
                    aria-label="outlined button group"
                >
                    <Button>หน้าหลัก</Button>
                    <Button>ข่าวประชาสัมพันธ์</Button>
                    <Button>แนะนำศิษย์เก่า</Button>
                    <Button>รับสมัครงาน</Button>
                    <Button>การบริจาค</Button>
                </ButtonGroup>
                <Divider sx={{ my: 2 }} />
                <List
                    sx={{
                        width: "100%",
                        height: '100%',
                        maxWidth: 500,
                        bgcolor: "background.paper",
                    }}
                >
                    {posts.map((post, index) => (
                        <div>
                            <ListItem className="home-news-lists" alignItems="flex-start">
                                <ListItemAvatar sx={{paddingRight:4}}>
                                    <img className="home-news-photo" src={cslogo}/>
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
                                            >
                                                Ali Connors
                                            </Typography>
                                            
                                            <p className="home-postdetail">{post.PostSubject}</p>

                                            
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>
                            <Divider variant="inset" component="li" />
                        </div>
                    ))
                        
                    }

                </List>
            </Card>
        </div>
    );
}

export default Home;

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
import axios, { axiosWithTokenReq } from "../../services/service";
import NewsCard from "../../components/NewsCard/NewsCard";
import "./Home.css";

function Home() {
    return (
        <div className="container">
            <Card
                sx={{
                    p: 2,
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
                        maxWidth: 360,
                        bgcolor: "background.paper",
                    }}
                >
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar
                                alt="Remy Sharp"
                                src="/static/images/avatar/1.jpg"
                            />
                        </ListItemAvatar>
                        <ListItemText
                            primary="Brunch this weekend?"
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
                                    {
                                        " — I'll be in your neighborhood doing errands this…"
                                    }
                                </React.Fragment>
                            }
                        />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar
                                alt="Travis Howard"
                                src="/static/images/avatar/2.jpg"
                            />
                        </ListItemAvatar>
                        <ListItemText
                            primary="Summer BBQ"
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        sx={{ display: "inline" }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >
                                        to Scott, Alex, Jennifer
                                    </Typography>
                                    {
                                        " — Wish I could come, but I'm out of town this…"
                                    }
                                </React.Fragment>
                            }
                        />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar
                                alt="Cindy Baker"
                                src="/static/images/avatar/3.jpg"
                            />
                        </ListItemAvatar>
                        <ListItemText
                            primary="Oui Oui"
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        sx={{ display: "inline" }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >
                                        Sandra Adams
                                    </Typography>
                                    {
                                        " — Do you have Paris recommendations? Have you ever…"
                                    }
                                </React.Fragment>
                            }
                        />
                    </ListItem>
                </List>
            </Card>
        </div>
    );
}

export default Home;
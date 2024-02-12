import React from "react";
import { useEffect, useState } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { axiosReq, axiosWithTokenReq } from "../../services/service";
import {
  Box,
  Modal,
  IconButton,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  Typography,
  CardActions,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { NavLink } from "react-router-dom";

const Gallery = () => {
  const [albums, setAlbums] = React.useState([]);
  const [isAdmin, setAdmin] = useState(false);

  const previewStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    height: 500,
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: "10px",
  };
  const theme = createTheme({
    typography: {
      fontFamily: "Kanit, sans-serif", // Change this to your desired font
    },
  });
  const checkAdmin = async () => {
    try {
      const response = await axiosWithTokenReq.get("http://localhost:8000/me");
      console.log(response?.data.Permission);
      const permission = response?.data.Permission;
      if (permission === "admin") {
        setAdmin(true);
      } else {
        setAdmin(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const getAlbums = async () => {
    try {
      const response = await axiosReq.get(
        "http://localhost:8000/gallery/getAllAlbums"
      );
      setAlbums(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getAlbums();
    checkAdmin();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Container sx={{ minHeight: "80vh", width: "auto" }}>
        <Typography
          variant="h4"
          align="center"
          color="text.primary"
          gutterBottom
          sx={{ mt: 2 }}
        >
          อัลบั้มรูปภาพ
        </Typography>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {albums.map((album) => (
            <Grid item xs={2} sm={4} md={4} key={album._id}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={album.AlbumImages[0].Image_URL}
                  alt={album.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {album.AlbumTitle}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {album.AlbumDescription}
                  </Typography>
                </CardContent>
                <CardActions>
                  <NavLink to={`/gallery/galleryPreview/${album._id}`}>
                    <Button size="small" color="primary">
                      View
                    </Button>
                  </NavLink>
                  {isAdmin ? (
                    <NavLink to={`/admin/editGallery/${album._id}`}>
                      <Button size="small" color="secondary">
                        Edit
                      </Button>
                    </NavLink>
                  ) : null}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default Gallery;

import React from "react";
import { useEffect } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { axiosReq } from "../../services/service";
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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { NavLink } from "react-router-dom";

const Gallery = () => {
  const [albums, setAlbums] = React.useState([]);

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
  }, []);

  return (
    <Container maxWidth="md">
      <Grid container spacing={4}>
        {albums.map((album) => (
          <Grid item xs={12} sm={6} md={4} key={album._id}>
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
                <Button size="small" color="primary">
                  Edit
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Gallery;

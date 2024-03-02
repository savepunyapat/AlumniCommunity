import React, { useEffect, useState } from "react";
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
  CircularProgress
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './Gallery.css';
import BackBtn from "../../components/BackBtn/BackBtn";

const Gallery = () => {
  const [albums, setAlbums] = React.useState([]);
  const [isAdmin, setAdmin] = useState(false);
  const [addGalleryModalOpen, setAddGalleryModalOpen] = useState(false);
  const [pickImage, setPickImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAddGalleryOpen = () => setAddGalleryModalOpen(true);
  const handleAddGalleryClose = () => setAddGalleryModalOpen(false);

  const notifySuccess = () =>
    toast.success("เพิ่มอัลบัมสำเร็จ!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

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
  const ModalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    height: 320,
    width: 450,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 10,
    borderRadius: "10px",
  };

  const theme = createTheme({
    typography: {
      fontFamily: "Kanit, sans-serif", // Change this to your desired font
    },
  });

  const checkAdmin = async () => {
    try {
      const response = await axiosWithTokenReq.get("/me");
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

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const onChangePicture = (e) => {
    if (e.target.files[0]) {
      setPickImage(e.target.files[0]);
    }
  };

  const addGallery = async (e) => {
    e.preventDefault();
    setAddGalleryModalOpen(false);
    const base64 = await convertBase64(pickImage);
    const data = {
      AlbumTitle: e.target.AlbumTitle.value,
      AlbumDescription: e.target.AlbumDescription.value,
      AlbumImages: [
        {
          Image_URL: base64,
          ImageDate: e.target.ImageDate.value,
          ImageTitle: e.target.ImageTitle.value,
        }
      ],
    };
    try {
      const response = await axiosWithTokenReq.post("/gallery/addAlbum", data);
      notifySuccess();
      getAlbums();
    } catch (error) {
      console.log(error.message);
    }
  };

  const getAlbums = async () => {
    try {
      setIsLoading(true);
      const response = await axiosReq.get("/gallery/getAllAlbums");
      setAlbums(response.data);
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAlbums();
    checkAdmin();
    document.title = "คลังภาพ | CS-Alumni";
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer />
      <Container sx={{ marginTop: '5vh' }}>
        <BackBtn path="/" />
      </Container>
      <Container sx={{ minHeight: "80vh", width: "auto", marginTop: "5vh" }}>
        <Typography
          variant="h4"
          align="center"
          color="text.primary"
          gutterBottom
          sx={{ mt: 2 }}
          fontWeight={'bold'}
        >
          คลังภาพ
        </Typography>
        {isAdmin ? (
          <>
            <Modal
              open={addGalleryModalOpen}
              onClose={handleAddGalleryClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box className="gallery-addalbum-modal" sx={ModalStyle}>
                <form onSubmit={addGallery}>
                  <label>ชื่ออัลบั้ม</label>
                  <input type="text" name="AlbumTitle" placeholder="ชื่ออัลบัม" />
                  <br />
                  <br />

                  <label>คำอธิบายอัลบั้ม</label>
                  <input type="text" name="AlbumDescription" />
                  <br />
                  <br />
                  <label>รูปภาพ</label>
                  <input
                    type="file"
                    name="Image_URL"
                    onChange={onChangePicture}
                  />
                  <br />
                  <br />
                  <label>คำอธิบายภาพ</label>
                  <input type="text" name="ImageTitle" />
                  <br />
                  <br />
                  <label>วันที่ถ่ายภาพ</label>
                  <input type="date" name="ImageDate" />
                  <br />
                  <br />
                  <Button sx={{ marginRight: 2 }} type="submit" variant="contained" color="success">
                    เพิ่มอัลบัม
                  </Button>
                  <Button variant="contained" color="error" onClick={() => setAddGalleryModalOpen(false)}>
                    กลับ
                  </Button>
                </form>
              </Box>
            </Modal>
            <Button
              className="gallery-add-gallery-btn"
              variant="contained"
              sx={{ float: "right" }}
              onClick={handleAddGalleryOpen}
            >
              เพิ่มอัลบั้ม
            </Button>
          </>
        ) : null}

        {isLoading ? (
          <Container sx={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:'30vh'}}>
            <CircularProgress />
          </Container>
        ) : (
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {albums.length !== 0 ? albums.map((album) => (
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
                      <Button variant="outlined" size="small" color="primary">
                        View
                      </Button>
                    </NavLink>
                    {isAdmin ? (
                      <NavLink to={`/admin/editGallery/${album._id}`}>
                        <Button size="small" variant="contained" color="warning">
                          Edit
                        </Button>
                      </NavLink>
                    ) : null}
                  </CardActions>
                </Card>
              </Grid>
            )) : (
              <Typography variant="h6" align="center" color="text.secondary" sx={{ mt: 5 }}>
                ไม่มีอัลบั้มภาพ
              </Typography>
            )}
          </Grid>
        )}
      </Container>
    </ThemeProvider>
  );
};

export default Gallery;

import React, { useEffect, useState } from "react";
import "./EditGallery.css";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Modal,
  Box,
  IconButton,
  createTheme,
  ThemeProvider,
  Typography,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ClearIcon from "@mui/icons-material/Clear";
import CloseIcon from "@mui/icons-material/Close";
import { axiosReq, axiosWithTokenReq } from "../../services/service";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";

const EditGallery = () => {
  const [images, setImages] = React.useState([]);
  const [album, setAlbum] = React.useState({});
  const [imageModals, setImageModals] = React.useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  const [openAddImageModal, setOpenAddImageModal] = React.useState(false);
  const handleAddImageOpen = () => setOpenAddImageModal(true);
  const handleAddImageClose = () => setOpenAddImageModal(false);

  const [openDeleteConfirmationModal, setOpenDeleteConfirmationModal] =
    useState(false);
  const [deletingImageId, setDeletingImageId] = useState(null);

  const handleDeleteConfirmationOpen = (imageId) => {
    setDeletingImageId(imageId);
    setOpenDeleteConfirmationModal(true);
  };

  const handleDeleteConfirmationClose = () => {
    setDeletingImageId(null);
    setOpenDeleteConfirmationModal(false);
  };

  const handleDeleteConfirmed = async () => {
    await deleteImage(deletingImageId);
    handleDeleteConfirmationClose();
  };

  const [
    openDeleteAlbumConfirmationModal,
    setOpenDeleteAlbumConfirmationModal,
  ] = useState(false);
  const handleDeleteAlbumConfirmationOpen = () => {
    setOpenDeleteAlbumConfirmationModal(true);
  };

  const handleDeleteAlbumConfirmationClose = () => {
    setOpenDeleteAlbumConfirmationModal(false);
  };

  const handleDeleteAlbumConfirmed = async () => {
    await deleteAlbum(id);
  };

  const FontTheme = createTheme({
    typography: {
      fontFamily: "Kanit, sans-serif",
    },
  });

  const notifySuccess = () =>
    toast.success("เพิ่มรูปสำเร็จ!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const toggleImageModal = (imageId) => {
    setImageModals((prevState) => ({
      ...prevState,
      [imageId]: !prevState[imageId],
    }));
  };
  const getImages = async () => {
    try {
      const response = await axiosReq.get("/gallery/getAlbumById/" + id);
      setAlbum(response?.data);
      setImages(response?.data.AlbumImages);
    } catch (error) {
      console.log(error.message);
    }
  };
  const [pickImage, setPickImage] = React.useState("");

  const deleteImage = async (imageId) => {
    try {
      const response = await axiosWithTokenReq.delete(
        `/gallery/${id}/images/${imageId}`
      );
      getImages();
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
      console.log("picture: ", e.target.files);
      setPickImage(e.target.files[0]);
    }
  };
  const notifyEmptyField = () =>
    toast.warn("กรุณากรอกข้อมูลให้ครบ", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const onSubmit = async (e) => {
    e.preventDefault();
    setOpenAddImageModal(false);
    const base64 = await convertBase64(pickImage);
    const data = {
      Image_URL: base64,
      ImageTitle: e.target.ImageTitle.value.trim(),
      ImageDate: e.target.ImageDate.value.trim(),
    };
    if (data.ImageTitle === "" || data.ImageDate === "") {
      notifyEmptyField();
      return;
    }
    try {
      
      const response = await axiosWithTokenReq.post(
        `/gallery/addToAlbum/${id}`,
        data
      );
      getImages();
      notifySuccess();
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteAlbum = async (albumid) => {
    try {
      const response = await axiosWithTokenReq.delete(
        `/gallery/deleteAlbumById/${albumid}`
      );
      navigate("/gallery");
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteModalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    height: 100,
    width: 180,
    p: 3,
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: "10px",
    textAlign: "center",
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    height: 200,
    width: 450,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 10,
    borderRadius: "10px",
  };

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

  const closeAddImageModal = () => {
    handleAddImageClose();
  };

  useEffect(() => {
    getImages();
    document.title = "แก้ไขคลังภาพ | CS-Alumni";
  }, []);
  return (
    <ThemeProvider theme={FontTheme}>
      <Container sx={{ minHeight: "60vh" }}>
        <ToastContainer />
        <Box
          sx={{ justifyContent: "center", marginTop: 10, textAlign: "center" }}
        >
          <h1>{album.AlbumTitle}</h1>
          <Typography variant="h6" gutterBottom>
            {album.AlbumDescription}
          </Typography>
        </Box>
        <Container sx={{ marginBottom: 10, width: "100%" }}>
          <Button
            sx={{ float: "right" }}
            variant="contained"
            color="error"
            onClick={handleDeleteAlbumConfirmationOpen}
          >
            ลบอัลบัม
          </Button>
          <Button
            sx={{ float: "right", marginRight: 2 }}
            variant="contained"
            onClick={handleAddImageOpen}
          >
            เพิ่มรูปภาพ
          </Button>
          <Modal
            open={openDeleteAlbumConfirmationModal}
            onClose={handleDeleteAlbumConfirmationClose}
            className="profile-modals"
          >
            <Box sx={deleteModalStyle}>
              <p>ยืนยันการลบอัลบัม</p>
              <Button
                sx={{ marginRight: 2 }}
                variant="contained"
                color="error"
                onClick={handleDeleteAlbumConfirmed}
              >
                ลบ
              </Button>
              <Button
                onClick={handleDeleteAlbumConfirmationClose}
                variant="contained"
                color="success"
              >
                ยกเลิก
              </Button>
            </Box>
          </Modal>

          <Modal
            open={openAddImageModal}
            onClose={handleAddImageClose}
            className="profile-modals"
          >
            <Box sx={style}>
              <form onSubmit={onSubmit}>
                <label>รูปภาพ</label>
                <input
                  required={true}
                  type="file"
                  name="Image_URL"
                  onChange={onChangePicture}
                />
                <br />
                <br />
                <label>คำอธิบายภาพ</label>
                <input
                  required={true}
                  type="text"
                  name="ImageTitle"
                  placeholder="กรุณาใส่คำอธิบายภาพ"
                />
                <br />
                <br />
                <label>วันที่ </label>
                <input required={true} type="date" name="ImageDate" />
                <br />
                <br />
                <Button
                  sx={{ marginRight: 2 }}
                  type="submit"
                  variant="contained"
                  color="success"
                >
                  เพิ่ม
                </Button>
                <Button
                  onClick={closeAddImageModal}
                  variant="contained"
                  color="error"
                >
                  ปิด
                </Button>
              </form>
            </Box>
          </Modal>
        </Container>
        <TableContainer sx={{ marginBottom: 10 }} component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Preview</TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="right">
                  อธิบาย
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="right">
                  วันที่
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold" }}
                  align="right"
                ></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {images.map((image) => (
                <TableRow
                  key={image._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Button
                      variant="contained"
                      onClick={() => toggleImageModal(image._id)}
                    >
                      <PlayArrowIcon />
                    </Button>
                    <Modal
                      open={imageModals[image._id]}
                      onClose={() => toggleImageModal(image._id)}
                      className="profile-modals"
                    >
                      <Box sx={previewStyle}>
                        <IconButton
                          style={{ position: "absolute", top: 5, right: 5 }}
                          onClick={() => toggleImageModal(image._id)}
                        >
                          <CloseIcon />
                        </IconButton>
                        <img
                          style={{ width: "100%", height: "100%" }}
                          src={image.Image_URL}
                          alt=""
                        />
                      </Box>
                    </Modal>
                  </TableCell>
                  <TableCell align="right">{image.ImageTitle}</TableCell>
                  <TableCell align="right">
                    {new Date(image.ImageDate).toISOString().split("T")[0]}
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDeleteConfirmationOpen(image._id)}
                    >
                      <ClearIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Modal
          open={openDeleteConfirmationModal}
          onClose={handleDeleteConfirmationClose}
          className="profile-modals"
        >
          <Box sx={deleteModalStyle}>
            <p>ยืนยันการลบ</p>
            <Button
              sx={{ marginRight: 2 }}
              variant="contained"
              color="error"
              onClick={handleDeleteConfirmed}
            >
              ลบ
            </Button>
            <Button
              onClick={handleDeleteConfirmationClose}
              variant="contained"
              color="success"
            >
              ยกเลิก
            </Button>
          </Box>
        </Modal>
      </Container>
    </ThemeProvider>
  );
};

export default EditGallery;

import React, { useEffect } from "react";
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
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ClearIcon from "@mui/icons-material/Clear";
import CloseIcon from "@mui/icons-material/Close";
import { axiosReq } from "../../services/service";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const EditGallery = () => {
  const [images, setImages] = React.useState([]);
  const [imageModals, setImageModals] = React.useState({});

  const [openAddImageModal, setOpenAddImageModal] = React.useState(false);
  const handleAddImageOpen = () => setOpenAddImageModal(true);
  const handleAddImageClose = () => setOpenAddImageModal(false);

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
      const response = await axiosReq.get(
        "http://localhost:8000/gallery/getGalleryImages"
      );
      setImages(sortImagesByDate(response.data));
    } catch (error) {
      console.log(error.message);
    }
  };
  const [pickImage, setPickImage] = React.useState("");

  const deleteImage = async (imageId) => {
    try {
      const response = await axiosReq.delete(
        `http://localhost:8000/gallery/deleteImageById/${imageId}`
      );
      getImages();
    } catch (error) {
      console.log(error.message);
    }
  };

  const sortImagesByDate = (imageData) => {
    return imageData.sort((a, b) => {
      const dateA = new Date(a.ImageDate);
      const dateB = new Date(b.ImageDate);
      return dateB - dateA;
    });
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

  const onSubmit = async (e) => {
    e.preventDefault();
    notifySuccess();
    setOpenAddImageModal(false);
    const base64 = await convertBase64(pickImage);
    const data = {
      Image_URL: base64,
      ImageDetail: e.target.ImageDetail.value,
      ImageDate: e.target.ImageDate.value,
    };
    try {
      const response = await axiosReq.post(
        "http://localhost:8000/gallery/addImage",
        data
      );
      getImages();
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    height: 300,
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
  }, []);
  return (
    <Container>
        <ToastContainer />
      <Container sx={{ marginTop: 10, marginBottom: 20, width: "100%" }}>
        <Button
          sx={{ float: "right" }}
          variant="contained"
          onClick={handleAddImageOpen}
        >
          เพิ่มรูปภาพ
        </Button>
        <Modal
          open={openAddImageModal}
          onClose={handleAddImageClose}
          className="profile-modals"
        >
          <Box sx={style}>
            <form onSubmit={onSubmit}>
              <label>รูปภาพ</label>
              <input type="file" name="Image_URL" onChange={onChangePicture} />
              <br />
              <br />
              <label>คำอธิบายภาพ</label>
              <input
                type="text"
                name="ImageDetail"
                placeholder="กรุณาใส่คำอธิบายภาพ"
              />
              <br />
              <br />
              <label>วันที่  </label>
              <input type="date" name="ImageDate" />
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
              <TableCell sx={{ fontWeight: "bold" }} align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {images.map((image) => (
              <TableRow
                key={image._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Button variant="contained"
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
                <TableCell align="right">{image.ImageDetail}</TableCell>
                <TableCell align="right">
                  {new Date(image.ImageDate).toISOString().split("T")[0]}
                </TableCell>
                <TableCell align="right">
                  <Button variant="contained" color="error" onClick={() => deleteImage(image._id)}>
                    <ClearIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default EditGallery;

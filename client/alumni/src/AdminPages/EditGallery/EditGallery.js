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
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ClearIcon from "@mui/icons-material/Clear";
import { axiosReq } from '../../services/service';
const EditGallery = () => {
  const [openAddImageModal, setOpenAddImageModal] = React.useState(false);
  const handleAddImageOpen = () => setOpenAddImageModal(true);
  const handleAddImageClose = () => setOpenAddImageModal(false);
  const [images, setImages] = React.useState([]);

  const getImages = async () => {
    try {
      const response = await axiosReq.get("http://localhost:8000/gallery/getGalleryImages");
      setImages(sortImagesByDate(response.data));
    } catch (error) {
      console.log(error.message);
    }
  }
  const [pickImage, setPickImage] = React.useState('');

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
  }

  const onChangePicture = (e) => {
    if (e.target.files[0]) {
      console.log("picture: ", e.target.files);
      setPickImage(e.target.files[0]);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const base64 = await convertBase64(pickImage);
    const data = {
      Image_URL: base64,
      ImageDetail: e.target.ImageDetail.value,
      ImageDate: e.target.ImageDate.value,
    };
    try {
      const response = await axiosReq.post("http://localhost:8000/gallery/addImage", data);
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height: 300,
    width: 450,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 10,
    borderRadius: "10px",
  };
  const closeAddImageModal = () => {
    handleAddImageClose();
  };

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    createData("Eclair", 262, 16.0, 24, 6.0),
    createData("Cupcake", 305, 3.7, 67, 4.3),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
  ];
  useEffect(() => {
    getImages();
  }, [])
  return (
    <Container>
      <Container
        sx={{ marginTop: 10, marginBottom: 5, width: "100%" }}
      >
        <Button sx={{ float: "right" }} variant="contained" onClick={handleAddImageOpen}>
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
              <input
                type="file"
                name="Image_URL"
                onChange={onChangePicture}
              />
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
              <label>ยืนยันรหัสผ่านใหม่</label>
              <input
                type="date"
                name="ImageDate"
              />
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
              <TableCell sx={{fontWeight:'bold'}} >Preview</TableCell>
              <TableCell sx={{fontWeight:'bold'}} align="right">อธิบาย</TableCell>
              <TableCell sx={{fontWeight:'bold'}} align="right">วันที่</TableCell>
              <TableCell sx={{fontWeight:'bold'}} align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {images.map((image) => (
              <TableRow
                key={image._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Button variant="contained">
                    <PlayArrowIcon />
                  </Button>
                </TableCell>
                <TableCell align="right">{image.ImageDetail}</TableCell>
                <TableCell align="right">{new Date(image.ImageDate).toISOString().split('T')[0]}</TableCell>
                <TableCell align="right">
                  <Button variant="contained" color="error">
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

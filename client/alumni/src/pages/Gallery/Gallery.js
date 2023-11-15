import React from "react";
import { useEffect } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { axiosReq } from "../../services/service";
import { Box, Modal, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";


const Gallery = () => {
  const [images, setImages] = React.useState([]);
  const [imageModals, setImageModals] = React.useState({});

  const toggleImageModal = (imageId) => {
    setImageModals((prevState) => ({
      ...prevState,
      [imageId]: !prevState[imageId],
    }));
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
  const sortImagesByDate = (imageData) => {
    return imageData.sort((a, b) => {
      const dateA = new Date(a.ImageDate);
      const dateB = new Date(b.ImageDate);
      return dateB - dateA;
    });
  };

  useEffect(() => {
    getImages();
  }, []);

  return (
    <ImageList cols={4} gap={8}>
      {images.map((image) => (
        <ImageListItem key={image._id}>
          <img
            srcSet={`${image.Image_URL}`}
            src={`${image.Image_URL}?w=248&fit=crop&auto=format`}
            alt={image.ImageDetail}
            loading="lazy"
            onClick={() => toggleImageModal(image._id)}
          />
          <ImageListItemBar
            title={image.ImageDetail}
            subtitle={
              <span>
                Date: {new Date(image.ImageDate).toISOString().split("T")[0]}
              </span>
            }
            position="below"
          />
          <Modal
            open={imageModals[image._id]}
            onClose={() => toggleImageModal(image._id)}
            className="profile-modals"
          >
            <Box sx={previewStyle}>
              <IconButton
                style={{ position: "absolute", top: 5, right: 5 , color: "white",cursor: "pointer" }}
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
        </ImageListItem>
      ))}
    </ImageList>
  );
};

export default Gallery;

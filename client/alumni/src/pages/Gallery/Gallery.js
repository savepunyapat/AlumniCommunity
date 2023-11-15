import React from 'react'
import { useEffect } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { axiosReq } from '../../services/service';

const Gallery = () => {
  const [images, setImages] = React.useState([]);

  const getImages = async () => {
    try {
      const response = await axiosReq.get("http://localhost:8000/gallery/getGalleryImages");
      setImages(sortImagesByDate(response.data));
    } catch (error) {
      console.log(error.message);
    }
  }
  const sortImagesByDate = (imageData) => {
    return imageData.sort((a, b) => {
      const dateA = new Date(a.ImageDate);
      const dateB = new Date(b.ImageDate);
      return dateB - dateA;
    });
  };


  useEffect(() => {
    getImages();
  }, [])


  return (
    <ImageList cols={4} gap={8}>
      {images.map((item) => (
        <ImageListItem key={item._id}>
          <img
            srcSet={`${item.Image_URL}`}
            src={`${item.Image_URL}?w=248&fit=crop&auto=format`}
            alt={item.ImageDetail}
            loading="lazy"
          />
          <ImageListItemBar
            title={item.ImageDetail}
            subtitle={<span>Date: {new Date(item.ImageDate).toISOString().split('T')[0]}</span>}
            position="below"
          />
        </ImageListItem>
      ))}
    </ImageList>
  )
}

export default Gallery
const GalleryModel = require("../models/Gallery");
const asyncHandler = require("express-async-handler");

const getAllAlbums = asyncHandler(async (req, res) => {
  try {
    const albums = await GalleryModel.find({});
    res.status(200).json(albums);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

const addAlbum = asyncHandler(async (req, res) => {
  try {
    const { AlbumTitle, AlbumDescription, AlbumImages } = req.body;
    const album = new GalleryModel({
      AlbumTitle,
      AlbumDescription,
      AlbumImages, 
    });
    await album.save();
    res.status(200).json("album added");
  } catch (err) {
    res.status(500).json(err.message);
  }
});

const deleteAlbumById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    await GalleryModel.findByIdAndDelete(id);
    res.status(200).json("album deleted");
  } catch (err) {
    res.status(500).json(err.message);
  }
});

const addToAlbum = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { Image_URL, ImageDate, ImageTitle } = req.body;
    const album = await GalleryModel.findById(id);
    const imageData = { Image_URL, ImageDate, ImageTitle };
    album.AlbumImages.push(imageData);
    await album.save();
    res.status(200).json("image added");
  } catch (err) {
    res.status(500).json(err.message);
  }
});

const getAlbumById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const album = await GalleryModel.findById(id);
    res.status(200).json(album);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

const deleteImageById = asyncHandler(async (req, res) => {
    try {
        const { albumId, imageId } = req.params;
    
        const album = await GalleryModel.findById(albumId);
    
        if (!album) {
          return res.status(404).json({ message: "Album not found" });
        }
    
        album.AlbumImages = album.AlbumImages.filter(
          (image) => image._id.toString() !== imageId
        );
    
        await album.save();
    
        res.status(200).json({ message: "Image deleted from album" });
      } catch (err) {
        res.status(500).json(err.message);
      }
});



module.exports = {
  getAllAlbums,
  addAlbum,
  deleteAlbumById,
  addToAlbum,
  getAlbumById,
  deleteImageById,
};

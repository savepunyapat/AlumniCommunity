const express = require("express");
const router = express.Router();
const GalleryModel = require("../models/Gallery");
const { verified } = require("../middlewares/Auth");
const {
  getAllAlbums,
  addAlbum,
  deleteAlbumById,
  addToAlbum,
  getAlbumById,
  deleteImageById,
} = require("../controllers/GalleryController");

router.get("/gallery/getAllAlbums", getAllAlbums);
router.post("/gallery/addAlbum", addAlbum);
router.delete("/gallery/deleteAlbumById/:id", deleteAlbumById);
router.post("/gallery/addToAlbum/:id", addToAlbum);
router.get("/gallery/getAlbumById/:id", getAlbumById);
router.delete("/gallery/:albumId/images/:imageId", deleteImageById);
module.exports = router;

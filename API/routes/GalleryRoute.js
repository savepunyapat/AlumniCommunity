const express = require("express");
const router = express.Router();
const GalleryModel = require("../models/Gallery");
const { verified ,isAdmin} = require("../middlewares/Auth");
const {
  getAllAlbums,
  addAlbum,
  deleteAlbumById,
  addToAlbum,
  getAlbumById,
  deleteImageById,
} = require("../controllers/GalleryController");

router.get("/gallery/getAllAlbums", getAllAlbums);
router.post("/gallery/addAlbum",isAdmin, addAlbum);
router.delete("/gallery/deleteAlbumById/:id",isAdmin, deleteAlbumById);
router.post("/gallery/addToAlbum/:id",isAdmin, addToAlbum);
router.get("/gallery/getAlbumById/:id", getAlbumById);
router.delete("/gallery/:albumId/images/:imageId",isAdmin, deleteImageById);
module.exports = router;

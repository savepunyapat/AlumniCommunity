const express = require("express");
const router = express.Router();
const GalleryModel = require("../models/Gallery");
const { verified } = require("../middlewares/Auth");
const {
    addImage,
    getAllImages,
    deleteImageById
} = require("../controllers/GalleryController");


router.get("/gallery/getGalleryImages", getAllImages);
router.post("/gallery/addImage", addImage);
router.delete("/gallery/deleteImageById/:id", deleteImageById);



module.exports = router;
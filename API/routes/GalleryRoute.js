const express = require("express");
const router = express.Router();
const GalleryModel = require("../models/Gallery");
const { verified } = require("../middlewares/Auth");
const {
    addImage,
    getAllImages
} = require("../controllers/GalleryController");


router.get("/gallery/getGalleryImages", getAllImages);
router.post("/gallery/addImage", addImage);



module.exports = router;
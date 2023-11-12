const express = require("express");
const router = express.Router();
const GalleryModel = require("../models/Gallery");
const { verified } = require("../middlewares/Auth");


module.exports = router;
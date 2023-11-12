const GalleryModel = require("../models/Gallery");
const asyncHandler = require("express-async-handler");
const AccountModel = require("../models/AlumniAccount");

const getAllImages = asyncHandler(async (req, res) => {
    try {
        const Images = await GalleryModel.find({});
        res.status(200).json(Images);
    } catch (err) {
        res.status(500).json(err.message);
    }
    }
);

module.exports = {
    getAllImages
}
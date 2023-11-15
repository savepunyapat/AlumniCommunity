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

const addImage = asyncHandler(async (req, res) => {
    try {
        const {Image_URL, ImageDetail, ImageDate} = req.body;
        const Image = new GalleryModel({
            Image_URL,
            ImageDetail,
            ImageDate
        });
        await Image.save();
        res.status(200).json('image added');
    } catch (err) {
        res.status(500).json(err.message);
    }
    }
);


module.exports = {
    getAllImages,
    addImage
}
const mongoose = require("mongoose");

const GallerySchema = mongoose.Schema(
  {
    AlbumTitle: {
      type: String,
      required: true,
      default: "-",
    },
    AlbumDescription: {
      type: String,
      required: true,
      default: "-",
    },
    AlbumImages: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          default: () => new mongoose.Types.ObjectId(),
        },
        Image_URL: {
          type: String,
          required: true,
        },
        ImageDate: {
          type: Date,
          required: true,
        },
        ImageTitle: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Gallery = mongoose.model("Gallery", GallerySchema);

module.exports = Gallery;

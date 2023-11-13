const mongoose = require('mongoose');

const GallerySchema = mongoose.Schema(
    {
        ImageDetail:{    
            type:String,
            require:true,
            default:"-",
        },
        Image_URL:{
            type:String,
            require:true,
        },
        ImageDate:{
            type:Date,
            require:true,
        },

    },
    {
        timestamps:true
    }
)

const Gallery = mongoose.model("Gallery", GallerySchema)

module.exports = Gallery;
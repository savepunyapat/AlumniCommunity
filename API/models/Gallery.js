const mongoose = require('mongoose');

const GallerySchema = mongoose.Schema(
    {
        ImageDetail:{    
            type:String,
            require:[true],
            default:"-",
        },
        Pic_url:{
            type:String,
            require:true,
            default:"https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
        }

    },
    {
        timestamps:true
    }
)

const Gallery = mongoose.model("Gallery", GallerySchema)

module.exports = Gallery;
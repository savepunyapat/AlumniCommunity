const mongoose = require('mongoose');

const PostSchema = mongoose.Schema(
    {
        PostSubject:{
            type:String,
            require:true
        },
        PostCategory:{
            type:String,
            require:true
        },
        PostDetail:{    
            type:String,
            require:[true],
            default:"-",
        },
        Comments:{
            type:JSON,
            require:true,
            default:{}
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

const Posts = mongoose.model("Posts", PostSchema)

module.exports = Posts;
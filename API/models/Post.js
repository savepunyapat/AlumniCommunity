const mongoose = require('mongoose');

const PostSchema = mongoose.Schema(
    {
        PostSubject:{
            type:String,
            require:true
        },
        PostCategory:{
            type:Array,
            require:true
        },
        PostDetail:{
            type:String,
            require:[true],
            default:"-",
        },

    },
    {
        timestamps:true
    }
)

const Posts = mongoose.model("Posts", PostSchema)

module.exports = Posts;
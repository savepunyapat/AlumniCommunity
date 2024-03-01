const PostModel = require('../models/Post');
const asyncHandler = require("express-async-handler");
const AccountModel = require('../models/AlumniAccount');

const getPostID = asyncHandler(async (req,res)=>{
    try {
        const postExists = await     PostModel.findById(req.params.id)
        res.status(200)
        res.json(postExists)
    } catch (error) {
        res.status(500)
        res.json(err)
    }
})

const getAllPosts = asyncHandler(async (req,res) => {
    try {
        const Posts = await PostModel.find({});
        res.status(200).json(Posts);
    } catch (err) {
        res.status(500).json(err.message);
    }
})

const addComment = asyncHandler(async (req,res) => {
    const newComment = req.body.comment;
    const uid = req.user.id;
    const postID = req.params.id;
    //console.log(uid);
    //console.log(postID);
    if(!newComment){
        res.status(400);
        throw new Error("Comment field is empty!")
    }
    const userExists = await AccountModel.findById(uid);
    console.log(userExists);
    /*
    const postExists = await PostModel.findById(postID.trim());    
    console.log(postExists);
    if(userExists && postExists){
        console.log(true)
        const newComment =
        
    }*/
    try{
        const result = await PostModel.updateOne(
            {_id:postID.trim()},
            {$set:{[`Comments.${uid}`]:{
                comment:newComment,
                FirstName:userExists.FirstName,
                LastName:userExists.LastName,
            } }},
        );
        console.log(result);
        res.status(200).json("Updated comment")
    }
    catch (err) {
        res.status(500).json(err.message);
    }

})

const addPost = asyncHandler(async (req,res) => {
    const newPost = req.body;
    try {
        const result = await PostModel.create(newPost);
        res.status(200).json("Post added");
    } catch (error) {
        res.status(500).json({ messgae: error.message });
    }
})

const deletePostById = asyncHandler(async (req,res) => {
    try {
        await PostModel.findByIdAndDelete(req.params.id);
        res.status(200).json("Deleted");
    } catch (err) {
        res.status(500).json(err.message);
    }
})

const editPostById = asyncHandler(async (req,res) => {
    try {
        await PostModel.findByIdAndUpdate(
          req.params.id,
          { $set: req.body },
          { new: true }
        );
        res.status(200).json("Updated");
    } catch (err) {
        res.status(500).json(err.message);
    }
})



module.exports = {
    getAllPosts,
    addPost,
    deletePostById,
    editPostById,
    addComment,
    getPostID
}
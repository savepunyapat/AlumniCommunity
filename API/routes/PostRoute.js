const express = require("express");
const router = express.Router();
const PostModel = require("../models/Post");
const { verified, isAdmin } = require("../middlewares/Auth");
const { addComment, getPostID , addPost , deletePostById, editPostById , getAllPosts } = require("../controllers/PostController");
/*
router.post("/addPost", async (req, res) => {
  try {
    const newPost = await PostModel.create(req.body);
    res.status(200).json('Post added');
  } catch (error) {
    res.status(500).json({ messgae: error.message });
  }
});
router.get("/getAllPosts", async (req, res) => {
  try {
    const Posts = await PostModel.find({});
    res.status(200).json(Posts);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.delete("/post/:id", async (req, res) => {
  try {
    await PostModel.findByIdAndDelete(req.params.id);
    res.status(200).json("Deleted");
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.put("/post/:id", async (req, res) => {
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
});
*/
router.get('/getAllPosts',getAllPosts)
router.post('/addPost',isAdmin,addPost)
router.delete('/post/:id',isAdmin,deletePostById)
router.put('/post/:id',isAdmin,editPostById)
router.get('/post/:id',getPostID)
router.put('/comment/:id',verified,addComment)

module.exports = router;

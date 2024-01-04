const ThreadModel = require("../models/Thread");
const asyncHandler = require("express-async-handler");

const createThread = asyncHandler(async (req, res) => {
  const { ThreadSubject, ThreadCategory, ThreadDetail } = req.body;
  const uid = req.user.id;
  if (!ThreadSubject || !ThreadCategory) {
    res.status(400);
    throw new Error("Subject or Category field is empty!");
  }
  const newThread = new ThreadModel({
    ThreadSubject,
    ThreadCategory,
    ThreadDetail,
    ThreadComments: {},
    ThreadAuthor: uid,
  });
  try {
    const result = await newThread.save();
    res.status(200);
    res.json(result);
  } catch (error) {
    res.status(500);
    res.json(error);
  }
});

const getThreadID = asyncHandler(async (req, res) => {
  try {
    const threadExists = await ThreadModel.findById(req.params.id);
    res.status(200);
    res.json(threadExists);
  } catch (error) {
    res.status(500);
    res.json(err);
  }
});

const addComment = asyncHandler(async (req, res) => {
  const newComment = req.body.comment;
  const uid = req.user.id;
  const threadID = req.params.id;
  if (!newComment) {
    res.status(400);
    throw new Error("Comment field is empty!");
  }
  const userExists = await AccountModel.findById(uid);
  console.log(userExists);
  try {
    const result = await ThreadModel.updateOne(
      { _id: threadID.trim() },
      {
        $set: {
          [`Comments.${uid}`]: {
            comment: newComment,
            FirstName: userExists.FirstName,
            LastName: userExists.LastName,
          },
        },
      }
    );
    console.log(result);    
    res.status(200).json("Updated comment");
  } catch (err) {
    res.status(500).json(err.message);
  }
});

const getThreadCategory = asyncHandler(async (req, res) => {
  try {
    const threadExists = await ThreadModel.find({
      ThreadCategory: req.params.category,
    });
    res.status(200);
    res.json(threadExists);
  } catch (error) {
    res.status(500);
    res.json(err);
  }
});

const getThreadSubject = asyncHandler(async (req, res) => {
  try {
    const threadExists = await ThreadModel.find({
      ThreadSubject: req.params.subject,
    });
    res.status(200);
    res.json(threadExists);
  } catch (error) {
    res.status(500);
    res.json(err);
  }
});

const getThreadAuthor = asyncHandler(async (req, res) => {
  try {
    const threadExists = await ThreadModel.find({
      ThreadAuthor: req.params.author,
    });
    res.status(200);
    res.json(threadExists);
  } catch (error) {
    res.status(500);
    res.json(err);
  }
});

const getThread = asyncHandler(async (req, res) => {
  try {
    const threadExists = await ThreadModel.find({});
    res.status(200);
    res.json(threadExists);
  } catch (error) {
    res.status(500);
    res.json(err);
  }
});

const deleteThread = asyncHandler(async (req, res) => {
  try {
    const threadExists = await ThreadModel.findByIdAndDelete(req.params.id);
    res.status(200);
    res.json(threadExists);
  } catch (error) {
    res.status(500);
    res.json(err);
  }
});

module.exports = {
  createThread,
  getThreadID,
  addComment,
  getThreadCategory,
  getThreadSubject,
  getThreadAuthor,
  getThread,
  deleteThread,
};

const express = require("express");
const router = express.Router();
const ThreadModel = require("../models/Thread");
const { verified } = require("../middlewares/Auth");
const {
  createThread,
  getThreadID,
  addComment,
  getThreadCategory,
  getThreadSubject,
  getThreadAuthor,
  getThread,
  deleteThread,
} = require("../controllers/ThreadController");

router.post("/createThread", createThread);
router.get("/getThreadID/:id", getThreadID);
router.put("/addComment/:id", verified, addComment);
router.get("/getThreadCategory/:category", getThreadCategory);
router.get("/getThreadSubject/:subject", getThreadSubject);
router.get("/getThreadAuthor/:author", getThreadAuthor);
router.get("/getThread", getThread);
router.delete("/deleteThread/:id", deleteThread);

module.exports = router;

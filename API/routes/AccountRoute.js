const express = require("express");
const router = express.Router();
const AccountModel = require("../models/AlumniAccount");
const {
  userLogin,
  userLogout,
  changePassword,
  registerUser,
  getMe,
  updateAccount,
  deleteWorkPlaceByIndex,
  addEducation,
  addWorkPlace,
  deleteEducationByIndex,
  updateEducation,
  updateWorkPlace
} = require("../controllers/AccountController");
const { verified, isAdmin } = require("../middlewares/Auth");

router.post("/addAccount", async (req, res) => {
  try {
    const newAccount = await AccountModel.create(req.body);
    res.status(200).json(newAccount);
  } catch (error) {
    res.status(500).json({ messgae: error.message });
  }
});

router.get("/allAccount", async (req, res) => {
  try {
    const Accounts = await AccountModel.find({});
    res.status(200).json(Accounts);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.delete("/acc/:id", async (req, res) => {
  try {
    console.log(req.params)
    await AccountModel.findByIdAndDelete(req.params.id);
    res.status(200).json("Deleted");
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.put("/updateworkplace/:index",verified,updateWorkPlace);
router.put("/updateeducation/:index",verified,updateEducation);
router.delete("/deleteWorkPlace/:index", verified, deleteWorkPlaceByIndex)
router.delete("/deleteEducation/:index", verified, deleteEducationByIndex);
router.put("/addEducation", verified, addEducation);
router.put("/addWorkPlace", verified, addWorkPlace);
router.post("/changePassword", verified, changePassword);
router.put("/acc/:id", verified, updateAccount);
router.post("/register", registerUser);
router.get("/me", verified, getMe);
router.post("/login", userLogin);
router.get("/logout", userLogout);
router.get("/isAdmin", isAdmin);
module.exports = router;

const express = require('express');
const router = express.Router();
const AccountModel = require('../models/AlumniAccount');
const {userLogin, registerUser} = require('../controllers/AccountController')

router.post("/addAccount", async (req, res) => {
  try {
    const newAccount = await AccountModel.create(req.body);
    res.status(200).json(newAccount);
  } catch (error) {
    res.status(500).json({ messgae: error.message });
  }
});

router.get("/getAllAccount", async (req, res) => {
  try {
    const Accounts = await AccountModel.find({});
    res.status(200).json(Accounts);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.delete("/acc/:id", async (req, res) => {
  try {
    await AccountModel.findByIdAndDelete(req.params.id);
    res.status(200).json("Deleted");
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.put("/acc/:id", async (req, res) => {
  try {
    await AccountModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json("Updated");
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.post('/register',registerUser)

router.post('/login',userLogin)

module.exports = router;
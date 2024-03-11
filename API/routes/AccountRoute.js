const express = require("express");
const router = express.Router();
const AccountModel = require("../models/AlumniAccount");
const bcrypt = require("bcryptjs");
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
  updateEducationByIndex,
  updateWorkPlaceByIndex,
  adminEditPermission,
  addAccount,
  allAccount,
  deleteAccount,
  getAllAlumni,
} = require("../controllers/AccountController");
const { verified, isAdmin } = require("../middlewares/Auth");
const multer = require("multer");
const upload = multer();
const csvtojson = require("csvtojson");
/*
router.post("/addAccount",isAdmin, async (req, res) => {
  try {
    const newAccount = await AccountModel.create(req.body);
    res.status(200).json(newAccount);
  } catch (error) {
    res.status(500).json({ messgae: error.message });
  }
});

router.get("/allAccount",isAdmin, async (req, res) => {
  try {
    const Accounts = await AccountModel.find({}).select("-Password");
    res.status(200).json(Accounts);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.delete("/acc/:id",isAdmin, async (req, res) => {
  try {
    console.log(req.params)
    await AccountModel.findByIdAndDelete(req.params.id);
    res.status(200).json("Deleted");
  } catch (err) {
    res.status(500).json(err.message);
  }
});
*/
function convertToISODate(dateString) {
  var parts = dateString.split('/');
  
  var isoDate = `${parts[2]}-${parts[0].padStart(2, '0')}-${parts[1].padStart(2, '0')}`;
  
  var dateObject = new Date(isoDate);

  return dateObject;
}

router.post("/import", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      res.status(400).json({ error: "No file uploaded" });
      return;
    }
    const csv = req.file.buffer.toString("utf8");
    const accounts = await csvtojson().fromString(csv);
    res.status(200).json(accounts);
  } catch (error) {
    res.status(500).json({ messgae: error.message });
  }
});

router.post("/import/user",verified, async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const batchToDiscordKeyMap = {
      "01" : process.env.BATCH_RANGE_1_30_DISCORD_KEY,
      "02" : process.env.BATCH_RANGE_1_30_DISCORD_KEY,
      "03" : process.env.BATCH_RANGE_1_30_DISCORD_KEY,
      "04" : process.env.BATCH_RANGE_1_30_DISCORD_KEY,
      "05" : process.env.BATCH_RANGE_1_30_DISCORD_KEY,
      "06" : process.env.BATCH_RANGE_1_30_DISCORD_KEY,
      "07" : process.env.BATCH_RANGE_1_30_DISCORD_KEY,
      "08" : process.env.BATCH_RANGE_1_30_DISCORD_KEY,
      "09" : process.env.BATCH_RANGE_1_30_DISCORD_KEY,
      "10" : process.env.BATCH_RANGE_1_30_DISCORD_KEY,
      "11" : process.env.BATCH_RANGE_1_30_DISCORD_KEY,
      "12" : process.env.BATCH_RANGE_1_30_DISCORD_KEY,
      "13" : process.env.BATCH_RANGE_1_30_DISCORD_KEY,
      "14" : process.env.BATCH_RANGE_1_30_DISCORD_KEY,
      "15" : process.env.BATCH_RANGE_1_30_DISCORD_KEY,
      "16" : process.env.BATCH_RANGE_1_30_DISCORD_KEY,
      "17" : process.env.BATCH_RANGE_1_30_DISCORD_KEY,
      "18" : process.env.BATCH_RANGE_1_30_DISCORD_KEY,
      "19" : process.env.BATCH_RANGE_1_30_DISCORD_KEY,
      "20" : process.env.BATCH_RANGE_1_30_DISCORD_KEY,
      "21" : process.env.BATCH_RANGE_1_30_DISCORD_KEY,
      "22" : process.env.BATCH_RANGE_1_30_DISCORD_KEY,
      "23" : process.env.BATCH_RANGE_1_30_DISCORD_KEY,
      "24" : process.env.BATCH_RANGE_1_30_DISCORD_KEY,
      "25" : process.env.BATCH_RANGE_1_30_DISCORD_KEY,
      "26" : process.env.BATCH_RANGE_1_30_DISCORD_KEY,
      "27" : process.env.BATCH_RANGE_1_30_DISCORD_KEY,
      "28" : process.env.BATCH_RANGE_1_30_DISCORD_KEY,
      "29" : process.env.BATCH_RANGE_1_30_DISCORD_KEY,
      "30" : process.env.BATCH_RANGE_1_30_DISCORD_KEY,
      "31": process.env.BATCH_RANGE_31_59_DISCORD_KEY,
      "32": process.env.BATCH_RANGE_31_59_DISCORD_KEY,
      "33": process.env.BATCH_RANGE_31_59_DISCORD_KEY,
      "34": process.env.BATCH_RANGE_31_59_DISCORD_KEY,
      "35": process.env.BATCH_RANGE_31_59_DISCORD_KEY, 
      "36": process.env.BATCH_RANGE_31_59_DISCORD_KEY,
      "37": process.env.BATCH_RANGE_31_59_DISCORD_KEY,
      "38": process.env.BATCH_RANGE_31_59_DISCORD_KEY,
      "39": process.env.BATCH_RANGE_31_59_DISCORD_KEY,
      "40": process.env.BATCH_RANGE_31_59_DISCORD_KEY,
      "41": process.env.BATCH_RANGE_31_59_DISCORD_KEY,
      "42": process.env.BATCH_RANGE_31_59_DISCORD_KEY,
      "43": process.env.BATCH_RANGE_31_59_DISCORD_KEY,
      "44": process.env.BATCH_RANGE_31_59_DISCORD_KEY,
      "45": process.env.BATCH_RANGE_31_59_DISCORD_KEY,
      "46": process.env.BATCH_RANGE_31_59_DISCORD_KEY,
      "47": process.env.BATCH_RANGE_31_59_DISCORD_KEY,
      "48": process.env.BATCH_RANGE_31_59_DISCORD_KEY,
      "49": process.env.BATCH_RANGE_31_59_DISCORD_KEY,
      "50": process.env.BATCH_RANGE_31_59_DISCORD_KEY,
      "51": process.env.BATCH_RANGE_31_59_DISCORD_KEY,
      "52": process.env.BATCH_RANGE_31_59_DISCORD_KEY,
      "53": process.env.BATCH_RANGE_31_59_DISCORD_KEY,
      "54": process.env.BATCH_RANGE_31_59_DISCORD_KEY,
      "55": process.env.BATCH_RANGE_31_59_DISCORD_KEY,
      "56": process.env.BATCH_RANGE_31_59_DISCORD_KEY,
      "57": process.env.BATCH_RANGE_31_59_DISCORD_KEY,
      "58": process.env.BATCH_RANGE_31_59_DISCORD_KEY,
      "59": process.env.BATCH_RANGE_31_59_DISCORD_KEY,
      "60": process.env.BATCH_60_DISCORD_KEY,
      "61": process.env.BATCH_61_DISCORD_KEY,
      "62": process.env.BATCH_62_DISCORD_KEY,
      "63": process.env.BATCH_63_DISCORD_KEY,
      "64": process.env.BATCH_64_DISCORD_KEY,
      "65": process.env.BATCH_65_DISCORD_KEY,
      "66": process.env.BATCH_66_DISCORD_KEY,
      "67": process.env.BATCH_67_DISCORD_KEY,
    };
    for(const account of req.body){
      const existingAccount = await AccountModel.findOne({Email: account.Email});
      if (existingAccount) {
        res.status(400).json({ error: "Username already exists" });
        return;
      }
      const birthDate = convertToISODate(account.Birthday);
      const formattedBirthDate = birthDate.toISOString();
      const defaultDiscordKey = "0";
      const classBatch = account.StdID.substring(0, 2);
      const newAccount = await AccountModel.create({
        Password: await bcrypt.hash(account.StdID, salt),
        Email: account.Email,
        Permission: account.Permission,
        FirstName: account.FirstName,
        LastName: account.LastName,
        Birthday: birthDate,
        PhoneNumber: account.PhoneNumber,
        StdID: account.StdID,
        DiscordKey: batchToDiscordKeyMap[classBatch] || defaultDiscordKey,
      });
    }
    res.status(200).json("Imported");
  } catch (error) {
    res.status(500).json({ messgae: error.message });
  }
});



router.put("/updateWorkPlace/:index", verified, updateWorkPlaceByIndex);
router.put("/updateEducation/:index", verified, updateEducationByIndex);
router.delete("/deleteWorkPlace/:index", verified, deleteWorkPlaceByIndex);
router.delete("/deleteEducation/:index", verified, deleteEducationByIndex);
router.put("/addEducation", verified, addEducation);
router.put("/addWorkPlace", verified, addWorkPlace);
router.post("/changePassword", verified, changePassword);
router.put("/acc/:id", updateAccount);
router.post("/register", isAdmin, registerUser);
router.get("/me", verified, getMe);
router.post("/login", userLogin);
router.get("/logout", userLogout);
router.get("/isAdmin", isAdmin);
router.put("/adminEditPermission/:id", isAdmin, adminEditPermission);
router.get("/allAccount", isAdmin, allAccount);
router.delete("/acc/:id", isAdmin, deleteAccount);
router.post("/addAccount", isAdmin, addAccount);
router.get("/getAllAlumni", verified, getAllAlumni);

module.exports = router;

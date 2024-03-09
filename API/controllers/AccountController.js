const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const AccountModel = require("../models/AlumniAccount");

const registerUser = asyncHandler(async (req, res) => {
  const batchToDiscordKeyMap = {
    "60": process.env.BATCH_60_DISCORD_KEY,
    "61": process.env.BATCH_61_DISCORD_KEY,
    "62": process.env.BATCH_62_DISCORD_KEY,
    "63": process.env.BATCH_63_DISCORD_KEY,
    "64": process.env.BATCH_64_DISCORD_KEY,
    "65": process.env.BATCH_65_DISCORD_KEY,
    "66": process.env.BATCH_66_DISCORD_KEY,
    "67": process.env.BATCH_67_DISCORD_KEY,
  }
  const defaultDiscordKey = "0";
  const {
    FirstName,
    Email,
    Password,
    Permission,
    LastName,
    PhoneNumber,
    Address,
    StdID,
    Education,
    WorkPlace,
    Birthday,
  } = req.body;
  console.log(req.body);

  if (!FirstName || !Email || !Password || !Permission || !LastName || !StdID) {
    res.status(400);
    throw new Error("Please add all required fields");
  }

  const userExists = await AccountModel.findOne({ Email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(Password, salt);

  const classBatch = StdID.substring(0, 2);

  const DiscordKey = batchToDiscordKeyMap[classBatch] || defaultDiscordKey;

  const Account = await AccountModel.create({
    FirstName,
    Email,
    Password: hashedPassword,
    Permission,
    LastName,
    PhoneNumber,
    Address,
    StdID,
    Education,
    WorkPlace,
    Birthday,
    DiscordKey,
  });

  if (Account) {
    res.status(201).json({
      //_id: Account.id,
      FirstName: Account.FirstName,
      Email: Account.Email,
      DiscordKey: Account.DiscordKey,
      token: generateToken(Account._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const addWorkPlace = asyncHandler(async (req, res) => {
  const { CompanyName, Position, StartDate, EndDate } = req.body;
  const WorkPlace = { CompanyName, Position, StartDate, EndDate };
  const user = await AccountModel.findById(req.user.id);
  if (user) {
    user.WorkPlace.push(WorkPlace);
    await user.save();
    res.status(201).json({
      WorkPlace: user.WorkPlace,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const addEducation = asyncHandler(async (req, res) => {
  const { Course, Qualification, GraduateYear } = req.body;
  const Education = { Course, Qualification, GraduateYear };
  const user = await AccountModel.findById(req.user.id);
  if (user) {
    user.Education.push(Education);
    await user.save();
    res.status(201).json({
      Education: user.Education,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const deleteEducationByIndex = asyncHandler(async (req, res) => {
  const { index } = req.params;
  console.log(index);

  const user = await AccountModel.findById(req.user.id);
  if (user) {
    user.Education.splice(index, 1);
    await user.save();
    res.status(201).json({
      Education: user.Education,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const deleteWorkPlaceByIndex = asyncHandler(async (req, res) => {
  const { index } = req.params;
  const user = await AccountModel.findById(req.user.id);
  if (user) {
    user.WorkPlace.splice(index, 1);
    await user.save();
    res.status(201).json({
      WorkPlace: user.WorkPlace,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const updateEducationByIndex = asyncHandler(async (req, res) => {
  console.log(req.body)
  console.log(req.params)
  const { index } = req.params;
  const { Course, Qualification, GraduateYear } = req.body;
  const Education = { Course, Qualification, GraduateYear };
  const user = await AccountModel.findById(req.user.id);
  if (user) {
    user.Education[index] = Education;
    await user.save();
    res.status(201).json({
      Education: user.Education,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const updateWorkPlaceByIndex = asyncHandler(async (req, res) => {
  const { index } = req.params;
  const { CompanyName, Position, StartDate, EndDate } = req.body;
  const WorkPlace = { CompanyName, Position, StartDate, EndDate };
  const user = await AccountModel.findById(req.user.id);
  if (user) {
    user.WorkPlace[index] = WorkPlace;
    await user.save();
    res.status(201).json({
      WorkPlace: user.WorkPlace,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});





const userLogin = asyncHandler(async (req, res) => {
  const Email = req.body.Email;
  const Password = req.body.Password;
  const Account = await AccountModel.findOne({ Email });
  if (Account && (await bcrypt.compare(Password, Account.Password))) {
    const accessToken = generateToken(Account._id);
    res.status(200).json({ accessToken });
  } else {
    res.json({ message: "invalid-user" });
    res.status(401);
  }
});

const userLogout = asyncHandler(async (req, res) => {
  localStorage.removeItem("token");
});

//Generate Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};


const updateAccount = asyncHandler(async (req, res) => {
  try {
    const { permission, ...updateData } = req.body;
    await AccountModel.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true }
    );

    res.status(200).json("Updated");
  } catch (err) {
    res.status(401).json({
      msg: "You are not authorized.",
    });
  }
});

const adminEditPermission = asyncHandler(async (req, res) => {
  try {
    const user = await AccountModel.findById(req.params.id);
    if (user) {
      user.Permission = req.body.Permission;
      await user.save();
      res.status(200).json("Updated");
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  } catch (err) {
    res.status(401).json({
      msg: "You are not authorized.",
    });
  }
})


const getMe = asyncHandler(async (req, res) => {
  try {
    const user = await AccountModel.findById(req.user.id);

    res.status(200).json({
      id: user._id,
      FirstName: user.FirstName,
      Email: user.Email,
      Permission: user.Permission,
      LastName: user.LastName,
      PhoneNumber: user.PhoneNumber,
      Address: user.Address,
      StdID: user.StdID,
      Education: user.Education,
      WorkPlace: user.WorkPlace,
      Birthday: user.Birthday,
      DiscordKey: user.DiscordKey,
    });
  } catch (err) {
    res.json(err);
    res.status(500);
  }
});

const changePassword = asyncHandler(async (req, res) => {
  try {
    const { oldPassword, confirmPassword, newPassword } = req.body;
    console.log(req.body);
    if (newPassword === confirmPassword) {
      const { _id, Password } = await AccountModel.findById(req.user.id);
      const isMatch = await bcrypt.compare(oldPassword, Password);
      if (!isMatch) {
        res.status(200).json("invalid new password");
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      await AccountModel.findByIdAndUpdate(_id, { Password: hashedPassword });
      res.status(200).json("Password changed");
    }else {
      res.status(400).json("Password is not match");
    }
  } catch (err) {
    res.json(err);
    res.status(500);
  }
});
const addAccount = asyncHandler(async (req, res) => {
  try {
    const newAccount = await AccountModel.create(req.body);
    res.status(200).json(newAccount);
  } catch (error) {
    res.status(500).json({ messgae: error.message });
  }
});
const allAccount = asyncHandler(async (req, res) => {
  try {
    const Accounts = await AccountModel.find({}).select("-Password");
    res.status(200).json(Accounts);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

const deleteAccount = asyncHandler(async (req, res) => {
  try {
    console.log(req.params)
    await AccountModel.findByIdAndDelete(req.params.id);
    res.status(200).json("Deleted");
  } catch (err) {
    res.status(500).json(err.message);
  }
});
const getAllAlumni = asyncHandler(async (req, res) => {
  try {
    const alumni = await AccountModel.find({Permission : 'user'}).select("-Password -DiscordKey -Permission -Address -Birthday");
    res.status(200).json(alumni);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = {
  changePassword,
  registerUser,
  userLogin,
  getMe,
  updateAccount,
  userLogout,
  addEducation,
  addWorkPlace,
  deleteEducationByIndex,
  deleteWorkPlaceByIndex,
  updateEducationByIndex,
  updateWorkPlaceByIndex,
  adminEditPermission,
  addAccount,
  allAccount,
  deleteAccount,
  getAllAlumni,
};

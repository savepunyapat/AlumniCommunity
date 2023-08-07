const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const AccountModel = require("../models/AlumniAccount");

const registerUser = asyncHandler(async (req, res) => {
  const { FirstName, Email, Password,Permission,LastName,PhoneNumber,Address,StdID,Course,Qualification,GraduateYear } = req.body;
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

  const Account = await AccountModel.create({
    FirstName,
    Email,
    Password: hashedPassword,
    Permission,
    LastName,
    PhoneNumber,
    Address,
    StdID,
    Course,
    Qualification,
    GraduateYear
  });

  if (Account) {
    res.status(201).json({
      //_id: Account.id,
      FirstName: Account.FirstName,
      Email: Account.Email,
      token: generateToken(Account._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const userLogin = asyncHandler(async (req, res) => {
  const Email = req.body.Email;
  const Password = req.body.Password
  const Account = await AccountModel.findOne({ Email })
  if (Account && (await bcrypt.compare(Password, Account.Password))) {
    const accessToken = generateToken(Account._id)
    res.status(200).json({accessToken});
  } else {
    res.json({message:'invalid-user'});
    res.status(401);
  }
})

const userLogout = asyncHandler(async(req,res)=>{
  localStorage.removeItem('token');
})

//Generate Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  })
}

const updateAccount = asyncHandler(async (req, res) => {
  try {
    await AccountModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json("Updated");
  } catch (err) {
    res.status(401).json({
      msg: "You are not authorized."
    })
  }
})

const getMe = asyncHandler(async (req, res) => {
  try {
    const user = await AccountModel.findById(req.user.id)

    res.status(200).json({
      id: user._id,
      FirstName: user.FirstName,
      Email: user.Email,
      Permission: user.Permission,
      LastName: user.LastName,
      PhoneNumber: user.PhoneNumber,
      Address: user.Address,
      StdID: user.StdID,
      Course: user.Course,
      Qualification: user.Qualification,
      GraduateYear: user.GraduateYear
    })
  } catch (err) {
    res.json(err)
    res.status(500)
  }

})

 const changePassword = asyncHandler(async (req, res) => {
   try {
     const { oldPassword, newPassword } = req.body
     const { _id, Password } = await AccountModel.findById(req.user.id)
     const isMatch = await bcrypt.compare(oldPassword, Password)
     if (!isMatch) {
       res.status(400).json("Old password is incorrect")
     }
     const salt = await bcrypt.genSalt(10)
     const hashedPassword = await bcrypt.hash(newPassword, salt)
     await AccountModel.findByIdAndUpdate(_id, { Password: hashedPassword })
     res.status(200).json("Password changed")
   } catch (err) {
     res.json(err)
     res.status(500)
   }
 })


module.exports = {
  changePassword,
  registerUser,
  userLogin,
  getMe,
  updateAccount,
  userLogout
}
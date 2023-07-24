const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const AccountModel = require("../models/AlumniAccount");

const registerUser = asyncHandler(async (req, res) => {
  const { FirstName, Email, Password } = req.body;
  console.log(FirstName,Email,Password)

  if (!FirstName || !Email || !Password) {
    res.status(400);
    throw new Error("Please add all fields");
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
  });

  if (Account) {
    res.status(201).json({
      //_id: Account.id,
      FirstName: Account.FirstName,
      Email: Account.Email,
      //token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const userLogin = asyncHandler(async(req,res)=>{
    const {Email,Password} = req.body;
    const Account = await AccountModel.findOne({Email})

    if(Account && (await bcrypt.compare(Password,Account.Password))){
        res.json({
            _id:Account._id,
            FirstName:Account.FirstName,
            Email:Account.Email
        })
    }else{
        res.status(400)
        throw new Error('Invalid credentials')
    }
})

module.exports = {
    registerUser,
    userLogin,
}
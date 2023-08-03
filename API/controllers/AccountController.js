const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const AccountModel = require("../models/AlumniAccount");

const registerUser = asyncHandler(async (req, res) => {
  const { FirstName, Email, Password } = req.body;
  console.log(FirstName, Email, Password)

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
      token: generateToken(Account._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const userLogin = asyncHandler(async (req, res) => {
  const Email = req.body.email;
  const Password = req.body.password
  const Account = await AccountModel.findOne({ Email })
  if (Account && (await bcrypt.compare(Password, Account.Password))) {
    const accessToken = generateToken(Account._id)
    res.status(200).json({accessToken});
  } else {
    res.status(400).json({message:'invalid user'});
    throw new Error('Invalid credentials')
  }
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
    const { _id, FirstName, Email } = await AccountModel.findById(req.user.id)

    res.status(200).json({
      id: _id,
      FirstName: FirstName,
      Email: Email,
    })
  } catch (err) {
    res.json(err)
    res.status(500)
  }

})

module.exports = {
  registerUser,
  userLogin,
  getMe,
  updateAccount
}
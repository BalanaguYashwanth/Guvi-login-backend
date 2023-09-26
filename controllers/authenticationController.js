const asyncHandler = require("express-async-handler");
const Auth = require("../models/authModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { ACCESS_TOKEN_SECRET } = require("../config/contants");

const getHashPassword = async (password) => {
  const hashPassword = await bcrypt.hash(password, 10);
  return hashPassword;
};

const register = asyncHandler(async (req, res) => {
  const { name, email, password, confirmpassword } = req.body;
  if (!(name && email && password && confirmpassword)) {
    return res.status(400).json({ message: "please enter all fields" });
  }
  const emailExists = await Auth.findOne({ email });
  if (emailExists) {
    return res
      .status(400)
      .json({ message: "Email is already exists please try another" });
  }
  const hashPassword = await getHashPassword(password);
  const user = await Auth.create({
    name,
    email,
    password: hashPassword,
  });
  if (user) {
    return res.status(201).json({ _id: user._id, email: user.email });
  } else {
    return res.status(400).json({
      message: "something went wrong while creating a user please try again",
    });
  }
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!(email && password)) {
    return res.status(400).json({ message: "please enter all fields" });
  }
  const userDetails = await Auth.findOne({ email });
  if (!userDetails) {
    return res.status(401).json({ message: "User is not registered" });
  }
  const userName = userDetails.name;
  const userPassword = userDetails.password;
  const comparePassword = await bcrypt.compare(password, userPassword);
  if (userDetails && comparePassword) {
    const accessToken = jwt.sign(
      {
        user: {
          id: userDetails.id,
          name: userName,
          email,
        },
      },
      ACCESS_TOKEN_SECRET
    );
    return res.status(200).json({ accessToken });
  } else {
    return res
      .status(401)
      .json({ message: "Login details are invalid, Please try again" });
  }
});

const current = asyncHandler(async (req, res) => {
  return res.status(200).json(req.user);
});

module.exports = {
  login,
  register,
  current,
};

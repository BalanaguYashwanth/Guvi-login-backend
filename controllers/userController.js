const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const {
  VALIDATE_EMAIL_REGEX,
  VALIDATE_DATE_REGEX,
} = require("../config/contants");

const getUserDetails = asyncHandler(async (req, res) => {
  const users = await User.find({ user_id: req.user.id });
  return res.status(200).json(users);
});

//todo - if we can fetch using id, without email please check
const updateUserDetails = asyncHandler(async (req, res) => {
  const { age, gender, dob, phone } = req.body;
  const { id, name, email } = req.user;

  req.body.email = req?.body?.email ? req.body.email : email;

  if (!(age && gender && dob && phone)) {
    return res.status(400).json({ message: "please enter all fields" });
  } else if (typeof gender !== "number") {
    return res.status(400).json({ message: "Gender should be number" });
  } else if (typeof age != "number" || age > 90) {
    return res
      .status(400)
      .json({ message: "Age must number and should be less than 90" });
  } else if (phone.length < 10 || phone.length > 15) {
    return res
      .status(400)
      .json({ message: "Phone number should be between than 10-15" });
  } else if (
    req?.body?.email &&
    !req?.body?.email?.match(VALIDATE_EMAIL_REGEX)
  ) {
    return res.status(400).json({ message: "Enter valid email" });
  } else if (!dob.match(VALIDATE_DATE_REGEX)) {
    return res.status(400).json({ message: "Enter valid dob" });
  }

  const hasUserIdExists = await User.find({ user_id: id });
  let updatedDetails;
  if (hasUserIdExists.length) {
    const intialData = 0;
    const getId = hasUserIdExists[intialData]._id;
    updatedDetails = await User.findByIdAndUpdate(getId, req.body, {
      new: true,
    });
  } else {
    updatedDetails = await User.create({
      user_id: id,
      name,
      email,
      age,
      gender,
      dob,
      phone,
    });
  }
  res.status(201).json(updatedDetails);
});

module.exports = {
  getUserDetails,
  updateUserDetails,
};

const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const getUserDetails = asyncHandler(async (req, res) => {
  const users = await User.find({ user_id: req.user.id });
  return res.status(200).json(users);
});

//todo - if we can fetch using id, without email please check
const updateUserDetails = asyncHandler(async (req, res) => {
  const { age, gender, dob, phone } = req.body;
  const { id, name, email } = req.user;
  if (!(age && gender && dob && phone)) {
    return res.status(400).json({ message: "please enter all fields" });
  } else if (typeof gender !== "number") {
    return res.status(400).json({ message: "Gender should be number" });
  } else if (typeof age != "number" || age > 90) {
    return res.status(400).json({ message: "Age must be less than 90" });
  } else if (phone.length < 10 || phone.length > 15) {
    return res
      .status(400)
      .json({ message: "Phone number should be between than 10-15" });
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

const express = require("express");
const {
  getUserDetails,
  updateUserDetails,
} = require("../controllers/userController");
const validationToken = require("../middleware/tokenValidation");

const router = express.Router();

router.get("/", validationToken ,getUserDetails);

router.post("/", validationToken,updateUserDetails);

module.exports = router
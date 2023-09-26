const express = require("express")
const { login, register, current } = require("../controllers/authenticationController")
const validationToken = require("../middleware/tokenValidation")

const router = express.Router()

router.post("/login", login)

router.post("/register", register)

router.get("/currentUser", validationToken ,current)

module.exports = router
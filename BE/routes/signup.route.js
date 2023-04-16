const express = require("express");
const router = express.Router();

const signupController = require('../controller/signup.controller')




router.post("/signup", signupController.signup)

module.exports = router;
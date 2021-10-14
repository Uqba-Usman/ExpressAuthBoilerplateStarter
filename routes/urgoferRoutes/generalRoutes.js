const express = require("express");
const userSignupValidator = require("../../middlewares/user/userSignupValidator");
const router = express.Router();
const user = require("../api/user");

//users
router.post("/user/signup", userSignupValidator, user.signUp);
router.post("/user/login", user.login);

module.exports = router;

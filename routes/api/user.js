const express = require("express");
const router = express.Router();
const _ = require("lodash");
const jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const config = require("config");
const { User } = require("../../models/user");

module.exports.signUp = async (req, res) => {
  try {
    let user = req.body;

    let newUser = new User();
    const salt = await bcrypt.genSalt(10);
    newUser.name = user.name;
    newUser.userName = user.userName;
    newUser.email = user.email;
    newUser.password = await bcrypt.hash(user.password, salt);

    newUser = await newUser.save();

    const token = jwt.sign(
      {
        _id: newUser._id,
        role: newUser.role,
        userName: newUser.userName,
        email: newUser.email,
      },
      config.get("jwtPrivateKey")
    );
    newUser = _.omit(newUser, "password");
    newUser = JSON.parse(JSON.stringify(newUser));
    newUser.token = token;
    const pickUser = _.pick(newUser, [
      "name",
      "userName",
      "email",
      "token",
      "profileImage",
    ]);
    return res.status(200).send(pickUser);
  } catch (e) {
    console.log(e);
    return res.status(400).send({ error: e.message });
  }
};

module.exports.login = async (req, res) => {
  let user = await User.findOne({
    email: req.body.email,
  });
  if (!user) return res.status(400).send({ error: "Invalid email." });
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).send({ error: "Invalid password" });
  const token = jwt.sign(
    {
      _id: user._id,
      role: user.role,
      fullName: user.fullName,
      email: user.email,
    },
    config.get("jwtPrivateKey")
  );

  user = _.omit(user, "password");
  user = JSON.parse(JSON.stringify(user));
  user.token = token;
  const pickUser = _.pick(user, [
    "name",
    "userName",
    "email",
    "token",
    "profileImage",
  ]);
  return res.send(pickUser);
};

module.exports.changePassword = async (req, res) => {
  try {
    let user = await User.findById(req.body.id);
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.newPassword, salt);
    user = await User.save(user);
    user = _.omit(user, "password");
    user = JSON.parse(JSON.stringify(user));
    return res.status(200).send(user);
  } catch (e) {
    console.log(e);
    return res.status(400).send({ error: e.message });
  }
};

module.exports.updateUser = async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    let data = req.body;
    for (var x of Object.keys(data)) {
      user[x] = data[x];
    }
    user = await User.save(user);
    user = _.omit(user, "password");
    user = JSON.parse(JSON.stringify(user));
    return res.status(200).send(user);
  } catch (e) {
    console.log(e);
    return res.status(400).send({ error: e.message });
  }
};

module.exports.singleUser = async (req, res) => {
  try {
    let user = await User.findById(req.params.id);

    user = _.omit(user, "password");
    user = JSON.parse(JSON.stringify(user));
    return res.status(200).send(user);
  } catch (e) {
    console.log(e);
    return res.status(400).send({ error: e.message });
  }
};

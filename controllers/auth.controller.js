const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

async function handleRegister(req, res) {
  const { username, email, password, age, name } = req.body;

  let user = await userModel.findOne({ email });
  if (user) return res.status(500).send('User already exists');

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      const newUser = await userModel.create({
        username,
        name,
        email,
        password: hash,
        age,
        profilePic: req.file ? req.file.filename : undefined
      });

      let token = jwt.sign({ email: email, userid: newUser._id }, "shhhh");
      res.cookie("token", token);
      res.redirect("/dashboard/profile");

    });
  });
}


async function handleLogin(req, res) {

  const { email, password } = req.body;

  let user = await userModel.findOne({ email });
  if (!user) return res.status(404).send('User not found');

  bcrypt.compare(password, user.password, (err, isMatch) => {
    if (!isMatch) { return res.redirect("/auth/login") }

    let token = jwt.sign({ email: email, userid: user._id }, "shhhh");
    res.cookie("token", token);
    res.redirect('/dashboard/profile');

  });
}

module.exports = {
  handleRegister,
  handleLogin
}
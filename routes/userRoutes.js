'use strict';

const express = require('express');
const router = express.Router();
const User = require('../models/user');

// [POST] /api/user
router.post('/user', async (req, res) => {
  try {
    const { name, email, phoneNumber } = req.body;
    const user = new User({ name, email, phoneNumber });
    await user.save();

    res.status(201).json({
      message: "User created successfully",
      data: user
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "❌ Email or Phone Number already exists",
        error: error.message
      });
    }

    res.status(500).json({
      message: "❌ Internal Server Error",
      error: error.message
    });
  }
});

// [GET] /api/users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      message: "Users fetched successfully",
      data: users
    });
  } catch (error) {
    res.status(500).json({
      message: "❌ Error fetching users",
      error: error.message
    });
  }
});

module.exports = router;

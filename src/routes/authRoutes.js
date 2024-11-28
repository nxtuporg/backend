const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middlewares/authMiddleware");

router.post("/register", async (req, res) => {
  try {
    const { username, email, enrollment_number, password } = req.body;
    const existingUser = await User.findOne({
      email: { $regex: new RegExp(`^${email}$`, "i") },
    });
    if (existingUser) {
      return res
        .status(400)
        .json({ status: false, message: "Email already exists" });
    }
    const newuser = new User({ username, email, enrollment_number, password });
    await newuser.save();
    const token = jwt.sign({ _id: newuser._id }, process.env.SECRET_KEY);
    res.status(200).json({
      status: true,
      message: "User created successfully",
      token,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { usernameOrEmail, password } = req.body;
    const user = await User.findOne({
      $or: [
        { username: usernameOrEmail },
        { email: { $regex: new RegExp(`^${usernameOrEmail}$`, "i") } },
      ],
    });

    if (!user) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid email or password" });
    }

    const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY);
    res.status(200).json({
      status: true,
      message: "Login successful",
      token,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Login error",
    });
  }
});

router.get("/me", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(404).json({ status: false, message: "User not found" });
    }
    res.status(200).json({
      status: true,
      user,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: "Server error" });
  }
});

module.exports = router;

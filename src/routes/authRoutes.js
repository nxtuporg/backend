const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middlewares/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: User authentication and account management
 */

/**
 * @swagger
 * /api/user/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The user's username
 *               email:
 *                 type: string
 *                 description: The user's email
 *               enrollment_number:
 *                 type: string
 *                 description: The user's enrollment number
 *               password:
 *                 type: string
 *                 description: The user's password
 *             required:
 *               - username
 *               - email
 *               - enrollment_number
 *               - password
 *     responses:
 *       200:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 token:
 *                   type: string
 *       400:
 *         description: Email already exists
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usernameOrEmail:
 *                 type: string
 *                 description: The username or email of the user
 *               password:
 *                 type: string
 *                 description: The user's password
 *             required:
 *               - usernameOrEmail
 *               - password
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 token:
 *                   type: string
 *       400:
 *         description: Invalid email or password
 *       500:
 *         description: Login error
 */

/**
 * @swagger
 * /api/user/me:
 *   get:
 *     summary: Get current user details
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     username:
 *                       type: string
 *                     email:
 *                       type: string
 *                     enrollment_number:
 *                       type: string
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */


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
import pkg from "bcryptjs";
import sign from "jsonwebtoken";
import User from "../models/User.js";

import { Router } from "express";
const router = Router();
const { hash, compare } = pkg;

// User Registration
router.post("/register", async (req, res) => {
  try {
    const hashedPassword = await hash(req.body.password, 10);
    const newUser = new User({
      username: req.body.username,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json("User registered successfully!");
  } catch (err) {
    res.status(500).json(err);
  }
});

// User Login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(400).json("Invalid username!");

    const isMatch = await compare(req.body.password, user.password);
    if (!isMatch) return res.status(400).json("Invalid password!");

    const token = sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;

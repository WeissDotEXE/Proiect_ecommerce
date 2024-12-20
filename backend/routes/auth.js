import pkg from "bcryptjs";
import pkgJWT from "jsonwebtoken"; // Import jsonwebtoken correctly
import User from "../models/User.js";
import { Router } from "express";

const router = Router();
const { hash, compare } = pkg; // Extract functions from bcryptjs
const { sign } = pkgJWT; // Extract `sign` from jsonwebtoken

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
    console.log("Request Body:", req.body); // Debug log

    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      console.log("Invalid username!"); // Debug log
      return res.status(400).json("Invalid username!");
    }

    const isMatch = await compare(req.body.password, user.password);
    if (!isMatch) {
      console.log("Invalid password!"); // Debug log
      return res.status(400).json("Invalid password!");
    }

    const token = sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    console.log("Generated Token:", token); // Debug log
    res.json({ token });
  } catch (err) {
    console.error("Error:", err); // Debug log
    res.status(500).json(err);
  }
});

export default router;

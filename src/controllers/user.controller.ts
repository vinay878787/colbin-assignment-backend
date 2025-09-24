import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name, bio } = req.body;
    if (!email || !password || !name) {
      return res.status(400).json({ error: "Email, password, and name are required." });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "Email already registered." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword, name, bio });
    await user.save();
    res.status(201).json({ message: "Registration successful." });
  } catch (err) {
    console.error('Error during user registration:', err);
    res.status(500).json({ error: "Failed to register user. Please try again later." });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required." });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials." });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials." });
    }
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
  } catch (err) {
    console.error('Error during user login:', err);
    res.status(500).json({ error: "Failed to login. Please try again later." });
  }
};

export const getProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    res.json(user);
  } catch (err) {
    console.error('Error while fetching user profile:', err);
    res.status(500).json({ error: "Failed to fetch user profile. Please try again later." });
  }
};

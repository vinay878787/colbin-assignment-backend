import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";


export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password, name, bio } = req.body;
    if (!email || !password || !name) {
      const err: any = new Error("Email, password, and name are required.");
      err.status = 400;
      return next(err);
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const err: any = new Error("Email already registered.");
      err.status = 409;
      return next(err);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword, name, bio });
    await user.save();
    res.status(201).json({ message: "Registration successful." });
  } catch (err) {
    next(err);
  }
};


export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      const err: any = new Error("Email and password are required.");
      err.status = 400;
      return next(err);
    }
    const user = await User.findOne({ email });
    if (!user) {
      const err: any = new Error("Invalid credentials.");
      err.status = 401;
      return next(err);
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      const err: any = new Error("Invalid credentials.");
      err.status = 401;
      return next(err);
    }
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
  } catch (err) {
    next(err);
  }
};


export const getProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      const err: any = new Error("User not found.");
      err.status = 404;
      return next(err);
    }
    res.json(user);
  } catch (err) {
    next(err);
  }
};

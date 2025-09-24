import { Router } from "express";
import { register, login, getProfile } from "../controllers/user.controller";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.post("/register", (req, res, next) => register(req, res, next));

router.post("/login", (req, res, next) => login(req, res, next));

router.get("/profile", authMiddleware, (req, res, next) => getProfile(req, res, next));

export default router;

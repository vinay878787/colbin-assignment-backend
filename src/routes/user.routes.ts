import { Router } from "express";
import { register, login, getProfile } from "../controllers/user.controller";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.post("/register", register);

router.post("/login", login);

router.get("/profile", authMiddleware, getProfile);

export default router;

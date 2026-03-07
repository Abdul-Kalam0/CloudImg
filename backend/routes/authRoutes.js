import express from "express";
import { authLimiter } from "../middleware/rateLimiter.js";
const router = express.Router();

import { register, login, logout, me } from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

router.post("/register", authLimiter, register);
router.post("/login", authLimiter, login);
router.get("/me", authMiddleware, me);
router.post("/logout", logout);

export default router;

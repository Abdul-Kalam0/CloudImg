import express from "express";
import { authLimiter } from "../middleware/rateLimiter.js";
const router = express.Router();

import { register, login, logout } from "../controllers/authController.js";

router.post("/register", authLimiter, register);
router.post("/login", authLimiter, login);
router.post("/logout", logout);

export default router;

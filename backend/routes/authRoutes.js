import express from "express";
const router = express.Router();

import { authLimiter } from "../middleware/rateLimiter.js";
import {
  register,
  login,
  logout,
  me,
  googleLogin,
} from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

router.post("/register", authLimiter, register);
router.post("/login", authLimiter, login);
// Google login route
router.post("/google", googleLogin);
router.post("/logout", logout);

router.get("/me", authMiddleware, me);

export default router;

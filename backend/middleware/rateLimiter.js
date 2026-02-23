import rateLimit from "express-rate-limit";

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 5, // 5 requests per IP
  message: "Too many attempts. Try again later.",
});

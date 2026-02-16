import express from "express";
const router = express.Router();

import { imageUpload } from "../controllers/imageControllers.js";

router.post("/uploads", imageUpload);

export default router;

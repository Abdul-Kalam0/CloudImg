import express from "express";
const router = express.Router();

import { imageUpload } from "../controllers/imageController.js";
import multer from "multer";

const storage = multer.diskStorage({});
const upload = multer({ storage });

router.post("/uploads", upload.single("image"), imageUpload);

export default router;

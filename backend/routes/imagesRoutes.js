import express from "express";
const router = express.Router();

import { fetchImages, imageUpload } from "../controllers/imageController.js";
import multer from "multer";

const storage = multer.diskStorage({});
const upload = multer({ storage });

router.post("/uploads", upload.single("image"), imageUpload);
router.get("/images", fetchImages);

export default router;

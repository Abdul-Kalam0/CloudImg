import express from "express";
import cors from "cors";
import cloudinary from "cloudinary";
import dotenv from "dotenv";
import multer from "multer";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

//clodinary setup
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//multer setup
const storage = multer.diskStorage({});
const upload = multer({ storage });

import imageRoutes from "./routes/imagesRoutes.js";

app.use("/", imageRoutes);

export default app;

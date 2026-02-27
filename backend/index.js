import express from "express";
import cors from "cors";
import cloudinary from "cloudinary";
import dotenv from "dotenv";
import multer from "multer";
dotenv.config();
import cookieParser from "cookie-parser";

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

import imageRoutes from "./routes/imagesRoutes.js";
import albumRoutes from "./routes/albumRoutes.js";
import authRoutes from "./routes/authRoutes.js";

app.use("/auth", authRoutes);

app.use("/albums", albumRoutes);
app.use("/albums", imageRoutes);

export default app;

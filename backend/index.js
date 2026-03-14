import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    //origin: "http://localhost:5173",
    origin: "https://cloud-img-001.vercel.app",
    credentials: true,
  }),
);

import imageRoutes from "./routes/imagesRoutes.js";
import albumRoutes from "./routes/albumRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";

app.use("/auth", authRoutes);
app.use("/albums", albumRoutes);
app.use("/albums", imageRoutes);

app.use(errorHandler);

export default app;

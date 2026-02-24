import express from "express";
const router = express.Router();

import { authMiddleware } from "../middleware/authMiddleware";

router.use(authMiddleware);

router.post("/album", createAlbum);
router.get("/album", getAlbums);

export default router;

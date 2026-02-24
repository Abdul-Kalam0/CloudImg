import express from "express";
const router = express.Router();

import { authMiddleware } from "../middleware/authMiddleware";

router.use(authMiddleware);

router.post("/albums", createAlbum);
router.get("/albums", getAlbums);

export default router;

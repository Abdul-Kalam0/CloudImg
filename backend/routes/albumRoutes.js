import express from "express";
const router = express.Router();

import { authMiddleware } from "../middleware/authMiddleware";

router.use(authMiddleware);

//Create
router.post("/", createAlbum);

//Read
router.get("/:albumId", getAlbum);
router.get("/", getAlbums);

//Update
//router.put("/:albumId", updateAlbum);

// Share
router.post("/:albumId/share", shareAlbum);

//Delete
router.delete("/:albumId", deleteAlbum);

export default router;

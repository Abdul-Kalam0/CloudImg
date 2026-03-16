import express from "express";
const router = express.Router();

import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  createAlbum,
  getAlbum,
  getAlbums,
  deleteAlbum,
  updateAlbum,
  shareAlbum,
  getSharedAlbums,
} from "../controllers/albumController.js";

router.use(authMiddleware);

//Create
router.post("/", createAlbum);

//Read
router.get("/:albumId", getAlbum);
router.get("/", getAlbums);

//Update
router.put("/:albumId", updateAlbum);

// Share
router.post("/:albumId/share", shareAlbum);

router.get("/shared-with-me", getSharedAlbums);

//Delete
router.delete("/:albumId", deleteAlbum);

export default router;

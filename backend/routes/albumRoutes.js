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
  getSharedWithMe,
} from "../controllers/albumController.js";

router.use(authMiddleware);

//Create
router.post("/", createAlbum);

//Read

router.get("/", getAlbums);

router.get("/shared-with-me", getSharedWithMe);

router.get("/:albumId", getAlbum);

//Update
router.put("/:albumId", updateAlbum);

// Share
router.post("/:albumId/share", shareAlbum);

//Delete
router.delete("/:albumId", deleteAlbum);

export default router;

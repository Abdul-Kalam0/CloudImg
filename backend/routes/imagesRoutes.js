import express from "express";
const router = express.Router();

import { authMiddleware } from "../middleware/authMiddleware";
import { upload } from "../middleware/multerMiddleware";

app.use(authMiddleware);

//POST   /albums/:albumId/images
router.post("/:albumId/images", upload.single("image"), updloadImage);
//GET    /albums/:albumId/images
router.get("/:albumId/images", getImages);
//GET    /albums/:albumId/images/favorites
router.get("/:albumId/images/favorites", getFavoriteImages);
//PUT    /albums/:albumId/images/:imageId/favorite
router.put("/:albumId/images/:imageId/favorite", toggleFavorite);
//POST   /albums/:albumId/images/:imageId/comments
router.post("/:albumId/images/:imageId/comments", addComment);
//DELETE /albums/:albumId/images/:imageId
router.delete("/:albumId/images/:imageId", deleteImage);

export default router;

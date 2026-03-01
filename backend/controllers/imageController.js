import cloudinary from "../config/cloudinary";
import ImageModel from "../models/Image.js";
import AlbumModel from "../models/Album.js";

export const uploadImage = async (req, res) => {
  try {
    const file = req.file;
    const { albumId } = req.params;
    const { tags, person, isFavourite } = req.body;

    if (!file) {
      return res.status(400).json({
        success: false,
        message: "Image file required",
      });
    }

    const album = await AlbumModel.findOne({ albumId });
    if (!album) {
      return res.status(404).json({
        success: false,
        message: "Album not found",
      });
    }

    if (album.ownerId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Only Owner can upload images",
      });
    }

    //upload to cloudinary which will return image_url
    const uploadResult = await cloudinary.uploader.upload(req.file, {
      folder: "kaviosPix",
    });

    const image = await ImageModel.create({
      albumId: album._id,
      imageUrl: uploadResult.secure_url,
      name: file.originalname,
      size: file.size,
      tags: tags ? tags.split(",").map((t) => t.trim()) : [],
      person: person || "",
      isFavourite: isFavourite === "true",
    });

    return res.status(201).json({
      success: true,
      message: "Image uploaded successfully",
      data: image,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getImages = async (req, res) => {
  try {
    const { albumId } = req.params;

    const album = await AlbumModel.findOne({
      albumId,
      $or: [
        { ownerId: req.user.id },
        { sharedWith: req.user.email.toLowerCase() },
      ],
    });

    if (!album) {
      return res.status(404).json({
        success: false,
        message: "Album not found",
      });
    }

    const images = await Image.find({ albumId: album._id });

    return res.status(200).json({
      success: true,
      data: images,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getFavoriteImages = async (req, res) => {
  try {
    const { albumId } = req.params;

    const album = await AlbumModel.findOne({
      albumId,
      $or: [
        { ownerId: req.user.id },
        { sharedWith: req.user.email.toLowerCase() },
      ],
    });

    if (!album) {
      return res.status(404).json({ message: "Album not found" });
    }

    const images = await ImageModel.find({
      albumId: album._id,
      isFavourite: true,
    });

    return res.status(200).json({
      success: true,
      data: images,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const toggleFavorite = async (req, res) => {
  try {
    const { albumId, imageId } = req.params;
    const { isFavourite } = req.body;

    const album = await Album.findOne({ albumId });

    if (!album) return res.status(404).json({ message: "Album not found" });

    if (album.ownerId.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Only owner can update favorite",
      });
    }

    const image = await Image.findOne({ imageId });

    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    image.isFavourite = isFavourite;
    await image.save();

    return res.status(200).json({
      success: true,
      message: "Favorite updated",
      data: image,
    });
  } catch {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const addComment = async (req, res) => {
  try {
    const { albumId, imageId } = req.params;
    const { text } = req.body;

    const album = await Album.findOne({
      albumId,
      $or: [
        { ownerId: req.user.id },
        { sharedWith: req.user.email.toLowerCase() },
      ],
    });

    if (!album) {
      return res.status(404).json({ message: "Album not found" });
    }

    const image = await Image.findOne({ imageId });

    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    image.comments.push({
      text,
      userEmail: req.user.email,
    });

    await image.save();

    return res.status(200).json({
      success: true,
      message: "Comment added",
      data: image,
    });
  } catch {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteImage = async (req, res) => {
  try {
    const { albumId, imageId } = req.params;

    const album = await AlbumModel.findOne({ albumId });
    if (!album) {
      return res.status(404).json({
        success: false,
        message: "Album not found",
      });
    }

    if (album.ownerId.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Only owner can delete image",
      });
    }

    const image = await ImageModel.findOne({ imageId });

    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    await image.deleteOne();
    return res.status(200).json({
      success: true,
      message: "Image deleted successfully",
    });
  } catch {
    return res.status(500).json({ message: "Internal server error" });
  }
};

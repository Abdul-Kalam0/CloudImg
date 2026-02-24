import AlbumModel from "../models/Album.js";
import ImageModel from "../models/Image.js";

export const createAlbum = async (req, res) => {
  const { name, description } = req.body;
  try {
    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Album name is required",
      });
    }

    //create album
    const newAlbum = await AlbumModel.create({
      name: name.trim(),
      description: description || "",
      ownerId: req.user.id,
    });

    return res.status(201).json({
      success: true,
      message: "Album created successfully",
      data: newAlbum,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getAlbum = async (req, res) => {
  const { albumId } = req.params;
  try {
    if (!albumId) {
      return res.status(400).json({
        success: false,
        message: "Album ID required",
      });
    }

    const album = await AlbumModel.findOne({ albumId });
    if (!album) {
      return res.status(404).json({
        success: false,
        nessage: "Album not found",
      });
    }

    const isOwner = album.ownerId.toString() === req.user.id;
    const isShared = album.sharedWith.includes(req.user.email.toLowerCase());
    if (!isOwner && !isShared) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    return res.status(200).json({
      success: true,
      data: album,
    });
  } catch (error) {}
};

export const getAlbums = async (req, res) => {
  try {
    const albums = await AlbumModel.find({
      $or: [
        { ownerId: req.user.id },
        { sharedWith: req.user.email.toLowerCase() },
      ],
    });

    return res.status(200).json({
      success: true,
      data: albums,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const updateAlbum = async (req, res) => {
  const { albumId } = req.params;
  const { description } = req.body;
  try {
    if (!albumId) {
      return res.status(400).json({
        success: false,
        message: "Invalid Album Id",
      });
    }

    const album = await AlbumModel.findOne({ albumId });

    if (album.ownerId.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Only owner can update album",
      });
    }

    album.description = description || "";
    await album.save();

    return res.status(200).json({
      success: true,
      message: "Album updated successfully",
      data: album,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const deleteAlbum = async (req, res) => {
  try {
    const { albumId } = req.params;
    const album = await AlbumModel.findOne(albumId);
    if (!album) {
      return res.status(400).json({
        success: false,
        message: "Album not found",
      });
    }
    if (album.ownerId.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Only owner can delete album",
      });
    }

    await ImageModel.deleteMany({ albumId: album._id });
    await album.deleteOne();
    return res.status(200).json({
      success: true,
      message: "Album deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

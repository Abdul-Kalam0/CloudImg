import AlbumModel from "../models/Album.js";
import ImageModel from "../models/image.js";

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
      description: description?.trim() || "",
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
        message: "Album not found",
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
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getAlbums = async (req, res) => {
  try {
    const albums = await AlbumModel.find({
      ownerId: req.user.id,
    }).sort({ createdAt: -1 });

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
  const { name, description } = req.body;

  try {
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
        message: "Only owner can update album",
      });
    }

    if (name) {
      album.name = name.trim();
    }

    if (description) {
      album.description = description.trim();
    }

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
    const album = await AlbumModel.findOne({ albumId });
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

    await ImageModel.deleteMany({ albumId });
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

export const shareAlbum = async (req, res) => {
  try {
    const { albumId } = req.params;
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    export const shareAlbum = async (req, res) => {
      try {
        const { albumId } = req.params;
        const { email } = req.body;

        const album = await AlbumModel.findOne({ albumId });

        if (!album) {
          return res.status(404).json({
            success: false,
            message: "Album not found",
          });
        }

        if (email.trim().toLowerCase() === req.user.email.toLowerCase()) {
          return res.status(400).json({
            success: false,
            message: "You cannot share album with yourself",
          });
        }

        album.sharedWith.push(email.toLowerCase());

        await album.save();

        return res.status(200).json({
          success: true,
          message: "Album shared successfully",
        });
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: "Internal server error",
        });
      }
    };

    const album = await AlbumModel.findOne({ albumId });

    if (!album) {
      return res.status(404).json({
        success: false,
        message: "Album not found",
      });
    }

    // Only owner can share
    if (album.ownerId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Only owner can share this album",
      });
    }

    const emailLower = email.toLowerCase().trim();

    if (album.sharedWith.includes(emailLower)) {
      return res.status(400).json({
        success: false,
        message: "Album already shared with this user",
      });
    }

    album.sharedWith.push(emailLower);

    await album.save();

    return res.status(200).json({
      success: true,
      message: "Album shared successfully",
      data: album,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getSharedWithMe = async (req, res) => {
  const userEmail = req.user.email.toLowerCase();
  try {
    const albums = await AlbumModel.find({
      sharedWith: userEmail,
    });

    return res.status(200).json({
      success: true,
      data: albums,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching shared albums",
    });
  }
};

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

    if (album.ownerId.toString() !== req.file.id) {
      return res.status(403).json({
        success: false,
        message: "Only Owner can upload images",
      });
    }

    //upload to cloudinary which will return image_url
    const uploadResult = await cloudinary.uploader.upload(req.file, {
      folder: "kaviosPix",
    });

    const image = await Image.create({
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
    
  } catch (error) {}
};

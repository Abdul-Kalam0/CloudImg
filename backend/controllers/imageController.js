import cloudinary from "cloudinary";
import ImageModel from "../models/image.js";

export const imageUpload = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({
        success: false,
        message: "File not found",
      });
    }

    //upload to cloudinary => will return link
    const uploadResult = await cloudinary.uploader.upload(file.path, {
      folder: "uploads",
    });

    //save image url returned by uploader to DB
    const newImage = await ImageModel.create({
      imageUrl: uploadResult.secure_url,
    });

    return res.status(201).json({
      success: true,
      message: "Image uploaded to DB successfully",
      data: {
        imageUrl: uploadResult.secure_url,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error.message,
    });
  }
};

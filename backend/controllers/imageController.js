import cloudinary from "cloudinary";
import ImageModel from "../models/Image.js";
import mongoose from "mongoose";

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

export const fetchImages = async (req, res) => {
  try {
    const images = await ImageModel.find();

    return res.status(200).json({
      success: true,
      data: images,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error.message,
    });
  }
};

export const deleteImage = async (req, res) => {
  const { _id } = req.params;

  if (!mongoose.isValidObjectId(_id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid Id",
    });
  }

  try {
    const deletedImage = await ImageModel.findByIdAndDelete(_id);
    if (!deleteImage) {
      return res.status(404).json({
        success: false,
        message: "Id not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Image deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
    });
  }
};

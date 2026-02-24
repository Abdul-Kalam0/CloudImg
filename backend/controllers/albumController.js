import AlbumModel from "../models/Album.js";

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
      name,
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



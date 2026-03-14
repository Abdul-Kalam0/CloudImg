import multer from "multer";

export const errorHandler = (err, req, res, next) => {
  console.error(err);

  // Multer file size error
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        success: false,
        message: "Image size must be less than 5MB",
      });
    }
  }

  // File type error
  if (err.message === "Only jpeg, png and gif file type are allowed") {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  return res.status(500).json({
    success: false,
    message: "Internal server error",
  });
};

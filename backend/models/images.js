import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Image", ImageSchema);

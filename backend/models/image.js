import mongoose from "mongoose";
import { v4 as uuid4 } from "uuid";

const ImageSchema = new mongoose.Schema(
  {
    imageId: {
      type: String,
      unique: true,
      default: uuid4,
    },
    albumId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Album",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    person: {
      type: String,
      default: "",
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
    comments: [
      {
        type: String,
        userEmail: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],
    uploadedAt: {
      type: Date,
      default: Date.now,
    },
    size: {
      type: Number,
      required: true,
    },
  },

  {
    timestamps: true,
  },
);

export default mongoose.model("Image", ImageSchema);

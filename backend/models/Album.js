import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const albumSchema = new mongoose.Schema(
  {
    albumId: {
      type: String,
      unique: true,
      default: uuidv4,
    },
    name: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    sharedWith: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true },
);

export default mongoose.model("Album", albumSchema);

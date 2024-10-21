import mongoose, { Schema } from "mongoose";
const wallPaperSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    role: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    color_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "color",
    },
    status: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Wallpaper = mongoose.model("wallpaper", wallPaperSchema);

import mongoose, { Schema } from "mongoose";
const frameSchema = mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
    status: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Frame = mongoose.model("frame", frameSchema);

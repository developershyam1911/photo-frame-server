import mongoose, { Schema } from "mongoose";
const colorSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    status: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Color = mongoose.model("color", colorSchema);

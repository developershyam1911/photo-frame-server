import mongoose, { Schema } from "mongoose";
const styleSchema = mongoose.Schema(
  {
    frame_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "frame",
    },
    fontSize: {
      type: String,
    },
    shadow: {
      type: String,
    },
    box_color: {
      type: String,
    },
    color_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "color",
    },
    fontName: {
      type: String,
    },
    align: {
      type: String,
    },
    status: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Style = mongoose.model("style", styleSchema);

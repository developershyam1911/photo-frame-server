import mongoose, { Schema } from "mongoose";
const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
    },
    status: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Category = mongoose.model("category", categorySchema);

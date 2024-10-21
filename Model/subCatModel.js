import mongoose, { Schema } from "mongoose";
const subCategorySchema = mongoose.Schema(
  {
    cat_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
    },
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

export const SubCategory = mongoose.model("sub_categories", subCategorySchema);

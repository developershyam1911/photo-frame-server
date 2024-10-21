import mongoose, { Schema } from "mongoose";
const quotesSchema = mongoose.Schema(
  {
    cat_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
    },
    sub_cat_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "sub_categories",
    },
    content: {
      type: String,
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);

export const Quotes = mongoose.model("quotes", quotesSchema);

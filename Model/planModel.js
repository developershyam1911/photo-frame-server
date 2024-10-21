import mongoose, { Schema } from "mongoose";
const planSchema = mongoose.Schema(
  {
    plan_name: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    days: {
      type: String,
      required: true,
    },
    discountPrice: {
      type: String,
    },
    features: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Plan = mongoose.model("plan", planSchema);

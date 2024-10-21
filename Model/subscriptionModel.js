import mongoose, { Schema } from "mongoose";
const subscriptionSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    startDate: {
      type: String,
      required: true,
    },
    payment_mode: {
      type: String,
    },
    transaction_id: {
      type: String,
    },
    plan_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "plan",
    },
    payment_status: {
      type: String,
    },
    remark: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Subscription = mongoose.model("subscription", subscriptionSchema);

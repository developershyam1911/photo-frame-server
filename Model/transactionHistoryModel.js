import mongoose, { Schema } from "mongoose";
const transactionSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    payment_id: {
      type: String,
    },
    transaction_id: {
      type: String,
    },
    payment_type: {
      type: String,
    },
    plan_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "plan",
    },
    payment_by: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Transaction = mongoose.model(
  "transaction_history",
  transactionSchema
);

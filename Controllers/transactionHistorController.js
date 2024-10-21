import createHttpError from "http-errors";
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError.js";
import { Transaction } from "../Model/transactionHistoryModel.js";

const createTransaction = async (req, res, next) => {
  const {
    plan_id,
    user_id,
    transaction_id,
    payment_id,
    payment_by,
    payment_type,
  } = req.body;
  if (!transaction_id) {
    throw new ApiError(400, "transaction_id is required");
  }
  try {
    const transaction = await Transaction.create({
      plan_id,
      user_id,
      transaction_id,
      payment_id,
      payment_by,
      payment_type,
    });
    return res
      .status(201)
      .json(
        new ApiResponse(200, transaction, "transaction is Added Successfully")
      );
  } catch (error) {
    console.log(error.message);
    throw new ApiError(400, error, "transaction adding error");
  }
};

const updateTransaction = async (req, res, next) => {
  const {
    plan_id,
    user_id,
    transaction_id,
    payment_id,
    payment_by,
    payment_type,
  } = req.body;
  if (!transaction_id) {
    throw new ApiError(400, "transaction_id is required");
  }
  const trans_id = req.params.trans_id;
  if (!trans_id) {
    throw new ApiError(400, "transaction Id is missing");
  }
  const singleTransaction = await Transaction.findOne({
    _id: trans_id,
  });
  if (!singleTransaction) {
    throw new ApiError(400, "Single transaction is not getting");
  }
  try {
    const updatedData = await Transaction.findOneAndUpdate(
      { _id: trans_id },
      {
        plan_id,
        user_id,
        transaction_id,
        payment_id,
        payment_by,
        payment_type,
      },
      { new: true }
    );
    return res
      .status(201)
      .json(
        new ApiResponse(200, updatedData, "transaction is Updated Successfully")
      );
  } catch (error) {
    console.log(error.message);
    throw new ApiError(400, error, "transaction Updating Error");
  }
};
const getTransactions = async (req, res, next) => {
  try {
    const alltrans = await Transaction.find();
    if (!alltrans) {
      throw new ApiError(400, "All transaction is not getting");
    }
    return res
      .status(200)
      .json(
        new ApiResponse(200, alltrans, "All transaction getting successfully")
      );
  } catch (err) {
    console.log(err);
    throw new ApiError(400, err, "All transaction is not getting");
  }
};
const getsingleTransaction = async (req, res, next) => {
  const trans_id = req.params.trans_id;
  console.log(trans_id, "this is cat dia");
  try {
    let singleTransaction;
    if (mongoose.Types.ObjectId.isValid(trans_id)) {
      singleTransaction = await Transaction.findById(trans_id);
    }
    if (!singleTransaction) {
      singleTransaction = await Transaction.findOne({
        slug: trans_id,
      });
    }
    if (!singleTransaction) {
      return next(createHttpError(404, "transaction not found"));
    }
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          singleTransaction,
          "single transaction getting successfully"
        )
      );
  } catch (err) {
    console.log(err);
    throw new ApiError(400, err, "single transaction not getting");
  }
};
const deleteTransaction = async (req, res, next) => {
  const trans_id = req.params.trans_id;
  try {
    const singleTransaction = await Transaction.findOne({
      _id: trans_id,
    });
    if (!singleTransaction) {
      throw new ApiError(400, "single transaction not getting");
    }
    await Transaction.deleteOne({ _id: trans_id });
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          trans_id,
          "single transaction deleted successfully"
        )
      );
  } catch (err) {
    console.log(err, "delete errr");
    throw new ApiError(400, err, "transaction delted error");
  }
};
export {
  createTransaction,
  updateTransaction,
  getTransactions,
  getsingleTransaction,
  deleteTransaction,
};

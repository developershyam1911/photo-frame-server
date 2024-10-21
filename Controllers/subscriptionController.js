import createHttpError from "http-errors";
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError.js";
import { Subscription } from "../Model/subscriptionModel.js";

const createSubscription = async (req, res, next) => {
  const {
    plan_id,
    user_id,
    transaction_id,
    payment_mode,
    payment_status,
    remark,
    startDate,
  } = req.body;
  if (!plan_id) {
    throw new ApiError(400, "plan_id is required");
  }
  try {
    const subscription = await Subscription.create({
      plan_id,
      user_id,
      transaction_id,
      payment_mode,
      payment_status,
      remark,
      startDate,
    });
    return res
      .status(201)
      .json(
        new ApiResponse(200, subscription, "subscription is Added Successfully")
      );
  } catch (error) {
    console.log(error.message);
    throw new ApiError(400, error, "subscription adding error");
  }
};

const updateSubscription = async (req, res, next) => {
  const {
    plan_id,
    user_id,
    transaction_id,
    payment_mode,
    payment_status,
    remark,
    startDate,
  } = req.body;
  if (!plan_id) {
    throw new ApiError(400, "plan_id is required");
  }
  const subscription_id = req.params.subscription_id;
  if (!subscription_id) {
    throw new ApiError(400, "subscription Id is missing");
  }
  const singleSubscription = await Subscription.findOne({
    _id: subscription_id,
  });
  if (!singleSubscription) {
    throw new ApiError(400, "Single subscription is not getting");
  }
  try {
    const updatedData = await Subscription.findOneAndUpdate(
      { _id: subscription_id },
      {
        plan_id,
        user_id,
        transaction_id,
        payment_mode,
        payment_status,
        remark,
        startDate,
      },
      { new: true }
    );
    return res
      .status(201)
      .json(
        new ApiResponse(
          200,
          updatedData,
          "subscription is Updated Successfully"
        )
      );
  } catch (error) {
    console.log(error.message);
    throw new ApiError(400, error, "subscription Updating Error");
  }
};
const getSubscription = async (req, res, next) => {
  try {
    const allsubs = await Subscription.find();
    if (!allsubs) {
      throw new ApiError(400, "All subscription is not getting");
    }
    return res
      .status(200)
      .json(
        new ApiResponse(200, allsubs, "All subscription getting successfully")
      );
  } catch (err) {
    console.log(err);
    throw new ApiError(400, err, "All subscription is not getting");
  }
};
const getsingleSubscription = async (req, res, next) => {
  const subscription_id = req.params.subscription_id;
  console.log(subscription_id, "this is cat dia");
  try {
    let singleSubscription;
    if (mongoose.Types.ObjectId.isValid(subscription_id)) {
      singleSubscription = await Subscription.findById(subscription_id);
    }
    if (!singleSubscription) {
      singleSubscription = await Subscription.findOne({
        slug: subscription_id,
      });
    }
    if (!singleSubscription) {
      return next(createHttpError(404, "subscription not found"));
    }
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          singleSubscription,
          "single  subscription getting successfully"
        )
      );
  } catch (err) {
    console.log(err);
    throw new ApiError(400, err, "single Category not getting");
  }
};
const deleteSubscription = async (req, res, next) => {
  const subscription_id = req.params.subscription_id;
  try {
    const singleSubscription = await Subscription.findOne({
      _id: subscription_id,
    });
    if (!singleSubscription) {
      throw new ApiError(400, "single subscription not getting");
    }
    await Subscription.deleteOne({ _id: subscription_id });
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          subscription_id,
          "single subscription deleted successfully"
        )
      );
  } catch (err) {
    console.log(err, "delete errr");
    throw new ApiError(400, err, "subscription delted error");
  }
};
export {
  createSubscription,
  updateSubscription,
  getSubscription,
  getsingleSubscription,
  deleteSubscription,
};

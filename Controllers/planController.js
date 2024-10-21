import createHttpError from "http-errors";
import { ApiResponse } from "../utils/ApiResponse.js";
import {
  uploadOnCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinary.js";
import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError.js";
import { Plan } from "../Model/planModel.js";

const createPlan = async (req, res, next) => {
  const { plan_name, price, discountPrice, days, features } = req.body;
  if (!plan_name) {
    throw new ApiError(400, "Name is required");
  }
  try {
    const plan = await Plan.create({
      plan_name,
      price,
      discountPrice,
      days,
      features,
    });
    return res
      .status(201)
      .json(new ApiResponse(200, plan, "plan is Added Successfully"));
  } catch (error) {
    console.log(error.message);
    throw new ApiError(400, error, "plan adding error");
  }
};

const updatePlan = async (req, res, next) => {
  const { plan_name, price, discountPrice, days, features } = req.body;
  if (!plan_name) {
    throw new ApiError(400, "Name is required");
  }
  const plan_id = req.params.plan_id;
  if (!plan_id) {
    throw new ApiError(400, "plan Id is missing");
  }
  const singlePlan = await Plan.findOne({ _id: plan_id });
  if (!singlePlan) {
    throw new ApiError(400, "Single Plan is not getting");
  }
  try {
    const updatedCategory = await Plan.findOneAndUpdate(
      { _id: plan_id },
      {
        plan_name,
        price,
        discountPrice,
        days,
        features,
      },
      { new: true }
    );
    return res
      .status(201)
      .json(
        new ApiResponse(200, updatedCategory, "Plan is Updated Successfully")
      );
  } catch (error) {
    console.log(error.message);
    throw new ApiError(400, error, "Plan Updating Error");
  }
};
const getAllPlan = async (req, res, next) => {
  try {
    const allPlan = await Plan.find();
    if (!allPlan) {
      throw new ApiError(400, "All Plan is not getting");
    }
    return res
      .status(200)
      .json(new ApiResponse(200, allPlan, "All Plan getting successfully"));
  } catch (err) {
    console.log(err);
    throw new ApiError(400, err, "All Plan is not getting");
  }
};
const getsinglePlan = async (req, res, next) => {
  const plan_id = req.params.plan_id;
  console.log(plan_id, "this is cat dia");
  try {
    let singlePlan;
    if (mongoose.Types.ObjectId.isValid(plan_id)) {
      singlePlan = await Plan.findById(plan_id);
    }
    if (!singlePlan) {
      singlePlan = await Plan.findOne({ slug: plan_id });
    }
    if (!singlePlan) {
      return next(createHttpError(404, "Plan not found"));
    }
    return res
      .status(200)
      .json(
        new ApiResponse(200, singlePlan, "single Plan getting successfully")
      );
  } catch (err) {
    console.log(err);
    throw new ApiError(400, err, "single plan not getting");
  }
};
const deletePlan = async (req, res, next) => {
  const plan_id = req.params.plan_id;
  try {
    const singlePlan = await Plan.findOne({ _id: plan_id });
    if (!singlePlan) {
      throw new ApiError(400, "single Plan not getting");
    }
    await Plan.deleteOne({ _id: plan_id });
    return res
      .status(200)
      .json(new ApiResponse(200, plan_id, "single Plan deleted successfully"));
  } catch (err) {
    console.log(err, "delete errr");
    throw new ApiError(400, err, "Category delted error");
  }
};

export { createPlan, updatePlan, getAllPlan, getsinglePlan, deletePlan };

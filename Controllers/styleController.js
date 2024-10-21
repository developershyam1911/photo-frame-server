import createHttpError from "http-errors";
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError.js";
import { Style } from "../Model/styleModel.js";

const createStyle = async (req, res, next) => {
  const {
    frame_id,
    color_id,
    fontSize,
    fontName,
    align,
    status,
    shadow,
    box_color,
  } = req.body;
  if (!frame_id) {
    throw new ApiError(400, "frame_id is required");
  }
  try {
    const style = await Style.create({
      frame_id,
      color_id,
      fontSize,
      fontName,
      align,
      status,
      shadow,
      box_color,
    });
    return res
      .status(201)
      .json(new ApiResponse(200, style, "style is Added Successfully"));
  } catch (error) {
    console.log(error.message);
    throw new ApiError(400, error, "style adding error");
  }
};

const updateStyle = async (req, res, next) => {
  const {
    frame_id,
    color_id,
    fontSize,
    fontName,
    align,
    status,
    shadow,
    box_color,
  } = req.body;
  if (!frame_id) {
    throw new ApiError(400, "frame_id is required");
  }
  const style_id = req.params.style_id;
  if (!style_id) {
    throw new ApiError(400, "style Id is missing");
  }
  const singleStyle = await Style.findOne({ _id: style_id });
  if (!singleStyle) {
    throw new ApiError(400, "Single Style is not getting");
  }
  try {
    const updatedStyle = await Style.findOneAndUpdate(
      { _id: style_id },
      {
        frame_id,
        color_id,
        fontSize,
        fontName,
        align,
        status,
        shadow,
        box_color,
      },
      { new: true }
    );
    return res
      .status(201)
      .json(
        new ApiResponse(200, updatedStyle, "Style is Updated Successfully")
      );
  } catch (error) {
    console.log(error.message);
    throw new ApiError(400, error, "Style Updating Error");
  }
};
const getStyle = async (req, res, next) => {
  try {
    const allStyle = await Style.find();
    if (!allStyle) {
      throw new ApiError(400, "All Style is not getting");
    }
    return res
      .status(200)
      .json(new ApiResponse(200, allStyle, "All Style getting successfully"));
  } catch (err) {
    console.log(err);
    throw new ApiError(400, err, "All Style is not getting");
  }
};
const getsingleStyle = async (req, res, next) => {
  const style_id = req.params.style_id;
  console.log(style_id, "this is cat dia");
  try {
    let singleStyle;
    if (mongoose.Types.ObjectId.isValid(style_id)) {
      singleStyle = await Style.findById(style_id);
    }
    if (!singleStyle) {
      singleStyle = await Style.findOne({ slug: style_id });
    }
    if (!singleStyle) {
      return next(createHttpError(404, "Style not found"));
    }
    return res
      .status(200)
      .json(
        new ApiResponse(200, singleStyle, "single  Style getting successfully")
      );
  } catch (err) {
    console.log(err);
    throw new ApiError(400, err, "single Style not getting");
  }
};
const deleteStyle = async (req, res, next) => {
  const style_id = req.params.style_id;
  try {
    const singleStyle = await Style.findOne({ _id: style_id });
    if (!singleStyle) {
      throw new ApiError(400, "single Style not getting");
    }
    await Style.deleteOne({ _id: style_id });
    return res
      .status(200)
      .json(
        new ApiResponse(200, style_id, "single style deleted successfully")
      );
  } catch (err) {
    console.log(err, "delete errr");
    throw new ApiError(400, err, "style delted error");
  }
};

export { createStyle, updateStyle, getStyle, getsingleStyle, deleteStyle };

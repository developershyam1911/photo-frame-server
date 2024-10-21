import createHttpError from "http-errors";
import mongoose from "mongoose";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Color } from "../Model/colorModel.js";

const createColor = async (req, res, next) => {
  const { name, status } = req.body;
  console.log(req.body);
  if (!name) {
    return next(createHttpError(400, "name is required"));
  }
  try {
    const color = await Color.create({
      name,
      status,
    });
    return res
      .status(201)
      .json(new ApiResponse(200, color, "color Add Successfully"));
  } catch (err) {
    console.log(err, " errr");
    return next(createHttpError(400, "color Addition  error"));
  }
};
const updateColor = async (req, res, next) => {
  const { name, status } = req.body;
  if (!name) {
    return next(createHttpError(400, "name is required"));
  }
  const color_id = req.params.color_id;
  if (!color_id) {
    return next(createHttpError(400, "color Id is missing"));
  }
  const singleColor = await Color.findOne({ _id: color_id });
  if (!singleColor) {
    return next(createHttpError(400, "Single Color is not getting"));
  }
  try {
    const updatedsingleColor = await Color.findOneAndUpdate(
      { _id: color_id },
      {
        name,
        status,
      },
      { new: true }
    );
    return res
      .status(201)
      .json(
        new ApiResponse(
          200,
          updatedsingleColor,
          "color is Updated Successfully"
        )
      );
  } catch (error) {
    console.log(error.message);
    return next(createHttpError(400, "color Update Error"));
  }
};
const getSingleColor = async (req, res, next) => {
  const color_id = req.params.color_id;
  if (!color_id) {
    return next(createHttpError(400, "color id is missing"));
  }
  try {
    let singleColor;
    if (mongoose.Types.ObjectId.isValid(color_id)) {
      singleColor = await Color.findById(color_id);
    }
    if (!singleColor) {
      singleColor = await Color.findOne({ slug: color_id });
    }
    if (!singleColor) {
      return next(createHttpError(404, "color not found"));
    }
    return res
      .status(200)
      .json(
        new ApiResponse(200, singleColor, "single color getting successfully")
      );
  } catch (err) {
    console.log(err, "delete errr");
    return next(createHttpError(400, "color delted error"));
  }
};
const getColor = async (req, res, next) => {
  try {
    const color = await Color.find();
    return res
      .status(201)
      .json(new ApiResponse(200, color, "color get Successfully"));
  } catch (err) {
    console.log(err, " errr");
    return next(createHttpError(400, "color getting  error"));
  }
};
const deleteColor = async (req, res, next) => {
  const color_id = req.params.color_id;
  if (!color_id) {
    return next(createHttpError(400, "color id is missing"));
  }
  try {
    const singleColor = await Color.findOne({ _id: color_id });
    if (!singleColor) {
      return next(createHttpError(404, "single color not getting"));
    }
    await Color.deleteOne({ _id: color_id });
    return res
      .status(200)
      .json(
        new ApiResponse(200, color_id, "single Color deleted successfully")
      );
  } catch (err) {
    console.log(err, "delete errr");
    return next(createHttpError(400, "Color delted error"));
  }
};
export { getColor, deleteColor, createColor, updateColor, getSingleColor };

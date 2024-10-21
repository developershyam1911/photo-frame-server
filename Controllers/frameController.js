import createHttpError from "http-errors";
import { ApiResponse } from "../utils/ApiResponse.js";
import {
  uploadOnCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinary.js";
import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError.js";
import { Frame } from "../Model/frameModel.js";

const createFrame = async (req, res, next) => {
  const { status } = req.body;
  const imageLocalpath = req.files?.image[0].path;
  if (!imageLocalpath) {
    throw new ApiError(400, "Image is required");
  }
  const image = await uploadOnCloudinary(imageLocalpath);
  try {
    const frame = await Frame.create({
      status,
      image: image.url,
    });
    return res
      .status(201)
      .json(new ApiResponse(200, frame, "frame is Added Successfully"));
  } catch (error) {
    console.log(error.message);
    throw new ApiError(400, error, "frame adding error");
  }
};

const updateFrame = async (req, res, next) => {
  const { status } = req.body;
  const frame_id = req.params.frame_id;
  if (!frame_id) {
    throw new ApiError(400, "frame Id is missing");
  }
  const singleFrame = await Frame.findOne({ _id: frame_id });
  if (!singleFrame) {
    throw new ApiError(400, "Single Frame is not getting");
  }
  let imageUrl = singleFrame.image;
  if (req.files.image) {
    const imageLocalpath = req.files.image[0].path;
    if (!imageLocalpath) {
      throw new ApiError(400, "Image is required");
    }
    if (singleFrame.image) {
      const oldFilePublicId = singleFrame.image.split("/").pop().split(".")[0];
      await deleteFromCloudinary(oldFilePublicId);
    }
    const image = await uploadOnCloudinary(imageLocalpath);
    if (!image.url) {
      throw new ApiError(400, "Error while uploading image to Cloudinary");
    }
    imageUrl = image.url;
  }
  try {
    const updatedFrame = await Frame.findOneAndUpdate(
      { _id: frame_id },
      {
        status,
        image: imageUrl,
      },
      { new: true }
    );
    return res
      .status(201)
      .json(
        new ApiResponse(200, updatedFrame, "frame is Updated Successfully")
      );
  } catch (error) {
    console.log(error.message);
    throw new ApiError(400, error, "frame Updating Error");
  }
};
const getFrames = async (req, res, next) => {
  try {
    const allFrame = await Frame.find();
    if (!allFrame) {
      throw new ApiError(400, "All Frame is not getting");
    }
    return res
      .status(200)
      .json(new ApiResponse(200, allFrame, "All Frame getting successfully"));
  } catch (err) {
    console.log(err);
    throw new ApiError(400, err, "All Frame is not getting");
  }
};
const getsingleFrame = async (req, res, next) => {
  const frame_id = req.params.frame_id;
  console.log(frame_id, "this is cat dia");
  try {
    let singleFrame;
    if (mongoose.Types.ObjectId.isValid(frame_id)) {
      singleFrame = await Frame.findById(frame_id);
    }
    if (!singleFrame) {
      singleFrame = await Frame.findOne({ slug: frame_id });
    }
    if (!singleFrame) {
      return next(createHttpError(404, "frame not found"));
    }
    return res
      .status(200)
      .json(
        new ApiResponse(200, singleFrame, "single Frame getting successfully")
      );
  } catch (err) {
    console.log(err);
    throw new ApiError(400, err, "single Frame not getting");
  }
};
const deleteFrame = async (req, res, next) => {
  const frame_id = req.params.frame_id;
  try {
    const singleFrame = await Frame.findOne({ _id: frame_id });
    if (!singleFrame) {
      throw new ApiError(400, "single Frame not getting");
    }
    await Frame.deleteOne({ _id: frame_id });
    //file delete on cloudinary
    const filePublicId = singleFrame.image.split("/").pop().split(".")[0];
    console.log("image public id", filePublicId);
    await deleteFromCloudinary(filePublicId);
    return res
      .status(200)
      .json(
        new ApiResponse(200, frame_id, "single Frame deleted successfully")
      );
  } catch (err) {
    console.log(err, "delete errr");
    throw new ApiError(400, err, "frame delted error");
  }
};

export { createFrame, updateFrame, getFrames, getsingleFrame, deleteFrame };

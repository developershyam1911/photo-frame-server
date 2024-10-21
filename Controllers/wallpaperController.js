import createHttpError from "http-errors";
import { ApiResponse } from "../utils/ApiResponse.js";
import {
  uploadOnCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinary.js";
import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError.js";
import { Wallpaper } from "../Model/wallpaperModel.js";

const createWallpaper = async (req, res, next) => {
  const { status, user_id, color_id, role } = req.body;
  if (!color_id) {
    throw new ApiError(400, "color_id is required");
  }
  const imageLocalpath = req.files?.image[0].path;
  if (!imageLocalpath) {
    throw new ApiError(400, "Image is required");
  }
  const image = await uploadOnCloudinary(imageLocalpath);
  try {
    const wallpaper = await Wallpaper.create({
      role,
      user_id,
      color_id,
      status,
      image: image.url,
    });
    return res
      .status(201)
      .json(new ApiResponse(200, wallpaper, "wallpaper is Added Successfully"));
  } catch (error) {
    console.log(error.message);
    throw new ApiError(400, error, "wallpaper adding error");
  }
};

const updateWallpaper = async (req, res, next) => {
  const { status, user_id, color_id, role } = req.body;
  if (!color_id) {
    throw new ApiError(400, "color_id is required");
  }
  const wallpaper_id = req.params.wallpaper_id;
  if (!wallpaper_id) {
    throw new ApiError(400, "wallpaper Id is missing");
  }
  const singleWallpaper = await Wallpaper.findOne({ _id: wallpaper_id });
  if (!singleWallpaper) {
    throw new ApiError(400, "Single wallpaper is not getting");
  }
  let imageUrl = singleWallpaper.image;
  if (req.files.image) {
    const imageLocalpath = req.files.image[0].path;
    if (!imageLocalpath) {
      throw new ApiError(400, "Image is required");
    }
    if (singleWallpaper.image) {
      const oldFilePublicId = singleWallpaper.image
        .split("/")
        .pop()
        .split(".")[0];
      await deleteFromCloudinary(oldFilePublicId);
    }
    const image = await uploadOnCloudinary(imageLocalpath);
    if (!image.url) {
      throw new ApiError(400, "Error while uploading image to Cloudinary");
    }
    imageUrl = image.url;
  }
  try {
    const updatedWallpaper = await Wallpaper.findOneAndUpdate(
      { _id: wallpaper_id },
      {
        role,
        user_id,
        color_id,
        status,
        image: imageUrl,
      },
      { new: true }
    );
    return res
      .status(201)
      .json(
        new ApiResponse(
          200,
          updatedWallpaper,
          "wallpaper is Updated Successfully"
        )
      );
  } catch (error) {
    console.log(error.message);
    throw new ApiError(400, error, "wallpaper Updating Error");
  }
};

const getWallpapers = async (req, res, next) => {
  try {
    const allwallpapers = await Wallpaper.find();
    if (!allwallpapers) {
      throw new ApiError(400, "All wallpaper is not getting");
    }
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          allwallpapers,
          "All wallpaper getting successfully"
        )
      );
  } catch (err) {
    console.log(err);
    throw new ApiError(400, err, "All wallpaper is not getting");
  }
};
const getSingleWallpaper = async (req, res, next) => {
  const wallpaper_id = req.params.wallpaper_id;
  console.log(wallpaper_id, "this is cat dia");
  try {
    let singleWallpaper;
    if (mongoose.Types.ObjectId.isValid(wallpaper_id)) {
      singleWallpaper = await Wallpaper.findById(wallpaper_id);
    }
    if (!singleWallpaper) {
      singleWallpaper = await Wallpaper.findOne({ slug: wallpaper_id });
    }
    if (!singleWallpaper) {
      return next(createHttpError(404, "Wallpaper not found"));
    }
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          singleWallpaper,
          "single Wallpaper getting successfully"
        )
      );
  } catch (err) {
    console.log(err);
    throw new ApiError(400, err, "single Wallpaper not getting");
  }
};
const deleteWallpaper = async (req, res, next) => {
  const wallpaper_id = req.params.wallpaper_id;
  try {
    const singleWallpaper = await Wallpaper.findOne({ _id: wallpaper_id });
    if (!singleWallpaper) {
      throw new ApiError(400, "single Wallpaper not getting");
    }
    await Wallpaper.deleteOne({ _id: wallpaper_id });
    //file delete on cloudinary
    const filePublicId = singleWallpaper.image.split("/").pop().split(".")[0];
    console.log("image public id", filePublicId);
    await deleteFromCloudinary(filePublicId);
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          wallpaper_id,
          "single Wallpaper deleted successfully"
        )
      );
  } catch (err) {
    console.log(err, "delete errr");
    throw new ApiError(400, err, "Wallpaper delted error");
  }
};

export {
  createWallpaper,
  updateWallpaper,
  getWallpapers,
  getSingleWallpaper,
  deleteWallpaper,
};

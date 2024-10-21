import createHttpError from "http-errors";
import { ApiResponse } from "../utils/ApiResponse.js";
import {
  uploadOnCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinary.js";
import mongoose from "mongoose";
import convertToLSlug from "../utils/genrateSlug.js";
import { ApiError } from "../utils/ApiError.js";
import { Category } from "../Model/categoryModel.js";

const createCategory = async (req, res, next) => {
  const { name, status } = req.body;
  if (!name) {
    throw new ApiError(400, "Name is required");
  }
  // const imageLocalpath = req.files?.image[0].path;
  // if (!imageLocalpath) {
  //   throw new ApiError(400, "Image is required");
  // }
  const catSlug = await convertToLSlug(name);
  // const image = await uploadOnCloudinary(imageLocalpath);
  try {
    const category = await Category.create({
      name,
      status,
      // image: image.url,
      slug: catSlug,
    });
    return res
      .status(201)
      .json(new ApiResponse(200, category, "Category is Added Successfully"));
  } catch (error) {
    console.log(error.message);
    throw new ApiError(400, error, "Category adding error");
  }
};

const updateCategory = async (req, res, next) => {
  const { name, status } = req.body;
  if (!name) {
    throw new ApiError(400, "Name is required");
  }
  const catId = req.params.catId;
  if (!catId) {
    throw new ApiError(400, "Cat Id is missing");
  }
  const singleCat = await Category.findOne({ _id: catId });
  if (!singleCat) {
    throw new ApiError(400, "Single Category is not getting");
  }
  // let imageUrl = singleCat.image;
  // if (req.files.image) {
  //   const imageLocalpath = req.files.image[0].path;
  //   if (!imageLocalpath) {
  //     throw new ApiError(400, "Image is required");
  //   }
  //   if (singleCat.image) {
  //     const oldFilePublicId = singleCat.image.split("/").pop().split(".")[0];
  //     await deleteFromCloudinary(oldFilePublicId);
  //   }
  //   const image = await uploadOnCloudinary(imageLocalpath);
  //   if (!image.url) {
  //     throw new ApiError(400, "Error while uploading image to Cloudinary");
  //   }
  //   imageUrl = image.url;
  // }
  const updatedSlug = convertToLSlug(name);
  try {
    const updatedCategory = await Category.findOneAndUpdate(
      { _id: catId },
      {
        name,
        status,
        // image: imageUrl,
        slug: updatedSlug,
      },
      { new: true }
    );
    return res
      .status(201)
      .json(
        new ApiResponse(
          200,
          updatedCategory,
          "Category is Updated Successfully"
        )
      );
  } catch (error) {
    console.log(error.message);
    throw new ApiError(400, error, "category Updating Error");
  }
};
const getCategories = async (req, res, next) => {
  try {
    const allCat = await Category.find();
    if (!allCat) {
      throw new ApiError(400, "All Category is not getting");
    }
    return res
      .status(200)
      .json(new ApiResponse(200, allCat, "All Category getting successfully"));
  } catch (err) {
    console.log(err);
    throw new ApiError(400, err, "All Category is not getting");
  }
};
const getsingleCat = async (req, res, next) => {
  const catId = req.params.catId;
  console.log(catId, "this is cat dia");
  try {
    let singleCat;
    if (mongoose.Types.ObjectId.isValid(catId)) {
      singleCat = await Category.findById(catId);
    }
    if (!singleCat) {
      singleCat = await Category.findOne({ slug: catId });
    }
    if (!singleCat) {
      return next(createHttpError(404, "Category not found"));
    }
    return res
      .status(200)
      .json(
        new ApiResponse(200, singleCat, "single Category getting successfully")
      );
  } catch (err) {
    console.log(err);
    throw new ApiError(400, err, "single Category not getting");
  }
};
const deleteCategory = async (req, res, next) => {
  const catId = req.params.catId;
  try {
    const singleCat = await Category.findOne({ _id: catId });
    if (!singleCat) {
      throw new ApiError(400, "single Category not getting");
    }
    await Category.deleteOne({ _id: catId });
    //file delete on cloudinary
    // const filePublicId = singleCat.image.split("/").pop().split(".")[0];
    // console.log("image public id", filePublicId);
    // await deleteFromCloudinary(filePublicId);
    return res
      .status(200)
      .json(
        new ApiResponse(200, catId, "single Category deleted successfully")
      );
  } catch (err) {
    console.log(err, "delete errr");
    throw new ApiError(400, err, "Category delted error");
  }
};

export {
  createCategory,
  updateCategory,
  getCategories,
  getsingleCat,
  deleteCategory,
};

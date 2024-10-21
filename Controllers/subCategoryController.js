import createHttpError from "http-errors";
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose from "mongoose";
import convertToLSlug from "../utils/genrateSlug.js";
import { ApiError } from "../utils/ApiError.js";
import { SubCategory } from "../Model/subCatModel.js";

const createSubCategory = async (req, res, next) => {
  const { name, status, cat_id } = req.body;
  if (!name) {
    throw new ApiError(400, "Name is required");
  }
  const subCatSlug = await convertToLSlug(name);
  try {
    const subCat = await SubCategory.create({
      name,
      status,
      cat_id,
      slug: subCatSlug,
    });
    return res
      .status(201)
      .json(new ApiResponse(200, subCat, "subCat is Added Successfully"));
  } catch (error) {
    console.log(error.message);
    throw new ApiError(400, error, "subCat adding error");
  }
};

const updateSubCatgory = async (req, res, next) => {
  const { name, status, cat_id } = req.body;
  if (!name) {
    throw new ApiError(400, "Name is required");
  }
  const sub_cat_id = req.params.sub_cat_id;
  if (!sub_cat_id) {
    throw new ApiError(400, "Cat Id is missing");
  }
  const singleSubCat = await SubCategory.findOne({ _id: sub_cat_id });
  if (!singleSubCat) {
    throw new ApiError(400, "Single Sub Category is not getting");
  }
  const updatedSlug = convertToLSlug(name);
  try {
    const updatedCategory = await SubCategory.findOneAndUpdate(
      { _id: sub_cat_id },
      {
        name,
        status,
        cat_id,
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
          "sub Category is Updated Successfully"
        )
      );
  } catch (error) {
    console.log(error.message);
    throw new ApiError(400, error, "sub category Updating Error");
  }
};
const getSubCategory = async (req, res, next) => {
  try {
    const allSubCat = await SubCategory.find();
    if (!allSubCat) {
      throw new ApiError(400, "All Sub Category is not getting");
    }
    return res
      .status(200)
      .json(
        new ApiResponse(200, allSubCat, "All Sub Category getting successfully")
      );
  } catch (err) {
    console.log(err);
    throw new ApiError(400, err, "All Sub Category is not getting");
  }
};
const getsingleSubCat = async (req, res, next) => {
  const sub_cat_id = req.params.sub_cat_id;
  console.log(sub_cat_id, "this is cat dia");
  try {
    let singleSubCat;
    if (mongoose.Types.ObjectId.isValid(sub_cat_id)) {
      singleSubCat = await SubCategory.findById(sub_cat_id);
    }
    if (!singleSubCat) {
      singleSubCat = await SubCategory.findOne({ slug: sub_cat_id });
    }
    if (!singleSubCat) {
      return next(createHttpError(404, "SUb Category not found"));
    }
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          singleSubCat,
          "single  sub Category getting successfully"
        )
      );
  } catch (err) {
    console.log(err);
    throw new ApiError(400, err, "single Category not getting");
  }
};
const deleteSubCat = async (req, res, next) => {
  const sub_cat_id = req.params.sub_cat_id;
  try {
    const singleSubCat = await SubCategory.findOne({ _id: sub_cat_id });
    if (!singleSubCat) {
      throw new ApiError(400, "single sub Category not getting");
    }
    await SubCategory.deleteOne({ _id: sub_cat_id });
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          sub_cat_id,
          "single sub Category deleted successfully"
        )
      );
  } catch (err) {
    console.log(err, "delete errr");
    throw new ApiError(400, err, "Category delted error");
  }
};

export {
  createSubCategory,
  updateSubCatgory,
  getSubCategory,
  getsingleSubCat,
  deleteSubCat,
};

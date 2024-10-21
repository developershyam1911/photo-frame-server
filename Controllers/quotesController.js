import createHttpError from "http-errors";
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError.js";
import { Quotes } from "../Model/quotesModel.js";

const createQuotes = async (req, res, next) => {
  const { cat_id, sub_cat_id, user_id, content } = req.body;
  if (!cat_id) {
    throw new ApiError(400, "catid is required");
  }
  try {
    const quotes = await Quotes.create({
      cat_id,
      sub_cat_id,
      user_id,
      content,
    });
    return res
      .status(201)
      .json(new ApiResponse(200, quotes, "quotes is Added Successfully"));
  } catch (error) {
    console.log(error.message);
    throw new ApiError(400, error, "quotes adding error");
  }
};

const updateQuotes = async (req, res, next) => {
  const { cat_id, sub_cat_id, user_id, content } = req.body;
  if (!cat_id) {
    throw new ApiError(400, "cat_id is required");
  }
  const quotes_id = req.params.quotes_id;
  if (!quotes_id) {
    throw new ApiError(400, "quotes id is missing");
  }
  const singleQuotes = await Quotes.findOne({ _id: quotes_id });
  if (!singleQuotes) {
    throw new ApiError(400, "Single Quotes is not getting");
  }
  try {
    const updatedQuotes = await Quotes.findOneAndUpdate(
      { _id: quotes_id },
      {
        cat_id,
        sub_cat_id,
        user_id,
        content,
      },
      { new: true }
    );
    return res
      .status(201)
      .json(
        new ApiResponse(200, updatedQuotes, "Quotes is Updated Successfully")
      );
  } catch (error) {
    console.log(error.message);
    throw new ApiError(400, error, "Quotes Updating Error");
  }
};
const getQuotes = async (req, res, next) => {
  try {
    const allQuotes = await Quotes.find();
    if (!allQuotes) {
      throw new ApiError(400, "All Quotes is not getting");
    }
    return res
      .status(200)
      .json(new ApiResponse(200, allQuotes, "All Quotes getting successfully"));
  } catch (err) {
    console.log(err);
    throw new ApiError(400, err, "All Quotes is not getting");
  }
};
const getSingleQuotes = async (req, res, next) => {
  const quotes_id = req.params.quotes_id;
  console.log(quotes_id, "this is cat dia");
  try {
    let singleQuotes;
    if (mongoose.Types.ObjectId.isValid(quotes_id)) {
      singleQuotes = await Quotes.findById(quotes_id);
    }
    if (!singleQuotes) {
      singleQuotes = await Quotes.findOne({ slug: quotes_id });
    }
    if (!singleQuotes) {
      return next(createHttpError(404, "Quotes not found"));
    }
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          singleQuotes,
          "single  Quotes getting successfully"
        )
      );
  } catch (err) {
    console.log(err);
    throw new ApiError(400, err, "single quotes not getting");
  }
};
const deleteQuotes = async (req, res, next) => {
  const quotes_id = req.params.quotes_id;
  try {
    const singleQuotes = await Quotes.findOne({ _id: quotes_id });
    if (!singleQuotes) {
      throw new ApiError(400, "single Quotes not getting");
    }
    await Quotes.deleteOne({ _id: quotes_id });
    return res
      .status(200)
      .json(
        new ApiResponse(200, quotes_id, "single Quote deleted successfully")
      );
  } catch (err) {
    console.log(err, "delete errr");
    throw new ApiError(400, err, "quote delted error");
  }
};

export { createQuotes, updateQuotes, getQuotes, getSingleQuotes, deleteQuotes };

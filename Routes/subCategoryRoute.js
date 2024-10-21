import express from "express";
import {
  createSubCategory,
  deleteSubCat,
  getsingleSubCat,
  getSubCategory,
  updateSubCatgory,
} from "../Controllers/subCategoryController.js";
const subCategoryRoute = express.Router();

subCategoryRoute.post("/", createSubCategory);
subCategoryRoute.patch("/:sub_cat_id", updateSubCatgory);
subCategoryRoute.delete("/:sub_cat_id", deleteSubCat);
subCategoryRoute.get("/", getSubCategory);

subCategoryRoute.get("/:sub_cat_id", getsingleSubCat);

export default subCategoryRoute;

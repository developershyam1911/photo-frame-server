import express from "express";
import { upload } from "../middlewares/multerMiddlware.js";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getsingleCat,
  updateCategory,
} from "../Controllers/categoryController.js";
const categoryRoute = express.Router();

categoryRoute.post(
  "/",
  upload.fields([{ name: "image", maxCount: 1 }]),
  createCategory
);
categoryRoute.patch(
  "/:catId",
  upload.fields([{ name: "image", maxCount: 1 }]),
  updateCategory
);
categoryRoute.delete("/:catId", deleteCategory);
categoryRoute.get("/", getCategories);

categoryRoute.get("/:catId", getsingleCat);

export default categoryRoute;

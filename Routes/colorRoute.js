import express from "express";
import {
  deleteColor,
  createColor,
  getColor,
  getSingleColor,
  updateColor,
} from "../Controllers/colorController.js";
const colorRoute = express.Router();
colorRoute.post("/", createColor);
colorRoute.patch("/:color_id", updateColor);
colorRoute.delete("/:color_id", deleteColor);
colorRoute.get("/", getColor);
colorRoute.get("/:color_id", getSingleColor);

export default colorRoute;

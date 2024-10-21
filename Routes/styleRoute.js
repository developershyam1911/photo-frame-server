import express from "express";
import {
  createStyle,
  deleteStyle,
  getsingleStyle,
  getStyle,
  updateStyle,
} from "../Controllers/styleController.js";

const styleRoute = express.Router();

styleRoute.post("/", createStyle);
styleRoute.patch("/:style_id", updateStyle);
styleRoute.delete("/:style_id", deleteStyle);
styleRoute.get("/", getStyle);

styleRoute.get("/:style_id", getsingleStyle);

export default styleRoute;

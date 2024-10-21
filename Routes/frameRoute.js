import express from "express";
import { upload } from "../middlewares/multerMiddlware.js";
import {
  createFrame,
  deleteFrame,
  getFrames,
  getsingleFrame,
  updateFrame,
} from "../Controllers/frameController.js";
const frameRoute = express.Router();

frameRoute.post(
  "/",
  upload.fields([{ name: "image", maxCount: 1 }]),
  createFrame
);
frameRoute.patch(
  "/:frame_id",
  upload.fields([{ name: "image", maxCount: 1 }]),
  updateFrame
);
frameRoute.delete("/:frame_id", deleteFrame);
frameRoute.get("/", getFrames);

frameRoute.get("/:frame_id", getsingleFrame);

export default frameRoute;

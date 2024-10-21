import express from "express";
import { upload } from "../middlewares/multerMiddlware.js";
import {
  createWallpaper,
  deleteWallpaper,
  getSingleWallpaper,
  getWallpapers,
  updateWallpaper,
} from "../Controllers/wallpaperController.js";
const wallpaperRoute = express.Router();

wallpaperRoute.post(
  "/",
  upload.fields([{ name: "image", maxCount: 1 }]),
  createWallpaper
);
wallpaperRoute.patch(
  "/:wallpaper_id",
  upload.fields([{ name: "image", maxCount: 1 }]),
  updateWallpaper
);
wallpaperRoute.delete("/:wallpaper_id", deleteWallpaper);
wallpaperRoute.get("/", getWallpapers);

wallpaperRoute.get("/:wallpaper_id", getSingleWallpaper);

export default wallpaperRoute;

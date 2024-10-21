import express from "express";
import cors from "cors";
import globalErrorHandling from "../middlewares/globalErrorHandling.js";
import dotenv from "dotenv";
import categoryRoute from "./categoryRoute.js";
import colorRoute from "./colorRoute.js";
import subCategoryRoute from "./subCategoryRoute.js";
import wallpaperRoute from "./wallpaperRoute.js";
import planRoute from "./planRoute.js";
import quoteRoute from "./quotesRoute.js";
import styleRoute from "./styleRoute.js";
import subscriptionRoute from "./subscriptionRoute.js";
import frameRoute from "./frameRoute.js";
import transactionRoute from "./transactionHistoryRoute.js";
import userRoute from "./userRoute.js";

const app = express();
dotenv.config();

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

// Configure CORS for your frontend URL
app.use(
  cors({
    // origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.get("/", (req, res) => {
  res.json({ message: "ok" });
});
app.get("/:id", (req, res) => {
  console.log(req.params);
  res.send("<h2>Welcome in Perfect photo Frame</h2>" + req.params.id);
});
// Routing
// //routes declaration
app.use("/api/v1/user", userRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/sub-category", subCategoryRoute);
app.use("/api/v1/color", colorRoute);
app.use("/api/v1/wallpaper", wallpaperRoute);
app.use("/api/v1/plan", planRoute);
app.use("/api/v1/quotes", quoteRoute);
app.use("/api/v1/style", styleRoute);
app.use("/api/v1/subscription", subscriptionRoute);
app.use("/api/v1/frame", frameRoute);
app.use("/api/v1/transaction-history", transactionRoute);
// Global error handling
app.use(globalErrorHandling);

export default app;

import express from "express";
import {
  createQuotes,
  deleteQuotes,
  getQuotes,
  getSingleQuotes,
  updateQuotes,
} from "../Controllers/quotesController.js";

const quoteRoute = express.Router();

quoteRoute.post("/", createQuotes);
quoteRoute.patch("/:quotes_id", updateQuotes);
quoteRoute.delete("/:quotes_id", deleteQuotes);
quoteRoute.get("/", getQuotes);

quoteRoute.get("/:quotes_id", getSingleQuotes);

export default quoteRoute;

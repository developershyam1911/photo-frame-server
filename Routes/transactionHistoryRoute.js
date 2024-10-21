import express from "express";
import {
  createTransaction,
  deleteTransaction,
  getsingleTransaction,
  getTransactions,
  updateTransaction,
} from "../Controllers/transactionHistorController.js";

const transactionRoute = express.Router();

transactionRoute.post("/", createTransaction);
transactionRoute.patch("/:trans_id", updateTransaction);
transactionRoute.delete("/:trans_id", deleteTransaction);
transactionRoute.get("/", getTransactions);

transactionRoute.get("/:trans_id", getsingleTransaction);

export default transactionRoute;

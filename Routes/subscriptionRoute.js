import express from "express";
import {
  createSubscription,
  deleteSubscription,
  getsingleSubscription,
  getSubscription,
  updateSubscription,
} from "../Controllers/subscriptionController.js";

const subscriptionRoute = express.Router();

subscriptionRoute.post("/", createSubscription);
subscriptionRoute.patch("/:subscription_id", updateSubscription);
subscriptionRoute.delete("/:subscription_id", deleteSubscription);
subscriptionRoute.get("/", getSubscription);

subscriptionRoute.get("/:subscription_id", getsingleSubscription);

export default subscriptionRoute;

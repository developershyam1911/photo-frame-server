import express from "express";
import {
  createPlan,
  deletePlan,
  getAllPlan,
  getsinglePlan,
  updatePlan,
} from "../Controllers/planController.js";
const planRoute = express.Router();

planRoute.post("/", createPlan);
planRoute.patch("/:plan_id", updatePlan);
planRoute.delete("/:plan_id", deletePlan);
planRoute.get("/", getAllPlan);

planRoute.get("/:plan_id", getsinglePlan);

export default planRoute;

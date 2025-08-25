import express from "express";
import { authProvider, changePlan } from "../controllers/userController.js";
import {
  getPlans,
  createCheckoutSession,
} from "../controllers/planController.js";

const router = express.Router();

router.post("/authProvider", authProvider);
router.patch("/changePlan", changePlan);
router.get("/getPlans", getPlans);
router.post("/checkout", createCheckoutSession);

export default router;

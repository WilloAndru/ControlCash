import express from "express";
import { authGoogle } from "../controllers/userController.js";
import {
  getPlans,
  createCheckoutSession,
} from "../controllers/planController.js";

const router = express.Router();

router.post("/google", authGoogle);
router.get("/getPlans", getPlans);
router.post("/checkout", createCheckoutSession);

export default router;

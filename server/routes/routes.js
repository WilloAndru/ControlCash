import express from "express";
import {
  authProvider,
  changePlan,
  editUserData,
  getPrices,
} from "../controllers/userController.js";
import {
  getPlans,
  createCheckoutSession,
} from "../controllers/planController.js";

const router = express.Router();

router.post("/authProvider", authProvider);
router.patch("/changePlan", changePlan);
router.patch("/editUserData", editUserData);
router.get("/getPlans", getPlans);
router.post("/checkout", createCheckoutSession);
router.post("/getPrices", getPrices);

export default router;

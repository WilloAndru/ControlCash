import { PlanModel } from "../models/planModel.js";

export const getPlans = async (req, res) => {
  try {
    const plans = await PlanModel.findAll();
    res.status(200).json(plans);
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Failed to get plans" });
  }
};

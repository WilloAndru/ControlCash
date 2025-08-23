import { PlanModel } from "../models/planModel.js";
import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-06-20",
});

// Crear sesión de Checkout con Stripe
export const createCheckoutSession = async (req, res) => {
  try {
    const { paymentProviderId } = req.body;

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: paymentProviderId, quantity: 1 }],
      success_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/viewPlans",
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create checkout session" });
  }
};

// Obtener planes desde BD
export const getPlans = async (req, res) => {
  try {
    const plans = await PlanModel.findAll();
    res.status(200).json(plans);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get plans" });
  }
};

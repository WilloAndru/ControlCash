import admin from "../firebase/firebase.js";
import { PlanModel } from "../models/planModel.js";
import { UserModel } from "../models/userModel.js";
import getLocation from "../utils/getLocation.js";
import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Toda la logica de auth con google, tanto registro como login
export const authProvider = async (req, res) => {
  const { token } = req.body;

  try {
    // Verificamos el token de Firebase (sirve para cualquier proveedor)
    const decodedToken = await admin.auth().verifyIdToken(token);
    const { email, name, picture, uid } = decodedToken;
    const { country, city } = await getLocation(req);

    // Buscamos usuario por UID o email (si prefieres permitir login cruzado por email)
    let user = await UserModel.findOne({ where: { uid: uid } });

    if (!user) {
      user = await UserModel.create({
        uid,
        name: name || "Anonymous",
        email: email,
        avatar: picture || null,
        country: country,
        city: city,
        savings: null,
        plan_id: 1,
        plantExpirationDate: null,
      });
    }

    // Obtenemos el plan actual del usuario
    const plan = await PlanModel.findOne({ where: { id: user.plan_id } });

    res.status(200).json({ user, plan });
  } catch (error) {
    console.error("Auth Error:", error);
    res.status(401).json({ message: "Invalid Token" });
  }
};

// Cambiar plan de usuario
export const changePlan = async (req, res) => {
  const { userUid, plan_id } = req.body;

  try {
    const user = await UserModel.findOne({ where: { uid: userUid } });
    const plan = await PlanModel.findOne({ where: { id: plan_id } });

    user.plan_id = plan_id;
    user.update_plan_date = new Date();
    await user.save();

    res.status(200).json(plan);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update plan" });
  }
};

// Cambiar datos de usuario
export const editUserData = async (req, res) => {
  const { userUid, ...fields } = req.body;
  try {
    //Metodo directo que actualiza datos de usuario
    await UserModel.update(fields, { where: { uid: userUid } });
    return res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to edit datas" });
  }
};

// Obtener los precios de los inmuebles
export const getPrices = async (req, res) => {
  try {
    const { country, city, savings } = req.body;

    // Llamada a OpenAI
    const response = await client.chat.completions.create({
      model: "gpt-5",
      temperature: 0.1,
      messages: [
        {
          role: "system",
          content: `You are a microservice that estimates minimum real estate rental prices
            in a given city. You must always respond in strict JSON.`,
        },
        {
          role: "user",
          content: `Data:
            country: ${country}
            city: ${city}
            savings: ${savings}

            Instructions:
            - Estimate 3 values:
              1. Minimum rental price for a basic 1-bedroom apartment.
              2. Minimum rental price for a small average house.
              3. Minimum rental price for a luxury house in a premium neighborhood.
            - Always return JSON like this:
              {
                "apartment": <number>,
                "house": <number>,
                "luxury": <number>
              }
            - Use the same currency context as the savings.
            - Do not include any text, comments, or units. JSON only.`,
        },
      ],
      tools: [
        {
          type: "function",
          function: {
            name: "estimate_prices",
            description:
              "Estimate rental prices for apartment, house, and luxury house",
            parameters: {
              type: "object",
              properties: {
                apartment: { type: "number" },
                house: { type: "number" },
                luxury: { type: "number" },
              },
              required: ["apartment", "house", "luxury"],
              additionalProperties: false,
            },
          },
          strict: true,
        },
      ],
      tool_choice: {
        type: "function",
        function: { name: "estimate_prices" },
      },
    });

    // Parsear la respuesta
    const toolCall = response.choices[0].message.tool_calls[0];
    const args = JSON.parse(toolCall.function.arguments);

    // Validación
    if (
      typeof args.apartment !== "number" ||
      typeof args.house !== "number" ||
      typeof args.luxury !== "number"
    ) {
      return res.status(422).json({
        error: "Invalid response format",
        raw: toolCall.function.arguments,
      });
    }

    return res.status(200).json({
      apartment: args.apartment,
      house: args.house,
      luxury: args.luxury,
    });
  } catch (err) {
    console.error(err);
    // Y que chatGPT es de pago mandamos valores promedios por defecto
    return res.status(200).json({
      apartment: 35000,
      house: 80000,
      luxury: 400000,
    });
  }
};

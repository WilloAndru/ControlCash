import admin from "../firebase/firebase.js";
import { PlanModel } from "../models/planModel.js";
import { UserModel } from "../models/userModel.js";
import getLocation from "../utils/getLocation.js";

// Toda la logica de auth con google, tanto registro como login
export const authProvider = async (req, res) => {
  const { token } = req.body;

  try {
    // Verificamos el token de Firebase (sirve para cualquier proveedor)
    const decodedToken = await admin.auth().verifyIdToken(token);
    const { email, name, picture, uid } = decodedToken;
    const { country, city } = await getLocation(req);

    // Si el proveedor no devuelve email, asignamos uno genérico
    const userEmail = email || `${uid}@noemail.firebase`;

    // Buscamos usuario por UID o email (si prefieres permitir login cruzado por email)
    let user = await UserModel.findOne({ where: { uid: uid } });

    if (!user) {
      user = await UserModel.create({
        uid,
        name: name || "Anonymous",
        email: userEmail,
        avatar: picture || null,
        country: country,
        city: city,
        savings: null,
        planId: 1,
        plantExpirationDate: null,
      });
    } else {
      // Si existe y cambió ubicación, actualizamos
      if (user.country !== country || user.city !== city) {
        await user.update({ country, city });
      }
    }

    // Obtenemos el plan actual del usuario
    const plan = await PlanModel.findOne({ where: { id: user.planId } });

    res.status(200).json({ user, plan });
  } catch (error) {
    console.error("Auth Error:", error);
    res.status(401).json({ message: "Invalid Token" });
  }
};

// Cambiar plan de usuario
export const changePlan = async (req, res) => {
  const { userUid, planId } = req.body;

  try {
    const user = await UserModel.findOne({ where: { uid: userUid } });
    const plan = await PlanModel.findOne({ where: { id: planId } });

    user.planId = planId;
    user.updatePlanDate = new Date();
    await user.save();

    res.status(200).json(plan);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update plan" });
  }
};

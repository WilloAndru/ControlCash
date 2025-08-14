import admin from "../firebase/firebase.js";
import { UserModel } from "../models/userModel.js";
import getLocation from "../utils/getLocation.js";

export const authGoogle = async (req, res) => {
  const { token } = req.body;

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    const { email, name, picture, uid } = decodedToken;
    const { country, city } = await getLocation(req);

    let user = await UserModel.findOne({ where: { uid: uid } });

    // Creamos usuario
    if (!user) {
      user = await UserModel.create({
        uid,
        name,
        email,
        avatar: picture,
        country: country,
        city: city,
        income: null,
        planType: "free",
        plantExpirationDate: null,
      });
    }
    // Modificamos localizacion de usuario existente si se cambio de ip
    else {
      if (user.country !== country || user.city !== city) {
        await user.update({ country, city });
      }
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("Error", error);
    res.status(401).json({ message: "Invalid Token" });
  }
};

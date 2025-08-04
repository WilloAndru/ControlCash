import admin from "../firebase/firebase.js";
import { UserModel } from "../models/userModel.js";

export const authGoogle = async (req, res) => {
  const { token } = req.body;

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    const { email, name, picture, uid } = decodedToken;

    let user = await UserModel.findOne({ where: { firebaseUid: uid } });

    if (!user) {
      user = await UserModel.create({
        firebaseUid: uid,
        name,
        email,
        avatar: picture,
      });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("Error", error);
    res.status(401).json({ message: "Invalid Token" });
  }
};

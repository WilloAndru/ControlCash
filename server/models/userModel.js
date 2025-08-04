import { DataTypes } from "sequelize";
import db from "../config/db.js";

export const UserModel = db.define("users", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  firebaseUid: { type: DataTypes.STRING, unique: true, allowNull: false },
  email: { type: DataTypes.STRING },
  name: { type: DataTypes.STRING },
  avatar: { type: DataTypes.STRING },
});

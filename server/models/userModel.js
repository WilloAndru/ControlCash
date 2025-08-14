import { DataTypes } from "sequelize";
import db from "../config/db.js";

export const UserModel = db.define("users", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  uid: { type: DataTypes.STRING, unique: true, allowNull: false },
  email: { type: DataTypes.STRING },
  name: { type: DataTypes.STRING },
  avatar: { type: DataTypes.STRING },
  country: { type: DataTypes.STRING },
  city: { type: DataTypes.STRING },
  planType: {
    type: DataTypes.ENUM("free", "premium"),
    defaultValue: "free",
    allowNull: false,
  },
  planExpirationDate: { type: DataTypes.DATE, allowNull: true },
});

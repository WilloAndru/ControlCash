import { DataTypes } from "sequelize";
import db from "../config/db.js";

export const PlanModel = db.define("plans", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  price: { type: DataTypes.INTEGER, allowNull: false },
  duration: { type: DataTypes.INTEGER },
  features: { type: DataTypes.JSON },
  status: { type: DataTypes.TINYINT, defaultValue: 1 },
  paymentProviderId: { type: DataTypes.STRING },
});

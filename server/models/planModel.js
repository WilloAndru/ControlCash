import { DataTypes } from "sequelize";
import db from "../config/db";

export const PlanModel = db.define("plans", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  features: { type: DataTypes.JSON },
  status: { type: DataTypes.TINYINT, defaultValue: 1 },
  paymentProviderId: { type: DataTypes.STRING },
});

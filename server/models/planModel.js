import { DataTypes } from "sequelize";
import db from "../config/db.js";

export const PlanModel = db.define(
  "plans",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    price: { type: DataTypes.INTEGER, allowNull: false },
    duration: { type: DataTypes.INTEGER },
    features: { type: DataTypes.JSONB },
    status: { type: DataTypes.SMALLINT, defaultValue: 1 },
    payment_provider_id: { type: DataTypes.STRING },
  },
  {
    timestamps: true,
    underscored: true,
  }
);

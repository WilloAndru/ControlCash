import { DataTypes } from "sequelize";
import { db } from "../config/db.js";

export const UserModel = db.define('users', {
    id: { type: DataTypes.INTEGER, primaryKey:true, autoIncrement: true },
    user: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING } 
}, {
    timestamps: true 
});
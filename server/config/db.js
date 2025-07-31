import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const db = new Sequelize(
    process.env.MYSQLDATABASE,
    process.env.MYSQLUSER,
    process.env.MYSQLPASSWORD || null,
    {
        host: process.env.MYSQLHOST,
        dialect: 'mysql',
        port: process.env.MYSQLPORT || 3306
    }
);

export default db

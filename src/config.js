import { config } from "dotenv";

config();

export const db = {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
}

export const secretjwt = { secret: process.env.DB_SECRET_FOR_TOKEN }
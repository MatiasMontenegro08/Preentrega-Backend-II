import { config } from "dotenv";

config();

export const CONFIG = {
    PORT: process.env.PORT || 5000,
    MONGO_URL: process.env.MONGO_URL,
    DB_NAME: process.env.DB_NAME,
};
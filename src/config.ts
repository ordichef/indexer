import * as dotenv from 'dotenv';

dotenv.config();

export const port = Number(process.env.API_PORT);
export const dbHost = String(process.env.DB_HOST);
export const dbPort = Number(process.env.DB_PORT);
export const dbName = String(process.env.DB_NAME);
export const dbUser = String(process.env.DB_USER);
export const dbPassword = String(process.env.DB_PASSWORD);

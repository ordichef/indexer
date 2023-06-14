import { Sequelize } from "sequelize-typescript";

import { Dog } from "./models/dog";
import { dbHost, dbName, dbPassword, dbPort, dbUser } from "./config";

const connection = new Sequelize({
  dialect: "postgres",
  host: dbHost,
  port: dbPort,
  username: dbUser,
  password: dbPassword,
  database: dbName,
  logging: false,
  models: [Dog],
});

export default connection;
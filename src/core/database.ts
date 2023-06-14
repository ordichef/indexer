import { Options, Sequelize } from "sequelize";

import config from "./config";


let options: Options = {
  dialect: 'postgres',
  dialectOptions: {
    decimalNumbers: true,
    // ssl: {    /* <----- Add SSL option */
    //   require: false,
    //   rejectUnauthorized: false 
    // }
  },
  protocol: 'postgres',
  logging: false,
  // logging: console.log,
  pool: {
    max: 15,
  }
}

export const dbInstance = new Sequelize(config.DB_URI, options)

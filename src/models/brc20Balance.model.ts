import { DataTypes } from "sequelize";
import { dbInstance } from "../core/database";

export const Brc20Ticker = dbInstance.define("Brc20Transaction", {
  address: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  // Array: 
}, {
    indexes: []
});
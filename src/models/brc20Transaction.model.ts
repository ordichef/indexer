import { DataTypes } from "sequelize";
import { dbInstance } from "../core/database";

export const Brc20Ticker = dbInstance.define("Brc20Transaction", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  op: {
    type: DataTypes.STRING,
    unique: true,
  },
  amt: {
    type: DataTypes.BIGINT,
  },
}, {
    indexes: []
});
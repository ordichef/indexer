import { DataTypes } from "sequelize";
import { dbInstance } from "../core/database";

export const Brc20Ticker = dbInstance.define("Brc20Ticker", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  ticker: {
    type: DataTypes.STRING,
    unique: true,
  },
  totalSupply: {
    type: DataTypes.BIGINT,
  },
  limitPerMint: {
    type: DataTypes.BIGINT,
  },
  decimals: {
    type: DataTypes.INTEGER,
    defaultValue: 18
  },
}, {
    indexes: []
});
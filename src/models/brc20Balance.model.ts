import { DataTypes } from "sequelize";
import { dbInstance } from "../core/database";

const Brc20Balance = dbInstance.define(
  "Brc20Balance",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    address: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    tick: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    balance: {
      type: DataTypes.BIGINT,
      primaryKey: true,
    },
  },
  {
    indexes: [],
  }
);

export { Brc20Balance };

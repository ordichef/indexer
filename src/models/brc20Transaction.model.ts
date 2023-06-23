import { DataTypes } from "sequelize";
import { dbInstance } from "../core/database";
import { BRC20_OP } from "../types";

const Brc20Transaction = dbInstance.define(
  "Brc20Transaction",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    op: {
      type: DataTypes.ENUM(BRC20_OP.DEPLOY, BRC20_OP.MINT, BRC20_OP.TRANSFER),
      allowNull: false,
    },
    tick: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    //deploy
    max: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    lim: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    dec: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    //mint | transfer
    amt: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
  },
  {
    indexes: [],
  }
);

export { Brc20Transaction };

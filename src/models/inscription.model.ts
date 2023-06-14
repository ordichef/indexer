import { DataTypes } from "sequelize";
import { dbInstance } from "../core/database"


const Inscription = dbInstance.define("Inscription", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  number: {
    type: DataTypes.INTEGER,
  },
  address: {
    type: DataTypes.STRING,
  },
  genesis_address: {
    type: DataTypes.STRING,
  },
  genesis_block_height: {
    type: DataTypes.INTEGER,
  },
  genesis_block_hash: {
    type: DataTypes.STRING,
  },
  genesis_tx_id: {
    type: DataTypes.STRING,
  },
  genesis_fee: {
    type: DataTypes.STRING,
  },
  genesis_timestamp: {
    type: DataTypes.INTEGER,
  },
  tx_id: {
    type: DataTypes.STRING,
  },
  location: {
    type: DataTypes.STRING,
  },
  output: {
    type: DataTypes.STRING,
  },
  value: {
    type: DataTypes.STRING,
  },
  offset: {
    type: DataTypes.STRING,
  },
  sat_ordinal: {
    type: DataTypes.STRING,
  },
  sat_rarity: {
    type: DataTypes.STRING,
  },
  sat_coinbase_height: {
    type: DataTypes.INTEGER,
  },
  mime_type: {
    type: DataTypes.STRING,
  },
  content_type: {
    type: DataTypes.STRING,
  },
  content_length: {
    type: DataTypes.INTEGER,
  },
  timestamp: {
    type: DataTypes.INTEGER,
  },
  content: {
    type: DataTypes.STRING
  }
  
}, {
    indexes: []
});

export {
  Inscription
}
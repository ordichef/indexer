import dotenv from "dotenv";
import { Inscription } from "../models/inscription.model";
import { Brc20Transaction } from "../models/brc20Transaction.model";
import { Brc20Balance } from "../models/Brc20Balance.model";

dotenv.config();

// console.log(process.env)

const migrateAll = async () => {
  try {
    console.log("Migrating ...");
    await Inscription.sync({ alter: true });
    await Brc20Transaction.sync({ alter: true });
    await Brc20Balance.sync({ alter: true });
  } catch (error) {
    console.error("Error when init table", error.message);
  }
};

migrateAll();

import {
  create,
  getAll,
  getById,
} from "../controllers/brc20Transaction.controller";
import { safeController } from "../utils/safeController";
import express from "express";

const Brc20Transaction = express.Router();

// only used for testing
// Brc20Transaction.get("/", safeController(getAll));
// Brc20Transaction.get("/:id", safeController(getById));
// Brc20Transaction.post("/", safeController(create));

export default Brc20Transaction;

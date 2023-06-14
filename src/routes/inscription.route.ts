import { getAll } from "../controllers/inscription.controller";
import { safeController } from "../utils/safeController";
import express from 'express';


const router = express.Router();

router.get("/", safeController(getAll));

export default router;
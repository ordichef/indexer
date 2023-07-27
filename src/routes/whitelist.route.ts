import express from "express";

import { checkWhitelist } from "../controllers/whitelist.controller";
import { safeController } from "../utils/safeController";

const whitelistRouter = express.Router();

whitelistRouter.get("/:id", safeController(checkWhitelist));

export default whitelistRouter;

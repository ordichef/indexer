import { uploads } from "../controllers/file.controller";
import uploadMiddleware from "../middlewares/multer";
import { safeController } from "../utils/safeController";
import express from "express";

const router = express.Router();

router.post("/", uploadMiddleware.array("files"), safeController(uploads));

export default router;

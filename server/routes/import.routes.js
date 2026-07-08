import express from "express";
import multer from "multer";
import { importCSV } from "../controllers/import.controller.js";

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
});

router.post("/", upload.single("file"), importCSV);

export default router;
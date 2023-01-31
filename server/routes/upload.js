import * as dotenv from "dotenv"
dotenv.config();
import express from "express";
import multer from "multer";
import { getUploadedFile, uploadFile } from "../controller/upload.js";

const router = express.Router()

const storage = multer.memoryStorage()
const upload = multer({ storage: storage, limits: { fileSize: (10 ** 6) * 1024 } })

// @desc    Get Files
// @route   GET /upload
router.get("/upload", getUploadedFile)

// @desc    Upload File
// @route   Post /upload
router.post("/upload", upload.single('file'), uploadFile);

export default router;

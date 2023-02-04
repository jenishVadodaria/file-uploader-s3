import * as dotenv from "dotenv"
dotenv.config();
import express from "express";
import multer from "multer";    // For parsing multipart/form-data
import { getUploadedFile, uploadFile } from "../controller/upload.js";

const router = express.Router()

const storage = multer.memoryStorage()
/* keep the file in memory(we can modify,update files in memory) apart from disk
  and then store it directly to s3 rather then storing it in file system of Node.*/
const upload = multer({ storage: storage, limits: { fileSize: (10 ** 6) * 1024 } })

// @desc    Get Files
// @route   GET /upload
router.get("/upload", getUploadedFile)

// @desc    Upload File
// @route   Post /upload
router.post("/upload", upload.single('file'), uploadFile);

export default router;

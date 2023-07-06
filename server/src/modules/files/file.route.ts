import express from "express";
import { validateRequest } from "../../middleware/validateRequest";
import { createFileSchema } from "./file.schema";
import { getAllFilesHandler, uploadFileHandler } from "./file.controller";

const router = express.Router();

router.post("/",
  validateRequest(createFileSchema.body), 
  uploadFileHandler
);
router.get("/",
  getAllFilesHandler
);
export default router;

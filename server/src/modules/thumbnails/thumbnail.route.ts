import express from "express";
import { deleteThumbnailHandler, getAllThumbnailsHandler, getThumbnailHandler, uploadThumbnailHandler } from "./thumbnail.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { createThumbnailSchema } from "./thumbnail.schema";

const router = express.Router();

router.post("/",
  validateRequest(createThumbnailSchema.body), 
  uploadThumbnailHandler
);

router.delete("/:thumbnailId", deleteThumbnailHandler);

router.get('/all', getAllThumbnailsHandler);
router.get("/:videoId", 
  getThumbnailHandler
);

export default router;

import express from "express";
import { validateRequest } from "../../middleware/validateRequest";
import { createPostSchema } from "./post.schema";
import { createPostHandler, getAllPostsHandler } from "./post.controller";

const router = express.Router();

router.post("/",
  validateRequest(createPostSchema.body), 
  createPostHandler
);

router.get("/",
  getAllPostsHandler
);

export default router;

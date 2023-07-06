import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { createPost, findAllPosts } from "./post.service";
import { CreatePostBody } from "./post.schema";

export async function createPostHandler(req: Request<any, {}, CreatePostBody>, res: Response) {
    try {
        const post = await createPost(req.body);
        return res.status(StatusCodes.CREATED).send(post);
    } catch (error: any) {
        return res.status(StatusCodes.BAD_REQUEST).send(error.message);
    }
}
export async function getAllPostsHandler(req: Request, res: Response) {
    try {
      const posts = await findAllPosts();
      return res.status(StatusCodes.OK).send(posts);
    } catch (error: any) {
      return res.status(StatusCodes.BAD_REQUEST).send(error.message);
    }
  }
  
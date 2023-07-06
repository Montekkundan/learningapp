import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { createThumbnail, deleteThumbnail, findAllThumbnails, findThumbnail } from "./thumbnail.service";
import { CreateThumbnailBody } from "./thumbnail.schema";



export async function uploadThumbnailHandler(req: Request<any, {}, CreateThumbnailBody>, res: Response) {
    console.log(req.body);
    try {
        const thumbnail = await createThumbnail(req.body);
        return res.status(StatusCodes.CREATED).send(thumbnail);
    } catch (error: any) {
        console.log(req.body)
        return res.status(StatusCodes.BAD_REQUEST).send(error.message);
    }
}
export async function getThumbnailHandler(req: Request<{ videoId: string }>, res: Response) {
    try {
        const thumbnail = await findThumbnail(req.params.videoId);

        if (!thumbnail) {
            return res.status(StatusCodes.NOT_FOUND).send("Thumbnail not found");
        }

        return res.status(StatusCodes.OK).send(thumbnail);
    } catch (error: any) {
        return res.status(StatusCodes.BAD_REQUEST).send(error.message);
    }
}
export async function getAllThumbnailsHandler(req: Request, res: Response) {
    try {
      const thumbnails = await findAllThumbnails();
      return res.status(StatusCodes.OK).send(thumbnails);
    } catch (error: any) {
      return res.status(StatusCodes.BAD_REQUEST).send(error.message);
    }
  }

  export async function deleteThumbnailHandler(req: Request<{ thumbnailId: string }>, res: Response) {
    try {
      const thumbnail = await deleteThumbnail(req.params.thumbnailId);
  
      if (!thumbnail) {
        return res.status(StatusCodes.NOT_FOUND).send("Thumbnail not found");
      }
  
      return res.status(StatusCodes.OK).send("Thumbnail deleted successfully");
    } catch (error: any) {
      return res.status(StatusCodes.BAD_REQUEST).send(error.message);
    }
  }
  
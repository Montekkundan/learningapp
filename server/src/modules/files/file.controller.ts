import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { createFile, findAllFiles } from "./file.service";
import { CreateFileBody } from "./file.schema";

export async function uploadFileHandler(req: Request<any, {}, CreateFileBody>, res: Response) {
    try {
        const file = await createFile(req.body);
        return res.status(StatusCodes.CREATED).send(file);
    } catch (error: any) {
        return res.status(StatusCodes.BAD_REQUEST).send(error.message);
    }
}
export async function getAllFilesHandler(req: Request, res: Response) {
    try {
      const files = await findAllFiles();
      return res.status(StatusCodes.OK).send(files);
    } catch (error: any) {
      return res.status(StatusCodes.BAD_REQUEST).send(error.message);
    }
  }
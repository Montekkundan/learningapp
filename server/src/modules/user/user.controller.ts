import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { CreateUser, deleteUser, findAllUsers } from "./user.service";
import { RegisterUserBody } from "./user.schema";

export async function registerUserHandler(req: Request<{}, {}, RegisterUserBody>, res: Response) {
    const { username, email, password } = req.body;

    try { 
        await CreateUser({ username, email, password });
        return res.status(StatusCodes.CREATED).send("User created");
    }
    catch (error:any) {
        if(error.code === 11000) {
            return res.status(StatusCodes.CONFLICT).send("User already exists");
        }
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error.message);
    }
} 



export async function findAllUsersHandler(req: Request, res: Response) {
    try {
        const users = await findAllUsers();
        return res.status(StatusCodes.OK).send(users);
    } catch (error: any) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error.message);
    }
}
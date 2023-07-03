import express from "express";
import {  deleteUserHandler, findAllUsersHandler, registerUserHandler } from "./user.controller";
import {processRequestBody} from "zod-express-middleware";
import { registerUserSchema } from "./user.schema";
import requireUser from "../../middleware/requireUser";

const router = express.Router();

router.get("/", requireUser, (req, res) => {
    return res.send(res.locals.user);
});

router.post("/", 
processRequestBody(registerUserSchema.body),
registerUserHandler)

router.delete("/:userId", requireUser, deleteUserHandler);
router.get("/all", requireUser, findAllUsersHandler);


export default router;
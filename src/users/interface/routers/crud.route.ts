import { Router } from "express";
import { CrudUserController } from "../controllers/crud.controller";

export const usersRouter = Router();

const crudUserController = new CrudUserController();

usersRouter.post("/signup", (req, res) => {
    crudUserController.createUser(req, res);
});

usersRouter.get("/find/:id", (req, res) => {
    crudUserController.findUserById(req, res);
});

usersRouter.post("/verify", (req, res) => {
    crudUserController.verifyUser(req, res);
});

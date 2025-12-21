import { Router } from "express";
import { CrudUserController } from "../controllers/crud.controller";
import { authMiddleware } from "../../../shaders/middlewares/auth.middleware";

export const usersRouter = Router();

const crudUserController = new CrudUserController();

usersRouter.post("/signup", (req, res) => {
    crudUserController.createUser(req, res);
});

usersRouter.get("/profile", authMiddleware, (req, res) => {
    crudUserController.profile(req, res);
});

usersRouter.post("/verify", (req, res) => {
    crudUserController.verifyUser(req, res);
});

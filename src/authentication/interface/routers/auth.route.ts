import { Router } from "express";
import { AuthController } from "../controllers/autH.controller";

export const authRouter = Router();
const authController = new AuthController()

authRouter.post("/login", authController.generateToken);


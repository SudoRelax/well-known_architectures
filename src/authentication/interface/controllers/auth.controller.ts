import { Request, Response } from "express";
import { Tokens } from "../../../shaders/types/token/token.types";
import { IMsg } from "../../../shaders/types/msg/msg.types";
import { authenticationService } from "../../../shaders/services/authentication";

export class AuthController {

    async generateToken(req: Request, res: Response): Promise<Response<Tokens | IMsg>> {
        const { email, password }: { email: string, password: string } = req.body;

        const result = await authenticationService.generateToken.execute({ email, password });

        if (typeof result === 'object' && 'accessToken' in result) {
            res.cookie("accessToken", result.accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 3600000
            });

            return res.status(200).json({ msg: "Login exitoso", code: 200, status: "success" });
        }

        if (typeof result === 'object' && 'code' in result) {
            return res.status(result.code).json(result);
        }

        return res.status(500).json({ msg: "Internal Server Error", code: 500, status: "error" });
    }
}
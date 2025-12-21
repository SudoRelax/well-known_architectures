import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { authenticationService } from "../services/authentication";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const credentials = req.headers.cookie?.split("=")[1];
    if (!credentials) return res.status(401).json({ error: "No se encontraron credenciales" });

    const token = credentials;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret") as { userId: string };
        req.body.userId = decoded.userId;
        next();
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            const decoded = jwt.decode(token) as { userId: string };
            if (!decoded || !decoded.userId) return res.status(401).json({ error: "Token inválido" });

            const refreshResult = await authenticationService.refreshToken.execute(decoded.userId);
            if ("code" in refreshResult) return res.status(refreshResult.code).json(refreshResult);

            if ("accessToken" in refreshResult) {
                res.cookie("accessToken", refreshResult.accessToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "strict",
                    maxAge: 3600000
                });
                req.body.userId = decoded.userId;
                next();
            }
        } else {
            return res.status(401).json({ error: "Token inválido" });
        }
    }
};

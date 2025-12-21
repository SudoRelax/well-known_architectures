import { TokenModel } from "../model/token.model";
import { GenerateTokenAdapter } from "../../domain/adapter/generateToken";
import { User } from "../../../users/domain/entities/user";
import { UsersModel } from "../../../users/infrastructure/model/users.model";
import bcrypt from "bcrypt";
import { IMsg } from "../../../shaders/types/msg/msg.types";
import jwt from "jsonwebtoken";
import { Tokens } from "../../../shaders/types/token/token.types";

import { RefreshTokenAdapter } from "../../domain/adapter/refreshToken";

export class TokenRepository implements GenerateTokenAdapter, RefreshTokenAdapter {

    async refreshToken(userId: string): Promise<Tokens | IMsg> {
        try {
            const tokenRecord = await TokenModel.findOne({ userId });
            if (!tokenRecord) return { msg: "Sesión no encontrada", code: 404, status: "AuthError" };

            try {
                jwt.verify(tokenRecord.token, process.env.JWT_SECRET || "secret");
            } catch (error) {
                return { msg: "Refresh token expirado", code: 401, status: "AuthError" };
            }

            const accessToken = jwt.sign({ userId }, process.env.JWT_SECRET || "secret", { expiresIn: "1m" });
            // Optionally rotate refresh token here if desired, but for now we keep the valid one
            // const newRefreshToken = jwt.sign({ userId }, process.env.JWT_SECRET || "secret", { expiresIn: "7d" });

            return { accessToken, refreshToken: tokenRecord.token };
        } catch (error) {
            console.log(error);
            return { msg: "Error al refrescar token", code: 500, status: "AuthError" };
        }
    }

    async generateToken(credentials: { email: string, password: string }): Promise<string | IMsg | Tokens> {
        try {

            const result = await UsersModel.findOne({ email: credentials.email });
            if (!result) return { msg: "usuario no encontrado", code: 404, status: "AuthError" };

            const isPasswordValid = bcrypt.compareSync(credentials.password, result.password);
            if (!isPasswordValid) return { msg: "credenciales incorrectas", code: 401, status: "AuthError" };

            const accessToken = jwt.sign({ userId: result._id }, process.env.JWT_SECRET || "secret", { expiresIn: "1m" });
            const refreshToken = jwt.sign({ userId: result._id }, process.env.JWT_SECRET || "secret", { expiresIn: "7d" });

            await TokenModel.findOneAndUpdate(
                { userId: result._id.toString() },
                {
                    token: refreshToken,
                    role: result.role,
                    userId: result._id.toString()
                },
                { upsert: true, new: true }
            );

            return { accessToken, refreshToken };
        } catch (error) {
            console.log(error);
            return { msg: "error al generar token", code: 500, status: "AuthError" };
        }
    }
}

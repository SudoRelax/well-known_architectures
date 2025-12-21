import { SendEmailAdapter } from "../../domain/adapter/sendEmail";
import nodemailer from "nodemailer";
import { User } from "../../../users/domain/entities/user";
import { Env } from "../../../shaders/configs/envs/env";
import { PendingUserModel } from "../../../users/infrastructure/model/pending_users.model";
import crypto from "crypto";
import bcrypt from "bcrypt";

export class SendEmailRepository implements SendEmailAdapter {

    async sendEmail(user: User): Promise<void> {
        try {
            const code = crypto.randomInt(100000, 999999).toString();

            await PendingUserModel.findOneAndUpdate(
                { email: user.email },
                {
                    ...user,
                    verificationCode: code,
                    password: bcrypt.hashSync(user.password, 10),
                },
                { upsert: true, new: true }
            );

            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false,
                auth: {
                    user: Env.get("EMAIL_USER"),
                    pass: Env.get("EMAIL_PASS"),
                },
            });

            await transporter.sendMail({
                from: Env.get("EMAIL_USER"),
                to: user.email,
                subject: "Código de Verificación",
                text: `Tu código de verificación es: ${code}`,
            });

        } catch (error) {
            console.log("Error en SendEmailRepository:", error);
            throw new Error("No se pudo enviar el correo de verificación");
        }
    }
}

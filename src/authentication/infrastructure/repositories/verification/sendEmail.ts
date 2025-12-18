import { SendEmailAdapter } from "../../../domain/adapter/verification/sendEmail";
import nodemailer from "nodemailer";
import { User } from "../../../../users/domain/entities/user";
import { PendingUserModel } from "../../../../users/infrastructure/model/pendingUsers.model";
import crypto from "crypto";

export class SendEmailRepository implements SendEmailAdapter {
    async sendEmail(user: User): Promise<void> {
        try {
            const code = crypto.randomInt(100000, 999999).toString();

            // Guardar o actualizar el usuario pendiente
            await PendingUserModel.findOneAndUpdate(
                { email: user.email },
                {
                    ...user,
                    verificationCode: code
                },
                { upsert: true, new: true }
            );

            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false,
                auth: {
                    user: "brunolok79@gmail.com", // Consider using env vars
                    pass: "kwkl hsdm obcw ibge",      // Consider using env vars
                },
            });

            await transporter.sendMail({
                from: " brunolok79@gmail.com",
                to: user.email,
                subject: "Código de Verificación",
                text: `Tu código de verificación es: ${code}`,
            });

            console.log(`Correo enviado a ${user.email} con código ${code}`);
        } catch (error) {
            console.log("Error en SendEmailRepository:", error);
            throw new Error("No se pudo enviar el correo de verificación");
        }
    }
}

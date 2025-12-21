import { VerificationCode } from "../../domain/entities/verificationCode";
import { Schema, model } from "mongoose";

const verificationSchema = new Schema<VerificationCode>({
    code: { type: String, required: true },
    email: { type: String, required: true },
    expiresAt: { type: Date, required: true },
});

export const VerificationCodeModel = model<VerificationCode>("VerificationCode", verificationSchema);
import { Schema, model } from "mongoose";
import { Token } from "../../domain/entities/token";

const tokenSchema = new Schema<Token>({
    token: {
        type: String,
        required: true,
        expires: 604800
    },
    role: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
}, { timestamps: true });

export const TokenModel = model<Token>("tokens", tokenSchema);

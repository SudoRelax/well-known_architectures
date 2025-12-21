import { model, Schema } from "mongoose";

const pendingUserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "user" },
    verificationCode: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: 900 } // 15 minutes
});

export const PendingUserModel = model("pending_users", pendingUserSchema);

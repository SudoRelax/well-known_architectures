import { model, Schema } from "mongoose";
import { User } from "../../domain/entities/user";

const userSchema = new Schema<User>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: "user"
    }
}, { timestamps: true });

userSchema.index({
    name: "text",
    username: "text",
    email: "text"
});


export const UsersModel = model<User>("Users", userSchema);
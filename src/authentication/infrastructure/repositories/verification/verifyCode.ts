import { VerifyCodeAdapter } from "../../../domain/adapter/verification/verifyCode";
import { PendingUserModel } from "../../../../users/infrastructure/model/pendingUsers.model";
import { User } from "../../../../users/domain/entities/user";

export class VerifyCodeRepository implements VerifyCodeAdapter {
    async verify(email: string, code: string): Promise<User | null> {
        try {
            const pendingUser = await PendingUserModel.findOneAndDelete({ email, verificationCode: code });

            if (!pendingUser) return null;

            // Map to User entity
            // Using explicit casting or constructor if needed. 
            // pendingUser is a Mongoose document, so access properties carefully or toObject()

            // user needs: name, email, username, password.
            // pendingUser has them.
            const user = new User(
                pendingUser.name,
                pendingUser.email,
                pendingUser.username,
                pendingUser.password
            );

            return user;
        } catch (error) {
            console.log("Error verifying code:", error);
            return null;
        }
    }
}

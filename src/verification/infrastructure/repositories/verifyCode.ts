import { VerifyCodeAdapter } from "../../domain/adapter/verifyCode";
import { PendingUserModel } from "../../../users/infrastructure/model/pending_users.model";
import { User } from "../../../users/domain/entities/user";

export class VerifyCodeRepository implements VerifyCodeAdapter {

    async verify(email: string, code: string): Promise<User | null> {
        try {
            const pendingUser = await PendingUserModel.findOneAndDelete({ email, verificationCode: code });

            if (!pendingUser) return null;

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

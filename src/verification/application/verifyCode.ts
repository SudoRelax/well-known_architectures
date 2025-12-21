import { VerifyCodeAdapter } from "../domain/adapter/verifyCode";
import { User } from "../../users/domain/entities/user";

export class VerifyCodeUseCase {
    constructor(private readonly verifyCodeAdapter: VerifyCodeAdapter) { }

    async execute(email: string, code: string): Promise<User | null> {
        return this.verifyCodeAdapter.verify(email, code);
    }
}

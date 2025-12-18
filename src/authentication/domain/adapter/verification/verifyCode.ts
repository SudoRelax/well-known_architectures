import { User } from "../../../../users/domain/entities/user";

export interface VerifyCodeAdapter {
    verify(email: string, code: string): Promise<User | null>;
}

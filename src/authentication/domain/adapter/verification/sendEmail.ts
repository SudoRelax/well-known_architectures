import { User } from "../../../../users/domain/entities/user";

export interface SendEmailAdapter {
    sendEmail(user: User): Promise<void>;
}

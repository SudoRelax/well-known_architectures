import { SendEmailAdapter } from "../../domain/adapter/verification/sendEmail";
import { User } from "../../../users/domain/entities/user";

export class SendEmailUseCase {
    constructor(private readonly sendEmailAdapter: SendEmailAdapter) { }

    async execute(user: User): Promise<void> {
        return this.sendEmailAdapter.sendEmail(user);
    }
}
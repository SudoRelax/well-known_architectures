import { VerificationEmailAdapter } from "../../domain/adapter/verification/verificationEmail";

export class VerificationEmailUseCase {
    constructor(private readonly verificationEmailAdapter: VerificationEmailAdapter) { }

    async execute(code: string): Promise<void> {
        return this.verificationEmailAdapter.verificationEmail(code);
    }
}
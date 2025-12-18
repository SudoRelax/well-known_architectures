export interface VerificationEmailAdapter {
    verificationEmail(code: string): Promise<void>;
}
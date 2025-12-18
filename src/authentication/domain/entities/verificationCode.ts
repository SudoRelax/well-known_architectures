export class VerificationCode {
    constructor(
        public readonly code: string,
        public readonly email: string,
        public readonly expiresAt: Date,
    ) { }
}
import { SendEmailRepository } from "../../authentication/infrastructure/repositories/verification/sendEmail";
import { SendEmailUseCase } from "../../authentication/application/verification/sendEmail";
import { VerifyCodeRepository } from "../../authentication/infrastructure/repositories/verification/verifyCode";
import { VerifyCodeUseCase } from "../../authentication/application/verification/verifyCode";

export const verificationService = {
    sendEmail: new SendEmailUseCase(new SendEmailRepository()),
    verifyCode: new VerifyCodeUseCase(new VerifyCodeRepository())
}
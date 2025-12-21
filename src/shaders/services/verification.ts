import { SendEmailRepository } from "../../verification/infrastructure/repositories/sendEmail";
import { SendEmailUseCase } from "../../verification/application/sendEmail";
import { VerifyCodeRepository } from "../../verification/infrastructure/repositories/verifyCode";
import { VerifyCodeUseCase } from "../../verification/application/verifyCode";

export const verificationService = {
    sendEmail: new SendEmailUseCase(new SendEmailRepository()),
    verifyCode: new VerifyCodeUseCase(new VerifyCodeRepository())
}
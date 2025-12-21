import { TokenRepository } from "../../authentication/infrastructure/repositories/token.repository";
import { GenerateTokenUseCase } from "../../authentication/application/generateToken";
import { RefreshTokenUseCase } from "../../authentication/application/refreshToken";

export const authenticationService = {
    generateToken: new GenerateTokenUseCase(new TokenRepository()),
    refreshToken: new RefreshTokenUseCase(new TokenRepository())
}
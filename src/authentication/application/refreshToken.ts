import { RefreshTokenAdapter } from "../domain/adapter/refreshToken";
import { Tokens } from "../../shaders/types/token/token.types";
import { IMsg } from "../../shaders/types/msg/msg.types";

export class RefreshTokenUseCase {
    constructor(private readonly refreshTokenAdapter: RefreshTokenAdapter) { }
    async execute(userId: string): Promise<Tokens | IMsg> {
        return this.refreshTokenAdapter.refreshToken(userId);
    }
}

import { Tokens } from "../../../shaders/types/token/token.types";
import { IMsg } from "../../../shaders/types/msg/msg.types";

export interface RefreshTokenAdapter {
    refreshToken(userId: string): Promise<Tokens | IMsg>;
}

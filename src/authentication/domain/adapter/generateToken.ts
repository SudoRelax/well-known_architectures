import { IMsg } from "../../../shaders/types/msg/msg.types";
import { Tokens } from "../../../shaders/types/token/token.types";

export interface GenerateTokenAdapter {
    generateToken(credentials: { email: string, password: string }): Promise<string | IMsg | Tokens>;
}

import { GenerateTokenAdapter } from "../domain/adapter/generateToken";
import { Tokens } from "../../shaders/types/token/token.types";
import { IMsg } from "../../shaders/types/msg/msg.types";

export class GenerateTokenUseCase {
    constructor(private readonly generateTokenAdapter: GenerateTokenAdapter) { }
    async execute(credentials: { email: string, password: string }): Promise<string | Tokens | IMsg> {
        return this.generateTokenAdapter.generateToken(credentials);
    }
}
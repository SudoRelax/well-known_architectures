import { ICreateUserAdapter } from "../../domain/adapters/crud.adapters/create";
import { User } from "../../domain/entities/user";
import { IMsg } from "../../../shaders/types/msg/msg.types";

export class CreateUserUseCase {

    constructor(private readonly createUserAdapter: ICreateUserAdapter) { }

    async execute(user: User): Promise<User | IMsg> {
        return this.createUserAdapter.create(user);
    }
}

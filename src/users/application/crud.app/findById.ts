import { User } from "../../domain/entities/user";
import { IMsg } from "../../../shaders/types/msg/msg.types";
import { IFindUserByIdAdapter } from "../../domain/adapters/crud.adapters/findById";

export class FindUserByIdUseCase {

    constructor(private readonly createUserAdapter: IFindUserByIdAdapter) { }

    async execute(id: string): Promise<User | IMsg> {
        return this.createUserAdapter.findById(id);
    }
}

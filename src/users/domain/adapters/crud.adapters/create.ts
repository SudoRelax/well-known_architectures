import { User } from "../../entities/user";
import { IMsg } from "../../../../shaders/types/msg/msg.types";

export interface ICreateUserAdapter {

    create(user: User): Promise<User | IMsg>;

}
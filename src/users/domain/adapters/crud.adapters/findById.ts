import { User } from "../../entities/user";
import { IMsg } from "../../../../shaders/types/msg/msg.types";

export interface IFindUserByIdAdapter {

    findById(id: string): Promise<User | IMsg>;

}
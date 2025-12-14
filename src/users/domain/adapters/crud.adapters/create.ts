import { User } from "../../entities/user";
import { IMsg } from "../../../../shaders/types/msg/msg.types";

export interface ICreateUserAdapter {

    create(user: User): Promise<User | IMsg>;
    findById(id: string): Promise<User | IMsg>;
    findByEmail(email: string): Promise<User | IMsg>;
    findByUsername(username: string): Promise<User | IMsg>;
    findByRole(role: string): Promise<User | IMsg>;
    findAll(): Promise<User[] | IMsg>;
    update(id: string, user: User): Promise<User | IMsg>;
    delete(id: string): Promise<User | IMsg>;
}
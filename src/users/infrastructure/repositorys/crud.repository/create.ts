import { UsersModel } from "../../model/users.model";
import { ICreateUserAdapter } from "../../../domain/adapters/crud.adapters/create";
import { User } from "../../../domain/entities/user";
import { IMsg } from "../../../../shaders/types/msg/msg.types";
import { ShowError } from "../../../../shaders/configs/errors/errorContainer";

export class CrudUserRepository implements ICreateUserAdapter {

    async create(user: User): Promise<User | IMsg> {
        try {

            const seed = await UsersModel.findOne({ role: "admin" })

            if (!seed) {
                await UsersModel.create({ ...user, role: "admin" })
                return {
                    msg: "Usuario creado exitosamente",
                    code: 201,
                    status: "success"
                }
            }

            const newUser = await UsersModel.create(user);

            return {
                msg: "Usuario creado exitosamente",
                code: 201,
                status: "success"
            }

        } catch (error) {

            return ShowError.showErrorUser(error)
        }
    }
}
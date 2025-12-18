import { UsersModel } from "../../model/users.model";
import { ICreateUserAdapter } from "../../../domain/adapters/crud.adapters/create";
import { IFindUserByIdAdapter } from "../../../domain/adapters/crud.adapters/findById";
import { User } from "../../../domain/entities/user";
import { IMsg } from "../../../../shaders/types/msg/msg.types";
import { ShowError } from "../../../../shaders/configs/errors/errorContainer";

export class CrudUserRepository implements ICreateUserAdapter, IFindUserByIdAdapter {

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

            await UsersModel.create(user);

            const userCreated = await UsersModel.findOne({ email: user.email, username: user.username, name: user.name });

            if (!userCreated) {
                return {
                    msg: "Usuario no creado",
                    code: 400,
                    status: "error"
                }
            }

            return {
                msg: "Usuario creado exitosamente",
                code: 201,
                status: "success"
            }

        } catch (error) {
            return ShowError.showErrorUser(error)
        }
    }

    async findById(id: string): Promise<User | IMsg> {
        try {
            const userFound = await UsersModel.findById(id);
            console.log(userFound);

            if (!userFound) {
                return {
                    msg: "Usuario no encontrado",
                    code: 404,
                    status: "error"
                }
            }
            return userFound
        } catch (error) {
            return ShowError.showErrorUser(error)
        }
    }



}
import { CrudUserRepository } from "../../users/infrastructure/repositories/crud.repository/crud.repository";
import { CreateUserUseCase } from "../../users/application/crud.app/create";
import { FindUserByIdUseCase } from "../../users/application/crud.app/findById";

export const usersService = {
    createUser: new CreateUserUseCase(new CrudUserRepository()),
    findUserById: new FindUserByIdUseCase(new CrudUserRepository())
}
import { CrudUserRepository } from "../../users/infrastructure/repositorys/crud.repository/create";
import { CreateUserUseCase } from "../../users/application/crud.app/create";

export const usersService = {
    createUser: new CreateUserUseCase(new CrudUserRepository())
}
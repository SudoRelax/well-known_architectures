import { Request, Response } from "express";
import { User } from "../../domain/entities/user";
import { usersService } from "../../../shaders/services/users"

export class CrudUserController {

    private readonly usersService = usersService;

    async createUser(req: Request, res: Response) {
        try {

            const user: User = req.body;

            const result = await this.usersService.createUser.execute(user);

            if ("code" in result) {
                res.status(result.code).json(result);
            }

        } catch (error) {
            res.status(500).json({ error: "Error al crear el usuario" });
        }

    }
}

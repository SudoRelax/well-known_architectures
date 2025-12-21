import { Request, Response } from "express";
import { User } from "../../domain/entities/user";
import { usersService } from "../../../shaders/services/users"
import { verificationService } from "../../../shaders/services/verification"

export class CrudUserController {

    private readonly usersService = usersService;
    private readonly sendEmailService = verificationService;

    async createUser(req: Request, res: Response) {
        try {

            const user: User = req.body;

            await this.sendEmailService.sendEmail.execute(user);

            return res.status(200).json({ msg: "Correo de verificación enviado. Por favor verifica tu cuenta." });

        } catch (error) {
            res.status(500).json({ error: "Error al crear el usuario" });
        }

    }

    async findUserById(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const result = await this.usersService.findUserById.execute(id);

            if ("code" in result) return res.status(result.code).json({ msg: result.msg });

            return res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: "Error al buscar el usuario" });
        }
    }

    async verifyUser(req: Request, res: Response) {
        try {
            const { email, code } = req.body;

            const userOrNull = await this.sendEmailService.verifyCode.execute(email, code);

            if (!userOrNull) return res.status(400).json({ error: "Código inválido o expirado" });

            const result = await this.usersService.createUser.execute(userOrNull);

            if ("code" in result) return res.status(result.code).json({ msg: result.msg });

            return res.status(201).json({ msg: "Usuario verificado y creado exitosamente", user: result });

        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Error al verificar usuario" });
        }
    }
}

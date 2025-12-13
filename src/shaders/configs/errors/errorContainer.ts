import { Logs } from "../../utils/logs";
import { Separator } from "../../utils/separator";

export class ShowError {

    static showErrorDb(error: any) {
        Logs.red(Separator.horizontalRule());

        switch (error.name) {
            case "MongoParseError":
                Logs.red('Esquema no válido, se esperaba que la cadena de conexión comenzara con "mongodb://" o "mongodb+srv://""');
                break;

            case "MongoNetworkError":
                Logs.red('El servidor de MongoDB no está corriendo o la dirección/puerto es incorrecto.');
                break;

            case "MongooseServerSelectionError":
                Logs.red('No se puede seleccionar un servidor para conectarse.');
                break;

            default:
                Logs.red(error.message);
                break;
        }

        if (error.stack) {
            const stackLines = error.stack.split('\n');
            if (stackLines.length > 1) {
                Logs.red("    ⚠️  ➡️  " + stackLines[1].trim());
            }
        }

        Logs.red(Separator.horizontalRule());
    }

    static showErrorUser(error: any) {
        Logs.red(Separator.horizontalRule());

        let response = {
            msg: "Error desconocido",
            code: 500,
            status: "error"
        };

        if (error.code === 11000 || error.name === "E11000") {
            Logs.red('El usuario ya existe.');
            response = {
                msg: "El usuario ya existe.",
                code: 409,
                status: "error"
            };
        } else {
            switch (error.name) {
                case "MongoNetworkError":
                    Logs.red('El servidor de MongoDB no está corriendo o la dirección/puerto es incorrecto.');
                    response = {
                        msg: "El servidor de MongoDB no está corriendo o la dirección/puerto es incorrecto.",
                        code: 500,
                        status: "error"
                    };
                    break;

                case "MongooseServerSelectionError":
                    Logs.red('No se puede seleccionar un servidor para conectarse.');
                    response = {
                        msg: "No se puede seleccionar un servidor para conectarse.",
                        code: 500,
                        status: "error"
                    };
                    break;

                default:
                    Logs.red(error.message);
                    response = {
                        msg: error.message,
                        code: 400,
                        status: "error"
                    };
                    break;
            }
        }

        if (error.stack) {
            const stackLines = error.stack.split('\n');
            if (stackLines.length > 1) {
                Logs.red("    ⚠️  ➡️  " + stackLines[1].trim());
            }
        }

        Logs.red(Separator.horizontalRule());

        return response;
    }

}
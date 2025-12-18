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

        if (error.name === "MongoServerError") {

            switch (error.code) {
                case 11000:

                    Logs.red('El usuario ya existe.');
                    Logs.red(Separator.horizontalRule());

                    return {
                        msg: "El usuario ya existe.",
                        code: 409,
                        status: "conflict"
                    };
                case 11001:
                    Logs.red('El usuario ya existe.');
                    Logs.red(Separator.horizontalRule());

                    return {
                        msg: "El usuario ya existe.",
                        code: 409,
                        status: "conflict"
                    };

            }
        }


        if (error.stack) {
            const stackLines = error.stack.split('\n');
            if (stackLines.length > 1) Logs.red("    ⚠️  ➡️  " + stackLines[1].trim());
        }

        Logs.red(Separator.horizontalRule());

        return {
            msg: error,
            code: 400,
            status: "error"
        };
    }

}
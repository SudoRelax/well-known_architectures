import dotenv from "dotenv";

dotenv.config();

export class Env {
    static get(key: string): string {
        if (!process.env[key]) {
            throw new Error(`variable de entorno ${key} no encontrada`);
        }
        return process.env[key] || "";
    }
}
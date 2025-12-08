import Chalk from "chalk";

export class Logs {

    private static getPadding(msg: string): number {
        const terminalWidth = process.stdout.columns || 100;
        const padding = Math.floor((terminalWidth - msg.length) / 2);
        return Math.max(0, padding);
    }

    static green(msg: string) {
        const bleeding = this.getPadding(msg);
        console.log(Chalk.green("\n" + " ".repeat(bleeding) + msg));
    }

    static red(msg: string) {
        const bleeding = this.getPadding(msg);
        console.log(Chalk.red("\n" + " ".repeat(bleeding) + msg));
    }

    static yellow(msg: string) {
        const bleeding = this.getPadding(msg);
        console.log(Chalk.yellow("\n" + " ".repeat(bleeding) + msg));
    }

    static blue(msg: string) {
        const bleeding = this.getPadding(msg);
        console.log(Chalk.blue("\n" + " ".repeat(bleeding) + msg));
    }
}
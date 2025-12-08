export class Separator {
    static horizontalRule() {
        const width = process.stdout.columns; // 100 es fallback por seguridad
        return "-".repeat(width);
    }
}

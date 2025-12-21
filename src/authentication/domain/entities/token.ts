export class Token {
    constructor(
        public readonly token: string,
        public readonly role: string,
        public readonly userId: string) { }
}
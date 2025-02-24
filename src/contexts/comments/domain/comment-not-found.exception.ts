export class CommentNotFoundException extends Error {
    constructor(public readonly id: string) {
        super(`Comment not found ${id}`);
    }
}
export class EmptyCommentTextException extends Error {
    constructor() {
        super("A comment cannot be empty.");
    }
}
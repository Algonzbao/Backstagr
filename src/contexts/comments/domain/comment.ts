import { v4 as uuidv4 } from "uuid";
import { EmptyCommentTextException } from "./empty-comment-text.exception";

export interface PrimitiveComment {
    id: string;
    text: string;
    authorId: string;
    postId: string;
}

export class Comment {

    private readonly _id: string;
    private readonly _text: string;
    private readonly _authorId: string;
    private readonly _postId: string;

    constructor(attributes: PrimitiveComment) {
        if (!attributes.text || attributes.text.trim().length === 0) {
            throw new EmptyCommentTextException();
        }
        this._id = attributes.id;
        this._text = attributes.text;
        this._authorId = attributes.authorId;
        this._postId = attributes.postId;
    }

    static create(createComment: { text: string; authorId: string; postId: string }) {
        return new Comment({
            id: uuidv4(),
            text: createComment.text,
            authorId: createComment.authorId,
            postId: createComment.postId,
        });
    }

    toPrimitives(): PrimitiveComment {
        return {
            id: this.id,
            text: this._text,
            authorId: this._authorId,
            postId: this._postId,
        };
    }

    get id(): string {
        return this._id;
    }

    get text(): string {
        return this._text;
    }

    get authorId(): string {
        return this._authorId;
    }

    get postId(): string {
        return this._postId;
    }

}

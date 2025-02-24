import { Comment } from "@/contexts/comments/domain/comment";
import { EmptyCommentTextException } from "@/contexts/comments/domain/empty-comment-text.exception";
import { describe, it, expect } from '@jest/globals';

describe("Comment", () => {

    it("should create a valid comment", () => {
        const comment = Comment.create({
            text: "Este es un comentario válido",
            authorId: "550e8400-e29b-41d4-a716-446655440000",
            postId: "550e8400-e29b-41d4-a716-446655440001"
        });

        expect(comment).toBeDefined();
        expect(comment.text).toBe("Este es un comentario válido");
        expect(comment.authorId).toBe("550e8400-e29b-41d4-a716-446655440000");
        expect(comment.postId).toBe("550e8400-e29b-41d4-a716-446655440001");
        expect(comment.id).toBeDefined();
    });

    it("should throw EmptyCommentTextException if text is empty", () => {
        expect(() => {
            Comment.create({
                text: "",
                authorId: "550e8400-e29b-41d4-a716-446655440000",
                postId: "550e8400-e29b-41d4-a716-446655440001"
            });
        }).toThrow(EmptyCommentTextException);
    });

    it("should throw EmptyCommentTextException if text only contains whitespaces", () => {
        expect(() => {
            Comment.create({
                text: "   ",
                authorId: "550e8400-e29b-41d4-a716-446655440000",
                postId: "550e8400-e29b-41d4-a716-446655440001"
            });
        }).toThrow(EmptyCommentTextException);
    });

});

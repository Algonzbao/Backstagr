import { CommentMapper } from '@/src/contexts/comments/infrastructure/mappers/comment-mongodb.mapper';
import { Comment } from '@/contexts/comments/domain/comment';
import { CommentDocument } from '@/contexts/comments/infrastructure/entities/comment.schema';
import { describe, it, expect, jest } from '@jest/globals';
import mongoose from 'mongoose';

describe('CommentMapper', () => {
    it('should map a MongoDB CommentDocument to a Domain Comment', () => {
        // GIVEN
        const commentDocument = {
            _id: new mongoose.Types.ObjectId(),
            text: 'Test comment',
            author: new mongoose.Types.ObjectId(),
            post: new mongoose.Types.ObjectId(),
            save: jest.fn(),
        } as unknown as CommentDocument;

        // WHEN
        const domainComment = CommentMapper.toDomain(commentDocument);

        // THEN
        expect(domainComment.id).toBe(commentDocument._id.toString());
        expect(domainComment.text).toBe('Test comment');
        expect(domainComment.authorId).toBe(commentDocument.author.toString());
        expect(domainComment.postId).toBe(commentDocument.post.toString());
    });

    it('should map a Domain Comment to a MongoDB persistence object', () => {
        // GIVEN
        const domainComment = new Comment({
            id: 'ceb8e825-ee35-4c55-ad49-c6977f986cf1',
            text: 'Test comment',
            authorId: '98ce507b-6c9c-4d64-95f8-b7eef2524f20',
            postId: 'efaa0b89-fe83-4ff4-8104-f358728ef877',
        });

        // WHEN
        const persistenceComment = CommentMapper.toPersistence(domainComment);

        // THEN
        expect(persistenceComment).toEqual({
            id: 'ceb8e825-ee35-4c55-ad49-c6977f986cf1',
            text: 'Test comment',
            authorId: '98ce507b-6c9c-4d64-95f8-b7eef2524f20',
            postId: 'efaa0b89-fe83-4ff4-8104-f358728ef877',
        });
    });
});

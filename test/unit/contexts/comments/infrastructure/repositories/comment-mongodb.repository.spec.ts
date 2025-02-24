import { Model } from 'mongoose';
import { Comment } from '@/contexts/comments/domain/comment';
import { CommentDocument } from '@/contexts/comments/infrastructure/entities/comment.schema';
import { CommentMongoDBRepository } from '@/src/contexts/comments/infrastructure/repositories/comment-mongodb.repository';
import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import { CommentMapper } from '@/src/contexts/comments/infrastructure/mappers/comment-mongodb.mapper';

describe('CommentMongoDBRepository', () => {
    let repository: CommentMongoDBRepository;
    const mockCommentModel = jest.fn();

    beforeEach(() => {
        repository = new CommentMongoDBRepository(mockCommentModel as unknown as Model<CommentDocument>);
    });

    it('should create and save a comment', async () => {
        // GIVEN
        const comment = new Comment({
            id: 'ceb8e825-ee35-4c55-ad49-c6977f986cf1',
            text: 'Test comment',
            authorId: '98ce507b-6c9c-4d64-95f8-b7eef2524f20',
            postId: 'efaa0b89-fe83-4ff4-8104-f358728ef877',
        });

        const toPersistenceSpy = jest.spyOn(CommentMapper, 'toPersistence');
        const toDomainSpy = jest.spyOn(CommentMapper, 'toDomain');
        const saveSpy = jest.fn();

        mockCommentModel.mockImplementation(() => ({
            save: saveSpy.mockResolvedValue({
                _id: 'ceb8e825-ee35-4c55-ad49-c6977f986cf1',
                text: 'Test comment',
                author: '98ce507b-6c9c-4d64-95f8-b7eef2524f20',
                post: 'efaa0b89-fe83-4ff4-8104-f358728ef877',
            } as never),
        }));

        // WHEN
        const result = await repository.create(comment);

        // THEN
        expect(toPersistenceSpy).toHaveBeenCalledWith(comment);

        expect(saveSpy).toHaveBeenCalled();
        expect(saveSpy).toHaveBeenCalledTimes(1);

        expect(toDomainSpy).toHaveBeenCalled();

        expect(result.postId).toEqual(comment.postId);
        expect(result.authorId).toEqual(comment.authorId);
        expect(result.text).toEqual(comment.text);
    });
});
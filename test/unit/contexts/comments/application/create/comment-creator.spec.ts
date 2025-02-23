import { Test, TestingModule } from '@nestjs/testing';
import { CommentCreator } from '@/contexts/comments/application/create/comment-creator';
import { CommentRepository } from '@/src/contexts/comments/domain/comment.repository';
import { CreateCommentDto } from '@/src/contexts/comments/application/create/create-comment.dto';
import { Comment } from '@/src/contexts/comments/domain/comment';
import { jest, describe, it, expect, beforeEach, afterEach } from '@jest/globals';

// Mock del repositorio
const commentRepositoryMock = {
    create: jest.fn() as jest.MockedFunction<(comment: Comment) => Promise<Comment>>,
};

describe('CommentCreator', () => {
    let commentCreator: CommentCreator;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommentCreator,
                { provide: CommentRepository, useValue: commentRepositoryMock },
            ],
        }).compile();

        commentCreator = module.get<CommentCreator>(CommentCreator);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should create a comment', async () => {
        // GIVEN
        const dto: CreateCommentDto = {
            text: 'Este es un comentario de prueba',
            authorId: 'a9959cd9-f923-4611-ad39-c7a10aecd905',
            postId: '6270defd-822a-4b67-8683-1918095bc2d3',
        };

        const commentMock = Comment.create(dto);
        commentRepositoryMock.create.mockResolvedValue(commentMock);

        // WHEN
        const result = await commentCreator.run(dto);

        // THEN
        expect(commentRepositoryMock.create).toHaveBeenCalledTimes(1); // Verificar que se llamó una vez
        expect(commentRepositoryMock.create).toHaveBeenCalledWith(expect.any(Comment)); // Se espera que se llame con una instancia de Comment
        expect(result.comment).toMatchObject({
            text: dto.text,
            authorId: dto.authorId,
            postId: dto.postId,
        });
    });
});

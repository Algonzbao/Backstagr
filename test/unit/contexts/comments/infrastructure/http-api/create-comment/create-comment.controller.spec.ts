/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { CreateCommentController } from '@/contexts/comments/infrastructure/http-api/create-comment/create-comment.controller';
import { CommentCreator } from '@/contexts/comments/application/create/comment-creator';
import { CreateCommentHttpDto } from '@/contexts/comments/infrastructure/http-api/create-comment/create-comment.http-dto';
import { ValidationPipe } from '@nestjs/common';
import { PrimitiveComment } from '@/contexts/comments/domain/comment';
import { CreateCommentDto } from '@/src/contexts/comments/application/create/create-comment.dto';
import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import { HttpException } from '@nestjs/common';

describe('CreateCommentController', () => {
    let controller: CreateCommentController;
    let commentCreator: CommentCreator;

    const mockCommentCreator = {
        run: jest.fn() as jest.MockedFunction<(dto: CreateCommentDto) => Promise<{ comment: PrimitiveComment }>>,
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [CreateCommentController],
            providers: [
                {
                    provide: CommentCreator,
                    useValue: mockCommentCreator,
                },
            ],
        }).compile();

        controller = module.get<CreateCommentController>(CreateCommentController);
        commentCreator = module.get<CommentCreator>(CommentCreator);
    });

    it('should create a comment', async () => {
        // GIVEN
        const dto: CreateCommentHttpDto = {
            text: 'Test comment',
            authorId: 'author-id',
            postId: 'post-id',
        };

        const expectedResponse = {
            comment: {
                id: 'test-id',
                text: dto.text,
                authorId: dto.authorId,
                postId: dto.postId,
            } as PrimitiveComment,
        };

        mockCommentCreator.run.mockResolvedValue(expectedResponse);

        // WHEN
        const result = await controller.run(dto);

        // THEN
        expect(commentCreator.run).toHaveBeenCalledWith(dto);
        expect(result).toEqual(expectedResponse);
    });


    it('should fail validation for empty text', async () => {
        // GIVEN
        const dto: CreateCommentHttpDto = {
            text: '',
            authorId: 'author-id',
            postId: 'post-id',
        };

        const validationPipe = new ValidationPipe();

        try {
            // WHEN
            await validationPipe.transform(dto, { type: 'body' });
        } catch (error: unknown) {
            if (error instanceof HttpException) {
                const response = error.getResponse();
                // THEN
                expect(response['message']).toContain('text should not be empty');
            } else {
                throw error;
            }
        }
    });



});

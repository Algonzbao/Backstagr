import { CommentRepository } from "@/contexts/comments/domain/comment.repository";
import { Comment, PrimitiveComment } from "@/contexts/comments/domain/comment";
import { CreateCommentDto } from "@/contexts/comments/application/create/create-comment.dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CommentCreator {
    constructor(private readonly commentRepository: CommentRepository) {}
    
    async run(dto: CreateCommentDto): Promise<{comment: PrimitiveComment}> {
        // Add validations and business logic here
        const comment = Comment.create(dto);
        await this.commentRepository.create(comment);
        return { comment: comment.toPrimitives() };
    }
}
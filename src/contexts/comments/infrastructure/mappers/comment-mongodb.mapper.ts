import { Comment as DomainComment, PrimitiveComment } from '@/contexts/comments/domain/comment';
import { CommentDocument } from '@/contexts/comments/infrastructure/entities/comment.schema';

export class CommentMapper {
    static toDomain(commentDocument: CommentDocument): DomainComment {
        return new DomainComment({
            id: commentDocument._id.toString(),
            text: commentDocument.text,
            authorId: commentDocument.author.toString(),
            postId: commentDocument.post.toString(),
        });
    }

    static toPersistence(comment: DomainComment): PrimitiveComment {
        return {
            id: comment.id,
            text: comment.text,
            authorId: comment.authorId,
            postId: comment.postId,
        };
    }
}

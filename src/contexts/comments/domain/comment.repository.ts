import { Comment } from '@/contexts/comments/domain/comment';

export abstract class CommentRepository {
  abstract create(comment: Comment): Promise<Comment>;
  abstract update(comment: Comment): Promise<Comment>;
  abstract delete(id: string): Promise<void>;
  abstract find(id: string): Promise<Comment>;
  abstract findAll(): Promise<Comment[]>;
}
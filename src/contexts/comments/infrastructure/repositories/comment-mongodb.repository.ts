import { Comment } from "../../domain/comment";
import { CommentRepository } from "../../domain/comment.repository";
import { CommentDocument } from "../entities/comment.schema";
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommentMapper } from "../mappers/comment-mongodb.mapper";

@Injectable()
export class CommentMongoDBRepository extends CommentRepository {
    constructor(
        @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    ) {
        super();
    }

    async create(comment: Comment): Promise<Comment> {
        const createdComment = new this.commentModel(CommentMapper.toPersistence(comment));
        return createdComment.save().then((savedComment) => CommentMapper.toDomain(savedComment));
    }
    update(comment: Comment): Promise<Comment> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    find(id: string): Promise<Comment> {
        throw new Error("Method not implemented.");
    }
    findAll(): Promise<Comment[]> {
        throw new Error("Method not implemented.");
    }

}
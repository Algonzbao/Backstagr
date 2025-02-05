import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment, CommentDocument } from 'src/schemas/comments.schema'; // Import your Comment schema
import { CreateCommentDto } from './dto/createComment.dto'; // Import your DTOs
import { UpdateCommentDto } from './dto/updateComment.dto'; // Import the Update DTO

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
  ) {}

  async create(createCommentDto: CreateCommentDto): Promise<Comment> {
    const createdComment = new this.commentModel(createCommentDto);
    return createdComment.save();
  }

  async findAll(): Promise<Comment[]> {
    return this.commentModel.find().populate('author').populate('post').exec();
  }

  async findById(id: string): Promise<Comment | null> {
    return this.commentModel.findById(id).populate('author').populate('post').exec();
  }

  async update(id: string, updateCommentDto: UpdateCommentDto): Promise<Comment | null> {
    return this.commentModel.findByIdAndUpdate(id, updateCommentDto, { new: true }).populate('author').populate('post').exec(); // Populate after update
  }

  async delete(id: string): Promise<Comment | null> {
    return this.commentModel.findByIdAndDelete(id);
  }
}
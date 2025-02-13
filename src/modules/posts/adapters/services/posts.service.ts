import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post, PostDocument } from 'src/schemas/posts.schema';
import { CreatePostDto } from '../../dtos/createPost.dto';
import { UpdatePostDto } from '../../dtos/updatePost.dto';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  async create(createPostDto: CreatePostDto): Promise<Post> {
    const createdPost = new this.postModel(createPostDto);
    return createdPost.save();
  }

  async findAll(): Promise<Post[]> {
    return this.postModel.find().populate('author').populate('concert').populate('likes').populate('comments').exec();
  }

  async findOne(id: string): Promise<Post | null> {
    return this.postModel.findById(id).populate('author').populate('concert').populate('likes').populate('comments').exec();
  }

  async update(id: string, updatePostDto: UpdatePostDto): Promise<Post | null> {
    return this.postModel.findByIdAndUpdate(id, updatePostDto, { new: true }).populate('author').populate('concert').populate('likes').populate('comments').exec();
  }

  async remove(id: string): Promise<Post | null> {
    return this.postModel.findByIdAndDelete(id);
  }
}

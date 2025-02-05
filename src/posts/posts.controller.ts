import { Controller, Get, Post, Body, Param, Delete, HttpException, Patch, ValidationPipe, UsePipes } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/createPost.dto';
import { UpdatePostDto } from './dto/updatePost.dto';
import { Types } from 'mongoose'; // Import Types from mongoose

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Get()
  async findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {  // Removed ParseObjectIdPipe
    const isValid = Types.ObjectId.isValid(id); // Validate ObjectId
    if (!isValid) {
      throw new HttpException('Invalid Post ID', 400);
    }

    const post = await this.postsService.findOne(id);
    if (!post) {
      throw new HttpException('Post not found', 404);
    }
    return post;
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  async update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) { // Removed ParseObjectIdPipe
    const isValid = Types.ObjectId.isValid(id); // Validate ObjectId
    if (!isValid) {
      throw new HttpException('Invalid Post ID', 400);
    }

    const updatedPost = await this.postsService.update(id, updatePostDto);
    if (!updatedPost) {
      throw new HttpException('Post not found', 404);
    }
    return updatedPost;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) { // Removed ParseObjectIdPipe
    const isValid = Types.ObjectId.isValid(id); // Validate ObjectId
    if (!isValid) {
      throw new HttpException('Invalid Post ID', 400);
    }

    const deletedPost = await this.postsService.remove(id);
    if (!deletedPost) {
      throw new HttpException('Post not found', 404);
    }
    return deletedPost;
  }
}
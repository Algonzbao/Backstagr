import { Controller, Get, Post, Body, Param, Delete, HttpException, Patch, ValidationPipe, UsePipes } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/createComment.dto';
import { UpdateCommentDto } from './dto/updateComment.dto';
import { Types } from 'mongoose'; // Importa Types desde mongoose

@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async createComment(@Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(createCommentDto);
  }

  @Get()
  async getAllComments() {
    return this.commentsService.findAll();
  }

  @Get(':id')
  async getCommentById(@Param('id') id: string) {
    const isValid = Types.ObjectId.isValid(id); // Valida el ObjectId
    if (!isValid) {
      throw new HttpException('Invalid ObjectId', 400); // Lanza excepción si es inválido
    }

    const comment = await this.commentsService.findById(id);
    if (!comment) {
      throw new HttpException('Comment not found', 404);
    }
    return comment;
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  async updateComment(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    const isValid = Types.ObjectId.isValid(id); // Valida el ObjectId
    if (!isValid) {
      throw new HttpException('Invalid ObjectId', 400); // Lanza excepción si es inválido
    }

    const updatedComment = await this.commentsService.update(id, updateCommentDto);
    if (!updatedComment) {
      throw new HttpException('Comment not found', 404);
    }
    return updatedComment;
  }

  @Delete(':id')
  async deleteComment(@Param('id') id: string) {
    const isValid = Types.ObjectId.isValid(id); // Valida el ObjectId
    if (!isValid) {
      throw new HttpException('Invalid ObjectId', 400); // Lanza excepción si es inválido
    }

    const deletedComment = await this.commentsService.delete(id);
    if (!deletedComment) {
      throw new HttpException('Comment not found', 404);
    }
    return deletedComment;
  }
}
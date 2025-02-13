import { Controller, Get, Post, Body, Param, Delete, HttpException, Patch, ValidationPipe, UsePipes } from '@nestjs/common';
import { Types } from 'mongoose';
import { CreateMessageDto } from '../../dtos/createMessage.dto';
import { UpdateMessageDto } from '../../dtos/updateMessage.dto';
import { MessagesService } from '../services/messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() createMessageDto: CreateMessageDto) {
    return this.messagesService.create(createMessageDto);
  }

  @Get()
  async findAll() {
    return this.messagesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const isValid = Types.ObjectId.isValid(id);
    if (!isValid) {
      throw new HttpException('Invalid Message ID', 400);
    }
    const message = await this.messagesService.findOne(id);
    if (!message) {
      throw new HttpException('Message not found', 404);
    }
    return message;
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  async update(@Param('id') id: string, @Body() updateMessageDto: UpdateMessageDto) {
     const isValid = Types.ObjectId.isValid(id);
    if (!isValid) {
      throw new HttpException('Invalid Message ID', 400);
    }
    const updatedMessage = await this.messagesService.update(id, updateMessageDto);
    if (!updatedMessage) {
      throw new HttpException('Message not found', 404);
    }
    return updatedMessage;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const isValid = Types.ObjectId.isValid(id);
    if (!isValid) {
      throw new HttpException('Invalid Message ID', 400);
    }
    const deletedMessage = await this.messagesService.remove(id);
    if (!deletedMessage) {
      throw new HttpException('Message not found', 404);
    }
    return deletedMessage;
  }
}
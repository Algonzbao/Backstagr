import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message, MessageDocument } from 'src/schemas/messages.schema';
import { CreateMessageDto } from './dto/createMessage.dto';
import { UpdateMessageDto } from './dto/updateMessage.dto';


@Injectable()
export class MessagesService {
  constructor(@InjectModel(Message.name) private messageModel: Model<MessageDocument>) {}

  async create(createMessageDto: CreateMessageDto): Promise<Message> {
    const createdMessage = new this.messageModel(createMessageDto);
    return createdMessage.save();
  }

  async findAll(): Promise<Message[]> {
    return this.messageModel.find().populate('sender').populate('receiver').exec();
  }

  async findOne(id: string): Promise<Message | null> {
    return this.messageModel.findById(id).populate('sender').populate('receiver').exec();
  }

  async update(id: string, updateMessageDto: UpdateMessageDto): Promise<Message | null> {
    return this.messageModel.findByIdAndUpdate(id, updateMessageDto, { new: true }).populate('sender').populate('receiver').exec();
  }

  async remove(id: string): Promise<Message | null> {
    return this.messageModel.findByIdAndDelete(id);
  }
}
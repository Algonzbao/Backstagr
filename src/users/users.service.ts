import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { CreateUserDto } from './dto/CreateUser.dto';
import {UpdateUserDto} from './dto/UpdateUser.dto';

@Injectable()
export class UserService {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
    createUser(createUserDto: CreateUserDto){
      const newUser = new this.userModel(createUserDto);
      return newUser.save();
    }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findById(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(id, updateUserDto, {new: true});
  }

  async deleteUser(id: string): Promise<User | null> {
    return this.userModel.findByIdAndDelete(id).exec();
  }
}

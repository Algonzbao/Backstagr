import { Controller, Get, Post, Body, Param, Delete, HttpException, Patch, ValidationPipe, UsePipes } from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/CreateUser.dto';
import {UpdateUserDto} from './dto/UpdateUser.dto';
import mongoose from 'mongoose';


@Controller('users')
export class UsersController {
  constructor(private userService: UserService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  createUser(@Body() createUserDto: CreateUserDto){
    return this.userService.createUser(createUserDto);
  }

  @Get()
  async getAllUsers() {
    return this.userService.findAll();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('User not found', 404);
  
    const findUser = await this.userService.findById(id); // `await` solo si devuelve una Promise
    if (!findUser) throw new HttpException('User not found', 404);
    return this.userService.findById(id);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid ID', 404);
    const updatedUser = await this.userService.updateUser(id, updateUserDto);
    if (!updatedUser) throw new HttpException('User not found', 404);
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid ID', 404);
    const deletedUser = await this.userService.deleteUser(id);
    if (!deletedUser) throw new HttpException('Invalid ID', 404);
    console.log(deletedUser);
    return this.userService.deleteUser(id);
  }
}

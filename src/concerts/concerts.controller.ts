import { Controller, Get, Post, Body, Param, Delete, HttpException, Patch, ValidationPipe, UsePipes } from '@nestjs/common';
import { ConcertsService } from './concerts.service';
import { CreateConcertDto } from './dto/CreateConcert.dto';
import {UpdateConcertDto} from './dto/UpdateConcert.dto';
import mongoose from 'mongoose';


@Controller('concerts')
export class ConcertsController {
  constructor(private concertService: ConcertsService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  createConcert(@Body() createConcertDto: CreateConcertDto){
    return this.concertService.createConcert(createConcertDto);
  }

  @Get()
  async getAllConcerts() {
    return this.concertService.findAll();
  }

  @Get(':id')
  async getConcertById(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('User not found', 404);
  
    const findConcert = await this.concertService.findById(id); // `await` solo si devuelve una Promise
    if (!findConcert) throw new HttpException('User not found', 404);
    return this.concertService.findById(id);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  async updateConcert(@Param('id') id: string, @Body() updateConcertDto: UpdateConcertDto) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid ID', 404);
    const updatedConcert = await this.concertService.updateConcert(id, updateConcertDto);
    if (!updatedConcert) throw new HttpException('User not found', 404);
    return this.concertService.updateConcert(id, updateConcertDto);
  }

  @Delete(':id')
  async deleteConcert(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid ID', 404);
    const deletedconcert = await this.concertService.deleteConcert(id);
    if (!deletedconcert) throw new HttpException('Invalid ID', 404);
    console.log(deletedconcert);
    return this.concertService.deleteConcert(id);
  }
}

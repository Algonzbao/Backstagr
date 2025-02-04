import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateConcertDto } from './dto/CreateConcert.dto';
import {UpdateConcertDto} from './dto/UpdateConcert.dto';
import { Concert } from 'src/schemas/concerts.schema';

@Injectable()
export class ConcertsService {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  constructor(@InjectModel(Concert.name) private concertModel: Model<Concert>) {}
    createConcert(createConcertDto: CreateConcertDto){
      const newConcert = new this.concertModel(createConcertDto);
      return newConcert.save();
    }

  async findAll(): Promise<Concert[]> {
    return this.concertModel.find().exec();
  }

  async findById(id: string): Promise<Concert | null> {
    return this.concertModel.findById(id).exec();
  }

  async updateConcert(id: string, updateConcertDto: UpdateConcertDto) {
    return this.concertModel.findByIdAndUpdate(id, updateConcertDto, {new: true});
  }

  async deleteConcert(id: string): Promise<Concert | null> {
    return this.concertModel.findByIdAndDelete(id).exec();
  }
}

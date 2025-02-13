import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Concert, ConcertDocument } from 'src/schemas/concerts.schema';
import { CreateConcertDto } from '../../dtos/CreateConcert.dto';
import { UpdateConcertDto } from '../../dtos/UpdateConcert.dto';

@Injectable()
export class ConcertsService {
  constructor(@InjectModel(Concert.name) private concertModel: Model<ConcertDocument>) {}

  async createConcert(createConcertDto: CreateConcertDto): Promise<Concert> {
    const newConcert =  new this.concertModel(createConcertDto);
    return newConcert.save();
  }

  async findAll(): Promise<Concert[]> {
    return this.concertModel.find().populate(['attendees', 'taggedPosts']).exec();
  }

  async findById(id: string): Promise<Concert | null> {
    const concert = await this.concertModel.findById(id).populate(['attendees', 'taggedPosts']).exec();
    if (!concert) {
      throw new NotFoundException(`Concert with ID ${id} not found`);
    }
    return concert;
  }

  async updateConcert(id: string, updateConcertDto: UpdateConcertDto): Promise<Concert | null> {
    const updatedConcert = await this.concertModel.findByIdAndUpdate(id, updateConcertDto, { new: true }).exec();
    if (!updatedConcert) {
      throw new NotFoundException(`Concert with ID ${id} not found`);
    }
    return updatedConcert;
  }

  async deleteConcert(id: string): Promise<Concert | null> {
    const deletedConcert = await this.concertModel.findByIdAndDelete(id).exec();
    if (!deletedConcert) {
      throw new NotFoundException(`Concert with ID ${id} not found`);
    }
    return deletedConcert;
  }

  // Agregar un usuario a la lista de asistentes
  async addAttendee(concertId: string, userId: string): Promise<Concert | null> {
    const concert = await this.concertModel.findByIdAndUpdate(
      concertId,
      { $addToSet: { attendees: userId } },
      { new: true }
    ).exec();

    if (!concert) {
      throw new NotFoundException(`Concert with ID ${concertId} not found`);
    }
    return concert;
  }

  // Eliminar un usuario de la lista de asistentes
  async removeAttendee(concertId: string, userId: string): Promise<Concert | null> {
    const concert = await this.concertModel.findByIdAndUpdate(
      concertId,
      { $pull: { attendees: userId } },
      { new: true }
    ).exec();

    if (!concert) {
      throw new NotFoundException(`Concert with ID ${concertId} not found`);
    }
    return concert;
  }

  // Agregar una publicación etiquetada en el concierto
  async addTaggedPost(concertId: string, postId: string): Promise<Concert | null> {
    const concert = await this.concertModel.findByIdAndUpdate(
      concertId,
      { $addToSet: { taggedPosts: postId } },
      { new: true }
    ).exec();

    if (!concert) {
      throw new NotFoundException(`Concert with ID ${concertId} not found`);
    }
    return concert;
  }

  // Eliminar una publicación etiquetada en el concierto
  async removeTaggedPost(concertId: string, postId: string): Promise<Concert | null> {
    const concert = await this.concertModel.findByIdAndUpdate(
      concertId,
      { $pull: { taggedPosts: postId } },
      { new: true }
    ).exec();

    if (!concert) {
      throw new NotFoundException(`Concert with ID ${concertId} not found`);
    }
    return concert;
  }
}

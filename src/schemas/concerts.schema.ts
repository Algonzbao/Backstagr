import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ConcertDocument = HydratedDocument<Concert>;

@Schema({ timestamps: true })
export class Concert {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  artist: string;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  location: string;

  @Prop({ required: true })
  venue: string;

  @Prop({type: Number, min: 0 })
  price: number;

  @Prop({ default: '' })
  description?: string;

  @Prop({ type: [String], default: [] })
  attendees: string[]; // Lista de IDs de usuarios que asistirán al concierto

  @Prop({ type: [String], default: [] })
  images?: string[]; // URLs de imágenes del concierto

  @Prop({ type: Boolean, default: false })
  isSoldOut?: boolean;
}

export const ConcertSchema = SchemaFactory.createForClass(Concert);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop()
  profileImage: string;

  @Prop({ required: true })
  age: number;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  description?: string;

  @Prop({ type: [String], default: [] })
  attendedEvents: string[]; // IDs de eventos a los que ha asistido

  @Prop({ type: [String], default: [] })
  friends?: string[]; // IDs de otros usuarios como amigos
}

export const UserSchema = SchemaFactory.createForClass(User);

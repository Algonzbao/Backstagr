import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string; // Se almacenará con hashing

  @Prop()
  firstName?: string;

  @Prop()
  lastName?: string;

  @Prop()
  age?: number;

  @Prop()
  avatar?: string; // URL de la imagen de perfil

  @Prop()
  description?: string;

  @Prop({ type: [String], default: [] })
  favoriteArtists: string[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Concert' }], default: [] })
  attendedConcerts: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }], default: [] })
  friends: Types.ObjectId[];

  @Prop({ type: Object, default: {} })
  settings: Record<string, any>; // Preferencias del usuario
}

export const UserSchema = SchemaFactory.createForClass(User);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type NotificationDocument = HydratedDocument<Notification>;

@Schema({ timestamps: true })
export class Notification {
  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  recipient: Types.ObjectId;

  @Prop({ required: true })
  message: string;

  @Prop({ required: true })
  type: string; // Ejemplo: "newEvent", "friendRequest", "message"

  @Prop({ type: Types.ObjectId })
  relatedId?: Types.ObjectId; // ID del evento o usuario relacionado

  @Prop({ default: false })
  isRead: boolean;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);

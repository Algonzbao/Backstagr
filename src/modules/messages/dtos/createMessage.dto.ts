import { IsNotEmpty, IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateMessageDto {
  @IsNotEmpty()
  @IsString()
  message: string;

  @IsNotEmpty()
  @IsString()
  sender: string; // ObjectId as string

  @IsNotEmpty()
  @IsString()
  receiver: string; // ObjectId as string

  @IsOptional()
  @IsBoolean()
  isRead?: boolean;
}

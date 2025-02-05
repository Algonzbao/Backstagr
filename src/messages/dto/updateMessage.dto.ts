import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class UpdateMessageDto {
  @IsOptional()
  @IsString()
  message?: string;

  @IsOptional()
  @IsString()
  sender?: string; // ObjectId as string

  @IsOptional()
  @IsString()
  receiver?: string; // ObjectId as string

  @IsOptional()
  @IsBoolean()
  isRead?: boolean;
}
import { IsOptional, IsString, IsDate, IsArray, IsNumber } from 'class-validator';

export class UpdateConcertDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsDate()
  date?: Date;

  @IsOptional()
  @IsNumber()
  capacity?: number;

  @IsOptional()
  @IsString()
  artist?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  attendees?: string[]; // Lista de IDs de usuarios asistentes

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  taggedPosts?: string[]; // Lista de IDs de publicaciones asociadas
}

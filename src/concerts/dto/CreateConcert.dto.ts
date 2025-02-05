import { IsNotEmpty, IsOptional, IsString, IsDate, IsArray, IsNumber } from 'class-validator';

export class CreateConcertDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  location: string;

  @IsNotEmpty()
  @IsDate()
  date: Date;

  @IsNotEmpty()
  @IsNumber()
  capacity: number;

  @IsNotEmpty()
  @IsString()
  artist: string;

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

import { IsString, IsOptional } from 'class-validator';

export class UpdateCommentDto {
  @IsOptional()
  @IsString()
  text?: string;

  @IsOptional()
  @IsString()
  author?: string; // Or Types.ObjectId if needed

  @IsOptional()
  @IsString()
  post?: string; // Or Types.ObjectId if needed
}
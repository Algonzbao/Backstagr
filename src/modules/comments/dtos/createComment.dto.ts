import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  @IsString()
  text: string;

  @IsNotEmpty()
  @IsString()
  author: string; // Or Types.ObjectId if you're sending it directly

  @IsNotEmpty()
  @IsString()
  post: string; // Or Types.ObjectId
}
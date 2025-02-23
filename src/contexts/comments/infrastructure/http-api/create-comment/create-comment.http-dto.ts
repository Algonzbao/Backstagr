import { IsNotEmpty, IsUUID, IsString } from "class-validator";

export class CreateCommentHttpDto {
  @IsNotEmpty()
  @IsString()
  text: string;

  @IsNotEmpty()
  @IsUUID()
  authorId: string;

  @IsNotEmpty()
  @IsUUID()
  postId: string;
}
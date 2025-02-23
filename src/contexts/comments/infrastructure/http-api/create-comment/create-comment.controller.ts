import { CommentCreator } from "@/contexts/comments/application/create/comment-creator";
import { Body, Controller, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { COMMENTS } from "../route.constants";
import { PrimitiveComment } from "@/contexts/comments/domain/comment";
import { CreateCommentHttpDto } from "@/contexts/comments/infrastructure/http-api/create-comment/create-comment.http-dto";

@Controller(COMMENTS)
export class CreateCommentController {
    constructor(private readonly commentCreator: CommentCreator) {}

    @Post()
    @UsePipes(new ValidationPipe())
    async run(
        @Body() createCommentHttpDto: CreateCommentHttpDto
    ): Promise<{comment: PrimitiveComment}> {
        return await this.commentCreator.run(createCommentHttpDto);
    }
}
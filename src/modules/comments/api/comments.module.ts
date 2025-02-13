import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Comment, CommentSchema } from '../../../schemas/comments.schema'; // Import your Comment schema
import { CommentsService } from '../services/comments.service'; // Create a CommentsService
import { CommentsController } from './comments.controller'; // Create a CommentsController

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]), // Use Comment and CommentSchema
  ],
  controllers: [CommentsController], // Add your CommentsController
  providers: [CommentsService], // Add your CommentsService
  exports: [CommentsService], // Export the service if needed
})
export class CommentsModule {}
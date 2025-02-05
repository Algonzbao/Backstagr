import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { ConcertsModule } from './concerts/concerts.module';
import { CommentsModule } from './comments/comments.module';
import { MessagesModule } from './messages/messages.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest'), // No es necesario especificar opciones adicionales
    UsersModule,
    ConcertsModule,
    CommentsModule,
    MessagesModule,
    PostsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

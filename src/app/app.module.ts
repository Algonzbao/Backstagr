import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from '../modules/users/adapters/api/users.module';
import { CommentsModule } from '../modules/comments/api/comments.module';
import { ConcertsModule } from '../modules/concerts/adapters/api/concerts.module';
import { MessagesModule } from '../modules/messages/adapters/api/messages.module';
import { PostsModule } from '../modules/posts/adapters/api/posts.module';
import { HttpApiModule } from './http-api/http-api.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest'), // No es necesario especificar opciones adicionales
    UsersModule,
    ConcertsModule,
    CommentsModule,
    MessagesModule,
    PostsModule,
    HttpApiModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

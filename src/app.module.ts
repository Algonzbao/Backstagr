import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest'), // No es necesario especificar opciones adicionales
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { ConcertsModule } from './concerts/concerts.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest'), // No es necesario especificar opciones adicionales
    UsersModule,
    ConcertsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

import {Module} from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Concert, ConcertSchema } from 'src/schemas/concerts.schema'
import { ConcertsService } from '../services/concerts.service'
import { ConcertsController } from './concerts.controller'

@Module({
    imports: [MongooseModule.forFeature([{ name: Concert.name, schema: ConcertSchema }])],
    controllers: [ConcertsController],
    providers: [ConcertsService],
    exports: [ConcertsService],
  })
  export class ConcertsModule {}
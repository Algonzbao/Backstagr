import {Module} from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { User, UserSchema } from 'src/schemas/user.schema'
import { UserService } from './users.service'
import { UsersController } from './users.controller'
import { UserSettings, UserSettingsSchema } from 'src/schemas/UserSettings.schema'

@Module({
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema },{name: UserSettings.name,schema: UserSettingsSchema}])],
    controllers: [UsersController],
    providers: [UserService],
    exports: [UserService],
  })
  export class UsersModule {}
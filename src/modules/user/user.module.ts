import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from 'src/controllers/user/user.controller';
import { Rol } from 'src/models/user/rol.entity';
import { User } from 'src/models/user/user.entity';
import { UserService } from 'src/services/user/user.service';
import { RolModule } from '../rol/rol.module';

@Module({
    imports:[TypeOrmModule.forFeature([User]), RolModule],
    controllers: [UserController],
    providers: [UserService ], 
    exports:[UserService]
})
export class UserModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rol } from 'src/models/user/rol.entity';
import { RolService } from 'src/services/rol/rol.service';

@Module({
    imports:[TypeOrmModule.forFeature([Rol])],
    providers: [RolService], 
    exports: [RolService]
})
export class RolModule {}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rol } from 'src/models/user/rol.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolService {
    constructor(
        @InjectRepository(Rol)
        private readonly repositoryRol : Repository<Rol>
    ){}

    async getOneByName(rolName:string): Promise<Rol>{
        const rol = await this.repositoryRol.findOneBy({rol: rolName})
        if(!rol) throw new NotFoundException('ROL_NOT_FOUND')
        return rol
    }
}

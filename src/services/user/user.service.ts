import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/dto/user/user.dto';
import { User } from 'src/models/user/user.entity';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { RolService } from '../rol/rol.service';


@Injectable()
export class UserService{

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly rolService: RolService,


    ) { }

    async findAll(): Promise<User[]> {
        return this.userRepository.find({
            order: { create_at: 'DESC' },
        })
    }

    async createOne(createUserDto: CreateUserDto) {
        const {rol_name, ...data} = createUserDto
        const rol = await this.rolService.getOneByName(rol_name)
        const newUser = this.userRepository.create({
            ...data,
            rol
        }) 
       const userSaved = await this.userRepository.save(newUser);        
       return userSaved
    }


    async getOne(idUser: string) {
        const user = await this.userRepository.findOne({
            where: { id: idUser },
        })
        if (!user) throw new NotFoundException()
        return user
    }

    async getOneByEmail(email: string) {
        const user: User = await this.userRepository.findOne({
            where: { email: email },
        })
        return user
    }


    async validatePassword(email: string){
        const user: User = await this.userRepository.findOne({
            where: { email: email },
        //    select: { password: true, id: true, email: true, is_active:true }
        })
        
        console.log(user)
        if (!user) throw new NotFoundException()
        return user
    }


    async changueStateActive(idUser: string) {
        const user = await this.getOne(idUser)
        //let is_active: boolean = !user.is_active
        await this.userRepository.update(idUser, {
          //  is_active
        })
        return user
    }

    

 
}

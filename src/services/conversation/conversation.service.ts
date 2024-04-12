import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Conversacion } from 'src/models/class/conversation.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ConversationService {

    constructor(
        @InjectRepository(Conversacion)
        private readonly conersationRepository: Repository<Conversacion>,



    ) { }

    async findById(conversationId:string): Promise<Conversacion> {
        return await this.conersationRepository.findOne({
            where: {id_conversacion:conversationId},
            order: { createdAt: 'DESC' },
            relations:['messages', 'messages.creator.rol']
        })
    }
}

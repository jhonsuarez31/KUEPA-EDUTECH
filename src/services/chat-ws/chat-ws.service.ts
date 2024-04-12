import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Socket } from 'socket.io';
import { Conversacion } from 'src/models/class/conversation.entity';
import { Message } from 'src/models/class/mesagge.entity';
import { User } from 'src/models/user/user.entity';
import { Repository } from 'typeorm';

interface ConnectedClients {
    [id: string]: {
        socket: Socket,
        user: User
    }
}

@Injectable()
export class ChatWsService {
    
    private connectedClients: ConnectedClients = {}
    
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Message)
        private readonly messageRepository: Repository<Message>,
        @InjectRepository(Conversacion)
        private readonly conversationRepository: Repository<Conversacion>,
    ) {}


    async registerClient( client: Socket, userId: string ) {

        const user = await this.userRepository.findOneBy({ id: userId });
        if ( !user ) throw new Error('User not found');
        //if ( !user.isActive ) throw new Error('User not active');

        this.checkUserConnection( user );

        this.connectedClients[client.id] = {
            socket: client,
            user: user,
        };
    }

    async getUser(id:string):  Promise<User>{
        return await this.userRepository.findOne({where:{id: id}})
    }

    async registerMesage (payload:any){
        const conversation = await this.getConversation()
        const user = await this.getUser(payload.id)
        let message = await this.messageRepository.create({
            text: payload.message,
            conversation: conversation,
            creator:user
        })
        return await this.messageRepository.save(message)
    }

    async getConversation(): Promise<Conversacion> {
        const conversations = await this.conversationRepository.find();
        if (conversations.length === 0) {
            const newConversation = this.conversationRepository.create({
                nombre: 'Clase virtual Programación'
            });
            return await this.conversationRepository.save(newConversation);
        } else {
            return conversations[0];
        }
    }
    
    removeClient( clientId: string ) {
        delete this.connectedClients[clientId];
    }


    getConnectedClients(): string[] {
        return Object.keys( this.connectedClients );
    }


    getUserFullName( socketId: string ) {
        console.log('usuario conectado', this.connectedClients[socketId].user )
        return this.connectedClients[socketId].user;
    }


    private checkUserConnection( user: User ) {

        for (const clientId of Object.keys( this.connectedClients ) ) {
            
            const connectedClient = this.connectedClients[clientId];

            if ( connectedClient.user.id === user.id ){
                connectedClient.socket.disconnect();
                break;
            }
        }

    }
}
import { JwtService } from '@nestjs/jwt';
import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatWsService } from 'src/services/chat-ws/chat-ws.service';

@WebSocketGateway({ cors: true })
export class ChatWsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  
  @WebSocketServer() wss: Server;

  constructor(
    private readonly messagesWsService: ChatWsService,
    private readonly jwtService: JwtService
  ) {}

  async handleConnection( client: Socket ) {
    const token = client.handshake.headers.authentication as string;
    let payload;

    try {
      payload = this.jwtService.verify( token );
      await this.messagesWsService.registerClient( client, payload.id );

    } catch (error) {
      client.disconnect();
      return;
    }

    // console.log({ payload })    
    // console.log('Cliente conectado:', client.id );
    

    this.wss.emit('clients-updated', this.messagesWsService.getConnectedClients() );
  }

  handleDisconnect( client: Socket ) {
    // console.log('Cliente desconectado', client.id )
    this.messagesWsService.removeClient( client.id );

    this.wss.emit('clients-updated', this.messagesWsService.getConnectedClients() );
  }

  @SubscribeMessage('message-from-client')
  onMessageFromClient( client: Socket, payload: any ) {
  
    //! Emite únicamente al cliente.
    // client.emit('message-from-server', {
    //   fullName: 'Soy Yo!',
    //   message: payload.message || 'no-message!!'
    // });

    //! Emitir a todos MENOS, al cliente inicial
    // client.broadcast.emit('message-from-server', {
    //   fullName: 'Soy Yo!',
    //   message: payload.message || 'no-message!!'
    // });

    this.wss.emit('message-from-server', {
      fullName: this.messagesWsService.getUserFullName(client.id),
      message: payload.message || 'no-message!!'
    });

  }


}
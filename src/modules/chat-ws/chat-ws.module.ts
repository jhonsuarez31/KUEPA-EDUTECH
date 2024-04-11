import { Module } from '@nestjs/common';
import { ChatWsGateway } from 'src/gateways/chat-ws/chat-ws.gateway';
import { ChatWsService } from 'src/services/chat-ws/chat-ws.service';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/models/user/user.entity';


@Module({
  imports:[AuthModule,
  TypeOrmModule.forFeature([User])
  ],
  providers: [ChatWsGateway, ChatWsService]
})
export class ChatWsModule {}

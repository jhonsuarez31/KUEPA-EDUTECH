import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConversationController } from 'src/controllers/conversation/conversation.controller';
import { Conversacion } from 'src/models/class/conversation.entity';
import { ConversationService } from 'src/services/conversation/conversation.service';

@Module({
    imports:[TypeOrmModule.forFeature([Conversacion])],
    controllers: [ConversationController],
    providers: [ConversationService ], 
    exports:[ConversationService]
})
export class ConversationModule {}

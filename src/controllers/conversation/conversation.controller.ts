import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ConversationService } from 'src/services/conversation/conversation.service';


@ApiTags('Conversation')
@Controller('conversation')
export class ConversationController {
    constructor(
        private readonly conversationService: ConversationService
    ){}

    
    @Get()
    healthCheck():string{
        return 'ok'
    }

    @Get('get-messages/:idConversation')
    getOne(@Param('idConversation', ParseUUIDPipe) idConversation: string){
        return this.conversationService.findById(idConversation)
    }
}

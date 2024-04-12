import { Module } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { RolModule } from './rol/rol.module';
import { ChatWsModule } from './chat-ws/chat-ws.module';
import { EnviromentConfigModule } from './enviroment-config/enviroment-config.module';
import { DbModule } from './type-orm/db.module';
import { ConversationModule } from './conversation/conversation.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local', '.env.production'],
      isGlobal: true,
    }),
    UserModule,
    DbModule,
    AuthModule,
    RolModule,
    ChatWsModule,
    TypeOrmModule,
    EnviromentConfigModule,
    ConversationModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

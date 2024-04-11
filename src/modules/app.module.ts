import { Module } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { RolModule } from './rol/rol.module';
import { ChatWsModule } from './chat-ws/chat-ws.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'sadex_admin',
      password: 'test123456',
      database: 'kuepa_db',
      autoLoadEntities: true,
      synchronize: true,
    }),
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local', '.env.production'],
      isGlobal: true,
    }),
    UserModule,
    AuthModule,
    RolModule,
    ChatWsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

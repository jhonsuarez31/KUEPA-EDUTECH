import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnviromentConfigService } from 'src/services/enviroment-config/enviroment-config.service';

@Module({
    imports: [ConfigModule],
    controllers: [],
    providers: [EnviromentConfigService],
    exports: [EnviromentConfigService]
})
export class EnviromentConfigModule {}

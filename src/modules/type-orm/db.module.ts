/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'process';
import { EnviromentConfigService } from 'src/services/enviroment-config/enviroment-config.service';
import { DataSource } from 'typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EnviromentConfigModule } from '../enviroment-config/enviroment-config.module';

const getTypeOrmModuleOptions = (
    config: EnviromentConfigService,
): TypeOrmModuleOptions => {
    return {
        type: 'postgres',
        host: config.getDataBaseHost(),
        port: config.getDataBasePort(),
        username: config.getDataBaseUser(),
        password: config.getDataBasePassword(),
        database: config.getDataBaseDb(),
        autoLoadEntities: true,
        synchronize: config.getEnviromen() === 'dev' ? true : false,
        //logging: true,
    }
}

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [EnviromentConfigModule],
            inject: [EnviromentConfigService],
            useFactory: getTypeOrmModuleOptions
        }),
    ],
})
export class DbModule {
    constructor(private dataSource: DataSource) { }
}

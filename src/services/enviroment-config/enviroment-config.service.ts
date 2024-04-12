import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnviromentConfigService {
    constructor(
        private readonly config: ConfigService
    ){}

    getDataBaseHost():string{
        return this.config.get<string>('DATABASE_HOST')
    }

    getDataBasePassword():string{
        return this.config.get<string>('DATABASE_PASSWORD')
    }

    getDataBasePort():number{
        return this.config.get<number>('DATABASE_PORT')
    }

    getDataBaseUser():string{
        return this.config.get<string>('DATABASE_USER')
    }

    getDataBaseDb():string{
        return this.config.get<string>('DATABASE_DB')
    }

    getJWToken():string{
        return this.config.get<string>('JWT_TOKEN')
    }

    getEnviromen():string{
        return this.config.get<string>('NODE_ENV')
    }
}

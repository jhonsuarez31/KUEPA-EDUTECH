import { Module } from '@nestjs/common';
import { AuthController } from 'src/controllers/auth/auth.controller';
import { AuthService } from 'src/services/auth/auth.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt-strategy';
import { JwtModule } from '@nestjs/jwt';

const getJwt = (
    config
) => {
    return {
        secret: 'tokenSecreto',
       // secret: config.getJWToken(),
        signOptions: {
          expiresIn:'2h',
        }
      }
}
@Module({
    imports:[
        UserModule,
        //EnviromentConfigModule,
        PassportModule.register({
            defaultStrategy:'jwt'
        }),
        JwtModule.registerAsync({
            //imports: [ EnviromentConfigModule ],
            //inject: [ EnviromentConfigService ],
            useFactory: getJwt
        })
    
    ],
    controllers:[AuthController],
    providers: [AuthService,JwtStrategy], 
    exports:[PassportModule, JwtModule, JwtStrategy]
})
export class AuthModule {}
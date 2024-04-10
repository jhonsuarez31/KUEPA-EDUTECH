
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/services/user/user.service';
import { IPaylodJwt } from 'src/interface/auth/paylod-jwt-token.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly userService: UserService,
       // private readonly configService: EnviromentConfigService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'tokenSecreto'
            //secretOrKey: configService.getJWToken()
        })
    }

    async validate(payload: IPaylodJwt) {
        const { id } = payload

        const user = await this.userService.getOne(id)

        if(!user) throw new UnauthorizedException('TOKEN_NOT_VALIDATE')

       // if(!user.is_active) throw new UnauthorizedException('NON_ACTIVE_USER')
        return user
    }
}
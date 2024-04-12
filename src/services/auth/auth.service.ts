import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from 'src/dto/user/user.dto';
import { User } from 'src/models/user/user.entity';
import { ILoginResponse, LoginDto } from 'src/dto/auth/login.dto';
import { IPaylodJwt } from 'src/interface/auth/paylod-jwt-token.interface';
import { JwtService } from '@nestjs/jwt';
import { compareHash, encryptPassword } from 'src/utils/auth/password-bcrypt.util';

@Injectable()
export class AuthService {
    constructor(
       private readonly userService: UserService,
        private readonly jwtService: JwtService,
       // private readonly mailService: MailService,

    ) { }

    async singIn(createUserDto: CreateUserDto): Promise<any> {
        createUserDto.password = await encryptPassword(createUserDto.password)
       const userSaved = await this.userService.createOne(createUserDto)
       // await this.mailService.sendUserConfirmation(userSaved.email, userSaved.activationToken, userSaved.first_name)

        return userSaved
    }
    async login(loginDto: LoginDto): Promise<ILoginResponse> {
        const { password, email } = loginDto
        const user = await this.userService.validatePassword(email)
        const { password: pass, ...userResponse } = user
        await compareHash(password, pass)
        return {
            ...userResponse,
            token: this.getJwtToken({
                id: user.id,
                email: user.email,
                name: user.firstName,
                rol: user.firstName
            })
        }
    }

    private getJwtToken(payload: IPaylodJwt) {
        const token = this.jwtService.sign(payload)
        return token
    }
/*

    async forgotPassword(email: string) {
        console.log('email', email)
        const user = await this.userService.getOneByEmail(email);
        console.log('user', user)
        if (!user) {
            throw new NotFoundException('USER_NOT_FOUND');
        }
        const token = this.getJwtToken({
            id: user.id,
            email: user.email,
        //    name: user.first_name,
        })

       // await this.mailService.sendResetPassword(user.email, user.first_name, token)
        //await this.userService.update(user.id, { resetPasswordToken: token })
        return { token }
    }

    async verifyResetToken(token: string): Promise<boolean | any> {
        try {
         //   const verify = this.jwtService.verify(token)
          //  const user = await this.userService.getOne(verify.id)
           // console.log('user', user.email)
         //   if (user.resetPasswordToken !== token)
          //      throw new UnauthorizedException('TOKEN_INVALID')
          //  return verify
        } catch (error) {
            return false;
        }
    }
    /*

    async resetPassword(idUser: string, resetPasswordDto: ResetPasswordDto) {
        const hashedPassword = await encryptPassword(resetPasswordDto.newPassword)
        await this.userService.update(idUser, { password: hashedPassword, resetPasswordToken: null });
        return await this.userService.getOne(idUser)

    }


    async verificatToken(token: string, email: string) {
        const user = await this.userService.getOneByEmail(email);
        if (!user) {
            throw new NotFoundException('USER_NOT_FOUND');
        }
        if (!user.tokenDate || user.tokenDate < new Date(Date.now())) throw new BadRequestException('CODE_TIME_EXPIRED')
        if (user.activationToken != token) throw new BadRequestException('CODE_NO_VALID')
        await this.userService.update(user.id, {
            is_active: true,
            activationToken: null,
            tokenDate: null

        })

        return user

    }




    */
}
